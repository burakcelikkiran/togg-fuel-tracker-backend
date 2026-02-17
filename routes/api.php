<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChargeController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\VehicleController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/verify', [AuthController::class, 'verify']);
Route::post('/resend-code', [AuthController::class, 'resendCode']);

// Protected routes (Customer API)
Route::middleware('auth:customer')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Vehicles
    Route::get('/vehicles', [VehicleController::class, 'index']);
    Route::post('/vehicles', [VehicleController::class, 'store']);
    Route::put('/vehicles/{id}', [VehicleController::class, 'update']);
    Route::delete('/vehicles/{id}', [VehicleController::class, 'destroy']);
    Route::post('/vehicles/{id}/set-current', [VehicleController::class, 'setCurrent']);

    // Charges
    Route::get('/charges', [ChargeController::class, 'index']);
    Route::post('/charges', [ChargeController::class, 'store']);
    Route::put('/charges/{id}', [ChargeController::class, 'update']);
    Route::delete('/charges/{id}', [ChargeController::class, 'destroy']);
    Route::post('/parse-charge-receipt', [ChargeController::class, 'parseReceipt']);

    // Dashboard & Reports
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/reports', [ReportController::class, 'index']);

    // Companies
    Route::get('/companies', [CompanyController::class, 'index']);
});
