export default function Logo({ className = "h-12" }) {
    // Use a version parameter that changes when the app is rebuilt
    // For development, you can hard refresh (Ctrl+F5) or clear browser cache
    const logoUrl = `/images/starline-cab-logo.png?v=2`;
    
    return (
        <img 
            src={logoUrl} 
            alt="Starline Taxi Service" 
            className={className}
            onError={(e) => {
                // Fallback: try without cache-busting if the versioned URL fails
                if (e.target.src.includes('?v=')) {
                    e.target.src = '/images/starline-cab-logo.png';
                }
            }}
        />
    );
}
