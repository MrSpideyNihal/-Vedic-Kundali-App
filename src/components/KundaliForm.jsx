import { useState } from 'react'
import LocationSearch from './LocationSearch'
import { validateForm } from '../utils/validators'

export default function KundaliForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        timeOfBirth: '',
        location: null,
    })

    const [errors, setErrors] = useState({})

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const handleLocationSelect = (location) => {
        setFormData(prev => ({
            ...prev,
            location
        }))
        if (errors.location) {
            setErrors(prev => ({ ...prev, location: '' }))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const validation = validateForm(formData)
        if (!validation.isValid) {
            setErrors(validation.errors)
            return
        }

        onSubmit(formData)
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="card">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2 font-hindi">
                        कुंडली विवरण भरें
                    </h2>
                    <p className="text-gray-600">Fill in the details to generate your Kundali</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="label">
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className={`input-field ${errors.firstName ? 'border-red-500' : ''}`}
                                placeholder="e.g., AVYAAN"
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                            )}
                        </div>

                        <div>
                            <label className="label">Middle Name</label>
                            <input
                                type="text"
                                name="middleName"
                                value={formData.middleName}
                                onChange={handleInputChange}
                                className="input-field"
                                placeholder="e.g., BHANUPRATAP"
                            />
                        </div>

                        <div>
                            <label className="label">
                                Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className={`input-field ${errors.lastName ? 'border-red-500' : ''}`}
                                placeholder="e.g., UPADHYAY"
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                            )}
                        </div>
                    </div>

                    {/* Date and Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="label">
                                Date of Birth <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleInputChange}
                                className={`input-field ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                                max={new Date().toISOString().split('T')[0]}
                            />
                            {errors.dateOfBirth && (
                                <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">Format: DD/MM/YYYY</p>
                        </div>

                        <div>
                            <label className="label">
                                Time of Birth <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="time"
                                name="timeOfBirth"
                                value={formData.timeOfBirth}
                                onChange={handleInputChange}
                                className={`input-field ${errors.timeOfBirth ? 'border-red-500' : ''}`}
                                step="1"
                            />
                            {errors.timeOfBirth && (
                                <p className="text-red-500 text-sm mt-1">{errors.timeOfBirth}</p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">Format: HH:MM:SS (24-hour)</p>
                        </div>
                    </div>

                    {/* Location Search */}
                    <div>
                        <label className="label">
                            Place of Birth <span className="text-red-500">*</span>
                        </label>
                        <LocationSearch
                            onLocationSelect={handleLocationSelect}
                            error={errors.location}
                        />
                        {formData.location && (
                            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-sm font-semibold text-green-800">
                                    Selected: {formData.location.name}
                                </p>
                                <p className="text-xs text-green-700 mt-1">
                                    Coordinates: {formData.location.lat.toFixed(2)}°N, {formData.location.lon.toFixed(2)}°E
                                    {formData.location.timezone && ` | Timezone: UTC${formData.location.timezone >= 0 ? '+' : ''}${formData.location.timezone}`}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-4">
                        <button
                            type="submit"
                            className="btn-primary text-lg px-12 py-4"
                        >
                            <span className="font-hindi">कुंडली बनाएं</span>
                            <span className="ml-2">Generate Kundali</span>
                        </button>
                    </div>
                </form>

                {/* Info Box */}
                <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-start">
                        <svg className="w-5 h-5 text-orange-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div className="text-sm text-orange-800">
                            <p className="font-semibold">Important:</p>
                            <ul className="list-disc list-inside mt-1 space-y-1">
                                <li>Ensure accurate birth time for precise calculations</li>
                                <li>Select the exact location from the dropdown</li>
                                <li>All fields marked with * are required</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
