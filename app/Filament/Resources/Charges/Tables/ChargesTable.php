<?php

namespace App\Filament\Resources\Charges\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ChargesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('customer.name')
                    ->label('Musteri')
                    ->searchable(),
                TextColumn::make('vehicle.name')
                    ->label('Arac')
                    ->searchable(),
                TextColumn::make('company.name')
                    ->label('Sirket')
                    ->searchable(),
                TextColumn::make('custom_company')
                    ->label('Diger Sirket')
                    ->searchable(),
                TextColumn::make('date')
                    ->label('Tarih')
                    ->date()
                    ->sortable(),
                TextColumn::make('kwh')
                    ->label('kWh')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('amount')
                    ->label('Tutar (TL)')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('charge_type')
                    ->label('Sarj Turu')
                    ->badge(),
                TextColumn::make('charge_percentage')
                    ->label('Yüzde (%)')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('created_at')
                    ->label('Kayit Tarihi')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->label('Guncelleme')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
