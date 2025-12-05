import { useState, useEffect } from 'react'

const DEFAULT_SETTINGS = {
    astrologerName: 'ACHARYA.PT.BHANUPRATAP UPADHYAY',
    email: '',
    phone: '9206300143, 9211111262',
    address: 'श्री संकटमोचन हनुमान मंदिर राजुरा, चंद्रपुर, महाराष्ट्र, ४४२९०५',
    softwareName: 'Dhruv Astro Software',
    copyrightYear: new Date().getFullYear(),
}

export default function SettingsPage({ onBack }) {
    const [settings, setSettings] = useState(DEFAULT_SETTINGS)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        // Load settings from localStorage
        const savedSettings = localStorage.getItem('kundaliSettings')
        if (savedSettings) {
            try {
                setSettings(JSON.parse(savedSettings))
            } catch (err) {
                console.error('Error loading settings:', err)
            }
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setSettings(prev => ({
            ...prev,
            [name]: value
        }))
        setSaved(false)
    }

    const handleSave = () => {
        localStorage.setItem('kundaliSettings', JSON.stringify(settings))
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
    }

    const handleReset = () => {
        if (confirm('Are you sure you want to reset to default settings?')) {
            setSettings(DEFAULT_SETTINGS)
            localStorage.removeItem('kundaliSettings')
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="card">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={onBack}
                        className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                    </button>

                    <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
                    <div className="w-20"></div> {/* Spacer for centering */}
                </div>

                {/* Success Message */}
                {saved && (
                    <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-lg p-4">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <p className="text-green-800 font-semibold">Settings saved successfully!</p>
                        </div>
                    </div>
                )}

                {/* Form */}
                <div className="space-y-6">
                    <div>
                        <label className="label">Astrologer Name</label>
                        <input
                            type="text"
                            name="astrologerName"
                            value={settings.astrologerName}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="e.g., ACHARYA.PT.BHANUPRATAP UPADHYAY"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            This name will appear on the PDF cover page
                        </p>
                    </div>

                    <div>
                        <label className="label">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={settings.email}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="astrologer@example.com"
                        />
                    </div>

                    <div>
                        <label className="label">Phone Number(s)</label>
                        <input
                            type="text"
                            name="phone"
                            value={settings.phone}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="e.g., 9206300143, 9211111262"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Separate multiple numbers with commas
                        </p>
                    </div>

                    <div>
                        <label className="label">Address (Hindi/English)</label>
                        <textarea
                            name="address"
                            value={settings.address}
                            onChange={handleChange}
                            className="input-field"
                            rows="3"
                            placeholder="Enter your address in Hindi or English"
                        />
                    </div>

                    <div>
                        <label className="label">Software Name</label>
                        <input
                            type="text"
                            name="softwareName"
                            value={settings.softwareName}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="e.g., Dhruv Astro Software"
                        />
                    </div>

                    <div>
                        <label className="label">Copyright Year</label>
                        <input
                            type="number"
                            name="copyrightYear"
                            value={settings.copyrightYear}
                            onChange={handleChange}
                            className="input-field"
                            min="2000"
                            max="2100"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={handleSave}
                            className="btn-primary flex-1"
                        >
                            Save Settings
                        </button>
                        <button
                            onClick={handleReset}
                            className="btn-secondary"
                        >
                            Reset to Default
                        </button>
                    </div>
                </div>

                {/* Info */}
                <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-start">
                        <svg className="w-5 h-5 text-orange-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div className="text-sm text-orange-800">
                            <p className="font-semibold">Note:</p>
                            <p className="mt-1">
                                These settings will be used in all generated Kundali PDFs.
                                Settings are saved in your browser's local storage.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
