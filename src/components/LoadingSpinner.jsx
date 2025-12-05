export default function LoadingSpinner() {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4">
                <div className="text-center">
                    {/* Animated Om Symbol */}
                    <div className="text-6xl mb-4 animate-pulse">
                        🕉️
                    </div>

                    {/* Spinner */}
                    <div className="flex justify-center mb-4">
                        <div className="relative w-16 h-16">
                            <div className="absolute inset-0 border-4 border-orange-200 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
                        </div>
                    </div>

                    {/* Text */}
                    <h3 className="text-xl font-bold text-gray-800 mb-2 font-hindi">
                        कुंडली बनाई जा रही है...
                    </h3>
                    <p className="text-gray-600 mb-4">
                        Generating your Kundali
                    </p>

                    {/* Progress Steps */}
                    <div className="space-y-2 text-sm text-left">
                        <div className="flex items-center text-green-600">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Calculating planetary positions
                        </div>
                        <div className="flex items-center text-green-600">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Computing houses and dashas
                        </div>
                        <div className="flex items-center text-orange-600 animate-pulse">
                            <div className="w-5 h-5 mr-2 border-2 border-orange-600 rounded-full border-t-transparent animate-spin"></div>
                            Generating PDF report
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-6">
                        This may take a few moments...
                    </p>
                </div>
            </div>
        </div>
    )
}
