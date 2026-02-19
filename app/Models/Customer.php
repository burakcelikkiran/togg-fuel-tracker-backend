<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;

class Customer extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'api_token',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'api_token', // Token'ı JSON çıktısında gizle
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // İlişkiler
    public function vehicles(): HasMany
    {
        return $this->hasMany(Vehicle::class);
    }

    public function charges(): HasMany
    {
        return $this->hasMany(Charge::class);
    }

    public function verificationCode(): HasOne
    {
        return $this->hasOne(VerificationCode::class)->latest();
    }

    // API Token işlemleri
    public static function generateApiToken(): string
    {
        return Str::random(64);
    }

    public function createApiToken(): string
    {
        $token = self::generateApiToken();
        $this->api_token = $token;
        $this->save();

        return $token;
    }

    public function rotateApiToken(): string
    {
        return $this->createApiToken();
    }

    public function revokeApiToken(): void
    {
        $this->api_token = null;
        $this->save();
    }

    // E-posta doğrulanmış mı kontrolü
    public function isVerified(): bool
    {
        return $this->verificationCode?->verified_at !== null;
    }
}
