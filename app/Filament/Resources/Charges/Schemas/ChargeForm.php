<?php

namespace App\Filament\Resources\Charges\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ChargeForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('customer_id')
                    ->relationship('customer', 'name')
                    ->required(),
                Select::make('vehicle_id')
                    ->relationship('vehicle', 'name')
                    ->required(),
                Select::make('company_id')
                    ->relationship('company', 'name'),
                TextInput::make('custom_company'),
                DatePicker::make('date')
                    ->required(),
                TextInput::make('kwh')
                    ->required()
                    ->numeric(),
                TextInput::make('amount')
                    ->required()
                    ->numeric(),
                Select::make('charge_type')
                    ->options(['AC' => 'A c', 'DC' => 'D c'])
                    ->default('AC')
                    ->required(),
                TextInput::make('charge_percentage')
                    ->numeric(),
            ]);
    }
}
