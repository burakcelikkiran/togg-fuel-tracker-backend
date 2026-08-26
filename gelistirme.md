# Sürüş (Drive) Backend API Geliştirme Planı

## Overview
Frontend'de bulunan sürüş sayfaları (`NewDrive.tsx`, `DriveHistory.tsx`, `Dashboard.tsx`) için backend API entegrasyonu geliştirilecek.

## Mevcut Frontend Sayfaları

| Sayfa | Dosya | İşlev |
|-------|-------|-------|
| Yeni Sürüş | `src/pages/NewDrive.tsx` | Sürüş kaydı oluşturma formu |
| Sürüş Geçmişi | `src/pages/DriveHistory.tsx` | Tüm sürüşleri listeleme |
| Dashboard | `src/pages/Dashboard.tsx` | Son 3 sürüşü gösterme |

## Frontend Veri Modeli (Mock Data)

```typescript
{
  id: number,
  date: string,           // YYYY-MM-DD
  duration: number,       // dakika
  distance: number,       // km
  kwhPerKm: number,       // kWh/km
  avgSpeed: number,       // km/h (hesaplanan)
  totalConsumption: number // kWh (hesaplanan)
}
```

---

## 1. Veritabanı Migration

### Tablo: `drives`

```sql
CREATE TABLE drives (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    customer_id BIGINT UNSIGNED NOT NULL,
    vehicle_id BIGINT UNSIGNED NOT NULL,
    driven_at DATE NOT NULL,
    duration_minutes INT UNSIGNED NOT NULL,
    distance_km DECIMAL(8,2) UNSIGNED NOT NULL,
    consumption_kwh_per_km DECIMAL(6,3) UNSIGNED,
    avg_speed DECIMAL(5,1) UNSIGNED,
    total_consumption_kwh DECIMAL(8,3) UNSIGNED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
    INDEX idx_customer_vehicle (customer_id, vehicle_id),
    INDEX idx_driven_at (driven_at)
);
```

---

## 2. API Endpoints

### 2.1 Sürüş Listesi
```
GET /api/drives
```

**Query Parameters:**
- `vehicle_id` (optional) - Araç filtreleme
- `start_date` (optional) - Başlangıç tarihi (YYYY-MM-DD)
- `end_date` (optional) - Bitiş tarihi (YYYY-MM-DD)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "customer_id": 1,
      "vehicle_id": 1,
      "driven_at": "2025-02-23",
      "duration_minutes": 45,
      "distance_km": 38.0,
      "consumption_kwh_per_km": 0.180,
      "avg_speed": 50.7,
      "total_consumption_kwh": 6.84,
      "vehicle": {
        "id": 1,
        "name": "Araçım",
        "plate": "34 ABC 123"
      }
    }
  ]
}
```

### 2.2 Yeni Sürüş Oluştur
```
POST /api/drives
```

**Request Body:**
```json
{
  "vehicle_id": 1,
  "driven_at": "2025-02-23",
  "duration_minutes": 45,
  "distance_km": 38.0,
  "consumption_kwh_per_km": 0.180
}
```

**Not:** `avg_speed` ve `total_consumption_kwh` backend tarafından hesaplanabilir.

### 2.3 Sürüş Detay
```
GET /api/drives/{id}
```

### 2.4 Sürüş Güncelle
```
PUT /api/drives/{id}
```

### 2.5 Sürüş Sil
```
DELETE /api/drives/{id}
```

### 2.6 Dashboard Güncelleme
```
GET /api/dashboard
```

**Response'a eklenecek:**
```json
{
  "success": true,
  "data": {
    // ... mevcut şarj istatistikleri ...
    "recent_drives": [
      {
        "id": 1,
        "driven_at": "2025-02-23",
        "duration_minutes": 45,
        "distance_km": 38.0,
        "avg_speed": 50.7
      }
    ],
    "total_drives": 15,
    "total_distance_km": 1250.5,
    "avg_consumption_kwh_per_km": 0.175
  }
}
```

---

## 3. Frontend Değişiklikleri

### 3.1 TypeScript Types (`src/types/api.ts`)

```typescript
// Drive Types
export interface Drive {
  id: number;
  customer_id: number;
  vehicle_id: number;
  driven_at: string;
  duration_minutes: number;
  distance_km: number;
  consumption_kwh_per_km?: number;
  avg_speed?: number;
  total_consumption_kwh?: number;
  created_at: string;
  updated_at: string;
  vehicle?: Vehicle;
}

export interface CreateDriveRequest {
  vehicle_id: number;
  driven_at: string;
  duration_minutes: number;
  distance_km: number;
  consumption_kwh_per_km?: number;
}

export interface UpdateDriveRequest {
  vehicle_id?: number;
  driven_at?: string;
  duration_minutes?: number;
  distance_km?: number;
  consumption_kwh_per_km?: number;
}

export interface DriveListParams {
  vehicle_id?: number;
  start_date?: string;
  end_date?: string;
}
```

### 3.2 API Client (`src/lib/api.ts`)

```typescript
// ==================== DRIVES ====================

async getDrives(params?: DriveListParams) {
  const query = new URLSearchParams();
  if (params?.vehicle_id) query.set('vehicle_id', params.vehicle_id.toString());
  if (params?.start_date) query.set('start_date', params.start_date);
  if (params?.end_date) query.set('end_date', params.end_date);
  const qs = query.toString();
  const response = await request<any>(`/drives${qs ? `?${qs}` : ''}`);
  return extractData<Drive[]>(response) || [];
},

async createDrive(data: CreateDriveRequest) {
  return request('/drives', { method: 'POST', body: JSON.stringify(data) });
},

async getDrive(id: number) {
  const response = await request<any>(`/drives/${id}`);
  return extractData<Drive>(response);
},

async updateDrive(id: number, data: UpdateDriveRequest) {
  return request(`/drives/${id}`, { method: 'PUT', body: JSON.stringify(data) });
},

async deleteDrive(id: number) {
  return request(`/drives/${id}`, { method: 'DELETE' });
},
```

### 3.3 Dashboard Types Güncelleme (`src/types/api.ts`)

```typescript
export interface DashboardStats {
  // ... mevcut alanlar ...
  recent_drives?: Drive[];
  total_drives?: number;
  total_distance_km?: number;
  avg_consumption_kwh_per_km?: number;
}
```

---

## 4. Backend Implementation (Laravel/PHP)

### 4.1 Model: `Drive.php`

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Drive extends Model
{
    protected $fillable = [
        'customer_id',
        'vehicle_id',
        'driven_at',
        'duration_minutes',
        'distance_km',
        'consumption_kwh_per_km',
    ];

    protected $casts = [
        'driven_at' => 'date',
        'distance_km' => 'decimal:2',
        'consumption_kwh_per_km' => 'decimal:3',
        'avg_speed' => 'decimal:1',
        'total_consumption_kwh' => 'decimal:3',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    protected static function booted()
    {
        static::saving(function ($drive) {
            // Ortalama hız hesaplama: (mesafe_km / süre_dakika) * 60
            if ($drive->distance_km && $drive->duration_minutes) {
                $drive->avg_speed = ($drive->distance_km / $drive->duration_minutes) * 60;
            }

            // Toplam tüketim hesaplama: mesafe_km * tüketim_kwh_per_km
            if ($drive->distance_km && $drive->consumption_kwh_per_km) {
                $drive->total_consumption_kwh = $drive->distance_km * $drive->consumption_kwh_per_km;
            }
        });
    }
}
```

### 4.2 Controller: `DriveController.php`

```php
<?php

namespace App\Http\Controllers;

use App\Models\Drive;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DriveController extends Controller
{
    public function index(Request $request): JsonResponse
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

    public function store(Request $request): JsonResponse
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

    public function show(Request $request, int $id): JsonResponse
    {
        $drive = $request->user()->drives()
            ->with('vehicle')
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $drive
        ]);
    }

    public function update(Request $request, int $id): JsonResponse
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

    public function destroy(Request $request, int $id): JsonResponse
    {
        $drive = $request->user()->drives()->findOrFail($id);
        $drive->delete();

        return response()->json([
            'success' => true,
            'message' => 'Sürüş kaydı silindi'
        ]);
    }
}
```

### 4.3 Routes (`routes/api.php`)

```php
// Drive routes (authenticated)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/drives', [DriveController::class, 'index']);
    Route::post('/drives', [DriveController::class, 'store']);
    Route::get('/drives/{id}', [DriveController::class, 'show']);
    Route::put('/drives/{id}', [DriveController::class, 'update']);
    Route::delete('/drives/{id}', [DriveController::class, 'destroy']);
});
```

### 4.4 Dashboard Controller Güncelleme

`DashboardController.php`'e sürüş istatistikleri ekleyin:

```php
// Drive statistics için
$driveStats = $request->user()->drives();
$data['total_drives'] = $driveStats->count();
$data['total_distance_km'] = (float) $driveStats->sum('distance_km');
$data['avg_consumption_kwh_per_km'] = $driveStats->avg('consumption_kwh_per_km');
$data['recent_drives'] = $request->user()->drives()
    ->with('vehicle')
    ->orderBy('driven_at', 'desc')
    ->limit(3)
    ->get();
```

---

## 5. Test Planı

### API Testleri (Postman/curl)

```bash
# Yeni sürüş oluştur
curl -X POST https://api.example.com/api/drives \
  -H "X-API-Token: YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "vehicle_id": 1,
    "driven_at": "2025-02-23",
    "duration_minutes": 45,
    "distance_km": 38.0,
    "consumption_kwh_per_km": 0.180
  }'

# Sürüşleri listele
curl -X GET https://api.example.com/api/drives \
  -H "X-API-Token: YOUR_TOKEN"

# Dashboard kontrolü (recent_drives alanı)
curl -X GET https://api.example.com/api/dashboard \
  -H "X-API-Token: YOUR_TOKEN"
```

### Frontend Testleri

1. **NewDrive Sayfası:**
    - Form doldurulup gönderildiğinde API çağrısı çalışmalı
    - Başarılı kayıttan sonra dashboard'a yönlendirilmeli

2. **DriveHistory Sayfası:**
    - API'den gelen veriler listelenmeli
    - Detay görünümü doğru çalışmalı

3. **Dashboard Sayfası:**
    - "Son Sürüşlerim" bölümü API verilerini göstermeli
    - Mock data kaldırılmalı

---

## Critical Files

| Dosya | İşlem |
|-------|-------|
| `src/types/api.ts` | Drive tipleri ekle |
| `src/lib/api.ts` | API metodları ekle |
| `src/pages/NewDrive.tsx` | API entegrasyonu |
| `src/pages/DriveHistory.tsx` | API entegrasyonu |
| `src/pages/Dashboard.tsx` | Mock data kaldır, API kullan |

---

## Implementation Sırası

1. ✅ Backend migration çalıştır
2. ✅ Backend Model/Controller oluştur
3. ✅ Routes ekle
4. ✅ Dashboard controller'ı güncelle
5. ✅ Frontend types ekle
6. ✅ Frontend API client'ı güncelle
7. ✅ NewDrive sayfasına API entegrasyonu
8. ✅ DriveHistory sayfasına API entegrasyonu
9. ✅ Dashboard mock datasını kaldır
10. ✅ Test ve doğrulama
