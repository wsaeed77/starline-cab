<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteSettings extends Model
{
    use HasFactory;

    protected $table = 'site_settings';

    protected $fillable = [
        'phone',
        'email',
        'address',
        'facebook_url',
        'twitter_url',
        'linkedin_url',
        'instagram_url',
    ];

    /**
     * Get the site settings (singleton pattern)
     */
    public static function getSettings()
    {
        return static::first() ?? static::create([
            'phone' => '01234 567 890',
            'email' => 'info@startlinecab.com',
            'address' => '123 High Street, Milton Keynes, MK1 1AA, United Kingdom',
            'facebook_url' => 'https://facebook.com',
            'twitter_url' => 'https://twitter.com',
            'linkedin_url' => 'https://linkedin.com',
            'instagram_url' => 'https://instagram.com',
        ]);
    }
}
