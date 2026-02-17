<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'name',
        'brand',
        'model',
        'plate',
        'battery_capacity',
        'year',
        'kilometer',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'battery_capacity' => 'decimal:2',
            'is_active' => 'boolean',
            'kilometer' => 'integer',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    // İlişkiler
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function charges(): HasMany
    {
        return $this->hasMany(Charge::class);
    }

    // Scope: Aktif araç
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
