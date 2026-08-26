<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Drive extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'vehicle_id',
        'driven_at',
        'duration_minutes',
        'distance_km',
        'consumption_kwh_per_km',
    ];

    protected function casts(): array
    {
        return [
            'driven_at' => 'date',
            'distance_km' => 'decimal:2',
            'consumption_kwh_per_km' => 'decimal:3',
            'avg_speed' => 'decimal:1',
            'total_consumption_kwh' => 'decimal:3',
        ];
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

    // İlişkiler
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }
}
