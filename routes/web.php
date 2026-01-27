<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\QuoteController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\PrivacyPolicyController;
use App\Http\Controllers\TermsOfServiceController;
use App\Http\Controllers\Admin\CabController;
use App\Http\Controllers\Admin\PricingController;
use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;

Route::get('/test-route', function () {
    return 'Laravel is working! PHP Version: ' . PHP_VERSION;
});

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/quote', [QuoteController::class, 'index'])->name('quote.index');
Route::post('/quote/calculate', [QuoteController::class, 'calculate'])->name('quote.calculate');
Route::get('/quote/results', [QuoteController::class, 'results'])->name('quote.results');
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
Route::get('/about', [AboutController::class, 'index'])->name('about');
Route::get('/privacy-policy', [PrivacyPolicyController::class, 'index'])->name('privacy');
Route::get('/terms-of-service', [TermsOfServiceController::class, 'index'])->name('terms');

// Booking routes
Route::get('/booking/create', [\App\Http\Controllers\BookingController::class, 'create'])->name('booking.create');
Route::post('/booking', [\App\Http\Controllers\BookingController::class, 'store'])->name('booking.store');
Route::get('/booking/{booking}/confirmation', [\App\Http\Controllers\BookingController::class, 'confirmation'])->name('booking.confirmation');

// Redirect /admin to /admin/dashboard or /login
Route::get('/admin', function () {
    if (auth()->check()) {
        return redirect()->route('admin.dashboard');
    }
    return redirect()->route('login');
})->name('admin');

Route::prefix('admin')->middleware(['auth', 'verified'])->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('cabs', CabController::class);
    Route::get('/pricing', [PricingController::class, 'index'])->name('pricing.index');
    Route::post('/pricing', [PricingController::class, 'update'])->name('pricing.update');
    Route::get('/bookings', [\App\Http\Controllers\Admin\BookingController::class, 'index'])->name('bookings.index');
    Route::get('/bookings/{booking}', [\App\Http\Controllers\Admin\BookingController::class, 'show'])->name('bookings.show');
    Route::post('/bookings/{booking}/update-status', [\App\Http\Controllers\Admin\BookingController::class, 'updateStatus'])->name('bookings.update-status');
    Route::get('/settings', [\App\Http\Controllers\Admin\SiteSettingsController::class, 'index'])->name('settings.index');
    Route::post('/settings', [\App\Http\Controllers\Admin\SiteSettingsController::class, 'update'])->name('settings.update');
});

require __DIR__.'/auth.php';
