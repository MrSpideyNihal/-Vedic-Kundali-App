// SVG-based Kundali Chart Component (North Indian Diamond/Rhombus Style - Dhruv Astro Format)

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

    // Initialize houses with planets and signs
    const houses = Array(12).fill(null).map(() => ({ planets: [], sign: '' }))

    // Place planets and signs in houses
    if (chartType === 'lagna') {
        // Lagna chart - use actual house positions
        Object.entries(kundaliData.planets).forEach(([planet, data]) => {
            const houseIndex = data.house - 1
            houses[houseIndex].planets.push(PLANET_SYMBOLS[planet])
            if (!houses[houseIndex].sign) {
                houses[houseIndex].sign = SIGN_SYMBOLS[data.sign]
            }
        })
        // Add ascendant marker and sign to first house
        houses[0].planets.push('ल')
        if (kundaliData.ascendant) {
            houses[0].sign = SIGN_SYMBOLS[kundaliData.ascendant.sign]
        }
    } else if (chartType === 'navamsha') {
        // Navamsha chart
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

    // Diamond chart dimensions
    const width = 460
    const height = 460
    const centerX = width / 2
    const centerY = height / 2
    const radius = 190

    // Diamond corners
    const corners = {
        top: { x: centerX, y: centerY - radius },
        right: { x: centerX + radius, y: centerY },
        bottom: { x: centerX, y: centerY + radius },
        left: { x: centerX - radius, y: centerY }
    }

    // House positions matching Dhruv Astro diamond layout
    const houseData = [
        // House 1 - Right (Lagna) 
        { center: { x: centerX + radius * 0.65, y: centerY }, signPos: { x: centerX + radius * 0.85, y: centerY - 5 } },
        // House 2 - Top-Right
        { center: { x: centerX + radius * 0.42, y: centerY - radius * 0.42 }, signPos: { x: centerX + radius * 0.65, y: centerY - radius * 0.65 } },
        // House 3 - Top (mid-upper)
        { center: { x: centerX, y: centerY - radius * 0.52 }, signPos: { x: centerX + 15, y: centerY - radius * 0.75 } },
        // House 4 - Top-Left
        { center: { x: centerX - radius * 0.42, y: centerY - radius * 0.42 }, signPos: { x: centerX - radius * 0.65, y: centerY - radius * 0.65 } },
        // House 5 - Left (mid-upper)
        { center: { x: centerX - radius * 0.65, y: centerY }, signPos: { x: centerX - radius * 0.85, y: centerY - 5 } },
        // House 6 - Left-Bottom
        { center: { x: centerX - radius * 0.42, y: centerY + radius * 0.42 }, signPos: { x: centerX - radius * 0.65, y: centerY + radius * 0.65 } },
        // House 7 - Bottom (opposite lagna)
        { center: { x: centerX, y: centerY + radius * 0.52 }, signPos: { x: centerX - 15, y: centerY + radius * 0.75 } },
        // House 8 - Bottom-Right
        { center: { x: centerX + radius * 0.42, y: centerY + radius * 0.42 }, signPos: { x: centerX + radius * 0.65, y: centerY + radius * 0.65 } },
        // House 9 - Inner Top-Left
        { center: { x: centerX - radius * 0.25, y: centerY - radius * 0.30 }, signPos: { x: centerX - radius * 0.35, y: centerY - radius * 0.48 } },
        // House 10 - Inner Top
        { center: { x: centerX, y: centerY - radius * 0.15 }, signPos: { x: centerX, y: centerY - radius * 0.35 } },
        // House 11 - Inner Top-Right
        { center: { x: centerX + radius * 0.25, y: centerY - radius * 0.30 }, signPos: { x: centerX + radius * 0.35, y: centerY - radius * 0.48 } },
        // House 12 - Inner Right
        { center: { x: centerX + radius * 0.25, y: centerY + radius * 0.30 }, signPos: { x: centerX + radius * 0.35, y: centerY + radius * 0.48 } }
    ]

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
            {/* Outer diamond border */}
            <polygon
                points={`${corners.top.x},${corners.top.y} ${corners.right.x},${corners.right.y} ${corners.bottom.x},${corners.bottom.y} ${corners.left.x},${corners.left.y}`}
                fill="#FFFEF9"
                stroke="#D4AF37"
                strokeWidth="2.5"
            />

            {/* Main cross lines */}
            <line x1={corners.left.x} y1={corners.left.y} x2={corners.right.x} y2={corners.right.y} stroke="#4A90E2" strokeWidth="2" />
            <line x1={corners.top.x} y1={corners.top.y} x2={corners.bottom.x} y2={corners.bottom.y} stroke="#4A90E2" strokeWidth="2" />

            {/* Inner diagonal lines */}
            <line x1={centerX - radius * 0.5} y1={centerY - radius * 0.5} x2={centerX + radius * 0.5} y2={centerY + radius * 0.5} stroke="#90C8E8" strokeWidth="1.5" />
            <line x1={centerX + radius * 0.5} y1={centerY - radius * 0.5} x2={centerX - radius * 0.5} y2={centerY + radius * 0.5} stroke="#90C8E8" strokeWidth="1.5" />

            {/* Corner to mid-edge lines */}
            <line x1={corners.top.x} y1={corners.top.y} x2={centerX} y2={centerY - radius * 0.5} stroke="#B8B09B" strokeWidth="1.2" />
            <line x1={corners.right.x} y1={corners.right.y} x2={centerX + radius * 0.5} y2={centerY} stroke="#FFB380" strokeWidth="1.2" />
            <line x1={corners.bottom.x} y1={corners.bottom.y} x2={centerX} y2={centerY + radius * 0.5} stroke="#B4E4B4" strokeWidth="1.2" />
            <line x1={corners.left.x} y1={corners.left.y} x2={centerX - radius * 0.5} y2={centerY} stroke="#B8B09B" strokeWidth="1.2" />

            {/* Houses, signs, and planets */}
            {houseData.map((house, idx) => {
                const houseInfo = houses[idx]
                return (
                    <g key={idx}>
                        {/* House number */}
                        <text
                            x={house.center.x}
                            y={house.center.y - 18}
                            fontSize="15"
                            fill="#555"
                            textAnchor="middle"
                            fontWeight="600"
                        >
                            {idx + 1}
                        </text>

                        {/* Sign symbol */}
                        {houseInfo.sign && (
                            <text
                                x={house.signPos.x}
                                y={house.signPos.y}
                                fontSize="16"
                                fill="#FF8C42"
                                textAnchor="middle"
                                fontWeight="700"
                                fontFamily="Noto Sans Devanagari"
                            >
                                {houseInfo.sign}
                            </text>
                        )}

                        {/* Planet symbols */}
                        {houseInfo.planets.length > 0 && (
                            <text
                                x={house.center.x}
                                y={house.center.y + 8}
                                fontSize="17"
                                fill="#FF6B35"
                                textAnchor="middle"
                                fontWeight="bold"
                                fontFamily="Noto Sans Devanagari"
                            >
                                {houseInfo.planets.join(' ')}
                            </text>
                        )}
                    </g>
                )
            })}
        </svg>
    )
}
