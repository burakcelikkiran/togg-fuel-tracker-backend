<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CustomerSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $customers = [
            [
                'name' => 'Burak Çelikkıran',
                'email' => 'burak@example.com',
                'password' => 'password',
            ],
            [
                'name' => 'Test Customer',
                'email' => 'test@example.com',
                'password' => 'password',
            ],
            [
                'name' => 'Demo User',
                'email' => 'demo@example.com',
                'password' => 'password',
            ],
        ];

        foreach ($customers as $customer) {
            Customer::firstOrCreate(
                ['email' => $customer['email']],
                [
                    'name' => $customer['name'],
                    'password' => Hash::make($customer['password']),
                ]
            );
        }

        $this->command->info('Customers created successfully.');
    }
}
