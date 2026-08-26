<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('drives', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained('customers')->onDelete('cascade');
            $table->foreignId('vehicle_id')->constrained('vehicles')->onDelete('cascade');
            $table->date('driven_at');
            $table->unsignedInteger('duration_minutes');
            $table->decimal('distance_km', 8, 2);
            $table->decimal('consumption_kwh_per_km', 6, 3)->nullable();
            $table->decimal('avg_speed', 5, 1)->nullable();
            $table->decimal('total_consumption_kwh', 8, 3)->nullable();
            $table->timestamps();

            $table->index(['customer_id', 'vehicle_id']);
            $table->index('driven_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('drives');
    }
};
