<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FixViteUrls
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);
        
        // Fix HTML responses (including Inertia responses)
        if (method_exists($response, 'getContent')) {
            $content = $response->getContent();
            
            if ($content && is_string($content)) {
                $baseUrl = $request->getSchemeAndHttpHost();
                
                // Replace localhost URLs with current domain
                $content = str_replace('http://localhost/build/', $baseUrl . '/build/', $content);
                $content = str_replace('http://localhost', $baseUrl, $content);
                $content = str_replace('http://[::1]:', $baseUrl . ':', $content);
                
                // Replace Vite dev server URLs (port 5173/5174) with built assets
                $content = preg_replace('/http:\/\/[^:]+:517[34]\/@vite\/client/', '', $content);
                
                // Get the actual built assets from manifest
                $manifestPath = public_path('build/manifest.json');
                if (file_exists($manifestPath)) {
                    $manifest = json_decode(file_get_contents($manifestPath), true);
                    if (isset($manifest['resources/js/app.jsx'])) {
                        $entry = $manifest['resources/js/app.jsx'];
                        
                        // Replace JS file
                        if (isset($entry['file'])) {
                            $jsFile = '/build/' . $entry['file'];
                            $content = preg_replace('/http:\/\/[^:]+:517[34]\/resources\/js\/app\.jsx/', $baseUrl . $jsFile, $content);
                        }
                        
                        // Add CSS files if they exist
                        if (isset($entry['css']) && is_array($entry['css'])) {
                            $cssLinks = '';
                            foreach ($entry['css'] as $cssFile) {
                                $cssUrl = $baseUrl . '/build/' . $cssFile;
                                $cssLinks .= '<link rel="stylesheet" href="' . htmlspecialchars($cssUrl) . '">' . "\n    ";
                            }
                            // Insert CSS before closing head tag or before script tags
                            if ($cssLinks && strpos($content, '<link rel="stylesheet"') === false) {
                                $content = preg_replace('/(<head[^>]*>)/i', '$1' . "\n    " . $cssLinks, $content, 1);
                            }
                        }
                    }
                }
                
                $content = preg_replace('/http:\/\/[^:]+:517[34]\//', $baseUrl . '/build/', $content);
                
                $response->setContent($content);
            }
        }
        
        return $response;
    }
}
