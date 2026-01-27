import { useState, useRef, useEffect } from 'react';
import { MapPinIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function AddressAutocomplete({ 
    value, 
    onChange, 
    placeholder = "e.g. Milton Keynes",
    label,
    id,
    error,
    className = ""
}) {
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState(value || '');
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);
    const debounceTimerRef = useRef(null);

    // Update search query when value prop changes
    useEffect(() => {
        setSearchQuery(value || '');
    }, [value]);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target) &&
                inputRef.current &&
                !inputRef.current.contains(event.target)
            ) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const searchAddresses = async (query) => {
        if (!query || query.length < 2) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }

        setIsLoading(true);
        
        try {
            // Using a free geocoding API (Nominatim/OpenStreetMap)
            // Restricted to UK only (countrycodes=gb)
            // In production, you might want to use Google Places API
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1&countrycodes=gb`,
                {
                    headers: {
                        'User-Agent': 'StartlineCab/1.0'
                    }
                }
            );
            
            const data = await response.json();
            
            const formattedSuggestions = data.map((item) => ({
                id: item.place_id,
                display: item.display_name,
                address: item.display_name,
                lat: parseFloat(item.lat),
                lon: parseFloat(item.lon),
            }));
            
            setSuggestions(formattedSuggestions);
            setShowSuggestions(true);
        } catch (error) {
            console.error('Error fetching address suggestions:', error);
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        onChange(query);

        // Debounce the search
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
            searchAddresses(query);
        }, 300);
    };

    const handleSelectSuggestion = (suggestion) => {
        setSearchQuery(suggestion.display);
        onChange(suggestion.display);
        setShowSuggestions(false);
        setSuggestions([]);
    };

    const handleClear = () => {
        setSearchQuery('');
        onChange('');
        setShowSuggestions(false);
        setSuggestions([]);
        inputRef.current?.focus();
    };

    return (
        <div className={`relative ${className}`}>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPinIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    id={id}
                    value={searchQuery}
                    onChange={handleInputChange}
                    onFocus={() => {
                        if (suggestions.length > 0) {
                            setShowSuggestions(true);
                        }
                    }}
                    className={`block w-full pl-10 pr-10 py-3 border ${
                        error ? 'border-red-300' : 'border-gray-300'
                    } rounded-lg focus:ring-primary-500 focus:border-primary-500 ${className}`}
                    placeholder={placeholder}
                    required
                />
                {searchQuery && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                )}
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (suggestions.length > 0 || isLoading) && (
                <div
                    ref={suggestionsRef}
                    className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
                >
                    {isLoading ? (
                        <div className="px-4 py-3 text-sm text-gray-500 text-center">
                            Searching...
                        </div>
                    ) : (
                        <>
                            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase border-b border-gray-200">
                                Search Results
                            </div>
                            {suggestions.map((suggestion) => (
                                <button
                                    key={suggestion.id}
                                    type="button"
                                    onClick={() => handleSelectSuggestion(suggestion)}
                                    className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
                                >
                                    <div className="flex items-start gap-3">
                                        <MapPinIcon className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-sm text-gray-900 truncate">
                                                {suggestion.display}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </>
                    )}
                </div>
            )}

            {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
