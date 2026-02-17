<?php

namespace App\Filament\Widgets;

use App\Models\Charge;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class RecentChargesWidget extends BaseWidget
{
    protected static ?string $heading = 'Son Sarj Islemleri';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Charge::with(['customer', 'vehicle', 'company'])
                    ->latest()
                    ->limit(10)
            )
            ->columns([
                Tables\Columns\TextColumn::make('date')
                    ->label('Tarih')
                    ->date('d.m.Y')
                    ->sortable(),

                Tables\Columns\TextColumn::make('customer.name')
                    ->label('Musteri')
                    ->badge()
                    ->color('primary'),

                Tables\Columns\TextColumn::make('vehicle.name')
                    ->label('Arac'),

                Tables\Columns\TextColumn::make('kwh')
                    ->label('kWh')
                    ->formatStateUsing(fn ($state): string => number_format($state, 2) . ' kWh'),

                Tables\Columns\TextColumn::make('amount')
                    ->label('Tutar')
                    ->formatStateUsing(fn ($state): string => number_format($state, 2) . ' TL')
                    ->badge()
                    ->color('success'),
            ])
            ->defaultPaginationPageOption(5)
            ->paginated([5, 10, 25]);
    }
}
