<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class VehicleController extends Controller
{
    public function index(): Response
    {
        $customer = Auth::guard('customer')->user();
        $vehicles = $customer->vehicles()->orderBy('is_active', 'desc')->get();
        $activeVehicle = $vehicles->firstWhere('is_active', true);

        return Inertia::render('Vehicles/Index', [
            'vehicles' => $vehicles,
            'activeVehicle' => $activeVehicle,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'nullable|string|max:100',
            'model' => 'nullable|string|max:100',
            'plate' => 'nullable|string|max:20',
            'battery_capacity' => 'nullable|numeric|min:0',
            'year' => 'nullable|integer|min:1900|max:2100',
            'kilometer' => 'nullable|integer|min:0',
        ]);

        $customer = Auth::guard('customer')->user();
        $isActive = $customer->vehicles()->count() === 0;

        $customer->vehicles()->create([
            ...$validated,
            'is_active' => $isActive,
        ]);

        return back()->with('success', 'Araç eklendi.');
    }

    public function update(Request $request, int $id): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'nullable|string|max:100',
            'model' => 'nullable|string|max:100',
            'plate' => 'nullable|string|max:20',
            'battery_capacity' => 'nullable|numeric|min:0',
            'year' => 'nullable|integer|min:1900|max:2100',
            'kilometer' => 'nullable|integer|min:0',
        ]);

        $customer = Auth::guard('customer')->user();
        $vehicle = $customer->vehicles()->findOrFail($id);
        $vehicle->update($validated);

        return back()->with('success', 'Araç güncellendi.');
    }

    public function destroy(int $id): RedirectResponse
    {
        $customer = Auth::guard('customer')->user();
        $vehicle = $customer->vehicles()->findOrFail($id);
        $vehicle->delete();

        return back()->with('success', 'Araç silindi.');
    }

    public function setCurrent(int $id): RedirectResponse
    {
        $customer = Auth::guard('customer')->user();
        $vehicle = $customer->vehicles()->findOrFail($id);

        $customer->vehicles()->update(['is_active' => false]);
        $vehicle->update(['is_active' => true]);

        return back();
    }
}
