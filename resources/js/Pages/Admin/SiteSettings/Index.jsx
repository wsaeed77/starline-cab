import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function SiteSettingsIndex({ settings }) {
    const { data, setData, post, processing, errors } = useForm({
        phone: settings?.phone || '',
        email: settings?.email || '',
        address: settings?.address || '',
        facebook_url: settings?.facebook_url || '',
        twitter_url: settings?.twitter_url || '',
        linkedin_url: settings?.linkedin_url || '',
        instagram_url: settings?.instagram_url || '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.settings.update'));
    };

    return (
        <AdminLayout>
            <Head title="Site Settings" />
            
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Site Settings</h1>
                
                <div className="bg-white rounded-lg shadow p-6 max-w-4xl">
                    <form onSubmit={submit}>
                        <div className="space-y-6">
                            {/* Contact Information */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="text"
                                            id="phone"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                            placeholder="01234 567 890"
                                        />
                                        {errors.phone && (
                                            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                            placeholder="info@startlinecab.com"
                                        />
                                        {errors.email && (
                                            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                        Address
                                    </label>
                                    <textarea
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="123 High Street, Milton Keynes, MK1 1AA, United Kingdom"
                                    />
                                    {errors.address && (
                                        <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                                    )}
                                </div>
                            </div>

                            {/* Social Media Links */}
                            <div className="border-t pt-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Social Media Links</h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="facebook_url" className="block text-sm font-medium text-gray-700 mb-2">
                                            Facebook URL
                                        </label>
                                        <input
                                            type="url"
                                            id="facebook_url"
                                            value={data.facebook_url}
                                            onChange={(e) => setData('facebook_url', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                            placeholder="https://facebook.com/yourpage"
                                        />
                                        {errors.facebook_url && (
                                            <p className="mt-1 text-sm text-red-600">{errors.facebook_url}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="twitter_url" className="block text-sm font-medium text-gray-700 mb-2">
                                            Twitter URL
                                        </label>
                                        <input
                                            type="url"
                                            id="twitter_url"
                                            value={data.twitter_url}
                                            onChange={(e) => setData('twitter_url', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                            placeholder="https://twitter.com/yourhandle"
                                        />
                                        {errors.twitter_url && (
                                            <p className="mt-1 text-sm text-red-600">{errors.twitter_url}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="linkedin_url" className="block text-sm font-medium text-gray-700 mb-2">
                                            LinkedIn URL
                                        </label>
                                        <input
                                            type="url"
                                            id="linkedin_url"
                                            value={data.linkedin_url}
                                            onChange={(e) => setData('linkedin_url', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                            placeholder="https://linkedin.com/company/yourcompany"
                                        />
                                        {errors.linkedin_url && (
                                            <p className="mt-1 text-sm text-red-600">{errors.linkedin_url}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="instagram_url" className="block text-sm font-medium text-gray-700 mb-2">
                                            Instagram URL
                                        </label>
                                        <input
                                            type="url"
                                            id="instagram_url"
                                            value={data.instagram_url}
                                            onChange={(e) => setData('instagram_url', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                            placeholder="https://instagram.com/yourhandle"
                                        />
                                        {errors.instagram_url && (
                                            <p className="mt-1 text-sm text-red-600">{errors.instagram_url}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save Settings'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
