// SVG-based Kundali Chart Component (North Indian Diamond Style - EXACT Dhruv Astro Match)

export default function KundaliChartSVG({ kundaliData, chartType = 'lagna' }) {
    const PLANET_SYMBOLS = {
        Sun: 'सू',
        Moon: 'च',
        Mars: 'मं',
        Mercury: 'बु',
        Jupiter: 'गु',
        Venus: 'शु',
        Saturn: 'श',
        Rahu: 'रा',
        Ketu: 'के'
    }

    const SIGN_SYMBOLS = {
        'Aries': 'मे',
        'Taurus': 'वृ',
        'Gemini': 'मि',
        'Cancer': 'कर',
        'Leo': 'सि',
        'Virgo': 'कन',
        'Libra': 'तु',
        'Scorpio': 'वृश',
        'Sagittarius': 'ध',
        'Capricorn': 'मक',
        'Aquarius': 'कुं',
        'Pisces': 'मी'
    }

    // Initialize houses - store planets and signs
    const houses = Array(12).fill(null).map(() => ({ planets: [], sign: '' }))

    // Place planets and signs in houses
    if (chartType === 'lagna') {
        Object.entries(kundaliData.planets).forEach(([planet, data]) => {
            const houseIndex = data.house - 1
            houses[houseIndex].planets.push(PLANET_SYMBOLS[planet])
            if (!houses[houseIndex].sign) {
                houses[houseIndex].sign = SIGN_SYMBOLS[data.sign]
            }
        })
        houses[0].planets.push('ल')
        if (kundaliData.ascendant) {
            houses[0].sign = SIGN_SYMBOLS[kundaliData.ascendant.sign]
        }
    } else if (chartType === 'navamsha') {
        Object.entries(kundaliData.planets).forEach(([planet, data]) => {
            if (data.navamsha && data.navamsha.longitude !== undefined) {
                const navamshaAscLong = kundaliData.navamshaAscendant?.longitude || 0
                let diff = data.navamsha.longitude - navamshaAscLong
                if (diff < 0) diff += 360
                const houseIndex = Math.floor(diff / 30)
                houses[houseIndex].planets.push(PLANET_SYMBOLS[planet])
                if (!houses[houseIndex].sign && data.navamsha.sign) {
                    houses[houseIndex].sign = SIGN_SYMBOLS[data.navamsha.sign]
                }
            }
        })
        if (kundaliData.navamshaAscendant) {
            houses[0].planets.push('ल')
            const navSign = Math.floor(kundaliData.navamshaAscendant.longitude / 30)
            const signs = Object.keys(SIGN_SYMBOLS)
            houses[0].sign = SIGN_SYMBOLS[signs[navSign]]
        }
    }

    const width = 470
    const height = 470
    const centerX = width / 2
    const centerY = height / 2
    const outerRadius = 195

    // Diamond corners
    const T = { x: centerX, y: centerY - outerRadius }        // Top
    const R = { x: centerX + outerRadius, y: centerY }        // Right
    const B = { x: centerX, y: centerY + outerRadius }        // Bottom
    const L = { x: centerX - outerRadius, y: centerY }        // Left

    // Inner diamond points (for houses 9, 10, 11, 12 in center)
    const innerRadius = outerRadius * 0.42
    const IT = { x: centerX, y: centerY - innerRadius }
    const IR = { x: centerX + innerRadius, y: centerY }
    const IB = { x: centerX, y: centerY + innerRadius }
    const IL = { x: centerX - innerRadius, y: centerY }

    // EXACT North Indian house layout matching Dhruv Astro
    // Outer houses: 1-8, Inner houses: 9-12
    const houseLayout = [
        // House 1 - RIGHT side (Lagna)
        {
            number: 1,
            textPos: { x: R.x - 35, y: centerY + 5 },
            planetPos: { x: R.x - 60, y: centerY + 5 },
            signPos: { x: R.x - 20, y: centerY - 25 }
        },
        // House 2 - Top-Right corner
        {
            number: 2,
            textPos: { x: centerX + outerRadius * 0.55, y: centerY - outerRadius * 0.45 },
            planetPos: { x: centerX + outerRadius * 0.55, y: centerY - outerRadius * 0.3 },
            signPos: { x: centerX + outerRadius * 0.75, y: centerY - outerRadius * 0.7 }
        },
        // House 3 - Top area (upper right quadrant)
        {
            number: 3,
            textPos: { x: centerX + outerRadius * 0.22, y: centerY - outerRadius * 0.65 },
            planetPos: { x: centerX + outerRadius * 0.22, y: centerY - outerRadius * 0.5 },
            signPos: { x: centerX + outerRadius * 0.35, y: centerY - outerRadius * 0.85 }
        },
        // House 4 - TOP point
        {
            number: 4,
            textPos: { x: centerX - outerRadius * 0.22, y: centerY - outerRadius * 0.65 },
            planetPos: { x: centerX - outerRadius * 0.22, y: centerY - outerRadius * 0.5 },
            signPos: { x: T.x - 5, y: T.y - 15 }
        },
        // House 5 - Top-Left area
        {
            number: 5,
            textPos: { x: centerX - outerRadius * 0.55, y: centerY - outerRadius * 0.45 },
            planetPos: { x: centerX - outerRadius * 0.55, y: centerY - outerRadius * 0.3 },
            signPos: { x: centerX - outerRadius * 0.75, y: centerY - outerRadius * 0.7 }
        },
        // House 6 - LEFT-Top corner
        {
            number: 6,
            textPos: { x: L.x + 35, y: centerY - 40 },
            planetPos: { x: L.x + 60, y: centerY - 25 },
            signPos: { x: L.x + 20, y: centerY - 65 }
        },
        // House 7 - LEFT side (opposite lagna)
        {
            number: 7,
            textPos: { x: L.x + 35, y: centerY + 40 },
            planetPos: { x: L.x + 60, y: centerY + 25 },
            signPos: { x: L.x + 20, y: centerY + 65 }
        },
        // House 8 - Bottom-Left corner
        {
            number: 8,
            textPos: { x: centerX - outerRadius * 0.55, y: centerY + outerRadius * 0.45 },
            planetPos: { x: centerX - outerRadius * 0.55, y: centerY + outerRadius * 0.3 },
            signPos: { x: centerX - outerRadius * 0.75, y: centerY + outerRadius * 0.7 }
        },
        // House 9 - Inner Top-Left
        {
            number: 9,
            textPos: { x: centerX - innerRadius * 0.5, y: centerY - innerRadius * 0.5 },
            planetPos: { x: centerX - innerRadius * 0.5, y: centerY - innerRadius * 0.35 },
            signPos: { x: centerX - innerRadius * 0.7, y: centerY - innerRadius * 0.75 }
        },
        // House 10 - Inner TOP
        {
            number: 10,
            textPos: { x: centerX, y: centerY - innerRadius * 0.7 },
            planetPos: { x: centerX, y: centerY - innerRadius * 0.55 },
            signPos: { x: centerX, y: centerY - innerRadius * 0.9 }
        },
        // House 11 - Inner Top-Right
        {
            number: 11,
            textPos: { x: centerX + innerRadius * 0.5, y: centerY - innerRadius * 0.5 },
            planetPos: { x: centerX + innerRadius * 0.5, y: centerY - innerRadius * 0.35 },
            signPos: { x: centerX + innerRadius * 0.7, y: centerY - innerRadius * 0.75 }
        },
        // House 12 - Inner Right
        {
            number: 12,
            textPos: { x: centerX + innerRadius * 0.6, y: centerY + innerRadius * 0.2 },
            planetPos: { x: centerX + innerRadius * 0.6, y: centerY + innerRadius * 0.35 },
            signPos: { x: centerX + innerRadius * 0.8, y: centerY + innerRadius * 0.5 }
        }
    ]

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
            {/* Outer diamond */}
            <polygon
                points={`${T.x},${T.y} ${R.x},${R.y} ${B.x},${B.y} ${L.x},${L.y}`}
                fill="#FFFEF8"
                stroke="#D4AF37"
                strokeWidth="2.5"
            />

            {/* Main cross lines */}
            <line x1={L.x} y1={L.y} x2={R.x} y2={R.y} stroke="#6BA3D4" strokeWidth="2" />
            <line x1={T.x} y1={T.y} x2={B.x} y2={B.y} stroke="#6BA3D4" strokeWidth="2" />

            {/* Inner diamond */}
            <polygon
                points={`${IT.x},${IT.y} ${IR.x},${IR.y} ${IB.x},${IB.y} ${IL.x},${IL.y}`}
                fill="none"
                stroke="#A8C5E0"
                strokeWidth="1.5"
            />

            {/* Diagonal lines from corners to inner diamond */}
            <line x1={T.x} y1={T.y} x2={IL.x} y2={IL.y} stroke="#C4B99D" strokeWidth="1.3" />
            <line x1={T.x} y1={T.y} x2={IR.x} y2={IR.y} stroke="#FFB380" strokeWidth="1.3" />
            <line x1={B.x} y1={B.y} x2={IL.x} y2={IL.y} stroke="#B4D4B4" strokeWidth="1.3" />
            <line x1={B.x} y1={B.y} x2={IR.x} y2={IR.y} stroke="#6BA3D4" strokeWidth="1.3" />

            {/* House numbers, planets, and signs */}
            {houseLayout.map((house, idx) => {
                const houseData = houses[idx]
                return (
                    <g key={idx}>
                        {/* House number */}
                        <text
                            x={house.textPos.x}
                            y={house.textPos.y}
                            fontSize="15"
                            fill="#555"
                            textAnchor="middle"
                            fontWeight="600"
                        >
                            {house.number}
                        </text>

                        {/* Sign symbol */}
                        {houseData.sign && (
                            <text
                                x={house.signPos.x}
                                y={house.signPos.y}
                                fontSize="16"
                                fill="#FF8834"
                                textAnchor="middle"
                                fontWeight="700"
                                fontFamily="Noto Sans Devanagari, sans-serif"
                            >
                                {houseData.sign}
                            </text>
                        )}

                        {/* Planets */}
                        {houseData.planets.length > 0 && (
                            <text
                                x={house.planetPos.x}
                                y={house.planetPos.y}
                                fontSize="17"
                                fill="#FF6B35"
                                textAnchor="middle"
                                fontWeight="bold"
                                fontFamily="Noto Sans Devanagari, sans-serif"
                            >
                                {houseData.planets.join(' ')}
                            </text>
                        )}
                    </g>
                )
            })}
        </svg>
    )
}
