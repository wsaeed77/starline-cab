<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Cab;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class CabController extends Controller
{
    public function index(): Response
    {
        $cabs = Cab::latest()->get();

        return Inertia::render('Admin/Cabs/Index', [
            'cabs' => $cabs,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Cabs/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'service_type' => 'required|in:taxi,care',
            'base_price' => 'nullable|numeric|min:0',
            'capacity' => 'required|integer|min:1|max:20',
            'features' => 'nullable|array',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'is_active' => 'boolean',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('cabs', 'public');
        }

        Cab::create($validated);

        return redirect()->route('admin.cabs.index')
            ->with('success', 'Cab created successfully.');
    }

    public function edit(Cab $cab): Response
    {
        return Inertia::render('Admin/Cabs/Edit', [
            'cab' => $cab,
        ]);
    }

    public function update(Request $request, Cab $cab)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
            'service_type' => 'required|in:taxi,care',
            'base_price' => 'nullable|numeric|min:0',
            'capacity' => 'required|integer|min:1|max:20',
            'features' => 'nullable|array',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'is_active' => 'boolean',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($cab->image && Storage::disk('public')->exists($cab->image)) {
                Storage::disk('public')->delete($cab->image);
            }
            $validated['image'] = $request->file('image')->store('cabs', 'public');
        }

        $cab->update($validated);

        return redirect()->route('admin.cabs.index')
            ->with('success', 'Cab updated successfully.');
    }

    public function show(Cab $cab): Response
    {
        return Inertia::render('Admin/Cabs/Show', [
            'cab' => $cab,
        ]);
    }

    public function destroy(Cab $cab)
    {
        // Delete associated image if exists
        if ($cab->image && Storage::disk('public')->exists($cab->image)) {
            Storage::disk('public')->delete($cab->image);
        }

        $cab->delete();

        return redirect()->route('admin.cabs.index')
            ->with('success', 'Cab deleted successfully.');
    }
}
