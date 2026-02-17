<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('charges', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('vehicle_id')->constrained()->cascadeOnDelete();
            $table->foreignId('company_id')->nullable()->constrained()->nullOnDelete();
            $table->string('custom_company')->nullable(); // Kayıtlı olmayan şirketler için
            $table->date('date');
            $table->decimal('kwh', 8, 2);
            $table->decimal('amount', 10, 2); // TL
            $table->timestamps();

            $table->index(['user_id', 'vehicle_id']);
            $table->index('date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('charges');
    }
};
