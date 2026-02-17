<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Vehicle;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VehicleSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $burakCustomer = Customer::where('email', 'burak@example.com')->first();
        $testCustomer = Customer::where('email', 'test@example.com')->first();

        if (!$burakCustomer || !$testCustomer) {
            $this->command->warn('Müşteriler bulunamadı. Önce CustomerSeeder\'ı çalıştırın.');
            return;
        }

        $vehicles = [
            // Burak müşterisi için araçlar
            [
                'customer_id' => $burakCustomer->id,
                'name' => 'Togg T10G',
                'brand' => 'Togg',
                'model' => 'T10G',
                'plate' => '35 TOG 001',
                'battery_capacity' => 88.0,
                'year' => 2024,
                'kilometer' => 15000,
                'is_active' => true,
            ],
            [
                'customer_id' => $burakCustomer->id,
                'name' => 'Tesla Model Y',
                'brand' => 'Tesla',
                'model' => 'Model Y',
                'plate' => '34 TSL 999',
                'battery_capacity' => 81.0,
                'year' => 2023,
                'kilometer' => 25000,
                'is_active' => false,
            ],

            // Test müşterisi için araçlar
            [
                'customer_id' => $testCustomer->id,
                'name' => 'T10G',
                'brand' => 'Togg',
                'model' => 'T10G',
                'plate' => '34 ABC 123',
                'battery_capacity' => 88.0,
                'year' => 2023,
                'kilometer' => 10000,
                'is_active' => true,
            ],
            [
                'customer_id' => $testCustomer->id,
                'name' => 'Model 3',
                'brand' => 'Tesla',
                'model' => 'Model 3',
                'plate' => '06 XYZ 789',
                'battery_capacity' => 75.0,
                'year' => 2022,
                'kilometer' => 40000,
                'is_active' => false,
            ],
        ];

        foreach ($vehicles as $vehicle) {
            Vehicle::firstOrCreate(
                [
                    'customer_id' => $vehicle['customer_id'],
                    'plate' => $vehicle['plate'],
                ],
                [
                    'name' => $vehicle['name'],
                    'brand' => $vehicle['brand'],
                    'model' => $vehicle['model'],
                    'battery_capacity' => $vehicle['battery_capacity'],
                    'year' => $vehicle['year'],
                    'kilometer' => $vehicle['kilometer'],
                    'is_active' => $vehicle['is_active'],
                ]
            );
        }

        $this->command->info('Vehicles created successfully.');
    }
}
