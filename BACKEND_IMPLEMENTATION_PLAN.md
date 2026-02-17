# Backend Implementation Plan

## Overview
This plan outlines the backend changes required for new features in the Togg Fuel Tracker Laravel API.

---

## 1. Charges Table - Add Charge Type Column

### Migration Required:
**New File**: `database/migrations/YYYY_MM_DD_HHMMSS_add_charge_type_to_charges_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('charges', function (Blueprint $table) {
            $table->enum('charge_type', ['AC', 'DC'])->default('AC')->after('amount');
        });
    }

    public function down(): void
    {
        Schema::table('charges', function (Blueprint $table) {
            $table->dropColumn('charge_type');
        });
    }
};
```

### Model Update:
**File**: `app/Models/Charge.php`

```php
protected $fillable = [
    'user_id',
    'vehicle_id',
    'company_id',
    'custom_company',
    'date',
    'kwh',
    'amount',
    'charge_type', // Add this
];

protected function casts(): array
{
    return [
        'kwh' => 'decimal:2',
        'amount' => 'decimal:2',
        'date' => 'date',
        'charge_type' => 'string', // Add this
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
```

### Controller Update:
**File**: `app/Http/Controllers/ChargeController.php`

```php
// Update store method validation
public function store(Request $request)
{
    $request->validate([
        'date' => 'required|date',
        'company' => 'required|string|max:255',
        'kwh' => 'required|numeric|min:0',
        'amount' => 'required|numeric|min:0',
        'charge_type' => 'nullable|in:AC,DC', // Add this
    ]);

    // ... existing code ...

    $charge = Charge::create([
        'user_id' => Auth::id(),
        'vehicle_id' => $activeVehicle->id,
        'company_id' => $company?->id,
        'custom_company' => $company ? null : $request->company,
        'date' => $request->date,
        'kwh' => $request->kwh,
        'amount' => $request->amount,
        'charge_type' => $request->charge_type ?? 'AC', // Add this
    ]);

    return response()->json($charge->load('company'), 201);
}

// Update update method validation
public function update(Request $request, $id)
{
    $request->validate([
        'date' => 'required|date',
        'company' => 'required|string|max:255',
        'kwh' => 'required|numeric|min:0',
        'amount' => 'required|numeric|min:0',
        'charge_type' => 'nullable|in:AC,DC', // Add this
    ]);

    // ... existing code ...

    $charge->update([
        'company_id' => $company?->id,
        'custom_company' => $company ? null : $request->company,
        'date' => $request->date,
        'kwh' => $request->kwh,
        'amount' => $request->amount,
        'charge_type' => $request->charge_type ?? 'AC', // Add this
    ]);

    return response()->json($charge->load('company'));
}

// Update index method to include charge_type
public function index(Request $request)
{
    // ... existing code ...

    return response()->json($charges->map(fn ($charge) => [
        'id' => $charge->id,
        'date' => $charge->date->format('Y-m-d'),
        'company' => $charge->company_name,
        'kwh' => (float) $charge->kwh,
        'amount' => (float) $charge->amount,
        'unit_price' => $charge->unit_price,
        'charge_type' => $charge->charge_type, // Add this
    ]));
}
```

---

## 2. Companies Table - Add Active/Inactive Status

### Migration Required:
**New File**: `database/migrations/YYYY_MM_DD_HHMMSS_add_is_active_to_companies_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->boolean('is_active')->default(true)->after('slug');
        });
    }

    public function down(): void
    {
        Schema::table('companies', function (Blueprint $table) {
            $table->dropColumn('is_active');
        });
    }
};
```

### Model Update:
**File**: `app/Models/Company.php`

```php
protected $fillable = [
    'name',
    'slug',
    'is_active', // Add this
];

protected function casts(): array
{
    return [
        'is_active' => 'boolean', // Add this
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}

// Add scope for active companies
public function scopeActive($query)
{
    return $query->where('is_active', true);
}
```

### Controller Update:
**File**: `app/Http/Controllers/CompanyController.php`

```php
// Update index method to only return active companies
public function index()
{
    $companies = \App\Models\Company::active()
        ->orderBy('name')
        ->pluck('name');

    return response()->json($companies);
}
```

---

## 3. Vehicles Table - Add Kilometer Column

### Migration Required:
**New File**: `database/migrations/YYYY_MM_DD_HHMMSS_add_kilometer_to_vehicles_table.php`

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('vehicles', function (Blueprint $table) {
            $table->integer('kilometer')->nullable()->after('year');
        });
    }

    public function down(): void
    {
        Schema::table('vehicles', function (Blueprint $table) {
            $table->dropColumn('kilometer');
        });
    }
};
```

### Model Update:
**File**: `app/Models/Vehicle.php`

```php
protected $fillable = [
    'user_id',
    'name',
    'brand',
    'model',
    'plate',
    'battery_capacity',
    'year',
    'kilometer', // Add this
    'is_active',
];

protected function casts(): array
{
    return [
        'battery_capacity' => 'decimal:2',
        'is_active' => 'boolean',
        'kilometer' => 'integer', // Add this
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
```

### Controller Update:
**File**: `app/Http/Controllers/VehicleController.php`

```php
// Update store method validation
public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'brand' => 'nullable|string|max:100',
        'model' => 'nullable|string|max:100',
        'plate' => 'nullable|string|max:20',
        'battery_capacity' => 'nullable|numeric|min:0',
        'year' => 'nullable|integer|min:1900|max:2100',
        'kilometer' => 'nullable|integer|min:0', // Add this
    ]);

    // ... existing code ...

    $vehicle = Auth::user()->vehicles()->create([
        'name' => $request->name,
        'brand' => $request->brand,
        'model' => $request->model,
        'plate' => $request->plate,
        'battery_capacity' => $request->battery_capacity,
        'year' => $request->year,
        'kilometer' => $request->kilometer, // Add this
        'is_active' => $isActive,
    ]);

    return response()->json($vehicle, 201);
}

// Update update method validation
public function update(Request $request, $id)
{
    $vehicle = Auth::user()->vehicles()->findOrFail($id);

    $request->validate([
        'name' => 'required|string|max:255',
        'brand' => 'nullable|string|max:100',
        'model' => 'nullable|string|max:100',
        'plate' => 'nullable|string|max:20',
        'battery_capacity' => 'nullable|numeric|min:0',
        'year' => 'nullable|integer|min:1900|max:2100',
        'kilometer' => 'nullable|integer|min:0', // Add this
    ]);

    $vehicle->update($request->only(['name', 'brand', 'model', 'plate', 'battery_capacity', 'year', 'kilometer']));

    return response()->json($vehicle);
}
```

---

## Summary of Files to Modify/Create

| File | Action | Changes |
|------|--------|---------|
| `database/migrations/XXXX_add_charge_type_to_charges_table.php` | Create | Add charge_type enum column |
| `database/migrations/XXXX_add_is_active_to_companies_table.php` | Create | Add is_active boolean column |
| `database/migrations/XXXX_add_kilometer_to_vehicles_table.php` | Create | Add kilometer integer column |
| `app/Models/Charge.php` | Modify | Add charge_type to fillable and casts |
| `app/Models/Company.php` | Modify | Add is_active to fillable/casts, add active scope |
| `app/Models/Vehicle.php` | Modify | Add kilometer to fillable and casts |
| `app/Http/Controllers/ChargeController.php` | Modify | Add charge_type validation and handling |
| `app/Http/Controllers/CompanyController.php` | Modify | Return only active companies |
| `app/Http/Controllers/VehicleController.php` | Modify | Add kilometer validation and handling |

---

## Migration Execution Order

Run migrations in this order:

```bash
cd /Users/burakcelikkiran/Projects/togg-fuel-tracker-backend

# Create migrations
php artisan make:migration add_charge_type_to_charges_table
php artisan make:migration add_is_active_to_companies_table
php artisan make:migration add_kilometer_to_vehicles_table

# Run migrations
php artisan migrate
```

---

## Database Seeding (Optional)

To set existing companies as active, add to seeder:

**File**: `database/seeders/CompanySeeder.php`

```php
public function run()
{
    // Existing companies are set to active by default in migration
    // No additional action needed unless you want to add new companies

    \App\Models\Company::updateOrCreate(
        ['slug' => 'zes'],
        ['name' => 'ZES', 'is_active' => true]
    );

    \App\Models\Company::updateOrCreate(
        ['slug' => 'esarj'],
        ['name' => 'Eşarj', 'is_active' => true]
    );

    // Add more as needed...
}
```

---

## Verification Steps

1. **Run Migrations**:
   ```bash
   php artisan migrate:fresh --seed
   ```

2. **Test Charge Type**:
   - Create a charge with charge_type
   - Verify it defaults to 'AC' if not provided
   - Verify both 'AC' and 'DC' are accepted

3. **Test Company Active Status**:
   - Verify API only returns active companies
   - Test marking a company as inactive

4. **Test Vehicle Kilometer**:
   - Create vehicle with kilometer
   - Update vehicle kilometer
   - Verify it's returned in API response

5. **API Testing**:
   ```bash
   # Test companies endpoint
   curl -X GET http://togg-fuel-tracker-backend.test/api/companies \
     -H "Authorization: Bearer YOUR_TOKEN"

   # Test create charge with charge_type
   curl -X POST http://togg-fuel-tracker-backend.test/api/charges \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"date":"2025-02-15","company":"ZES","kwh":45,"amount":150,"charge_type":"DC"}'

   # Test create vehicle with kilometer
   curl -X POST http://togg-fuel-tracker-backend.test/api/vehicles \
     -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"name":"Test Car","kilometer":15000}'
   ```
