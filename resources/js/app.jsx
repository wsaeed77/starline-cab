import '../css/app.css';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Startline Cab';

// Global route helper function
window.route = function(name, params = {}, absolute = true) {
    if (!window.Ziggy) {
        console.warn('Ziggy routes not loaded');
        return '#';
    }

    const routes = window.Ziggy.routes || {};
    const route = routes[name];

    if (!route) {
        console.warn(`Route [${name}] not found`);
        return '#';
    }

    let uri = route.uri;

    // Handle both object params and direct value (for backward compatibility)
    let paramObj = params;
    if (typeof params === 'number' || typeof params === 'string') {
        // If a single value is passed, try to find the first parameter in the route
        const paramNames = uri.match(/\{(\w+)\??\}/g);
        if (paramNames && paramNames.length > 0) {
            const firstParam = paramNames[0].replace(/[\{\}?]/g, '');
            paramObj = { [firstParam]: params };
        } else {
            paramObj = { id: params };
        }
    }

    // Replace route parameters
    Object.keys(paramObj).forEach((key) => {
        const value = paramObj[key];
        uri = uri.replace(`{${key}}`, value);
        uri = uri.replace(`{${key}?}`, value);
    });

    // Remove any remaining optional parameters
    uri = uri.replace(/\{[^}]+\}/g, '');

    const baseUrl = window.Ziggy.url || '';
    return absolute ? `${baseUrl}/${uri}`.replace(/\/+/g, '/').replace(/:\//, '://') : `/${uri}`;
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx')
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        
        // Make Ziggy routes available globally
        if (props.initialPage?.props?.ziggy) {
            window.Ziggy = props.initialPage.props.ziggy;
        }
        
        root.render(<App {...props} />);
    },
    progress: {
        color: '#14b8a6',
    },
});
