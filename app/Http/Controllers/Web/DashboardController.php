<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\DashboardService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(private DashboardService $dashboardService) {}

    public function index(): Response
    {
        $customer = Auth::guard('customer')->user();
        $vehicles = $customer->vehicles()->orderBy('is_active', 'desc')->get();
        $activeVehicle = $vehicles->firstWhere('is_active', true);

        return Inertia::render('Dashboard', [
            'dashboard' => $this->dashboardService->getData($customer),
            'vehicles' => $vehicles,
            'activeVehicle' => $activeVehicle,
        ]);
    }
}
