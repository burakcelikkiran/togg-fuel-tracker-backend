<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Services\ChargeService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ChargeController extends Controller
{
    public function __construct(private ChargeService $chargeService) {}

    public function index(Request $request): Response
    {
        $customer = Auth::guard('customer')->user();
        $vehicles = $customer->vehicles()->orderBy('is_active', 'desc')->get();
        $activeVehicle = $vehicles->firstWhere('is_active', true);

        return Inertia::render('Charges/Index', [
            'charges' => $this->chargeService->listForCustomer($customer, $request),
            'companies' => Company::orderBy('name')->pluck('name'),
            'filters' => $request->only(['company', 'start_date', 'end_date']),
            'vehicles' => $vehicles,
            'activeVehicle' => $activeVehicle,
        ]);
    }

    public function create(): Response
    {
        $customer = Auth::guard('customer')->user();
        $vehicles = $customer->vehicles()->orderBy('is_active', 'desc')->get();
        $activeVehicle = $vehicles->firstWhere('is_active', true);

        return Inertia::render('Charges/Create', [
            'companies' => Company::orderBy('name')->pluck('name'),
            'vehicles' => $vehicles,
            'activeVehicle' => $activeVehicle,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'company' => 'required|string|max:255',
            'kwh' => 'required|numeric|min:0',
            'amount' => 'required|numeric|min:0',
            'charge_type' => 'nullable|in:AC,DC',
            'charge_percentage' => 'nullable|integer|min:0|max:100',
        ]);

        $customer = Auth::guard('customer')->user();
        $this->chargeService->createForCustomer($customer, $validated);

        return redirect()->route('charges.index')->with('success', 'Şarj kaydı eklendi.');
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'company' => 'required|string|max:255',
            'kwh' => 'required|numeric|min:0',
            'amount' => 'required|numeric|min:0',
            'charge_type' => 'nullable|in:AC,DC',
            'charge_percentage' => 'nullable|integer|min:0|max:100',
        ]);

        $customer = Auth::guard('customer')->user();
        $this->chargeService->updateForCustomer($customer, $id, $validated);

        return back()->with('success', 'Kayıt başarıyla güncellendi.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $customer = Auth::guard('customer')->user();
        $charge = $customer->charges()->findOrFail($id);
        $charge->delete();

        return back()->with('success', 'Kayıt başarıyla silindi.');
    }
}
