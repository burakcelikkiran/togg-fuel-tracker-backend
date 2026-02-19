<?php

namespace App\Http\Controllers;

use App\Models\Charge;
use App\Models\Company;
use App\Models\Vehicle;
use App\Services\OcrService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChargeController extends Controller
{
    public function index(Request $request)
    {
        $activeVehicle = request()->user()->vehicles()->active()->first();

        if (!$activeVehicle) {
            return response()->json([]);
        }

        $query = $activeVehicle->charges()->with('company');

        // Filtreler
        if ($request->has('company')) {
            $query->where(function ($q) use ($request) {
                $q->whereHas('company', fn ($c) => $c->where('name', 'like', '%' . $request->company . '%'))
                  ->orWhere('custom_company', 'like', '%' . $request->company . '%');
            });
        }

        if ($request->has('start_date')) {
            $query->where('date', '>=', $request->start_date);
        }

        if ($request->has('end_date')) {
            $query->where('date', '<=', $request->end_date);
        }

        $charges = $query->orderBy('date', 'desc')->get();

        return response()->json($charges->map(fn ($charge) => [
            'id' => $charge->id,
            'date' => $charge->date->format('Y-m-d'),
            'company' => $charge->company_name,
            'kwh' => (float) $charge->kwh,
            'amount' => (float) $charge->amount,
            'unit_price' => $charge->unit_price,
            'charge_type' => $charge->charge_type,
            'charge_percentage' => $charge->charge_percentage,
        ]));
    }

    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'company' => 'required|string|max:255',
            'kwh' => 'required|numeric|min:0',
            'amount' => 'required|numeric|min:0',
            'charge_type' => 'nullable|in:AC,DC',
            'charge_percentage' => 'nullable|integer|min:0|max:100',
        ]);

        $customer = request()->user();
        $activeVehicle = $customer->vehicles()->active()->first();

        if (!$activeVehicle) {
            return response()->json(['error' => 'No active vehicle found'], 400);
        }

        // Firma eşleniyor mu kontrol et
        $company = Company::where('name', $request->company)->first();

        $charge = Charge::create([
            'customer_id' => $customer->id,
            'vehicle_id' => $activeVehicle->id,
            'company_id' => $company?->id,
            'custom_company' => $company ? null : $request->company,
            'date' => $request->date,
            'kwh' => $request->kwh,
            'amount' => $request->amount,
            'charge_type' => $request->charge_type ?? 'AC',
            'charge_percentage' => $request->charge_percentage,
        ]);

        return response()->json($charge->load('company'), 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'date' => 'required|date',
            'company' => 'required|string|max:255',
            'kwh' => 'required|numeric|min:0',
            'amount' => 'required|numeric|min:0',
            'charge_type' => 'nullable|in:AC,DC',
            'charge_percentage' => 'nullable|integer|min:0|max:100',
        ]);

        $charge = request()->user()->charges()->findOrFail($id);

        // Firma eşleniyor mu kontrol et
        $company = Company::where('name', $request->company)->first();

        $charge->update([
            'company_id' => $company?->id,
            'custom_company' => $company ? null : $request->company,
            'date' => $request->date,
            'kwh' => $request->kwh,
            'amount' => $request->amount,
            'charge_type' => $request->charge_type ?? $charge->charge_type ?? 'AC',
            'charge_percentage' => $request->charge_percentage,
        ]);

        return response()->json($charge->load('company'));
    }

    public function destroy($id)
    {
        $charge = request()->user()->charges()->findOrFail($id);
        $charge->delete();

        return response()->json(['message' => 'Charge deleted']);
    }

    /**
     * Şarj fişi görselini AI ile parse eder
     */
    public function parseReceipt(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:5120', // Max 5MB
        ]);

        $ocrService = new OcrService();
        $result = $ocrService->parseChargeReceipt($request->file('image'));

        return response()->json($result);
    }
}
