<?php

namespace App\Http\Controllers;

use App\Models\Charge;
use App\Models\Vehicle;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $customer = request()->user();

        // Aktif araç
        $activeVehicle = $customer->vehicles()->active()->first();

        if (!$activeVehicle) {
            return response()->json([
                'total_amount' => 0,
                'total_kwh' => 0,
                'avg_unit_price' => 0,
                'total_charges' => 0,
                'monthly_trend' => [],
                'company_distribution' => [],
                'recent_charges' => [],
            ]);
        }

        // Toplam istatistikler
        $totalAmount = (float) $activeVehicle->charges()->sum('amount');
        $totalKwh = (float) $activeVehicle->charges()->sum('kwh');
        $totalCharges = $activeVehicle->charges()->count();
        $avgUnitPrice = $totalKwh > 0 ? round($totalAmount / $totalKwh, 2) : 0;

        // Aylık trend (son 12 ay)
        $monthlyTrend = $activeVehicle->charges()
            ->selectRaw('DATE_FORMAT(date, "%Y-%m") as month, SUM(amount) as amount')
            ->groupBy('month')
            ->orderBy('month')
            ->limit(12)
            ->get()
            ->map(fn ($item) => [
                'month' => $item->month,
                'amount' => (float) $item->amount,
            ]);

        // Firma dağılımı
        $companyDistribution = $activeVehicle->charges()
            ->selectRaw('
                COALESCE(companies.name, charges.custom_company) as company,
                SUM(charges.amount) as amount
            ')
            ->leftJoin('companies', 'charges.company_id', '=', 'companies.id')
            ->groupByRaw('COALESCE(companies.name, charges.custom_company)')
            ->get()
            ->map(fn ($item) => [
                'company' => $item->company,
                'amount' => (float) $item->amount,
            ]);

        // Son şarj kayıtları (5 adet)
        $recentCharges = $activeVehicle->charges()
            ->with('company')
            ->orderBy('date', 'desc')
            ->limit(5)
            ->get()
            ->map(fn ($charge) => [
                'id' => $charge->id,
                'date' => $charge->date->format('Y-m-d'),
                'company' => $charge->company_name,
                'kwh' => (float) $charge->kwh,
                'amount' => (float) $charge->amount,
            ]);

        return response()->json([
            'total_amount' => $totalAmount,
            'total_kwh' => $totalKwh,
            'avg_unit_price' => $avgUnitPrice,
            'total_charges' => $totalCharges,
            'monthly_trend' => $monthlyTrend,
            'company_distribution' => $companyDistribution,
            'recent_charges' => $recentCharges,
        ]);
    }
}
