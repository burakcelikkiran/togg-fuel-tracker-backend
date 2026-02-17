<?php

namespace App\Filament\Widgets;

use App\Models\Charge;
use App\Models\Company;
use App\Models\Customer;
use App\Models\Vehicle;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverviewWidget extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Toplam Musteri', Customer::count())
                ->description('Toplam kayitli musteri')
                ->descriptionIcon('heroicon-m-users')
                ->color('primary')
                ->chart([7, 12, 10, 14, 15, 18, Customer::count()]),

            Stat::make('Toplam Araç', Vehicle::count())
                ->description('Toplam kayitli araç')
                ->descriptionIcon('heroicon-m-truck')
                ->color('success')
                ->chart([2, 4, 3, 5, 6, 8, Vehicle::count()]),

            Stat::make('Toplam Sarj', Charge::count())
                ->description('Toplam sarj kaydi')
                ->descriptionIcon('heroicon-m-bolt')
                ->color('warning')
                ->chart([10, 15, 12, 20, 18, 25, Charge::count()]),

            Stat::make('Toplam Tutar', number_format(Charge::sum('amount'), 2) . ' TL')
                ->description('Toplam harcama')
                ->descriptionIcon('heroicon-m-currency-dollar')
                ->color('danger'),
        ];
    }
}
