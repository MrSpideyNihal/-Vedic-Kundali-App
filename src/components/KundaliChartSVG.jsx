// SVG-based Kundali Chart Component (North Indian Rectangular Style)

export default function KundaliChartSVG({ kundaliData, chartType = 'lagna' }) {
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

    // Initialize houses
    const houses = Array(12).fill(null).map(() => [])

    // Place planets in houses
    if (chartType === 'lagna') {
        // Lagna chart - use actual house positions
        Object.entries(kundaliData.planets).forEach(([planet, data]) => {
            const houseIndex = data.house - 1
            houses[houseIndex].push(PLANET_SYMBOLS[planet])
        })
        // Add ascendant to first house
        houses[0].push('ल')
    } else if (chartType === 'navamsha') {
        // Navamsha chart - use proper backend navamsha calculations
        Object.entries(kundaliData.planets).forEach(([planet, data]) => {
            if (data.navamsha && data.navamsha.longitude !== undefined) {
                // Calculate which house this planet is in relative to Navamsha ascendant
                const navamshaAscLong = kundaliData.navamshaAscendant?.longitude || 0
                let diff = data.navamsha.longitude - navamshaAscLong
                if (diff < 0) diff += 360
                const houseIndex = Math.floor(diff / 30)
                houses[houseIndex].push(PLANET_SYMBOLS[planet])
            }
        })
        // Add ascendant marker to first house of D9
        if (kundaliData.navamshaAscendant) {
            houses[0].push('ल')
        }
    }

    // Rectangular chart dimensions
    const width = 600
    const height = 420
    const centerX = width / 2
    const centerY = height / 2

    // Diagonal line colors
    const colors = {
        topLeft: '#8B7355',
        topRight: '#FF8C42',
        bottomRight: '#4A90E2',
        bottomLeft: '#90EE90'
    }

    // House positions (North Indian rectangular style - matching reference)
    const housePositions = [
        { x: width - 60, y: centerY, label: '1' },           // House 1 - Right middle
        { x: width - 70, y: height - 70, label: '2' },       // House 2 - Right bottom
        { x: centerX + 120, y: height - 50, label: '3' },    // House 3 - Bottom right
        { x: centerX + 45, y: height - 50, label: '4' },     // House 4 - Bottom middle-right
        { x: centerX - 45, y: height - 50, label: '5' },     // House 5 - Bottom middle-left
        { x: centerX - 120, y: height - 50, label: '6' },    // House 6 - Bottom left
        { x: 60, y: centerY, label: '7' },                   // House 7 - Left middle
        { x: 70, y: 70, label: '8' },                        // House 8 - Left top
        { x: centerX - 120, y: 50, label: '9' },             // House 9 - Top left
        { x: centerX - 45, y: 50, label: '10' },             // House 10 - Top middle-left
        { x: centerX + 45, y: 50, label: '11' },             // House 11 - Top middle-right
        { x: centerX + 120, y: 50, label: '12' }             // House 12 - Top right
    ]

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
            {/* Outer rectangle */}
            <rect
                x="0" y="0"
                width={width}
                height={height}
                fill="white"
                stroke="#D4AF37"
                strokeWidth="3"
            />

            {/* Diagonal lines from corners to center */}
            <line x1="0" y1="0" x2={centerX} y2={centerY} stroke={colors.topLeft} strokeWidth="2" />
            <line x1={width} y1="0" x2={centerX} y2={centerY} stroke={colors.topRight} strokeWidth="2" />
            <line x1={width} y1={height} x2={centerX} y2={centerY} stroke={colors.bottomRight} strokeWidth="2" />
            <line x1="0" y1={height} x2={centerX} y2={centerY} stroke={colors.bottomLeft} strokeWidth="2" />

            {/* Middle horizontal and vertical lines */}
            <line x1="0" y1={centerY} x2={width} y2={centerY} stroke={colors.bottomRight} strokeWidth="2" />
            <line x1={centerX} y1="0" x2={centerX} y2={height} stroke={colors.bottomRight} strokeWidth="2" />

            {/* Additional diagonal lines for house divisions */}
            <line x1={width / 4} y1="0" x2="0" y2={height / 4} stroke={colors.bottomLeft} strokeWidth="2" />
            <line x1={width / 4} y1={height} x2="0" y2={height * 3 / 4} stroke={colors.bottomLeft} strokeWidth="2" />
            <line x1={width * 3 / 4} y1="0" x2={width} y2={height / 4} stroke={colors.topRight} strokeWidth="2" />
            <line x1={width * 3 / 4} y1={height} x2={width} y2={height * 3 / 4} stroke={colors.topRight} strokeWidth="2" />

            {/* House numbers and planets */}
            {housePositions.map((pos, index) => {
                const planets = houses[index] || []
                return (
                    <g key={index}>
                        {/* House number */}
                        <text
                            x={pos.x}
                            y={pos.y - 10}
                            fontSize="18"
                            fill="#4A90E2"
                            textAnchor="middle"
                            fontWeight="bold"
                        >
                            {pos.label}
                        </text>

                        {/* Planets in house */}
                        {planets.length > 0 && (
                            <text
                                x={pos.x}
                                y={pos.y + 15}
                                fontSize="20"
                                fill="#FF6B35"
                                textAnchor="middle"
                                fontWeight="bold"
                            >
                                {planets.join(' ')}
                            </text>
                        )}
                    </g>
                )
            })}
        </svg>
    )
}
