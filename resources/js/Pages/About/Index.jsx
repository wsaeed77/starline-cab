import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { ShieldCheckIcon, ClockIcon, HeartIcon } from '@heroicons/react/24/outline';

export default function About() {
    return (
        <Layout>
            <Head title="About Us" />
            
            <div className="bg-white">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-primary-50 to-white py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">About Startline Cab</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Your trusted partner for safe, reliable, and compassionate transportation services
                        </p>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                                <p className="text-lg text-gray-600 mb-4">
                                    Startline Cab has been serving the community for over 25 years, providing 
                                    exceptional transportation services with a focus on care and compassion.
                                </p>
                                <p className="text-lg text-gray-600 mb-4">
                                    What started as a small local taxi service has grown into a comprehensive 
                                    transport solution, specializing in both standard taxi services and specialized 
                                    care transport for those who need extra support.
                                </p>
                                <p className="text-lg text-gray-600">
                                    We understand that every journey matters, especially when it comes to medical 
                                    appointments and care needs. That's why we've built our reputation on reliability, 
                                    safety, and compassionate service.
                                </p>
                            </div>
                            <div className="bg-gray-100 rounded-2xl p-8">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-primary-600 mb-2">25+</div>
                                        <div className="text-gray-600">Years Experience</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-primary-600 mb-2">5K+</div>
                                        <div className="text-gray-600">Happy Customers</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-primary-600 mb-2">98%</div>
                                        <div className="text-gray-600">On-Time Rate</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-primary-600 mb-2">24/7</div>
                                        <div className="text-gray-600">Available</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Values Section */}
                        <div className="mb-20">
                            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                {[
                                    {
                                        icon: ShieldCheckIcon,
                                        title: 'Safety First',
                                        description: 'We prioritize the safety and security of all our passengers above everything else.',
                                    },
                                    {
                                        icon: ClockIcon,
                                        title: 'Reliability',
                                        description: 'You can count on us to be there when you need us, every single time.',
                                    },
                                    {
                                        icon: HeartIcon,
                                        title: 'Compassion',
                                        description: 'We treat every passenger with dignity, respect, and genuine care.',
                                    },
                                ].map((value, index) => (
                                    <div key={index} className="text-center">
                                        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <value.icon className="w-8 h-8 text-primary-600" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                        <p className="text-gray-600">{value.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mission Section */}
                        <div className="bg-primary-600 text-white rounded-2xl p-12 text-center">
                            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
                            <p className="text-xl max-w-3xl mx-auto">
                                To provide safe, reliable, and compassionate transportation services that empower 
                                individuals to access healthcare, maintain independence, and live their lives to 
                                the fullest. We're committed to making every journey comfortable, stress-free, 
                                and dignified.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
