<?php

namespace Database\Seeders;

use App\Models\Charge;
use App\Models\Company;
use App\Models\Customer;
use App\Models\Vehicle;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ChargeSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $burakCustomer = Customer::where('email', 'burak@example.com')->first();
        $testCustomer = Customer::where('email', 'test@example.com')->first();

        $burakVehicle = Vehicle::where('plate', '35 TOG 001')->first();
        $testVehicle = Vehicle::where('plate', '34 ABC 123')->first();

        if (!$burakCustomer || !$testCustomer || !$burakVehicle || !$testVehicle) {
            $this->command->warn('Müşteriler veya araçlar bulunamadı. Önce CustomerSeeder ve VehicleSeeder\'ı çalıştırın.');
            return;
        }

        $companies = Company::all()->keyBy('slug');
        $now = Carbon::now();

        $charges = [
            // Test müşterisi için şarj kayıtları
            [
                'customer_id' => $testCustomer->id,
                'vehicle_id' => $testVehicle->id,
                'company_id' => $companies['zes']->id ?? null,
                'custom_company' => null,
                'date' => $now->copy()->subDays(10)->toDateString(),
                'kwh' => 45.5,
                'amount' => 350.00,
                'charge_type' => 'DC',
                'charge_percentage' => 55,
            ],
            [
                'customer_id' => $testCustomer->id,
                'vehicle_id' => $testVehicle->id,
                'company_id' => $companies['esarj']->id ?? null,
                'custom_company' => null,
                'date' => $now->copy()->subDays(7)->toDateString(),
                'kwh' => 52.0,
                'amount' => 380.00,
                'charge_type' => 'DC',
                'charge_percentage' => 62,
            ],
            [
                'customer_id' => $testCustomer->id,
                'vehicle_id' => $testVehicle->id,
                'company_id' => $companies['trugo']->id ?? null,
                'custom_company' => null,
                'date' => $now->copy()->subDays(3)->toDateString(),
                'kwh' => 38.2,
                'amount' => 275.50,
                'charge_type' => 'AC',
                'charge_percentage' => 45,
            ],
            [
                'customer_id' => $testCustomer->id,
                'vehicle_id' => $testVehicle->id,
                'company_id' => null,
                'custom_company' => 'Ev Şarjı',
                'date' => $now->copy()->subDay()->toDateString(),
                'kwh' => 65.0,
                'amount' => 425.00,
                'charge_type' => 'AC',
                'charge_percentage' => 80,
            ],

            // Burak müşterisi için şarj kayıtları
            [
                'customer_id' => $burakCustomer->id,
                'vehicle_id' => $burakVehicle->id,
                'company_id' => $companies['tesla-supercharger']->id ?? null,
                'custom_company' => null,
                'date' => $now->copy()->subDays(15)->toDateString(),
                'kwh' => 55.0,
                'amount' => 450.00,
                'charge_type' => 'DC',
                'charge_percentage' => 65,
            ],
            [
                'customer_id' => $burakCustomer->id,
                'vehicle_id' => $burakVehicle->id,
                'company_id' => $companies['astay']->id ?? null,
                'custom_company' => null,
                'date' => $now->copy()->subDays(12)->toDateString(),
                'kwh' => 42.8,
                'amount' => 320.00,
                'charge_type' => 'AC',
                'charge_percentage' => 50,
            ],
            [
                'customer_id' => $burakCustomer->id,
                'vehicle_id' => $burakVehicle->id,
                'company_id' => $companies['sarjagi']->id ?? null,
                'custom_company' => null,
                'date' => $now->copy()->subDays(8)->toDateString(),
                'kwh' => 48.5,
                'amount' => 365.00,
                'charge_type' => 'DC',
                'charge_percentage' => 58,
            ],
            [
                'customer_id' => $burakCustomer->id,
                'vehicle_id' => $burakVehicle->id,
                'company_id' => $companies['zes']->id ?? null,
                'custom_company' => null,
                'date' => $now->copy()->subDays(5)->toDateString(),
                'kwh' => 60.0,
                'amount' => 480.00,
                'charge_type' => 'DC',
                'charge_percentage' => 70,
            ],
            [
                'customer_id' => $burakCustomer->id,
                'vehicle_id' => $burakVehicle->id,
                'company_id' => $companies['trugo']->id ?? null,
                'custom_company' => null,
                'date' => $now->copy()->subDays(2)->toDateString(),
                'kwh' => 35.0,
                'amount' => 250.00,
                'charge_type' => 'AC',
                'charge_percentage' => 42,
            ],
            [
                'customer_id' => $burakCustomer->id,
                'vehicle_id' => $burakVehicle->id,
                'company_id' => null,
                'custom_company' => 'Ofis Şarj İstasyonu',
                'date' => $now->toDateString(),
                'kwh' => 50.0,
                'amount' => 350.00,
                'charge_type' => 'AC',
                'charge_percentage' => 60,
            ],
        ];

        foreach ($charges as $charge) {
            Charge::firstOrCreate(
                [
                    'customer_id' => $charge['customer_id'],
                    'vehicle_id' => $charge['vehicle_id'],
                    'date' => $charge['date'],
                ],
                [
                    'company_id' => $charge['company_id'],
                    'custom_company' => $charge['custom_company'],
                    'kwh' => $charge['kwh'],
                    'amount' => $charge['amount'],
                    'charge_type' => $charge['charge_type'],
                    'charge_percentage' => $charge['charge_percentage'],
                ]
            );
        }

        $this->command->info('Charges created successfully.');
    }
}
