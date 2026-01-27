import { Head, Link, router, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function BookingShow({ booking }) {
    const { data, setData, post, processing } = useForm({
        status: booking.status,
    });

    const updateStatus = (e) => {
        e.preventDefault();
        post(route('admin.bookings.update-status', booking.id));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-800';
            case 'completed':
                return 'bg-blue-100 text-blue-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <AdminLayout>
            <Head title={`Booking #${booking.id}`} />
            
            <div>
                <div className="mb-8">
                    <Link
                        href={route('admin.bookings.index')}
                        className="text-primary-600 hover:text-primary-700 mb-4 inline-flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Bookings
                    </Link>
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-gray-900">Booking #{booking.id}</h1>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Booking Details */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Booking Details</h2>
                        <div className="space-y-4">
                            <div>
                                <div className="text-sm text-gray-600">Booking ID</div>
                                <div className="font-semibold text-gray-900">#{booking.id}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Service Type</div>
                                <div className="font-semibold text-gray-900 capitalize">
                                    {booking.service_type === 'care' ? 'Care Transport' : 'Taxi Service'}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Vehicle</div>
                                <div className="font-semibold text-gray-900">{booking.cab?.name || 'N/A'}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">From Location</div>
                                <div className="font-semibold text-gray-900">{booking.from_location}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">To Location</div>
                                <div className="font-semibold text-gray-900">{booking.to_location}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Distance</div>
                                <div className="font-semibold text-gray-900">{booking.distance} miles</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Estimated Time</div>
                                <div className="font-semibold text-gray-900">{Math.round(booking.estimated_time)} minutes</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Pickup Date & Time</div>
                                <div className="font-semibold text-gray-900">
                                    {new Date(booking.pickup_datetime).toLocaleString('en-GB', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Total Price</div>
                                <div className="font-semibold text-2xl text-primary-600">£{booking.price}</div>
                            </div>
                        </div>
                    </div>

                    {/* Customer Information */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Information</h2>
                        <div className="space-y-4">
                            <div>
                                <div className="text-sm text-gray-600">Name</div>
                                <div className="font-semibold text-gray-900">{booking.customer_name}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Email</div>
                                <div className="font-semibold text-gray-900">{booking.customer_email}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600">Phone</div>
                                <div className="font-semibold text-gray-900">{booking.customer_phone}</div>
                            </div>
                            {booking.special_requirements && (
                                <div>
                                    <div className="text-sm text-gray-600">Special Requirements</div>
                                    <div className="font-semibold text-gray-900 mt-1">{booking.special_requirements}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Update Status */}
                <div className="mt-6 bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Update Status</h2>
                    <form onSubmit={updateStatus} className="flex items-end gap-4">
                        <div className="flex-1">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                                Booking Status
                            </label>
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
                        >
                            {processing ? 'Updating...' : 'Update Status'}
                        </button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
