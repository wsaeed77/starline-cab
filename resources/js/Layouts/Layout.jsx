import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Logo from '@/Components/Logo';

export default function Layout({ children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { siteSettings } = usePage().props;
    
    // Use site settings if available, otherwise use defaults for required fields
    const phone = siteSettings?.phone || '01234 567 890';
    const email = siteSettings?.email || 'info@startlinecab.com';
    const address = siteSettings?.address || '123 High Street, Milton Keynes, MK1 1AA, United Kingdom';
    
    // Only use social URLs if they are actually provided (no defaults)
    const facebookUrl = siteSettings?.facebook_url;
    const twitterUrl = siteSettings?.twitter_url;
    const linkedinUrl = siteSettings?.linkedin_url;
    const instagramUrl = siteSettings?.instagram_url;

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link href={route('home')} className="flex items-center">
                                <Logo className="h-12 w-auto" />
                            </Link>
                        </div>
                        <div className="hidden md:flex items-center gap-8">
                            <Link href={route('home')} className="text-gray-700 hover:text-primary-600 font-medium">
                                Services
                            </Link>
                            <Link href={route('quote.index')} className="text-gray-700 hover:text-primary-600 font-medium">
                                Fare Estimate
                            </Link>
                            <Link href={route('about')} className="text-gray-700 hover:text-primary-600 font-medium">
                                About Us
                            </Link>
                            <Link href={route('contact')} className="text-gray-700 hover:text-primary-600 font-medium">
                                Contact
                            </Link>
                            <div className="flex items-center gap-2 text-primary-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="font-semibold">{phone}</span>
                            </div>
                            <Link
                                href={route('quote.index')}
                                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                            >
                                Get Quote
                            </Link>
                        </div>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-md text-gray-700"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                    {mobileMenuOpen && (
                        <div className="md:hidden py-4 space-y-2">
                            <Link href={route('home')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                                Services
                            </Link>
                            <Link href={route('quote.index')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                                Fare Estimate
                            </Link>
                            <Link href={route('about')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                                About Us
                            </Link>
                            <Link href={route('contact')} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded">
                                Contact
                            </Link>
                        </div>
                    )}
                </nav>
            </header>

            {/* Main Content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div>
                            <div className="mb-4">
                                <img 
                                    src="/images/starline-cab-logo-footer.png" 
                                    alt="Starline Taxi Service" 
                                    className="h-12 w-auto"
                                />
                            </div>
                            <p className="text-gray-400 text-sm mb-4">
                                Providing safe, reliable, and compassionate transport services across the UK.
                            </p>
                            {/* Social Links - Only show if URLs are provided */}
                            {(facebookUrl || twitterUrl || linkedinUrl || instagramUrl) && (
                                <div className="flex gap-4">
                                    {facebookUrl && facebookUrl.trim() && (
                                        <a 
                                            href={facebookUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-white transition-colors"
                                            aria-label="Facebook"
                                        >
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                            </svg>
                                        </a>
                                    )}
                                    {twitterUrl && twitterUrl.trim() && (
                                        <a 
                                            href={twitterUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-white transition-colors"
                                            aria-label="Twitter"
                                        >
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                            </svg>
                                        </a>
                                    )}
                                    {linkedinUrl && linkedinUrl.trim() && (
                                        <a 
                                            href={linkedinUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-white transition-colors"
                                            aria-label="LinkedIn"
                                        >
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                            </svg>
                                        </a>
                                    )}
                                    {instagramUrl && instagramUrl.trim() && (
                                        <a 
                                            href={instagramUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-white transition-colors"
                                            aria-label="Instagram"
                                        >
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
                            <div className="space-y-3 text-gray-400 text-sm">
                                <div className="flex items-start gap-2">
                                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>{phone}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span>{email}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{address}</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li>
                                    <Link href={route('home')} className="hover:text-white transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('quote.index')} className="hover:text-white transition-colors">
                                        Get Quote
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('about')} className="hover:text-white transition-colors">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('contact')} className="hover:text-white transition-colors">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Legal & Hours */}
                        <div>
                            <h3 className="font-bold text-lg mb-4">Legal</h3>
                            <ul className="space-y-2 text-gray-400 text-sm mb-6">
                                <li>
                                    <Link href={route('privacy')} className="hover:text-white transition-colors">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('terms')} className="hover:text-white transition-colors">
                                        Terms of Service
                                    </Link>
                                </li>
                            </ul>
                            <div>
                                <h4 className="font-semibold mb-2">Operating Hours</h4>
                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>24/7 Service Available</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                        <p>&copy; {new Date().getFullYear()} Startline Taxi Service. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
