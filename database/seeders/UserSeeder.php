<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => 'password',
            ],
            [
                'name' => 'Burak Çelikkıran',
                'email' => 'burak@example.com',
                'password' => 'password',
            ],
            [
                'name' => 'Test User',
                'email' => 'test@example.com',
                'password' => 'password',
            ],
        ];

        foreach ($users as $user) {
            User::firstOrCreate(
                ['email' => $user['email']],
                [
                    'name' => $user['name'],
                    'password' => Hash::make($user['password']),
                ]
            );
        }
    }
}
