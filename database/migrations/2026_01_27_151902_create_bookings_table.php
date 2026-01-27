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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cab_id')->constrained()->onDelete('cascade');
            $table->string('service_type'); // taxi or care
            $table->string('from_location');
            $table->string('to_location');
            $table->decimal('distance', 8, 2); // in miles
            $table->decimal('estimated_time', 8, 2); // in minutes
            $table->decimal('price', 10, 2);
            
            // Customer information
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone');
            $table->text('special_requirements')->nullable();
            $table->dateTime('pickup_datetime');
            
            // Booking status
            $table->enum('status', ['pending', 'confirmed', 'completed', 'cancelled'])->default('pending');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
