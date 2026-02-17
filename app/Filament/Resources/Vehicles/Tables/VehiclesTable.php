<?php

namespace App\Filament\Resources\Vehicles\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class VehiclesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('customer.name')
                    ->label('Musteri')
                    ->searchable(),
                TextColumn::make('name')
                    ->label('Arac Adi')
                    ->searchable(),
                TextColumn::make('brand')
                    ->label('Marka')
                    ->searchable(),
                TextColumn::make('model')
                    ->label('Model')
                    ->searchable(),
                TextColumn::make('plate')
                    ->label('Plaka')
                    ->searchable(),
                TextColumn::make('battery_capacity')
                    ->label('Batarya (kWh)')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('year')
                    ->label('Model Yili')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('kilometer')
                    ->label('Kilometre')
                    ->numeric()
                    ->sortable(),
                IconColumn::make('is_active')
                    ->label('Aktif')
                    ->boolean(),
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
