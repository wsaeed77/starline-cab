<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Pricing;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PricingController extends Controller
{
    public function index(): Response
    {
        $pricing = Pricing::first();

        return Inertia::render('Admin/Pricing/Index', [
            'pricing' => $pricing,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'base_price' => 'required|numeric|min:0',
            'price_per_mile' => 'required|numeric|min:0',
            'price_per_minute' => 'required|numeric|min:0',
        ]);

        $pricing = Pricing::firstOrCreate([]);
        $pricing->update($validated);

        return back()->with('success', 'Pricing configuration updated successfully.');
    }
}
