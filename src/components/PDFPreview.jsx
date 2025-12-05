import { useState, useEffect } from 'react'

export default function PDFPreview({ pdfBlob, onBack }) {
    const [pdfUrl, setPdfUrl] = useState(null)

    useEffect(() => {
        if (pdfBlob) {
            const url = URL.createObjectURL(pdfBlob)
            setPdfUrl(url)
            return () => URL.revokeObjectURL(url)
        }
    }, [pdfBlob])

    const handleDownload = () => {
        const link = document.createElement('a')
        link.href = pdfUrl
        link.download = `Kundali_${new Date().getTime()}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="max-w-6xl mx-auto">
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
                        Back to Form
                    </button>

                    <button
                        onClick={handleDownload}
                        className="btn-primary flex items-center"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download PDF
                    </button>
                </div>

                {/* Success Message */}
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                        <svg className="w-6 h-6 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <h3 className="font-semibold text-green-800 font-hindi">
                                कुंडली सफलतापूर्वक बनाई गई!
                            </h3>
                            <p className="text-sm text-green-700">
                                Your Kundali has been generated successfully. Click the download button to save it.
                            </p>
                        </div>
                    </div>
                </div>

                {/* PDF Preview */}
                <div className="bg-gray-100 rounded-lg p-4">
                    <div className="bg-white rounded shadow-lg overflow-hidden">
                        {pdfUrl ? (
                            <iframe
                                src={pdfUrl}
                                className="w-full h-[800px] border-0"
                                title="Kundali PDF Preview"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-96">
                                <p className="text-gray-500">Loading PDF preview...</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Info */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start">
                        <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div className="text-sm text-blue-800">
                            <p className="font-semibold">Note:</p>
                            <p className="mt-1">
                                The PDF contains detailed Vedic astrology calculations including planetary positions,
                                charts, predictions, dashas, yogas, and remedies. All calculations are based on
                                Swiss Ephemeris for maximum accuracy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
