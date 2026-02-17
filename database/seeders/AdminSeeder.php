<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create or update super admin
        User::updateOrCreate(
            ['email' => 'admin@evsarjtakip.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('admin123'), // Change this after first login!
                'role' => 'super_admin',
                'is_admin' => true,
                'email_verified_at' => now(),
            ]
        );

        $this->command->info('Admin user created successfully.');
        $this->command->info('Email: admin@evsarjtakip.com');
        $this->command->info('Password: admin123');
        $this->command->warn('Please change the password after first login!');
    }
}
