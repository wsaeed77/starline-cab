import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useState } from 'react';

export default function CabsEdit({ cab }) {
    const { data, setData, put, processing, errors } = useForm({
        name: cab.name || '',
        type: cab.type || '',
        service_type: cab.service_type || 'taxi',
        base_price: cab.base_price || '',
        capacity: cab.capacity || 4,
        features: cab.features || [],
        image: null,
        is_active: cab.is_active ?? true,
    });

    const [imagePreview, setImagePreview] = useState(
        cab.image ? `/storage/${cab.image}` : null
    );

    const [featureInput, setFeatureInput] = useState('');

    const addFeature = () => {
        if (featureInput.trim()) {
            setData('features', [...data.features, featureInput.trim()]);
            setFeatureInput('');
        }
    };

    const removeFeature = (index) => {
        setData('features', data.features.filter((_, i) => i !== index));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData('image', null);
        setImagePreview(cab.image ? `/storage/${cab.image}` : null);
    };

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.cabs.update', cab.id), {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Edit Cab" />
            
            <div>
                <div className="mb-8">
                    <Link
                        href={route('admin.cabs.index')}
                        className="text-primary-600 hover:text-primary-700 mb-4 inline-flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Cabs
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Edit Cab</h1>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <form onSubmit={submit}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                    required
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                                    Type *
                                </label>
                                <input
                                    type="text"
                                    id="type"
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                    required
                                />
                                {errors.type && (
                                    <p className="mt-1 text-sm text-red-600">{errors.type}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="service_type" className="block text-sm font-medium text-gray-700 mb-2">
                                    Service Type *
                                </label>
                                <select
                                    id="service_type"
                                    value={data.service_type}
                                    onChange={(e) => setData('service_type', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                    required
                                >
                                    <option value="taxi">Taxi Service</option>
                                    <option value="care">Care Transport</option>
                                </select>
                                {errors.service_type && (
                                    <p className="mt-1 text-sm text-red-600">{errors.service_type}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="base_price" className="block text-sm font-medium text-gray-700 mb-2">
                                    Base Price (£)
                                </label>
                                <input
                                    type="number"
                                    id="base_price"
                                    step="0.01"
                                    min="0"
                                    value={data.base_price}
                                    onChange={(e) => setData('base_price', e.target.value ? parseFloat(e.target.value) : '')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Leave empty to use global base price"
                                />
                                <p className="mt-1 text-xs text-gray-500">Leave empty to use the global base price from pricing configuration</p>
                                {errors.base_price && (
                                    <p className="mt-1 text-sm text-red-600">{errors.base_price}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-2">
                                    Capacity *
                                </label>
                                <input
                                    type="number"
                                    id="capacity"
                                    value={data.capacity}
                                    onChange={(e) => setData('capacity', parseInt(e.target.value))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                    min="1"
                                    max="20"
                                    required
                                />
                                {errors.capacity && (
                                    <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                                    Cab Image
                                </label>
                                {imagePreview && (
                                    <div className="mb-4">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full h-48 object-cover rounded-lg border border-gray-300"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="mt-2 text-sm text-red-600 hover:text-red-800"
                                        >
                                            Remove New Image
                                        </button>
                                    </div>
                                )}
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div className="mt-4">
                                        <label
                                            htmlFor="image"
                                            className="cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                                        >
                                            <span>{imagePreview ? 'Change image' : 'Upload an image'}</span>
                                            <input
                                                id="image"
                                                name="image"
                                                type="file"
                                                accept="image/*"
                                                className="sr-only"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                        <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 2MB</p>
                                    </div>
                                </div>
                                {errors.image && (
                                    <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Active Status
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Cab is active</span>
                                </label>
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Features
                            </label>
                            <div className="flex gap-2 mb-4">
                                <input
                                    type="text"
                                    value={featureInput}
                                    onChange={(e) => setFeatureInput(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            addFeature();
                                        }
                                    }}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Add a feature and press Enter"
                                />
                                <button
                                    type="button"
                                    onClick={addFeature}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {data.features.map((feature, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
                                    >
                                        {feature}
                                        <button
                                            type="button"
                                            onClick={() => removeFeature(index)}
                                            className="text-primary-600 hover:text-primary-800"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
                            >
                                {processing ? 'Updating...' : 'Update Cab'}
                            </button>
                            <Link
                                href={route('admin.cabs.index')}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold transition-colors"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
