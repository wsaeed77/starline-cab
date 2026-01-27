import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function PricingIndex({ pricing }) {
    // Convert string values to numbers (Laravel returns decimals as strings)
    const basePrice = pricing?.base_price ? parseFloat(pricing.base_price) : 2.75;
    const pricePerMile = pricing?.price_per_mile ? parseFloat(pricing.price_per_mile) : 1.40;
    const pricePerMinute = pricing?.price_per_minute ? parseFloat(pricing.price_per_minute) : 0.25;

    const { data, setData, post, processing, errors } = useForm({
        base_price: basePrice,
        price_per_mile: pricePerMile,
        price_per_minute: pricePerMinute,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.pricing.update'));
    };

    return (
        <AdminLayout>
            <Head title="Pricing Configuration" />
            
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Pricing Configuration</h1>
                
                <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Quote Calculation Formula</h2>
                        <p className="text-gray-600">
                            Configure the pricing formula used to calculate quotes. The total price is calculated as:
                        </p>
                        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                            <code className="text-sm">
                                Total Price = Base Price + (Distance × Price per Mile) + (Time × Price per Minute)
                            </code>
                        </div>
                    </div>

                    <form onSubmit={submit}>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="base_price" className="block text-sm font-medium text-gray-700 mb-2">
                                    Base Price (£) *
                                </label>
                                <input
                                    type="number"
                                    id="base_price"
                                    step="0.01"
                                    min="0"
                                    value={data.base_price || ''}
                                    onChange={(e) => setData('base_price', parseFloat(e.target.value) || 0)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                    required
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    The base fare charged for every journey
                                </p>
                                {errors.base_price && (
                                    <p className="mt-1 text-sm text-red-600">{errors.base_price}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="price_per_mile" className="block text-sm font-medium text-gray-700 mb-2">
                                    Price per Mile (£) *
                                </label>
                                <input
                                    type="number"
                                    id="price_per_mile"
                                    step="0.01"
                                    min="0"
                                    value={data.price_per_mile || ''}
                                    onChange={(e) => setData('price_per_mile', parseFloat(e.target.value) || 0)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                    required
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    The price charged for each mile traveled
                                </p>
                                {errors.price_per_mile && (
                                    <p className="mt-1 text-sm text-red-600">{errors.price_per_mile}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="price_per_minute" className="block text-sm font-medium text-gray-700 mb-2">
                                    Price per Minute (£) *
                                </label>
                                <input
                                    type="number"
                                    id="price_per_minute"
                                    step="0.01"
                                    min="0"
                                    value={data.price_per_minute || ''}
                                    onChange={(e) => setData('price_per_minute', parseFloat(e.target.value) || 0)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                    required
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    The price charged for each minute of travel time
                                </p>
                                {errors.price_per_minute && (
                                    <p className="mt-1 text-sm text-red-600">{errors.price_per_minute}</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-8">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save Pricing Configuration'}
                            </button>
                        </div>
                    </form>

                    {/* Example Calculation */}
                    <div className="mt-8 pt-8 border-t">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Example Calculation</h3>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Base Price:</span>
                                <span className="font-semibold">£{Number(data.base_price || 0).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">10 miles × £{Number(data.price_per_mile || 0).toFixed(2)}:</span>
                                <span className="font-semibold">£{(10 * Number(data.price_per_mile || 0)).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">30 minutes × £{Number(data.price_per_minute || 0).toFixed(2)}:</span>
                                <span className="font-semibold">£{(30 * Number(data.price_per_minute || 0)).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t font-bold text-lg">
                                <span>Total:</span>
                                <span className="text-primary-600">
                                    £{(Number(data.base_price || 0) + (10 * Number(data.price_per_mile || 0)) + (30 * Number(data.price_per_minute || 0))).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
