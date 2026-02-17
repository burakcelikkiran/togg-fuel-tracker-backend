<?php

namespace App\Filament\Resources\Vehicles\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class VehicleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('customer_id')
                    ->relationship('customer', 'name')
                    ->required(),
                TextInput::make('name')
                    ->required(),
                TextInput::make('brand'),
                TextInput::make('model'),
                TextInput::make('plate'),
                TextInput::make('battery_capacity')
                    ->numeric(),
                TextInput::make('year')
                    ->numeric(),
                TextInput::make('kilometer')
                    ->numeric(),
                Toggle::make('is_active')
                    ->required(),
            ]);
    }
}
