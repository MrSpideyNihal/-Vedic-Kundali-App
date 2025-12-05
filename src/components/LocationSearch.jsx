import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

export default function LocationSearch({ onLocationSelect, error }) {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [showResults, setShowResults] = useState(false)
    const searchRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        if (query.length < 3) {
            setResults([])
            return
        }

        const timer = setTimeout(async () => {
            setLoading(true)
            try {
                // Using Nominatim (OpenStreetMap) API - free and no API key required
                const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                    params: {
                        q: query,
                        format: 'json',
                        addressdetails: 1,
                        limit: 10,
                    },
                    headers: {
                        'User-Agent': 'VedicKundaliApp/1.0'
                    }
                })

                const formattedResults = response.data.map(item => ({
                    name: item.display_name,
                    lat: parseFloat(item.lat),
                    lon: parseFloat(item.lon),
                    country: item.address?.country || '',
                    state: item.address?.state || '',
                    city: item.address?.city || item.address?.town || item.address?.village || '',
                }))

                setResults(formattedResults)
                setShowResults(true)
            } catch (err) {
                console.error('Location search error:', err)
                setResults([])
            } finally {
                setLoading(false)
            }
        }, 500)

        return () => clearTimeout(timer)
    }, [query])

    const handleSelect = (location) => {
        // Calculate timezone offset based on longitude (rough approximation)
        const timezone = Math.round(location.lon / 15)

        onLocationSelect({
            ...location,
            timezone,
        })
        setQuery(location.name)
        setShowResults(false)
    }

    const formatCoordinates = (lat, lon) => {
        const latDir = lat >= 0 ? 'N' : 'S'
        const lonDir = lon >= 0 ? 'E' : 'W'
        const latDeg = Math.floor(Math.abs(lat))
        const latMin = Math.round((Math.abs(lat) - latDeg) * 60)
        const lonDeg = Math.floor(Math.abs(lon))
        const lonMin = Math.round((Math.abs(lon) - lonDeg) * 60)
        return `${latDeg}${latDir}${latMin} ${lonDeg}${lonDir}${lonMin}`
    }

    return (
        <div ref={searchRef} className="relative">
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => results.length > 0 && setShowResults(true)}
                    className={`input-field pr-10 ${error ? 'border-red-500' : ''}`}
                    placeholder="Search for city, e.g., Chandrapur, Maharashtra, India"
                />
                {loading && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
                    </div>
                )}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}

            {showResults && results.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-xl max-h-96 overflow-y-auto">
                    {results.map((result, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => handleSelect(result)}
                            className="w-full text-left px-4 py-3 hover:bg-orange-50 border-b border-gray-100 last:border-b-0 transition-colors"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800 text-sm">
                                        {result.city || result.name.split(',')[0]}
                                    </p>
                                    <p className="text-xs text-gray-600 mt-0.5">
                                        {result.state && `${result.state}, `}{result.country}
                                    </p>
                                </div>
                                <div className="text-right ml-2">
                                    <p className="text-xs font-mono text-gray-500">
                                        {formatCoordinates(result.lat, result.lon)}
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {showResults && results.length === 0 && query.length >= 3 && !loading && (
                <div className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-xl p-4">
                    <p className="text-gray-500 text-sm text-center">
                        No locations found. Try a different search term.
                    </p>
                </div>
            )}
        </div>
    )
}
