<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Cab;
use App\Models\Booking;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $totalCabs = Cab::count();
        $activeCabs = Cab::where('is_active', true)->count();

        // Booking statistics
        $totalBookings = Booking::count();
        $pendingBookings = Booking::where('status', 'pending')->count();
        $confirmedBookings = Booking::where('status', 'confirmed')->count();
        $completedBookings = Booking::where('status', 'completed')->count();
        $cancelledBookings = Booking::where('status', 'cancelled')->count();

        // Recent bookings (last 10)
        $recentBookings = Booking::with('cab')
            ->latest()
            ->limit(10)
            ->get()
            ->map(function ($booking) {
                return [
                    'id' => $booking->id,
                    'customer_name' => $booking->customer_name,
                    'from_location' => $booking->from_location,
                    'to_location' => $booking->to_location,
                    'status' => $booking->status,
                    'price' => $booking->price,
                    'pickup_datetime' => $booking->pickup_datetime,
                    'cab_name' => $booking->cab->name ?? 'N/A',
                    'service_type' => $booking->service_type,
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_cabs' => $totalCabs,
                'active_cabs' => $activeCabs,
                'total_bookings' => $totalBookings,
                'pending_bookings' => $pendingBookings,
                'confirmed_bookings' => $confirmedBookings,
                'completed_bookings' => $completedBookings,
                'cancelled_bookings' => $cancelledBookings,
            ],
            'recent_bookings' => $recentBookings,
        ]);
    }
}
