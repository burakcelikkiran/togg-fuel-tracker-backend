<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Opcodes\LogViewer\Facades\LogViewer;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Configure Log Viewer authorization
        // In production, only authenticated admin users can access logs
        // In local environment, it's accessible without authentication
        LogViewer::auth(function ($request) {
            // Allow in local environment
            if ($this->app->environment('local')) {
                return true;
            }

            // In production, require authenticated admin user
            return $request->user()
                && ($request->user()->is_admin ?? false);
        });
    }
}
