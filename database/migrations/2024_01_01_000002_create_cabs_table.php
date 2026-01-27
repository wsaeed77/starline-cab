<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cabs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type'); // e.g., Saloon, Estate, 6 Seater, Minibus
            $table->enum('service_type', ['taxi', 'care'])->default('taxi');
            $table->integer('capacity');
            $table->json('features')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cabs');
    }
};
