import { useState } from 'react'
import LoginPage from './components/LoginPage'
import KundaliForm from './components/KundaliForm'
import SettingsPage from './components/SettingsPage'
import KundaliDisplay from './components/KundaliDisplay'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [currentPage, setCurrentPage] = useState('home') // 'home', 'settings', 'result'
    const [kundaliData, setKundaliData] = useState(null)
    const [formData, setFormData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleLogin = () => {
        setIsLoggedIn(true)
    }

    const handleLogout = () => {
        setIsLoggedIn(false)
        setCurrentPage('home')
        setKundaliData(null)
        setFormData(null)
        setError(null)
    }

    const handleFormSubmit = async (data) => {
        setLoading(true)
        setError(null)

        try {
            // Call Netlify function to calculate kundali
            const response = await fetch('/.netlify/functions/calculate-kundali', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error('Failed to calculate kundali')
            }

            const kundali = await response.json()
            setKundaliData(kundali)
            setFormData(data)
            setCurrentPage('result')
        } catch (err) {
            console.error('Error generating kundali:', err)
            setError(err.message || 'Failed to generate kundali. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleDownloadPDF = async () => {
        try {
            // Generate PDF
            const { generatePDF } = await import('./utils/pdfGenerator')
            const blob = await generatePDF(kundaliData, formData)

            // Download the PDF
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `Kundali_${formData.firstName}_${formData.lastName}_${new Date().getTime()}.pdf`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
        } catch (err) {
            console.error('Error generating PDF:', err)
            alert('Failed to generate PDF. Please try again.')
        }
    }

    const handleBackToHome = () => {
        setCurrentPage('home')
        setKundaliData(null)
        setFormData(null)
        setError(null)
    }

    // Show login page if not logged in
    if (!isLoggedIn) {
        return <LoginPage onLogin={handleLogin} />
    }

    return (
        <div className="min-h-screen">
            {/* Header */}
            <header className="bg-gradient-orange shadow-lg">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="text-3xl">🕉️</div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-white font-hindi">
                                    रोडगे एस्ट्रो कुंडली
                                </h1>
                                <p className="text-orange-100 text-sm">Rodge Astro Software</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setCurrentPage('settings')}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                title="Settings"
                            >
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                title="Logout"
                            >
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {loading && <LoadingSpinner />}

                {error && (
                    <div className="max-w-2xl mx-auto mb-6">
                        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                            <div className="flex items-start">
                                <svg className="w-6 h-6 text-red-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <h3 className="font-semibold text-red-800">Error</h3>
                                    <p className="text-red-700">{error}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {!loading && currentPage === 'home' && (
                    <KundaliForm onSubmit={handleFormSubmit} />
                )}

                {!loading && currentPage === 'settings' && (
                    <SettingsPage onBack={() => setCurrentPage('home')} />
                )}

                {!loading && currentPage === 'result' && kundaliData && (
                    <KundaliDisplay
                        kundaliData={kundaliData}
                        formData={formData}
                        onBack={handleBackToHome}
                        onDownloadPDF={handleDownloadPDF}
                    />
                )}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 mt-16">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm">
                        © 2025 Rodge Astro Software. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                        Developed by Nihal Rodge | Powered by Vedic Astrology
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default App
