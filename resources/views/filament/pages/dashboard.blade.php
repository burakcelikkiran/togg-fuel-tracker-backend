<x-filament-panels::page>
    <x-slot name="header">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="space-y-6">
        <x-filament::grid :default="2" :lg="4" :xl="4">
            <x-filament-widgets::stats-widget />
        </x-filament::grid>

        <x-filament::section>
            <x-slot name="heading">
                Son Sarj Islemleri
            </x-slot>
            <x-filament-widgets::recent-charges />
        </x-filament::section>
    </div>
</x-filament-panels::page>
