<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\SiteSettings;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function share(Request $request): array
    {
        try {
            $user = auth('web')->user();
        } catch (\Exception $e) {
            $user = null;
        }

        // Get site settings
        try {
            $siteSettings = SiteSettings::getSettings();
        } catch (\Exception $e) {
            $siteSettings = null;
        }

        $shared = [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
            ],
            'siteSettings' => $siteSettings ? [
                'phone' => $siteSettings->phone,
                'email' => $siteSettings->email,
                'address' => $siteSettings->address,
                'facebook_url' => $siteSettings->facebook_url,
                'twitter_url' => $siteSettings->twitter_url,
                'linkedin_url' => $siteSettings->linkedin_url,
                'instagram_url' => $siteSettings->instagram_url,
            ] : null,
        ];

        // Add Ziggy routes if available
        try {
            $shared['ziggy'] = fn () => [
                ...(new \Tightenco\Ziggy\Ziggy)->toArray(),
                'location' => $request->url(),
            ];
        } catch (\Exception $e) {
            // Ziggy not available, skip it
            $shared['ziggy'] = [
                'routes' => [],
                'url' => $request->url(),
            ];
        }

        return $shared;
    }
}
