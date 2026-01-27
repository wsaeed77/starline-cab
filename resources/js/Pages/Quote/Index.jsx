import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { useState } from 'react';
import AddressAutocomplete from '@/Components/AddressAutocomplete';

export default function QuoteIndex() {
    const { data, setData, post, processing, errors } = useForm({
        service_type: 'care',
        from_location: '',
        to_location: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('quote.calculate'));
    };

    return (
        <Layout>
            <Head title="Get Quote" />
            
            <div className="bg-gray-50 min-h-screen py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Quick Fare Estimate & Booking
                        </div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Calculate & Book Your Journey
                        </h1>
                        <p className="text-lg text-gray-600">
                            Get an instant estimate and book your transport journey. Simply enter your 
                            locations and we'll take care of the rest.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <form onSubmit={submit}>
                            {/* Service Type Selection */}
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-700 mb-4">
                                    Select Service Type
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setData('service_type', 'care')}
                                        className={`p-6 rounded-xl border-2 transition-all ${
                                            data.service_type === 'care'
                                                ? 'border-primary-600 bg-primary-50'
                                                : 'border-gray-200 bg-white hover:border-gray-300'
                                        }`}
                                    >
                                        <div className="text-4xl mb-3">🩺</div>
                                        <div className="font-bold text-gray-900 mb-1">Care Transport</div>
                                        <div className="text-sm text-gray-600">Medical & Assisted</div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setData('service_type', 'taxi')}
                                        className={`p-6 rounded-xl border-2 transition-all ${
                                            data.service_type === 'taxi'
                                                ? 'border-primary-600 bg-primary-50'
                                                : 'border-gray-200 bg-white hover:border-gray-300'
                                        }`}
                                    >
                                        <div className="text-4xl mb-3">🚕</div>
                                        <div className="font-bold text-gray-900 mb-1">Taxi Service</div>
                                        <div className="text-sm text-gray-600">Standard Transport</div>
                                    </button>
                                </div>
                                {errors.service_type && (
                                    <p className="mt-2 text-sm text-red-600">{errors.service_type}</p>
                                )}
                            </div>

                            {/* From Location */}
                            <div className="mb-6">
                                <AddressAutocomplete
                                    id="from_location"
                                    label="From Location"
                                    value={data.from_location}
                                    onChange={(value) => setData('from_location', value)}
                                    placeholder="e.g. Milton Keynes"
                                    error={errors.from_location}
                                />
                            </div>

                            {/* To Location */}
                            <div className="mb-8">
                                <AddressAutocomplete
                                    id="to_location"
                                    label="To Location"
                                    value={data.to_location}
                                    onChange={(value) => setData('to_location', value)}
                                    placeholder="e.g. Luton"
                                    error={errors.to_location}
                                />
                            </div>

                            {/* Calculate Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                {processing ? 'Calculating...' : 'Calculate Fare'}
                            </button>

                            {/* Pricing Info */}
                            <div className="mt-6 flex items-center gap-2 text-sm text-gray-600 justify-center">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>£2.75 base fare + £1.40/mile + £0.25/min. Special rates for regular bookings.</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
