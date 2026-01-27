import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function TermsOfService({ siteSettings }) {
    const email = siteSettings?.email || 'info@startlinecab.com';
    const phone = siteSettings?.phone || '01234 567 890';
    const address = siteSettings?.address || '123 High Street, Milton Keynes, MK1 1AA, United Kingdom';
    return (
        <Layout>
            <Head title="Terms of Service" />
            
            <div className="bg-gray-50 min-h-screen py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
                        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                        <div className="prose max-w-none space-y-6 text-gray-700">
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                                <p>
                                    By accessing and using Startline Taxi Service's website and services, you accept and 
                                    agree to be bound by these Terms of Service. If you do not agree to these terms, 
                                    please do not use our services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services</h2>
                                <p>
                                    Startline Taxi Service provides taxi and care transport services across the UK. 
                                    We offer two main service types:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><strong>Taxi Service:</strong> Standard transportation services</li>
                                    <li><strong>Care Transport:</strong> Medical and assisted transport with trained staff</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Booking and Payment</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>All bookings are subject to availability</li>
                                    <li>Quotes provided are estimates and final prices may vary based on actual distance and time</li>
                                    <li>Payment terms will be specified at the time of booking</li>
                                    <li>Cancellation policies apply as stated during booking</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Customer Responsibilities</h2>
                                <p>Customers are responsible for:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Providing accurate pickup and destination information</li>
                                    <li>Being ready at the scheduled pickup time</li>
                                    <li>Informing us of any special requirements or accessibility needs</li>
                                    <li>Treating our drivers and vehicles with respect</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cancellation Policy</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Cancellations made more than 24 hours before pickup: No charge</li>
                                    <li>Cancellations made less than 24 hours before pickup: May incur a cancellation fee</li>
                                    <li>No-shows: Full fare may be charged</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Liability</h2>
                                <p>
                                    Startline Taxi Service is fully insured and licensed. However, we are not liable for:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Delays caused by traffic, weather, or other circumstances beyond our control</li>
                                    <li>Loss or damage to personal belongings left in vehicles</li>
                                    <li>Injuries resulting from customer negligence</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Prohibited Activities</h2>
                                <p>The following activities are strictly prohibited:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Smoking in vehicles</li>
                                    <li>Consuming alcohol or illegal substances</li>
                                    <li>Damaging or vandalizing vehicles</li>
                                    <li>Abusive or threatening behavior towards drivers or staff</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to Terms</h2>
                                <p>
                                    We reserve the right to modify these Terms of Service at any time. Changes will be 
                                    effective immediately upon posting on our website. Continued use of our services 
                                    constitutes acceptance of modified terms.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Information</h2>
                                <p>
                                    For questions about these Terms of Service, please contact us:
                                </p>
                                <p className="mt-2">
                                    <strong>Email:</strong> {email}<br />
                                    <strong>Phone:</strong> {phone}<br />
                                    <strong>Address:</strong> {address}
                                </p>
                            </section>
                        </div>

                        <div className="mt-8 pt-8 border-t">
                            <Link
                                href={route('home')}
                                className="text-primary-600 hover:text-primary-700 inline-flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
