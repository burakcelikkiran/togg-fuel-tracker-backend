<?php

namespace App\Http\Controllers;

use App\Models\Charge;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    public function index()
    {
        $activeVehicle = request()->user()->vehicles()->active()->first();

        if (!$activeVehicle) {
            return response()->json([
                'monthly_trend' => [],
                'company_distribution' => [],
                'company_avg_price' => [],
            ]);
        }

        // Aylık harcama trendi
        $monthlyTrend = $activeVehicle->charges()
            ->selectRaw('DATE_FORMAT(date, "%Y-%m") as month, SUM(amount) as amount')
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(fn ($item) => [
                'month' => $item->month,
                'amount' => (float) $item->amount,
            ]);

        // Firma bazlı harcama dağılımı
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

        // Firma bazlı ortalama birim fiyat
        $companyAvgPrice = $activeVehicle->charges()
            ->selectRaw('
                COALESCE(companies.name, charges.custom_company) as company,
                SUM(charges.amount) / SUM(charges.kwh) as avg_price
            ')
            ->leftJoin('companies', 'charges.company_id', '=', 'companies.id')
            ->where('charges.kwh', '>', 0)
            ->groupByRaw('COALESCE(companies.name, charges.custom_company)')
            ->get()
            ->map(fn ($item) => [
                'company' => $item->company,
                'avg_price' => round((float) $item->avg_price, 2),
            ]);

        return response()->json([
            'monthly_trend' => $monthlyTrend,
            'company_distribution' => $companyDistribution,
            'company_avg_price' => $companyAvgPrice,
        ]);
    }
}
