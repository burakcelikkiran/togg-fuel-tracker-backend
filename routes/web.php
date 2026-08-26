<?php

use App\Http\Controllers\Web\AuthController;
use App\Http\Controllers\Web\ChargeController;
use App\Http\Controllers\Web\DashboardController;
use App\Http\Controllers\Web\LandingController;
use App\Http\Controllers\Web\ReportController;
use App\Http\Controllers\Web\VehicleController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LandingController::class, 'index'])->name('landing');

Route::middleware('guest:customer')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register']);
    Route::get('/verify', [AuthController::class, 'showVerify'])->name('verify.show');
    Route::post('/verify', [AuthController::class, 'verify'])->name('verify');
    Route::post('/resend-code', [AuthController::class, 'resendCode'])->name('resend-code');
});

Route::middleware('auth:customer')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/vehicles', [VehicleController::class, 'index'])->name('vehicles.index');
    Route::post('/vehicles', [VehicleController::class, 'store'])->name('vehicles.store');
    Route::put('/vehicles/{id}', [VehicleController::class, 'update'])->name('vehicles.update');
    Route::delete('/vehicles/{id}', [VehicleController::class, 'destroy'])->name('vehicles.destroy');
    Route::post('/vehicles/{id}/set-current', [VehicleController::class, 'setCurrent'])->name('vehicles.set-current');

    Route::get('/charges', [ChargeController::class, 'index'])->name('charges.index');
    Route::get('/charges/create', [ChargeController::class, 'create'])->name('charges.create');
    Route::post('/charges', [ChargeController::class, 'store'])->name('charges.store');
    Route::put('/charges/{id}', [ChargeController::class, 'update'])->name('charges.update');
    Route::delete('/charges/{id}', [ChargeController::class, 'destroy'])->name('charges.destroy');

    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');

    Route::redirect('/new-charge', '/charges/create');
    Route::redirect('/history', '/charges');
});
