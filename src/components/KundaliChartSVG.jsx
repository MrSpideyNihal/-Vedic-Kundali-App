// North Indian Diamond Kundali Chart - EXACT Dhruv Astro Match

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

    const houses = Array(12).fill(null).map(() => ({ planets: [], sign: '' }))

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

    // Dhruv Astro dimensions - Rectangle with Diamond inside
    const w = 470, h = 470
    const cx = w / 2, cy = h / 2
    const diamondRadius = 180

    // Diamond corners (rhombus)
    const top = { x: cx, y: cy - diamondRadius }
    const right = { x: cx + diamondRadius, y: cy }
    const bottom = { x: cx, y: cy + diamondRadius }
    const left = { x: cx - diamondRadius, y: cy }

    // North Indian house positions matching Dhruv Astro EXACTLY
    // House 1 on RIGHT, counter-clockwise
    const housePositions = [
        // House 1 - RIGHT
        { n: 1, x: right.x - 30, y: cy + 5, sx: right.x - 15, sy: cy - 20, px: right.x - 50, py: cy + 5 },
        // House 2 - RIGHT-BOTTOM  
        { n: 2, x: cx + diamondRadius * 0.55, y: cy + diamondRadius * 0.55, sx: cx + diamondRadius * 0.7, sy: cy + diamondRadius * 0.7, px: cx + diamondRadius * 0.4, py: cy + diamondRadius * 0.45 },
        // House 3 - BOTTOM-RIGHT
        { n: 3, x: cx + diamondRadius * 0.32, y: bottom.y - 35, sx: cx + diamondRadius * 0.45, sy: bottom.y - 15, px: cx + diamondRadius * 0.22, py: bottom.y - 55 },
        // House 4 - BOTTOM CENTER
        { n: 4, x: cx, y: bottom.y - 45, sx: cx, sy: bottom.y - 20, px: cx, py: bottom.y - 65 },
        // House 5 - BOTTOM-LEFT
        { n: 5, x: cx - diamondRadius * 0.32, y: bottom.y - 35, sx: cx - diamondRadius * 0.45, sy: bottom.y - 15, px: cx - diamondRadius * 0.22, py: bottom.y - 55 },
        // House 6 - LEFT-BOTTOM
        { n: 6, x: cx - diamondRadius * 0.55, y: cy + diamondRadius * 0.55, sx: cx - diamondRadius * 0.7, sy: cy + diamondRadius * 0.7, px: cx - diamondRadius * 0.4, py: cy + diamondRadius * 0.45 },
        // House 7 - LEFT
        { n: 7, x: left.x + 30, y: cy + 5, sx: left.x + 15, sy: cy - 20, px: left.x + 50, py: cy + 5 },
        // House 8 - LEFT-TOP
        { n: 8, x: cx - diamondRadius * 0.55, y: cy - diamondRadius * 0.55, sx: cx - diamondRadius * 0.7, sy: cy - diamondRadius * 0.7, px: cx - diamondRadius * 0.4, py: cy - diamondRadius * 0.45 },
        // House 9 - TOP-LEFT INNER
        { n: 9, x: cx - diamondRadius * 0.32, y: top.y + 60, sx: cx - diamondRadius * 0.42, sy: top.y + 40, px: cx - diamondRadius * 0.25, py: top.y + 80 },
        // House 10 - TOP CENTER
        { n: 10, x: cx, y: top.y + 55, sx: cx, sy: top.y + 30, px: cx, py: top.y + 78 },
        // House 11 - TOP-RIGHT INNER
        { n: 11, x: cx + diamondRadius * 0.32, y: top.y + 60, sx: cx + diamondRadius * 0.42, sy: top.y + 40, px: cx + diamondRadius * 0.25, py: top.y + 80 },
        // House 12 - CENTER-RIGHT
        { n: 12, x: cx + diamondRadius * 0.32, y: cy + 25, sx: cx + diamondRadius * 0.45, sy: cy + 40, px: cx + diamondRadius * 0.25, py: cy + 10 }
    ]

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
            {/* Outer rectangle */}
            <rect x="15" y="15" width={w - 30} height={h - 30} fill="#FFFEF8" stroke="#D4AF37" strokeWidth="2.5" rx="2" />

            {/* Diamond shape */}
            <polygon points={`${top.x},${top.y} ${right.x},${right.y} ${bottom.x},${bottom.y} ${left.x},${left.y}`}
                fill="none" stroke="#D4AF37" strokeWidth="2.5" />

            {/* Main cross lines */}
            <line x1={left.x} y1={left.y} x2={right.x} y2={right.y} stroke="#6BA3D4" strokeWidth="2" />
            <line x1={top.x} y1={top.y} x2={bottom.x} y2={bottom.y} stroke="#6BA3D4" strokeWidth="2" />

            {/* Diagonal lines */}
            <line x1={top.x} y1={top.y} x2={cx - diamondRadius * 0.5} y2={cy - diamondRadius * 0.5} stroke="#90C090" strokeWidth="1.5" />
            <line x1={top.x} y1={top.y} x2={cx + diamondRadius * 0.5} y2={cy - diamondRadius * 0.5} stroke="#FFB380" strokeWidth="1.5" />
            <line x1={bottom.x} y1={bottom.y} x2={cx - diamondRadius * 0.5} y2={cy + diamondRadius * 0.5} stroke="#90C090" strokeWidth="1.5" />
            <line x1={bottom.x} y1={bottom.y} x2={cx + diamondRadius * 0.5} y2={cy + diamondRadius * 0.5} stroke="#6BA3D4" strokeWidth="1.5" />

            {/* Inner triangle for houses 9-12 */}
            <polygon points={`${cx},${top.y + diamondRadius * 0.35} ${cx + diamondRadius * 0.5},${cy} ${cx},${cy + diamondRadius * 0.35} ${cx - diamondRadius * 0.5},${cy}`}
                fill="none" stroke="#9DC4E8" strokeWidth="1.5" />

            {/* Houses */}
            {housePositions.map((h, idx) => {
                const data = houses[idx]
                return (
                    <g key={idx}>
                        <text x={h.x} y={h.y} fontSize="14" fill="#555" textAnchor="middle" fontWeight="600">{h.n}</text>
                        {data.sign && (
                            <text x={h.sx} y={h.sy} fontSize="15" fill="#FF8834" textAnchor="middle" fontWeight="700"
                                fontFamily="Noto Sans Devanagari">{data.sign}</text>
                        )}
                        {data.planets.length > 0 && (
                            <text x={h.px} y={h.py} fontSize="16" fill="#FF6B35" textAnchor="middle" fontWeight="bold"
                                fontFamily="Noto Sans Devanagari">{data.planets.join(' ')}</text>
                        )}
                    </g>
                )
            })}
        </svg>
    )
}
