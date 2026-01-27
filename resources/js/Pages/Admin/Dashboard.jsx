import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Dashboard({ stats, recent_bookings }) {
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
            <Head title="Admin Dashboard" />
            
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
                
                {/* Statistics Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="text-sm text-gray-600 mb-2">Total Cabs</div>
                        <div className="text-3xl font-bold text-gray-900">{stats.total_cabs}</div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="text-sm text-gray-600 mb-2">Active Cabs</div>
                        <div className="text-3xl font-bold text-primary-600">{stats.active_cabs}</div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="text-sm text-gray-600 mb-2">Total Bookings</div>
                        <div className="text-3xl font-bold text-gray-900">{stats.total_bookings}</div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="text-sm text-gray-600 mb-2">Pending Bookings</div>
                        <div className="text-3xl font-bold text-yellow-600">{stats.pending_bookings}</div>
                    </div>
                </div>

                {/* Booking Status Breakdown */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Booking Status Overview</h2>
                    <div className="grid md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                            <div className="text-2xl font-bold text-yellow-600">{stats.pending_bookings}</div>
                            <div className="text-sm text-gray-600 mt-1">Pending</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{stats.confirmed_bookings}</div>
                            <div className="text-sm text-gray-600 mt-1">Confirmed</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{stats.completed_bookings}</div>
                            <div className="text-sm text-gray-600 mt-1">Completed</div>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                            <div className="text-2xl font-bold text-red-600">{stats.cancelled_bookings}</div>
                            <div className="text-sm text-gray-600 mt-1">Cancelled</div>
                        </div>
                    </div>
                </div>

                {/* Recent Bookings */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
                        <Link
                            href={route('admin.bookings.index')}
                            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                            View All →
                        </Link>
                    </div>
                    {recent_bookings && recent_bookings.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Booking ID
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Route
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Pickup Date
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Price
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {recent_bookings.map((booking) => (
                                        <tr key={booking.id}>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                                #{booking.id}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                                {booking.customer_name}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-500">
                                                <div className="truncate max-w-xs">
                                                    {booking.from_location} → {booking.to_location}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(booking.pickup_datetime).toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                £{booking.price}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                                <Link
                                                    href={route('admin.bookings.show', booking.id)}
                                                    className="text-primary-600 hover:text-primary-900"
                                                >
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <p>No bookings yet.</p>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid md:grid-cols-4 gap-4">
                        <Link
                            href={route('admin.cabs.create')}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-center"
                        >
                            Add New Cab
                        </Link>
                        <Link
                            href={route('admin.cabs.index')}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors text-center"
                        >
                            Manage Cabs
                        </Link>
                        <Link
                            href={route('admin.bookings.index')}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors text-center"
                        >
                            View All Bookings
                        </Link>
                        <Link
                            href={route('admin.pricing.index')}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors text-center"
                        >
                            Configure Pricing
                        </Link>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
