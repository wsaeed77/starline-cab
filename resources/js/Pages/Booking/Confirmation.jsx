import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function BookingConfirmation({ booking }) {
    return (
        <Layout>
            <Head title="Booking Confirmation" />
            
            <div className="bg-gray-50 min-h-screen py-12">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircleIcon className="w-12 h-12 text-green-600" />
                            </div>
                        </div>
                        
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Booking Confirmed!
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Thank you for your booking. We've sent a confirmation email to <strong>{booking.customer_email}</strong>
                        </p>

                        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Booking Details</h2>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-600">Booking ID:</span>
                                    <div className="font-semibold text-gray-900">#{booking.id}</div>
                                </div>
                                <div>
                                    <span className="text-gray-600">Vehicle:</span>
                                    <div className="font-semibold text-gray-900">{booking.cab.name}</div>
                                </div>
                                <div>
                                    <span className="text-gray-600">From:</span>
                                    <div className="font-semibold text-gray-900">{booking.from_location}</div>
                                </div>
                                <div>
                                    <span className="text-gray-600">To:</span>
                                    <div className="font-semibold text-gray-900">{booking.to_location}</div>
                                </div>
                                <div>
                                    <span className="text-gray-600">Pickup Date & Time:</span>
                                    <div className="font-semibold text-gray-900">
                                        {new Date(booking.pickup_datetime).toLocaleString('en-GB', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-gray-600">Total Price:</span>
                                    <div className="font-semibold text-primary-600 text-lg">£{booking.price}</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 justify-center">
                            <Link
                                href={route('home')}
                                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Back to Home
                            </Link>
                            <Link
                                href={route('quote.index')}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Book Another Journey
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
