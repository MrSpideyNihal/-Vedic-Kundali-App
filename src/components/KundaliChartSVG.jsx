// North Indian Diamond Kundali Chart - CORRECT Dhruv Astro Format
// Key: Houses are FIXED positions, signs rotate based on ascendant

export default function KundaliChartSVG({ kundaliData, chartType = 'lagna' }) {
    const PLANET_SYMBOLS = {
        Sun: 'सू', Moon: 'च', Mars: 'मं', Mercury: 'बु',
        Jupiter: 'गु', Venus: 'शु', Saturn: 'श', Rahu: 'रा', Ketu: 'के'
    }

    const SIGN_SYMBOLS = {
        'Aries': 'मे', 'Taurus': 'वृ', 'Gemini': 'मि', 'Cancer': 'कर',
        'Leo': 'सि', 'Virgo': 'कन', 'Libra': 'तु', 'Scorpio': 'वृश',
        'Sagittarius': 'ध', 'Capricorn': 'मक', 'Aquarius': 'कुं', 'Pisces': 'मी'
    }

    // Initialize 12 houses
    const houses = Array(12).fill(null).map(() => ({ planets: [], sign: '' }))

    // Fill houses with planets and signs
    if (chartType === 'lagna') {
        Object.entries(kundaliData.planets).forEach(([planet, data]) => {
            const houseIndex = data.house - 1
            houses[houseIndex].planets.push(PLANET_SYMBOLS[planet])
            if (!houses[houseIndex].sign) houses[houseIndex].sign = SIGN_SYMBOLS[data.sign]
        })
        houses[0].planets.push('ल')
        if (kundaliData.ascendant) houses[0].sign = SIGN_SYMBOLS[kundaliData.ascendant.sign]
    } else if (chartType === 'navamsha') {
        Object.entries(kundaliData.planets).forEach(([planet, data]) => {
            if (data.navamsha?.longitude !== undefined) {
                const ascLong = kundaliData.navamshaAscendant?.longitude || 0
                let diff = data.navamsha.longitude - ascLong
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
            const signs = Object.keys(SIGN_SYMBOLS)
            const navSign = Math.floor(kundaliData.navamshaAscendant.longitude / 30)
            houses[0].sign = SIGN_SYMBOLS[signs[navSign]]
        }
    }

    // North Indian Chart Layout - Diamond format
    // House 1 = RIGHT, then COUNTER-CLOCKWISE
    const w = 450, h = 450, cx = w / 2, cy = h / 2, r = 185

    // Diamond corners
    const corners = [
        { x: cx, y: cy - r },      // Top
        { x: cx + r, y: cy },      // Right
        { x: cx, y: cy + r },      // Bottom  
        { x: cx - r, y: cy }       // Left
    ]

    // CORRECT North Indian house positions (counter-clockwise from house 1)
    // Reference: https://en.wikipedia.org/wiki/Horoscope#/media/File:North_indian_horoscope_chart.png
    const housePositions = [
        // House 1 - RIGHT middle
        { num: 1, x: cx + r * 0.65, y: cy, sx: cx + r * 0.88, sy: cy, px: cx + r * 0.48, py: cy + 5 },
        // House 2 - Right-Bottom diagonal
        { num: 2, x: cx + r * 0.5, y: cy + r * 0.5, sx: cx + r * 0.72, sy: cy + r * 0.72, px: cx + r * 0.38, py: cy + r * 0.38 },
        // House 3 - BOTTOM middle  
        { num: 3, x: cx, y: cy + r * 0.65, sx: cx, sy: cy + r * 0.88, px: cx, py: cy + r * 0.48 },
        // House 4 - Left-Bottom diagonal
        { num: 4, x: cx - r * 0.5, y: cy + r * 0.5, sx: cx - r * 0.72, sy: cy + r * 0.72, px: cx - r * 0.38, py: cy + r * 0.38 },
        // House 5 - LEFT-Bottom
        { num: 5, x: cx - r * 0.65, y: cy + r * 0.15, sx: cx - r * 0.88, sy: cy + r * 0.15, px: cx - r * 0.48, py: cy + r * 0.15 },
        // House 6 - LEFT-Top
        { num: 6, x: cx - r * 0.65, y: cy - r * 0.15, sx: cx - r * 0.88, sy: cy - r * 0.15, px: cx - r * 0.48, py: cy - r * 0.15 },
        // House 7 - Left-Top diagonal
        { num: 7, x: cx - r * 0.5, y: cy - r * 0.5, sx: cx - r * 0.72, sy: cy - r * 0.72, px: cx - r * 0.38, py: cy - r * 0.38 },
        // House 8 - TOP middle
        { num: 8, x: cx, y: cy - r * 0.65, sx: cx, sy: cy - r * 0.88, px: cx, py: cy - r * 0.48 },
        // House 9 - INNER Top-Left
        { num: 9, x: cx - r * 0.25, y: cy - r * 0.25, sx: cx - r * 0.42, sy: cy - r * 0.42, px: cx - r * 0.25, py: cy - r * 0.18 },
        // House 10 - INNER Top
        { num: 10, x: cx, y: cy - r * 0.2, sx: cx, sy: cy - r * 0.38, px: cx, py: cy - r * 0.12 },
        // House 11 - INNER Top-Right  
        { num: 11, x: cx + r * 0.25, y: cy - r * 0.25, sx: cx + r * 0.42, sy: cy - r * 0.42, px: cx + r * 0.25, py: cy - r * 0.18 },
        // House 12 - INNER Right
        { num: 12, x: cx + r * 0.3, y: cy + r * 0.1, sx: cx + r * 0.48, sy: cy + r * 0.15, px: cx + r * 0.3, py: cy + r * 0.18 }
    ]

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
            {/* Outer diamond */}
            <polygon points={corners.map(c => `${c.x},${c.y}`).join(' ')}
                fill="#FFFEF8" stroke="#D4AF37" strokeWidth="2.5" />

            {/* Main cross */}
            <line x1={corners[3].x} y1={corners[3].y} x2={corners[1].x} y2={corners[1].y}
                stroke="#6BA3D4" strokeWidth="2" />
            <line x1={corners[0].x} y1={corners[0].y} x2={corners[2].x} y2={corners[2].y}
                stroke="#6BA3D4" strokeWidth="2" />

            {/* Inner diamond for houses 9-12 */}
            <polygon points={`${cx},${cy - r * 0.4} ${cx + r * 0.4},${cy} ${cx},${cy + r * 0.4} ${cx - r * 0.4},${cy}`}
                fill="none" stroke="#A8C5E0" strokeWidth="1.5" />

            {/* Diagonal division lines */}
            <line x1={corners[0].x} y1={corners[0].y} x2={cx - r * 0.4} y2={cy} stroke="#C4B99D" strokeWidth="1.2" />
            <line x1={corners[0].x} y1={corners[0].y} x2={cx + r * 0.4} y2={cy} stroke="#FFB380" strokeWidth="1.2" />
            <line x1={corners[2].x} y1={corners[2].y} x2={cx - r * 0.4} y2={cy} stroke="#B4D4B4" strokeWidth="1.2" />
            <line x1={corners[2].x} y1={corners[2].y} x2={cx + r * 0.4} y2={cy} stroke="#6BA3D4" strokeWidth="1.2" />

            {/* Houses */}
            {housePositions.map((pos, idx) => {
                const house = houses[idx]
                return (
                    <g key={idx}>
                        {/* House number */}
                        <text x={pos.x} y={pos.y} fontSize="14" fill="#666"
                            textAnchor="middle" fontWeight="600">{pos.num}</text>

                        {/* Sign */}
                        {house.sign && (
                            <text x={pos.sx} y={pos.sy} fontSize="15" fill="#FF8834"
                                textAnchor="middle" fontWeight="700"
                                fontFamily="Noto Sans Devanagari">{house.sign}</text>
                        )}

                        {/* Planets */}
                        {house.planets.length > 0 && (
                            <text x={pos.px} y={pos.py} fontSize="16" fill="#FF6B35"
                                textAnchor="middle" fontWeight="bold"
                                fontFamily="Noto Sans Devanagari">{house.planets.join(' ')}</text>
                        )}
                    </g>
                )
            })}
        </svg>
    )
}
