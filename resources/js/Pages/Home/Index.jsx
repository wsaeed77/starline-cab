import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { 
    ShieldCheckIcon, 
    ClockIcon, 
    HeartIcon,
    CheckCircleIcon 
} from '@heroicons/react/24/outline';

export default function Home() {
    return (
        <Layout>
            <Head title="Home" />
            
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden min-h-[600px] flex items-center">
                {/* Background Image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url(/images/banner_bk.png?v=1)'
                    }}
                ></div>
                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-black/40"></div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-lg">
                            <CheckCircleIcon className="w-4 h-4" />
                            Trusted Transport Provider
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                            Professional{' '}
                            <span className="text-primary-300">Taxi & Care Transport</span>{' '}
                            Services
                        </h1>
                        <p className="text-lg md:text-xl text-white/95 mb-8 max-w-3xl mx-auto drop-shadow-md">
                            Your trusted partner for reliable taxi services and compassionate care transport 
                            across the UK. Whether you need a quick ride or specialized medical transport, 
                            we're here for you 24/7.
                        </p>
                        <div className="flex gap-4 justify-center mb-8 flex-wrap">
                            <Link
                                href={route('quote.index')}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2 shadow-xl"
                            >
                                Get Fare Estimate
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link
                                href="#services"
                                className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors shadow-xl"
                            >
                                Our Services
                            </Link>
                        </div>
                        <div className="flex gap-8 justify-center text-sm text-white flex-wrap">
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                                <ClockIcon className="w-5 h-5 text-white" />
                                <span className="font-medium">24/7 Available</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                                <ShieldCheckIcon className="w-5 h-5 text-white" />
                                <span className="font-medium">Fully Insured</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                                <HeartIcon className="w-5 h-5 text-white" />
                                <span className="font-medium">Professional Drivers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Types Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Choose Your Service
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            We offer two specialized transport services to meet all your travel needs
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        {/* Taxi Service Card */}
                        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center text-4xl">
                                    🚕
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">Taxi Service</h3>
                                    <p className="text-gray-600">Standard Transport</p>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-6 text-lg">
                                Fast, reliable taxi service for your everyday travel needs. Professional drivers, 
                                comfortable vehicles, and competitive rates. Perfect for airport transfers, 
                                city rides, and general transportation.
                            </p>
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                                    <span>Quick & Convenient</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                                    <span>Competitive Pricing</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                                    <span>Professional Drivers</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <CheckCircleIcon className="w-5 h-5 text-blue-500" />
                                    <span>Modern Fleet</span>
                                </div>
                            </div>
                            <Link
                                href={route('quote.index')}
                                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center px-6 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Get Taxi Quote
                            </Link>
                        </div>

                        {/* Care Transport Card */}
                        <div className="bg-gradient-to-br from-primary-50 to-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-primary-500 rounded-xl flex items-center justify-center text-4xl">
                                    🩺
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">Care Transport</h3>
                                    <p className="text-gray-600">Medical & Assisted</p>
                                </div>
                            </div>
                            <p className="text-gray-700 mb-6 text-lg">
                                Specialized transport for medical appointments, hospital visits, and assisted travel. 
                                Our trained drivers provide compassionate care and support throughout your journey.
                            </p>
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <CheckCircleIcon className="w-5 h-5 text-primary-600" />
                                    <span>Medical Appointment Transport</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <CheckCircleIcon className="w-5 h-5 text-primary-600" />
                                    <span>Assisted Travel Support</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <CheckCircleIcon className="w-5 h-5 text-primary-600" />
                                    <span>DBS Checked Drivers</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <CheckCircleIcon className="w-5 h-5 text-primary-600" />
                                    <span>Wheelchair Accessible</span>
                                </div>
                            </div>
                            <Link
                                href={route('quote.index')}
                                className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center px-6 py-3 rounded-lg font-semibold transition-colors"
                            >
                                Get Care Transport Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Our Transport Services
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            A comprehensive range of transport solutions for all your travel needs, 
                            from everyday taxi rides to specialized care transport.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: '🚕',
                                title: 'Standard Taxi Service',
                                description: 'Reliable taxi service for everyday travel needs. Professional drivers, comfortable vehicles, and competitive rates for all your journeys.',
                            },
                            {
                                icon: '✈️',
                                title: 'Airport Transfers',
                                description: 'Punctual airport transfers to and from all major UK airports. We track your flight to ensure timely pickups.',
                            },
                            {
                                icon: '🩺',
                                title: 'Care & Assisted Transport',
                                description: 'Door-to-door transport with full assistance for those who need extra support. Our trained drivers provide compassionate care throughout your journey.',
                            },
                            {
                                icon: '🏥',
                                title: 'Hospital Appointments',
                                description: 'Reliable transport to and from hospital appointments, clinics, and medical centres. We ensure you arrive on time, stress-free.',
                            },
                        ].map((service, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center text-3xl mb-4">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link
                            href={route('quote.index')}
                            className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-block"
                        >
                            Get a Quote Today
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4 text-center">
                        Why Choose Startline Cab
                    </h2>
                    <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
                        Startline Cab has built a reputation for providing exceptional transport services. 
                        Whether you need a quick taxi ride or specialized care transport, we're committed to 
                        ensuring every journey is safe, comfortable, and stress-free.
                    </p>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            {[
                                {
                                    icon: ShieldCheckIcon,
                                    title: 'Fully Licensed & Insured',
                                    description: 'Complete peace of mind with comprehensive insurance coverage and all required licensing.',
                                },
                                {
                                    icon: ClockIcon,
                                    title: 'Punctual & Reliable',
                                    description: 'We understand the importance of timing for medical appointments. Count on us to be there.',
                                },
                                {
                                    icon: ShieldCheckIcon,
                                    title: 'Trained & DBS Checked Drivers',
                                    description: 'Every driver undergoes rigorous training and enhanced DBS checks for your safety.',
                                },
                                {
                                    icon: HeartIcon,
                                    title: 'Compassionate Care',
                                    description: 'Our team is trained to provide supportive, dignified care throughout your journey.',
                                },
                            ].map((feature, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                            <feature.icon className="w-6 h-6 text-primary-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                Our Commitment to Excellence
                            </h3>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                {[
                                    { value: '5K+', label: 'Journeys Completed' },
                                    { value: '98%', label: 'On-Time Arrival' },
                                    { value: '4.9', label: 'Customer Rating' },
                                    { value: '24/7', label: 'Availability' },
                                ].map((stat, index) => (
                                    <div
                                        key={index}
                                        className="bg-green-50 p-4 rounded-lg text-center"
                                    >
                                        <div className="text-3xl font-bold text-primary-600 mb-1">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t pt-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                        🚗
                                    </div>
                                    <span className="font-semibold text-gray-900">Modern Fleet</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                        ⭐
                                    </div>
                                    <span className="font-semibold text-gray-900">5-Star Service</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
