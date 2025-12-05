import { useState } from 'react'
import KundaliChartSVG from './KundaliChartSVG'

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

                {/* Kundali Charts */}
                <div className="card">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 font-hindi">कुंडली चक्र</h3>
                    <p className="text-gray-600 mb-6">North Indian Style Charts</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Lagna Chart */}
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-3 text-center">Lagna Kundali (D1)</h4>
                            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-lg">
                                <KundaliChartSVG kundaliData={kundaliData} chartType="lagna" />
                            </div>
                        </div>

                        {/* Navamsha Chart */}
                        <div>
                            <h4 className="font-semibold text-gray-700 mb-3 text-center">Navamsha (D9)</h4>
                            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg">
                                <KundaliChartSVG kundaliData={kundaliData} chartType="navamsha" />
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
 
