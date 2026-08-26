<?php

namespace App\Services;

use App\Models\Customer;

class ReportService
{
    public function getData(Customer $customer): array
    {
        $activeVehicle = $customer->vehicles()->active()->first();

        if (!$activeVehicle) {
            return [
                'monthly_trend' => [],
                'company_distribution' => [],
                'company_avg_price' => [],
            ];
        }

        $monthlyTrend = $activeVehicle->charges()
            ->selectRaw('DATE_FORMAT(date, "%Y-%m") as month, SUM(amount) as amount')
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(fn ($item) => [
                'month' => $item->month,
                'amount' => (float) $item->amount,
            ]);

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

        return [
            'monthly_trend' => $monthlyTrend,
            'company_distribution' => $companyDistribution,
            'company_avg_price' => $companyAvgPrice,
        ];
    }
}
