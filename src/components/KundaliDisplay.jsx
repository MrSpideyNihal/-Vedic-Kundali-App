import { useState } from 'react'

export default function KundaliDisplay({ kundaliData, formData, onBack, onDownloadPDF }) {
    const [downloading, setDownloading] = useState(false)

    const handleDownload = async () => {
        setDownloading(true)
        try {
            await onDownloadPDF()
        } finally {
            setDownloading(false)
        }
    }

    const ZODIAC_HINDI = {
        Aries: 'मेष',
        Taurus: 'वृषभ',
        Gemini: 'मिथुन',
        Cancer: 'कर्क',
        Leo: 'सिंह',
        Virgo: 'कन्या',
        Libra: 'तुला',
        Scorpio: 'वृश्चिक',
        Sagittarius: 'धनु',
        Capricorn: 'मकर',
        Aquarius: 'कुंभ',
        Pisces: 'मीन'
    }

    const PLANET_SYMBOLS = {
        Sun: 'सु',
        Moon: 'च',
        Mars: 'मं',
        Mercury: 'बु',
        Jupiter: 'गु',
        Venus: 'शु',
        Saturn: 'श',
        Rahu: 'रा',
        Ketu: 'के'
    }

    const fullName = `${formData.firstName} ${formData.middleName || ''} ${formData.lastName}`.toUpperCase()

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header Actions */}
            <div className="flex items-center justify-between mb-6">
                <button
                    onClick={onBack}
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    New Kundali
                </button>

                <button
                    onClick={handleDownload}
                    disabled={downloading}
                    className="btn-primary flex items-center"
                >
                    {downloading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Generating PDF...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download PDF
                        </>
                    )}
                </button>
            </div>

            {/* Main Kundali Display */}
            <div className="space-y-6">
                {/* Birth Details Card */}
                <div className="card">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold text-primary-600 font-hindi mb-2">
                            {fullName}
                        </h2>
                        <p className="text-gray-600">
                            {formData.dateOfBirth} • {formData.timeOfBirth} • {formData.location.city || formData.location.name.split(',')[0]}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Ascendant / लग्न</p>
                            <p className="text-2xl font-bold text-primary-600">
                                {ZODIAC_HINDI[kundaliData.ascendant.sign]}
                            </p>
                            <p className="text-sm text-gray-500">{kundaliData.ascendant.sign}</p>
                        </div>

                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Moon Sign / चंद्र राशि</p>
                            <p className="text-2xl font-bold text-accent-600">
                                {ZODIAC_HINDI[kundaliData.moonSign.sign]}
                            </p>
                            <p className="text-sm text-gray-500">{kundaliData.moonSign.sign}</p>
                        </div>

                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Sun Sign / सूर्य राशि</p>
                            <p className="text-2xl font-bold text-primary-600">
                                {ZODIAC_HINDI[kundaliData.sunSign.sign]}
                            </p>
                            <p className="text-sm text-gray-500">{kundaliData.sunSign.sign}</p>
                        </div>
                    </div>
                </div>

                {/* Nakshatra & Panchang */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="card">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 font-hindi">जन्म नक्षत्र</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Nakshatra:</span>
                                <span className="font-semibold">{kundaliData.nakshatra.name}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Pada:</span>
                                <span className="font-semibold">{kundaliData.nakshatra.pada}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Lord:</span>
                                <span className="font-semibold">{kundaliData.nakshatra.lord}</span>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 font-hindi">पंचांग</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tithi:</span>
                                <span className="font-semibold">{kundaliData.panchang.tithi}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Weekday:</span>
                                <span className="font-semibold">{kundaliData.panchang.weekday}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Karana:</span>
                                <span className="font-semibold">{kundaliData.panchang.karana}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Yoga:</span>
                                <span className="font-semibold">{kundaliData.panchang.yoga}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Planetary Positions */}
                <div className="card">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 font-hindi">ग्रह स्थिति</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-primary-500 text-white">
                                    <th className="px-4 py-3 text-left">Planet</th>
                                    <th className="px-4 py-3 text-left">Sign</th>
                                    <th className="px-4 py-3 text-left">Degree</th>
                                    <th className="px-4 py-3 text-left">House</th>
                                    <th className="px-4 py-3 text-left">Nakshatra</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(kundaliData.planets).map(([planet, data], index) => (
                                    <tr key={planet} className={index % 2 === 0 ? 'bg-orange-50' : 'bg-white'}>
                                        <td className="px-4 py-3 font-semibold">
                                            {PLANET_SYMBOLS[planet]} {planet}
                                        </td>
                                        <td className="px-4 py-3">
                                            {ZODIAC_HINDI[data.sign]} ({data.sign})
                                        </td>
                                        <td className="px-4 py-3">{data.degree.toFixed(2)}°</td>
                                        <td className="px-4 py-3">{data.house}</td>
                                        <td className="px-4 py-3">{data.nakshatra} - {data.pada}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Current Dasha */}
                <div className="card">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 font-hindi">विम्शोत्तरी दशा</h3>
                    <div className="bg-gradient-orange text-white p-6 rounded-lg mb-4">
                        <p className="text-sm opacity-90 mb-2">Current Mahadasha</p>
                        <p className="text-3xl font-bold">{kundaliData.currentDasha.planet}</p>
                        <p className="text-sm mt-2">
                            Balance: {kundaliData.currentDasha.balance.years}Y {kundaliData.currentDasha.balance.months}M {kundaliData.currentDasha.balance.days}D
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2 text-left">Planet</th>
                                    <th className="px-4 py-2 text-left">Start Date</th>
                                    <th className="px-4 py-2 text-left">End Date</th>
                                    <th className="px-4 py-2 text-left">Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kundaliData.dashaSequence.slice(0, 5).map((dasha, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="px-4 py-2 font-semibold">{dasha.planet}</td>
                                        <td className="px-4 py-2">{dasha.startDate}</td>
                                        <td className="px-4 py-2">{dasha.endDate}</td>
                                        <td className="px-4 py-2">{dasha.years} years</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Yogas and Doshas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="card">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 font-hindi">योग</h3>
                        {kundaliData.yogas.length > 0 ? (
                            <ul className="space-y-2">
                                {kundaliData.yogas.map((yoga, index) => (
                                    <li key={index} className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span>{yoga}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No major yogas detected</p>
                        )}
                    </div>

                    <div className="card">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 font-hindi">दोष</h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                <span>Mangal Dosha</span>
                                <span className={`font-semibold ${kundaliData.doshas.mangal ? 'text-red-600' : 'text-green-600'}`}>
                                    {kundaliData.doshas.mangal ? 'Present' : 'Not Present'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                <span>Kaal Sarp Dosha</span>
                                <span className={`font-semibold ${kundaliData.doshas.kaalSarp ? 'text-red-600' : 'text-green-600'}`}>
                                    {kundaliData.doshas.kaalSarp ? 'Present' : 'Not Present'}
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                <span>Sade Sati</span>
                                <span className={`font-semibold ${kundaliData.doshas.sadeSati ? 'text-orange-600' : 'text-green-600'}`}>
                                    {kundaliData.doshas.sadeSati ? 'Active' : 'Not Active'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Download Reminder */}
                <div className="card bg-gradient-orange text-white text-center">
                    <p className="text-lg mb-4">
                        Want a detailed PDF report with predictions, charts, and remedies?
                    </p>
                    <button
                        onClick={handleDownload}
                        disabled={downloading}
                        className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
                    >
                        {downloading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600 mr-2"></div>
                                Generating...
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download Complete PDF Report
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}
