<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Services\ReportService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ReportController extends Controller
{
    public function __construct(private ReportService $reportService) {}

    public function index(): Response
    {
        $customer = Auth::guard('customer')->user();
        $vehicles = $customer->vehicles()->orderBy('is_active', 'desc')->get();
        $activeVehicle = $vehicles->firstWhere('is_active', true);

        return Inertia::render('Reports', [
            'report' => $this->reportService->getData($customer),
            'vehicles' => $vehicles,
            'activeVehicle' => $activeVehicle,
        ]);
    }
}
