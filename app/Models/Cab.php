<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cab extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'service_type',
        'base_price',
        'capacity',
        'features',
        'image',
        'is_active',
    ];

    protected $casts = [
        'features' => 'array',
        'is_active' => 'boolean',
        'base_price' => 'decimal:2',
    ];
}
