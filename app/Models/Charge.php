<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Charge extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'vehicle_id',
        'company_id',
        'custom_company',
        'date',
        'kwh',
        'amount',
        'charge_type',
        'charge_percentage',
    ];

    protected function casts(): array
    {
        return [
            'kwh' => 'decimal:2',
            'amount' => 'decimal:2',
            'date' => 'date',
            'charge_type' => 'string',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    // Accessor: Birim fiyat (₺/kWh)
    public function getUnitPriceAttribute(): float
    {
        return $this->kwh > 0 ? round($this->amount / $this->kwh, 2) : 0;
    }

    // Accessor: Firma adı (company varsa or, yoksa custom_company)
    public function getCompanyNameAttribute(): string
    {
        return $this->company?->name ?? $this->custom_company ?? '';
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

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
