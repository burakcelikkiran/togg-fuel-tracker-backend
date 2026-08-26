<?php

namespace App\Services;

use App\Models\Charge;
use App\Models\Company;
use App\Models\Customer;
use Illuminate\Http\Request;

class ChargeService
{
    public function listForCustomer(Customer $customer, Request $request): array
    {
        $activeVehicle = $customer->vehicles()->active()->first();

        if (!$activeVehicle) {
            return [];
        }

        $query = $activeVehicle->charges()->with('company');

        if ($request->has('company') && $request->company !== 'all') {
            $query->where(function ($q) use ($request) {
                $q->whereHas('company', fn ($c) => $c->where('name', 'like', '%'.$request->company.'%'))
                    ->orWhere('custom_company', 'like', '%'.$request->company.'%');
            });
        }

        if ($request->has('start_date')) {
            $query->where('date', '>=', $request->start_date);
        }

        if ($request->has('end_date')) {
            $query->where('date', '<=', $request->end_date);
        }

        return $query->orderBy('date', 'desc')->get()->map(fn ($charge) => [
            'id' => $charge->id,
            'date' => $charge->date->format('Y-m-d'),
            'company' => $charge->company_name,
            'kwh' => (float) $charge->kwh,
            'amount' => (float) $charge->amount,
            'unit_price' => $charge->unit_price,
            'charge_type' => $charge->charge_type,
            'charge_percentage' => $charge->charge_percentage,
        ])->all();
    }

    public function createForCustomer(Customer $customer, array $data): Charge
    {
        $activeVehicle = $customer->vehicles()->active()->first();

        if (!$activeVehicle) {
            abort(400, 'Aktif araç bulunamadı.');
        }

        $company = Company::where('name', $data['company'])->first();

        return Charge::create([
            'customer_id' => $customer->id,
            'vehicle_id' => $activeVehicle->id,
            'company_id' => $company?->id,
            'custom_company' => $company ? null : $data['company'],
            'date' => $data['date'],
            'kwh' => $data['kwh'],
            'amount' => $data['amount'],
            'charge_type' => $data['charge_type'] ?? 'AC',
            'charge_percentage' => $data['charge_percentage'] ?? null,
        ]);
    }

    public function updateForCustomer(Customer $customer, int $id, array $data): Charge
    {
        $charge = $customer->charges()->findOrFail($id);
        $company = Company::where('name', $data['company'])->first();

        $charge->update([
            'company_id' => $company?->id,
            'custom_company' => $company ? null : $data['company'],
            'date' => $data['date'],
            'kwh' => $data['kwh'],
            'amount' => $data['amount'],
            'charge_type' => $data['charge_type'] ?? $charge->charge_type ?? 'AC',
            'charge_percentage' => $data['charge_percentage'] ?? null,
        ]);

        return $charge;
    }
}
