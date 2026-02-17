<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    // Scope: Aktif firmalar
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // İlişkiler
    public function charges(): HasMany
    {
        return $this->hasMany(Charge::class);
    }
}
