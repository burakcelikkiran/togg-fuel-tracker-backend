<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VerificationCode extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'code',
        'expires_at',
        'verified_at',
    ];

    protected function casts(): array
    {
        return [
            'expires_at' => 'datetime',
            'verified_at' => 'datetime',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    // Müşteri ilişkisi
    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    // Kodun geçerli olup olmadığını kontrol et
    public function isValid(): bool
    {
        return $this->verified_at === null && $this->expires_at->isFuture();
    }

    // Kod süresi doldu mu?
    public function isExpired(): bool
    {
        return $this->expires_at->isPast();
    }
}
