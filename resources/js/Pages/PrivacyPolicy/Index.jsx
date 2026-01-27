import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function PrivacyPolicy({ siteSettings }) {
    const email = siteSettings?.email || 'info@startlinecab.com';
    const phone = siteSettings?.phone || '01234 567 890';
    const address = siteSettings?.address || '123 High Street, Milton Keynes, MK1 1AA, United Kingdom';
    return (
        <Layout>
            <Head title="Privacy Policy" />
            
            <div className="bg-gray-50 min-h-screen py-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
                        <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                        <div className="prose max-w-none space-y-6 text-gray-700">
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                                <p>
                                    Startline Taxi Service ("we", "our", or "us") is committed to protecting your privacy. 
                                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                                    when you use our website and services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                                <p>We collect information that you provide directly to us, including:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Personal identification information (name, email address, phone number)</li>
                                    <li>Booking information (pickup and destination addresses, travel dates and times)</li>
                                    <li>Payment information (processed securely through third-party payment processors)</li>
                                    <li>Special requirements or accessibility needs</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                                <p>We use the information we collect to:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Process and manage your bookings</li>
                                    <li>Communicate with you about your bookings and our services</li>
                                    <li>Improve our services and customer experience</li>
                                    <li>Send you promotional materials (with your consent)</li>
                                    <li>Comply with legal obligations</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing</h2>
                                <p>
                                    We do not sell, trade, or rent your personal information to third parties. We may share 
                                    your information only in the following circumstances:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>With service providers who assist us in operating our business</li>
                                    <li>When required by law or to protect our rights</li>
                                    <li>In connection with a business transfer or merger</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
                                <p>
                                    We implement appropriate technical and organizational measures to protect your personal 
                                    information against unauthorized access, alteration, disclosure, or destruction.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights</h2>
                                <p>Under UK data protection laws, you have the right to:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Access your personal data</li>
                                    <li>Correct inaccurate data</li>
                                    <li>Request deletion of your data</li>
                                    <li>Object to processing of your data</li>
                                    <li>Data portability</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies</h2>
                                <p>
                                    Our website uses cookies to enhance your experience. You can control cookie preferences 
                                    through your browser settings.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact Us</h2>
                                <p>
                                    If you have questions about this Privacy Policy, please contact us at:
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
