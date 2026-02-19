<?php

namespace App\Console\Commands;

use App\Models\Customer;
use Illuminate\Console\Command;

class GenerateApiTokens extends Command
{
    protected $signature = 'api:generate-tokens';

    protected $description = 'Generate API tokens for customers without tokens';

    public function handle()
    {
        $customers = Customer::whereNull('api_token')->get();

        foreach ($customers as $customer) {
            $token = $customer->createApiToken();
            $this->line("{$customer->email} | {$token}");
        }

        $this->info("Generated {$customers->count()} tokens.");
        return Command::SUCCESS;
    }
}
