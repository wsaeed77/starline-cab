import { Link, router } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-800">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">S</span>
                        </div>
                        <span className="font-bold">Admin Panel</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-gray-400 hover:text-white"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <nav className="p-4 space-y-2">
                    <Link
                        href={route('admin.dashboard')}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                    </Link>
                    <Link
                        href={route('admin.cabs.index')}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Manage Cabs
                    </Link>
                    <Link
                        href={route('admin.pricing.index')}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Pricing Configuration
                    </Link>
                    <Link
                        href={route('admin.bookings.index')}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Bookings
                    </Link>
                    <Link
                        href={route('admin.settings.index')}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Site Settings
                    </Link>
                </nav>
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 space-y-2">
                    <Link
                        href={route('home')}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Website
                    </Link>
                    <button
                        onClick={() => router.post(route('logout'))}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors text-red-400 hover:text-white"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Top Bar */}
                <header className="bg-white shadow-sm">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden text-gray-600 hover:text-gray-900"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-700">Welcome, Admin</span>
                            <button
                                onClick={() => router.post(route('logout'))}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 sm:p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
