<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pricing extends Model
{
    use HasFactory;

    protected $table = 'pricing';

    protected $fillable = [
        'base_price',
        'price_per_mile',
        'price_per_minute',
    ];

    protected $casts = [
        'base_price' => 'decimal:2',
        'price_per_mile' => 'decimal:2',
        'price_per_minute' => 'decimal:2',
    ];
}
