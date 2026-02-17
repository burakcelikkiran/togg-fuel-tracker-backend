<?php

namespace App\Filament\Resources\Customers\Schemas;

use Filament\Forms\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\DateTimePicker;
use Filament\Schemas\Schema;

class CustomerForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Bilgiler')
                    ->schema([
                        TextInput::make('name')
                            ->label('Ad Soyad')
                            ->required()
                            ->maxLength(255),
                        TextInput::make('email')
                            ->label('E-posta')
                            ->email()
                            ->required()
                            ->unique(ignoreRecord: true)
                            ->maxLength(255),
                        TextInput::make('password')
                            ->label('Sifre')
                            ->password()
                            ->dehydrated(fn ($state) => filled($state))
                            ->required(fn (string $context): bool => $context === 'create')
                            ->minLength(8)
                            ->revealable(),
                        DateTimePicker::make('email_verified_at')
                            ->label('E-posta Dogrulama Tarihi')
                            ->native(false),
                    ])
                    ->columns(2),
            ]);
    }
}
