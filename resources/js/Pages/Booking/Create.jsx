import { Head, Link, useForm, router } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { useState } from 'react';

export default function BookingCreate({ cab, quote_data, pricing_info = { base_price: 2.75, price_per_mile: 1.40, price_per_minute: 0.25 } }) {
    const { data, setData, post, processing, errors } = useForm({
        cab_id: cab.id,
        service_type: quote_data.service_type,
        from_location: quote_data.from_location,
        to_location: quote_data.to_location,
        distance: quote_data.distance,
        estimated_time: quote_data.estimated_time,
        price: quote_data.price,
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        pickup_datetime: '',
        special_requirements: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('booking.store'));
    };

    // Get minimum datetime (now + 1 hour)
    const getMinDateTime = () => {
        const now = new Date();
        now.setHours(now.getHours() + 1);
        return now.toISOString().slice(0, 16);
    };

    return (
        <Layout>
            <Head title="Book Your Journey" />
            
            <div className="bg-gray-50 min-h-screen py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <button
                            onClick={() => {
                                // Recreate the quote results page with the same data
                                router.post(route('quote.calculate'), {
                                    service_type: quote_data.service_type,
                                    from_location: quote_data.from_location,
                                    to_location: quote_data.to_location,
                                }, {
                                    preserveState: false,
                                    preserveScroll: false,
                                });
                            }}
                            className="text-primary-600 hover:text-primary-700 mb-4 inline-flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Quote
                        </button>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Complete Your Booking
                        </h1>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Booking Form */}
                        <div className="md:col-span-2">
                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Details</h2>
                                
                                <form onSubmit={submit}>
                                    {/* Journey Summary */}
                                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                        <h3 className="font-semibold text-gray-900 mb-3">Journey Summary</h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-gray-600">From:</span>
                                                <div className="font-medium text-gray-900">{quote_data.from_location}</div>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">To:</span>
                                                <div className="font-medium text-gray-900">{quote_data.to_location}</div>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Distance:</span>
                                                <div className="font-medium text-gray-900">{quote_data.distance} miles</div>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Est. Time:</span>
                                                <div className="font-medium text-gray-900">{Math.round(quote_data.estimated_time)} minutes</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Customer Information */}
                                    <div className="space-y-6">
                                        <div>
                                            <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="customer_name"
                                                value={data.customer_name}
                                                onChange={(e) => setData('customer_name', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                                required
                                            />
                                            {errors.customer_name && (
                                                <p className="mt-1 text-sm text-red-600">{errors.customer_name}</p>
                                            )}
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="customer_email" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    id="customer_email"
                                                    value={data.customer_email}
                                                    onChange={(e) => setData('customer_email', e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                                    required
                                                />
                                                {errors.customer_email && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.customer_email}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label htmlFor="customer_phone" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Phone Number *
                                                </label>
                                                <input
                                                    type="tel"
                                                    id="customer_phone"
                                                    value={data.customer_phone}
                                                    onChange={(e) => setData('customer_phone', e.target.value)}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                                    required
                                                />
                                                {errors.customer_phone && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.customer_phone}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="pickup_datetime" className="block text-sm font-medium text-gray-700 mb-2">
                                                Pickup Date & Time *
                                            </label>
                                            <input
                                                type="datetime-local"
                                                id="pickup_datetime"
                                                value={data.pickup_datetime}
                                                onChange={(e) => setData('pickup_datetime', e.target.value)}
                                                min={getMinDateTime()}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                                required
                                            />
                                            <p className="mt-1 text-xs text-gray-500">Please select a date and time at least 1 hour from now</p>
                                            {errors.pickup_datetime && (
                                                <p className="mt-1 text-sm text-red-600">{errors.pickup_datetime}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label htmlFor="special_requirements" className="block text-sm font-medium text-gray-700 mb-2">
                                                Special Requirements (Optional)
                                            </label>
                                            <textarea
                                                id="special_requirements"
                                                value={data.special_requirements}
                                                onChange={(e) => setData('special_requirements', e.target.value)}
                                                rows={4}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                                placeholder="Any special requirements, accessibility needs, or additional information..."
                                            />
                                            {errors.special_requirements && (
                                                <p className="mt-1 text-sm text-red-600">{errors.special_requirements}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-8 flex gap-4">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {processing ? 'Submitting...' : 'Confirm Booking'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                // Recreate the quote results page with the same data
                                                router.post(route('quote.calculate'), {
                                                    service_type: quote_data.service_type,
                                                    from_location: quote_data.from_location,
                                                    to_location: quote_data.to_location,
                                                });
                                            }}
                                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-4 px-6 rounded-lg font-semibold transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Booking Summary Sidebar */}
                        <div className="md:col-span-1">
                            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-4">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h3>
                                
                                <div className="mb-6">
                                    <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                                        {cab.image ? (
                                            <img src={cab.image.startsWith('http') ? cab.image : `/storage/${cab.image}`} alt={cab.name} className="w-full h-full object-cover rounded-lg" />
                                        ) : (
                                            <div className="text-5xl">🚗</div>
                                        )}
                                    </div>
                                    <h4 className="font-bold text-lg text-gray-900 mb-2">{cab.name}</h4>
                                    <div className="text-sm text-gray-600 mb-2">
                                        {cab.capacity} {cab.capacity === 1 ? 'Passenger' : 'Passengers'}
                                    </div>
                                    <div className="text-sm text-gray-600 capitalize">
                                        {quote_data.service_type === 'care' ? 'Care Transport' : 'Taxi Service'}
                                    </div>
                                </div>

                                <div className="border-t pt-4 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Base Price</span>
                                        <span className="font-medium text-gray-900">£{pricing_info.base_price}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Distance ({quote_data.distance} miles)</span>
                                        <span className="font-medium text-gray-900">£{(quote_data.distance * pricing_info.price_per_mile).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Time ({Math.round(quote_data.estimated_time)} min)</span>
                                        <span className="font-medium text-gray-900">£{(quote_data.estimated_time * pricing_info.price_per_minute).toFixed(2)}</span>
                                    </div>
                                    <div className="border-t pt-3 flex justify-between">
                                        <span className="font-bold text-lg text-gray-900">Total</span>
                                        <span className="font-bold text-2xl text-primary-600">£{quote_data.price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
