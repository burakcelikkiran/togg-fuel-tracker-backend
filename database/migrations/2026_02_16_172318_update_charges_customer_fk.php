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
        Schema::table('charges', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });

        Schema::table('charges', function (Blueprint $table) {
            $table->renameColumn('user_id', 'customer_id');
        });

        Schema::table('charges', function (Blueprint $table) {
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('charges', function (Blueprint $table) {
            $table->dropForeign(['customer_id']);
        });

        Schema::table('charges', function (Blueprint $table) {
            $table->renameColumn('customer_id', 'user_id');
        });

        Schema::table('charges', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }
};
