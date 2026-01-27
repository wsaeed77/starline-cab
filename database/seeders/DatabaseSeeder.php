<?php

namespace Database\Seeders;

use App\Models\Cab;
use App\Models\Pricing;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        $this->call(AdminUserSeeder::class);

        // Create default pricing
        Pricing::firstOrCreate(
            [],
            [
                'base_price' => 2.75,
                'price_per_mile' => 1.40,
                'price_per_minute' => 0.25,
            ]
        );

        // Create sample cabs
        Cab::create([
            'name' => 'Saloon/Estate',
            'type' => 'Saloon',
            'service_type' => 'taxi',
            'capacity' => 4,
            'features' => ['Air Conditioning', 'GPS Navigation', 'Comfortable Seating'],
            'is_active' => true,
        ]);

        Cab::create([
            'name' => '6 Seater',
            'type' => 'MPV',
            'service_type' => 'taxi',
            'capacity' => 6,
            'features' => ['Spacious Interior', 'Air Conditioning', 'GPS Navigation'],
            'is_active' => true,
        ]);

        Cab::create([
            'name' => 'Minibus',
            'type' => 'Minibus',
            'service_type' => 'taxi',
            'capacity' => 8,
            'features' => ['Large Capacity', 'Wheelchair Accessible', 'Air Conditioning'],
            'is_active' => true,
        ]);

        Cab::create([
            'name' => 'Care Transport Vehicle',
            'type' => 'Care Van',
            'service_type' => 'care',
            'capacity' => 4,
            'features' => ['Wheelchair Accessible', 'Trained Staff', 'Medical Equipment', 'Comfortable Seating'],
            'is_active' => true,
        ]);
    }
}
