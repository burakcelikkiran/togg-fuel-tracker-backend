<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $companies = [
            ['name' => 'ZES Şarj', 'slug' => 'zes-sarj'],
            ['name' => 'Trugo Şarj', 'slug' => 'trugo-sarj'],
            ['name' => 'Eşarj', 'slug' => 'esarj'],
            ['name' => 'Wat Mobilite Şarj', 'slug' => 'wat-mobilite-sarj'],
            ['name' => 'Voltrun Şarj', 'slug' => 'voltrun-sarj'],
            ['name' => 'En Yakıt Şarj', 'slug' => 'en-yakit-sarj'],
            ['name' => 'Otopriz Şarj', 'slug' => 'otopriz-sarj'],
            ['name' => 'Astor Şarj', 'slug' => 'astor-sarj'],
            ['name' => 'Otojet Şarj', 'slug' => 'otojet-sarj'],
            ['name' => 'Sharz.net', 'slug' => 'sharz-net'],
            ['name' => 'Oncharge Şarj', 'slug' => 'oncharge-sarj'],
            ['name' => 'D-Charge Şarj', 'slug' => 'd-charge-sarj'],
            ['name' => '5 Şarj', 'slug' => '5-sarj'],
            ['name' => 'Ovolt Şarj', 'slug' => 'ovolt-sarj'],
            ['name' => 'Beefull Şarj', 'slug' => 'beefull-sarj'],
            ['name' => 'Tunçmatik Charge', 'slug' => 'tuncmatik-charge'],
            ['name' => 'K-Şarj', 'slug' => 'k-sarj'],
            ['name' => 'CV Charging', 'slug' => 'cv-charging'],
            ['name' => 'Shell Recharge', 'slug' => 'shell-recharge'],
            ['name' => 'OtoWATT Şarj', 'slug' => 'otowatt-sarj'],
            ['name' => 'Power Şarj', 'slug' => 'power-sarj'],
            ['name' => 'AOS Technology', 'slug' => 'aos-technology'],
            ['name' => 'Aksa Şarj', 'slug' => 'aksa-sarj'],
            ['name' => 'Miggo Şarj', 'slug' => 'miggo-sarj'],
            ['name' => 'Toger Şarj', 'slug' => 'toger-sarj'],
            ['name' => 'Green Science Şarj', 'slug' => 'green-science-sarj'],
            ['name' => 'Neva Şarj', 'slug' => 'neva-sarj'],
            ['name' => 'RHG Enertürk', 'slug' => 'rhg-enerturk'],
            ['name' => 'Geldol Şarj', 'slug' => 'geldol-sarj'],
            ['name' => 'Varr Şarj', 'slug' => 'varr-sarj'],
            ['name' => 'Şarjon', 'slug' => 'sarjon'],
            ['name' => 'Adze Şarj', 'slug' => 'adze-sarj'],
            ['name' => 'Pirim Şarj', 'slug' => 'pirim-sarj'],
            ['name' => 'Biogreen Şarj', 'slug' => 'biogreen-sarj'],
            ['name' => 'Şarj Stop', 'slug' => 'sarj-stop'],
            ['name' => 'i-Şarj', 'slug' => 'i-sarj'],
            ['name' => 'e-Power EV Şarj', 'slug' => 'e-power-ev-sarj'],
            ['name' => 'Solar Şarj', 'slug' => 'solar-sarj'],
            ['name' => 'Onlife Charge', 'slug' => 'onlife-charge'],
            ['name' => 'Lumicle Şarj', 'slug' => 'lumicle-sarj'],

        ];

        foreach ($companies as $company) {
            Company::firstOrCreate(
                ['slug' => $company['slug']],
                ['name' => $company['name']]
            );
        }
    }
}
