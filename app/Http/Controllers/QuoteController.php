<?php

namespace App\Http\Controllers;

use App\Models\Cab;
use App\Models\Pricing;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class QuoteController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Quote/Index');
    }

    public function calculate(Request $request)
    {
        $request->validate([
            'service_type' => 'required|in:taxi,care',
            'from_location' => 'required|string|max:255',
            'to_location' => 'required|string|max:255',
        ]);

        // Get pricing configuration
        $pricing = Pricing::first();
        
        if (!$pricing) {
            return back()->withErrors(['error' => 'Pricing configuration not found. Please contact administrator.']);
        }

        // Calculate distance and time using real geocoding
        $distance = $this->calculateDistance($request->from_location, $request->to_location);
        $estimatedTime = $this->calculateTime($distance);

        // Get available cabs for the service type
        $cabs = Cab::where('service_type', $request->service_type)
            ->where('is_active', true)
            ->get();

        // Calculate prices for each cab
        $cabsWithPrices = $cabs->map(function ($cab) use ($pricing, $distance, $estimatedTime) {
            // Use cab-specific base price if set, otherwise use global base price
            $basePrice = $cab->base_price ?? $pricing->base_price;
            $pricePerMile = $pricing->price_per_mile;
            $pricePerMinute = $pricing->price_per_minute;
            
            $totalPrice = $basePrice + ($distance * $pricePerMile) + ($estimatedTime * $pricePerMinute);
            
            return [
                'id' => $cab->id,
                'name' => $cab->name,
                'type' => $cab->type,
                'capacity' => $cab->capacity,
                'features' => $cab->features,
                'image' => $cab->image,
                'price' => round($totalPrice, 2),
            ];
        });

        // Calculate base prices used for each cab (for display purposes)
        $cabsWithBasePrices = $cabsWithPrices->map(function ($cabData) use ($cabs, $pricing) {
            $cab = $cabs->firstWhere('id', $cabData['id']);
            $cabData['base_price_used'] = $cab->base_price ?? $pricing->base_price;
            return $cabData;
        });

        $quoteData = [
            'service_type' => $request->service_type,
            'from_location' => $request->from_location,
            'to_location' => $request->to_location,
            'distance' => round($distance, 2),
            'estimated_time' => round($estimatedTime, 2),
            'cabs' => $cabsWithBasePrices,
            'pricing_info' => [
                'base_price' => $pricing->base_price,
                'price_per_mile' => $pricing->price_per_mile,
                'price_per_minute' => $pricing->price_per_minute,
            ],
        ];

        // Store quote data in session for GET access
        session(['quote_results' => $quoteData]);

        // Redirect to GET route to allow page refresh
        return redirect()->route('quote.results');
    }

    public function results(): Response
    {
        $quoteData = session('quote_results');

        if (!$quoteData) {
            return redirect()->route('quote.index')
                ->with('error', 'No quote results found. Please calculate a new quote.');
        }

        return Inertia::render('Quote/Results', $quoteData);
    }

    private function calculateDistance($from, $to): float
    {
        try {
            // Geocode both addresses using Nominatim (OpenStreetMap)
            $fromCoords = $this->geocodeAddress($from);
            $toCoords = $this->geocodeAddress($to);

            if (!$fromCoords || !$toCoords) {
                // Fallback to mock calculation if geocoding fails
                return rand(5, 50);
            }

            // Calculate distance using Haversine formula (great circle distance)
            $distance = $this->haversineDistance(
                $fromCoords['lat'],
                $fromCoords['lon'],
                $toCoords['lat'],
                $toCoords['lon']
            );

            // Convert from kilometers to miles
            return $distance * 0.621371;
        } catch (\Exception $e) {
            // Fallback to mock calculation on error
            \Log::error('Distance calculation error: ' . $e->getMessage());
            return rand(5, 50);
        }
    }

    private function geocodeAddress($address): ?array
    {
        try {
            $client = new \GuzzleHttp\Client();
            $response = $client->get('https://nominatim.openstreetmap.org/search', [
                'query' => [
                    'q' => $address,
                    'format' => 'json',
                    'limit' => 1,
                    'countrycodes' => 'gb',
                ],
                'headers' => [
                    'User-Agent' => 'StartlineCab/1.0',
                ],
            ]);

            $data = json_decode($response->getBody(), true);

            if (!empty($data) && isset($data[0]['lat']) && isset($data[0]['lon'])) {
                return [
                    'lat' => (float) $data[0]['lat'],
                    'lon' => (float) $data[0]['lon'],
                ];
            }

            return null;
        } catch (\Exception $e) {
            \Log::error('Geocoding error: ' . $e->getMessage());
            return null;
        }
    }

    private function haversineDistance($lat1, $lon1, $lat2, $lon2): float
    {
        // Haversine formula to calculate distance between two points on Earth
        $earthRadius = 6371; // Earth's radius in kilometers

        $dLat = deg2rad($lat2 - $lat1);
        $dLon = deg2rad($lon2 - $lon1);

        $a = sin($dLat / 2) * sin($dLat / 2) +
             cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
             sin($dLon / 2) * sin($dLon / 2);

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        return $earthRadius * $c; // Distance in kilometers
    }

    private function calculateTime($distance): float
    {
        // Calculate time based on distance
        // Average UK road speed: 25-30 mph in cities, 40-50 mph on roads
        // Using weighted average: 30% city (25 mph), 70% roads (45 mph) = ~38 mph average
        $averageSpeed = 38; // miles per hour
        
        // Convert distance (miles) to time (minutes)
        return ($distance / $averageSpeed) * 60;
    }
}
