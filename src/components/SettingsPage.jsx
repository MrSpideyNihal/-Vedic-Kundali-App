import { useState, useEffect } from 'react'

export default function SettingsPage({ onBack }) {
    const [settings, setSettings] = useState({
        astrologerName: '',
        email: '',
        phone: '',
        address: '',
        softwareName: 'Rodge Astro Software', // Locked
        developer: 'Nihal Rodge', // Locked
        copyrightYear: new Date().getFullYear(),
    })

    const [saved, setSaved] = useState(false)

    useEffect(() => {
        // Load settings from localStorage
        const savedSettings = localStorage.getItem('kundaliSettings')
        if (savedSettings) {
            try {
                const parsed = JSON.parse(savedSettings)
                setSettings({
                    ...parsed,
                    softwareName: 'Rodge Astro Software', // Always locked
                    developer: 'Nihal Rodge', // Always locked
                    copyrightYear: new Date().getFullYear(),
                })
            } catch (err) {
                console.error('Error loading settings:', err)
            }
        }
    }, [])

    const handleSave = () => {
        // Save to localStorage with locked values
        const settingsToSave = {
            ...settings,
            softwareName: 'Rodge Astro Software',
            developer: 'Nihal Rodge',
        }
        localStorage.setItem('kundaliSettings', JSON.stringify(settingsToSave))
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="card">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
                    <button
                        onClick={onBack}
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Software Info (Read-only) */}
                    <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Software Information (Locked)
                        </h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Software Name:</span>
                                <span className="font-semibold text-primary-600">Rodge Astro Software</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Developer:</span>
                                <span className="font-semibold text-primary-600">Nihal Rodge</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Copyright Year:</span>
                                <span className="font-semibold">2025</span>
                            </div>
                        </div>
                    </div>

                    {/* Astrologer Name (Editable) */}
                    <div>
                        <label className="label">Astrologer Name *</label>
                        <input
                            type="text"
                            value={settings.astrologerName}
                            onChange={(e) => setSettings({ ...settings, astrologerName: e.target.value })}
                            className="input-field"
                            placeholder="Enter astrologer name"
                        />
                        <p className="text-xs text-gray-500 mt-1">This name will appear on the PDF report</p>
                    </div>

                    <div>
                        <label className="label">Email</label>
                        <input
                            type="email"
                            value={settings.email}
                            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                            className="input-field"
                            placeholder="astrologer@example.com"
                        />
                    </div>

                    <div>
                        <label className="label">Phone</label>
                        <input
                            type="tel"
                            value={settings.phone}
                            onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                            className="input-field"
                            placeholder="+91 XXXXXXXXXX"
                        />
                    </div>

                    <div>
                        <label className="label">Address</label>
                        <textarea
                            value={settings.address}
                            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                            className="input-field"
                            rows="3"
                            placeholder="Enter address (supports Hindi)"
                        />
                    </div>

                    {saved && (
                        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                            <p className="text-green-700 text-center font-semibold">
                                ✓ Settings saved successfully!
                            </p>
                        </div>
                    )}

                    <div className="flex space-x-4">
                        <button
                            onClick={handleSave}
                            className="btn-primary flex-1"
                        >
                            <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                            </svg>
                            Save Settings
                        </button>
                        <button
                            onClick={onBack}
                            className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
