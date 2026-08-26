<?php

namespace App\Http\Controllers;

use App\Models\Drive;
use Illuminate\Http\Request;

class DriveController extends Controller
{
    public function index(Request $request)
    {
        $drives = $request->user()->drives()
            ->with('vehicle')
            ->when($request->vehicle_id, fn($q) => $q->where('vehicle_id', $request->vehicle_id))
            ->when($request->start_date, fn($q) => $q->where('driven_at', '>=', $request->start_date))
            ->when($request->end_date, fn($q) => $q->where('driven_at', '<=', $request->end_date))
            ->orderBy('driven_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $drives
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'driven_at' => 'required|date',
            'duration_minutes' => 'required|integer|min:1',
            'distance_km' => 'required|numeric|min:0.1',
            'consumption_kwh_per_km' => 'nullable|numeric|min:0',
        ]);

        $drive = $request->user()->drives()->create($validated);
        $drive->load('vehicle');

        return response()->json([
            'success' => true,
            'data' => $drive
        ], 201);
    }

    public function show(Request $request, int $id)
    {
        $drive = $request->user()->drives()
            ->with('vehicle')
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $drive
        ]);
    }

    public function update(Request $request, int $id)
    {
        $drive = $request->user()->drives()->findOrFail($id);

        $validated = $request->validate([
            'vehicle_id' => 'sometimes|exists:vehicles,id',
            'driven_at' => 'sometimes|date',
            'duration_minutes' => 'sometimes|integer|min:1',
            'distance_km' => 'sometimes|numeric|min:0.1',
            'consumption_kwh_per_km' => 'nullable|numeric|min:0',
        ]);

        $drive->update($validated);
        $drive->load('vehicle');

        return response()->json([
            'success' => true,
            'data' => $drive
        ]);
    }

    public function destroy(Request $request, int $id)
    {
        $drive = $request->user()->drives()->findOrFail($id);
        $drive->delete();

        return response()->json([
            'success' => true,
            'message' => 'Sürüş kaydı silindi'
        ]);
    }
}
