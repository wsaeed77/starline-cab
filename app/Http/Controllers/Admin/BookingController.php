<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BookingController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Booking::with('cab')->latest();

        // Filter by status if provided
        if ($request->has('status') && $request->status !== '') {
            $query->where('status', $request->status);
        }

        // Filter by service type if provided
        if ($request->has('service_type') && $request->service_type !== '') {
            $query->where('service_type', $request->service_type);
        }

        $bookings = $query->paginate(15);

        return Inertia::render('Admin/Bookings/Index', [
            'bookings' => $bookings,
            'filters' => [
                'status' => $request->status ?? '',
                'service_type' => $request->service_type ?? '',
            ],
        ]);
    }

    public function show(Booking $booking): Response
    {
        $booking->load('cab');

        return Inertia::render('Admin/Bookings/Show', [
            'booking' => $booking,
        ]);
    }

    public function updateStatus(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,completed,cancelled',
        ]);

        $booking->update($validated);

        return redirect()->back()
            ->with('success', 'Booking status updated successfully.');
    }
}
