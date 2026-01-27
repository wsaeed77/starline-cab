<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'cab_id',
        'service_type',
        'from_location',
        'to_location',
        'distance',
        'estimated_time',
        'price',
        'customer_name',
        'customer_email',
        'customer_phone',
        'special_requirements',
        'pickup_datetime',
        'status',
    ];

    protected $casts = [
        'distance' => 'decimal:2',
        'estimated_time' => 'decimal:2',
        'price' => 'decimal:2',
        'pickup_datetime' => 'datetime',
    ];

    public function cab(): BelongsTo
    {
        return $this->belongsTo(Cab::class);
    }
}
