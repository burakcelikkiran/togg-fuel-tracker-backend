<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('verification_codes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('code', 6); // 6 haneli kod
            $table->timestamp('expires_at'); // kod geçerlilik süresi
            $table->timestamp('verified_at')->nullable(); // doğrulama zamanı
            $table->timestamps();

            $table->index(['user_id', 'code']);
            $table->index('expires_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('verification_codes');
    }
};
