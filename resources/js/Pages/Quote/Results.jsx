import { Head, Link, router } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { useState } from 'react';

export default function QuoteResults({ service_type, from_location, to_location, distance, estimated_time, cabs, pricing_info }) {
    const handleBookNow = (cab) => {
        // Navigate to booking form with quote data
        router.get(route('booking.create'), {
            cab_id: cab.id,
            service_type: service_type,
            from_location: from_location,
            to_location: to_location,
            distance: distance,
            estimated_time: estimated_time,
            price: cab.price,
        });
    };
    return (
        <Layout>
            <Head title="Quote Results" />
            
            <div className="bg-gray-50 min-h-screen py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <Link
                            href={route('quote.index')}
                            className="text-primary-600 hover:text-primary-700 mb-4 inline-flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Quote Form
                        </Link>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Available Vehicles
                        </h1>
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">From</div>
                                    <div className="font-semibold text-gray-900">{from_location}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">To</div>
                                    <div className="font-semibold text-gray-900">{to_location}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Service Type</div>
                                    <div className="font-semibold text-gray-900 capitalize">
                                        {service_type === 'care' ? 'Care Transport' : 'Taxi Service'}
                                    </div>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Distance</div>
                                    <div className="font-semibold text-gray-900">{distance} miles</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Estimated Time</div>
                                    <div className="font-semibold text-gray-900">{Math.round(estimated_time)} minutes</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Pricing</div>
                                    <div className="text-xs text-gray-500">
                                        Base Price + £{pricing_info.price_per_mile}/mile + £{pricing_info.price_per_minute}/min
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Available Cabs */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cabs.map((cab) => (
                            <div
                                key={cab.id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                            >
                                <div className="h-48 bg-gray-200 flex items-center justify-center">
                                    {cab.image ? (
                                        <img src={cab.image.startsWith('http') ? cab.image : `/storage/${cab.image}`} alt={cab.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-6xl">🚗</div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{cab.name}</h3>
                                    <div className="text-sm text-gray-600 mb-4">
                                        {cab.capacity} {cab.capacity === 1 ? 'Passenger' : 'Passengers'}
                                    </div>
                                    {cab.features && cab.features.length > 0 && (
                                        <div className="mb-4">
                                            <div className="text-sm font-medium text-gray-700 mb-2">Features:</div>
                                            <ul className="text-sm text-gray-600 space-y-1">
                                                {cab.features.map((feature, index) => (
                                                    <li key={index} className="flex items-center gap-2">
                                                        <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between pt-4 border-t">
                                        <div>
                                            <div className="text-sm text-gray-600">Total Price</div>
                                            <div className="text-3xl font-bold text-primary-600">£{cab.price}</div>
                                        </div>
                                        <button 
                                            onClick={() => handleBookNow(cab)}
                                            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                                        >
                                            Book Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {cabs.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🚫</div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No vehicles available</h3>
                            <p className="text-gray-600 mb-6">
                                We're sorry, but there are no vehicles available for this route at the moment.
                            </p>
                            <Link
                                href={route('quote.index')}
                                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
                            >
                                Try Different Route
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
