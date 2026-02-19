<?php

namespace App\Http\Controllers;

use App\Models\Vehicle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VehicleController extends Controller
{
    public function index()
    {
        $vehicles = request()->user()->vehicles()->orderBy('is_active', 'desc')->get();
        return response()->json($vehicles);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'nullable|string|max:100',
            'model' => 'nullable|string|max:100',
            'plate' => 'nullable|string|max:20',
            'battery_capacity' => 'nullable|numeric|min:0',
            'year' => 'nullable|integer|min:1900|max:2100',
            'kilometer' => 'nullable|integer|min:0',
        ]);

        $customer = request()->user();

        // İlk araç otomatik aktif olsun
        $userVehicleCount = $customer->vehicles()->count();
        $isActive = $userVehicleCount === 0;

        $vehicle = $customer->vehicles()->create([
            'name' => $request->name,
            'brand' => $request->brand,
            'model' => $request->model,
            'plate' => $request->plate,
            'battery_capacity' => $request->battery_capacity,
            'year' => $request->year,
            'kilometer' => $request->kilometer,
            'is_active' => $isActive,
        ]);

        return response()->json($vehicle, 201);
    }

    public function update(Request $request, $id)
    {
        $vehicle = request()->user()->vehicles()->findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'brand' => 'nullable|string|max:100',
            'model' => 'nullable|string|max:100',
            'plate' => 'nullable|string|max:20',
            'battery_capacity' => 'nullable|numeric|min:0',
            'year' => 'nullable|integer|min:1900|max:2100',
            'kilometer' => 'nullable|integer|min:0',
        ]);

        $vehicle->update($request->only(['name', 'brand', 'model', 'plate', 'battery_capacity', 'year', 'kilometer']));

        return response()->json($vehicle);
    }

    public function destroy($id)
    {
        $vehicle = request()->user()->vehicles()->findOrFail($id);
        $vehicle->delete();

        return response()->json(['message' => 'Vehicle deleted']);
    }

    public function setCurrent(Request $request, $id)
    {
        $customer = request()->user();
        $vehicle = $customer->vehicles()->findOrFail($id);

        // Tüm araçları pasif yap
        $customer->vehicles()->update(['is_active' => false]);

        // Seçilen aracı aktif yap
        $vehicle->is_active = true;
        $vehicle->save();

        return response()->json($vehicle);
    }
}
