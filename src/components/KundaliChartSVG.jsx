// SVG-based Kundali Chart Component (North Indian Style)

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
        // Navamsha chart - simplified calculation
        Object.entries(kundaliData.planets).forEach(([planet, data]) => {
            const navamshaHouse = calculateNavamshaHouse(data.degree, data.sign)
            houses[navamshaHouse].push(PLANET_SYMBOLS[planet])
        })
    }

    // North Indian chart layout positions
    // Diamond shape with 12 houses
    const housePositions = [
        { x: 200, y: 50, label: '1' },   // Top right
        { x: 250, y: 100, label: '2' },  // Right upper
        { x: 250, y: 150, label: '3' },  // Right middle
        { x: 200, y: 200, label: '4' },  // Bottom right
        { x: 150, y: 250, label: '5' },  // Bottom middle-right
        { x: 100, y: 250, label: '6' },  // Bottom middle-left
        { x: 50, y: 200, label: '7' },   // Bottom left
        { x: 0, y: 150, label: '8' },    // Left middle
        { x: 0, y: 100, label: '9' },    // Left upper
        { x: 50, y: 50, label: '10' },   // Top left
        { x: 100, y: 0, label: '11' },   // Top middle-left
        { x: 150, y: 0, label: '12' }    // Top middle-right
    ]

    return (
        <svg viewBox="-10 -10 270 270" className="w-full h-auto">
            {/* Diamond outline */}
            <path
                d="M 125,0 L 250,125 L 125,250 L 0,125 Z"
                fill="white"
                stroke="#f97316"
                strokeWidth="2"
            />

            {/* Inner divisions */}
            <line x1="125" y1="0" x2="125" y2="250" stroke="#f97316" strokeWidth="1" />
            <line x1="0" y1="125" x2="250" y2="125" stroke="#f97316" strokeWidth="1" />
            <line x1="62.5" y1="62.5" x2="187.5" y2="187.5" stroke="#f97316" strokeWidth="1" />
            <line x1="187.5" y1="62.5" x2="62.5" y2="187.5" stroke="#f97316" strokeWidth="1" />

            {/* House numbers and planets */}
            {housePositions.map((pos, index) => {
                const planets = houses[index] || []
                return (
                    <g key={index}>
                        {/* House number */}
                        <text
                            x={pos.x}
                            y={pos.y + 5}
                            fontSize="10"
                            fill="#666"
                            textAnchor="middle"
                            fontWeight="bold"
                        >
                            {pos.label}
                        </text>

                        {/* Planets in house */}
                        {planets.length > 0 && (
                            <text
                                x={pos.x}
                                y={pos.y + 20}
                                fontSize="14"
                                fill="#f97316"
                                textAnchor="middle"
                                fontWeight="bold"
                            >
                                {planets.join(' ')}
                            </text>
                        )}
                    </g>
                )
            })}

            {/* Center decoration */}
            <circle cx="125" cy="125" r="15" fill="#fff7ed" stroke="#f97316" strokeWidth="1" />
            <text
                x="125"
                y="132"
                fontSize="16"
                fill="#f97316"
                textAnchor="middle"
                fontWeight="bold"
            >
                ॐ
            </text>
        </svg>
    )
}

function calculateNavamshaHouse(degree, sign) {
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
        'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
    const signIndex = signs.indexOf(sign)
    const navamshaIndex = Math.floor(degree / 3.333333)
    const navamshaSign = (signIndex * 9 + navamshaIndex) % 12
    return navamshaSign
}
