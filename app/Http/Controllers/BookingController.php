<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Cab;
use App\Models\Pricing;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    public function create(Request $request): Response
    {
        $request->validate([
            'cab_id' => 'required|exists:cabs,id',
            'service_type' => 'required|in:taxi,care',
            'from_location' => 'required|string|max:255',
            'to_location' => 'required|string|max:255',
            'distance' => 'required|numeric|min:0',
            'estimated_time' => 'required|numeric|min:0',
            'price' => 'required|numeric|min:0',
        ]);

        $cab = Cab::findOrFail($request->cab_id);
        $pricing = Pricing::first();
        
        // Use cab-specific base price if set, otherwise use global base price
        $basePrice = $cab->base_price ?? ($pricing ? $pricing->base_price : 2.75);

        return Inertia::render('Booking/Create', [
            'cab' => $cab,
            'quote_data' => [
                'service_type' => $request->service_type,
                'from_location' => $request->from_location,
                'to_location' => $request->to_location,
                'distance' => $request->distance,
                'estimated_time' => $request->estimated_time,
                'price' => $request->price,
            ],
            'pricing_info' => [
                'base_price' => $basePrice,
                'price_per_mile' => $pricing ? $pricing->price_per_mile : 1.40,
                'price_per_minute' => $pricing ? $pricing->price_per_minute : 0.25,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'cab_id' => 'required|exists:cabs,id',
            'service_type' => 'required|in:taxi,care',
            'from_location' => 'required|string|max:255',
            'to_location' => 'required|string|max:255',
            'distance' => 'required|numeric|min:0',
            'estimated_time' => 'required|numeric|min:0',
            'price' => 'required|numeric|min:0',
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'required|string|max:20',
            'pickup_datetime' => 'required|date|after:now',
            'special_requirements' => 'nullable|string|max:1000',
        ]);

        $booking = Booking::create($validated);

        return redirect()->route('booking.confirmation', $booking->id)
            ->with('success', 'Booking submitted successfully!');
    }

    public function confirmation(Booking $booking): Response
    {
        $booking->load('cab');

        return Inertia::render('Booking/Confirmation', [
            'booking' => $booking,
        ]);
    }
}
