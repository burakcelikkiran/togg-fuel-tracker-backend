<?php

namespace App\Filament\Resources\Customers\Tables;

use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\BulkActionGroup;

class CustomersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                    ->label('ID')
                    ->sortable(),
                TextColumn::make('name')
                    ->label('Ad Soyad')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('email')
                    ->label('E-posta')
                    ->searchable()
                    ->sortable(),
                IconColumn::make('email_verified_at')
                    ->label('Dogrulandi')
                    ->boolean()
                    ->trueColor('success')
                    ->falseColor('gray')
                    ->trueIcon('heroicon-o-check-circle')
                    ->falseIcon('heroicon-o-x-circle')
                    ->sortable(),
                TextColumn::make('vehicles_count')
                    ->label('Araç Sayisi')
                    ->counts('vehicles')
                    ->sortable()
                    ->badge()
                    ->color('primary'),
                TextColumn::make('charges_count')
                    ->label('Sarj Sayisi')
                    ->counts('charges')
                    ->sortable()
                    ->badge()
                    ->color('success'),
                TextColumn::make('total_spent')
                    ->label('Toplam Harcama')
                    ->formatStateUsing(fn ($record): string => number_format($record->charges->sum('amount'), 2) . ' TL')
                    ->badge()
                    ->color('danger'),
                TextColumn::make('created_at')
                    ->label('Kayit Tarihi')
                    ->dateTime('d.m.Y H:i')
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
            ])
            ->defaultSort('created_at', 'desc');
    }
}
