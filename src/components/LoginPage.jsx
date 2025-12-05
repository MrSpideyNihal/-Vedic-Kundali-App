import { useState } from 'react'

export default function LoginPage({ onLogin }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        // Check credentials
        if (username === 'NihalRodgeAdmin' && password === 'Nihal@9322161961') {
            onLogin()
        } else {
            setError('Invalid username or password')
            setPassword('')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-100">
            <div className="max-w-md w-full mx-4">
                <div className="card">
                    {/* Logo/Header */}
                    <div className="text-center mb-8">
                        <div className="text-6xl mb-4">🕉️</div>
                        <h1 className="text-3xl font-bold text-primary-600 font-hindi mb-2">
                            रोडगे एस्ट्रो
                        </h1>
                        <h2 className="text-xl font-semibold text-gray-700 mb-1">
                            Rodge Astro Software
                        </h2>
                        <p className="text-sm text-gray-500">
                            Vedic Kundali Generation System
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="label">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="input-field"
                                placeholder="Enter username"
                                required
                                autoComplete="username"
                            />
                        </div>

                        <div>
                            <label className="label">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                                placeholder="Enter password"
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3">
                                <p className="text-red-700 text-sm text-center">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn-primary w-full"
                        >
                            <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                            </svg>
                            Login to System
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <p className="text-xs text-gray-500 text-center">
                            Developed by <span className="font-semibold text-primary-600">Nihal Rodge</span>
                        </p>
                        <p className="text-xs text-gray-400 text-center mt-1">
                            © 2025 Rodge Astro Software. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
