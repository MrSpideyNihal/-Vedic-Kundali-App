// North Indian RECTANGULAR GRID Chart - Dhruv Astro Style

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
            houses[data.house - 1].planets.push(PLANET_SYMBOLS[planet])
            if (!houses[data.house - 1].sign) houses[data.house - 1].sign = SIGN_SYMBOLS[data.sign]
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

    const w = 490, h = 310, m = 40
    const cx = w / 2, cy = h / 2
    const col1 = m, col2 = w * 0.3, col3 = cx, col4 = w * 0.7, col5 = w - m
    const row1 = m, row2 = cy, row3 = h - m

    // Rectangular grid house positions (North Indian)
    const pos = [
        { n: 1, x: col5 - 15, y: cy, sx: col5 - 10, sy: cy - 18, px: col5 - 35, py: cy + 5 },           // Right
        { n: 2, x: col4 + 15, y: row3 - 15, sx: col4 + 20, sy: row3 - 8, px: col4, py: row3 - 35 },     // Bottom-Right
        { n: 3, x: col3 + 45, y: row3 - 15, sx: col3 + 50, sy: row3 - 8, px: col3 + 30, py: row3 - 35 },  // Bottom center-right
        { n: 4, x: col3, y: row3 - 15, sx: col3, sy: row3 - 8, px: col3, py: row3 - 35 },           // Bottom center
        { n: 5, x: col3 - 45, y: row3 - 15, sx: col3 - 50, sy: row3 - 8, px: col3 - 30, py: row3 - 35 },  // Bottom center-left
        { n: 6, x: col2 - 15, y: row3 - 15, sx: col2 - 20, sy: row3 - 8, px: col2, py: row3 - 35 },     // Bottom-Left
        { n: 7, x: col1 + 15, y: cy, sx: col1 + 10, sy: cy - 18, px: col1 + 35, py: cy + 5 },           // Left
        { n: 8, x: col1 + 40, y: row1 + 15, sx: col1 + 35, sy: row1 + 10, px: col1 + 60, py: row1 + 35 }, // Top-Left corner
        { n: 9, x: col2 - 15, y: row1 + 35, sx: col2 - 20, sy: row1 + 22, px: col2, py: row1 + 60 },    // Top-Left
        { n: 10, x: col3, y: row1 + 35, sx: col3, sy: row1 + 22, px: col3, py: row1 + 62 },         // Top center
        { n: 11, x: col4 + 15, y: row1 + 35, sx: col4 + 20, sy: row1 + 22, px: col4, py: row1 + 60 },   // Top-Right
        { n: 12, x: col5 - 40, y: row1 + 15, sx: col5 - 35, sy: row1 + 10, px: col5 - 60, py: row1 + 35 } // Top-Right corner
    ]

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
            {/* Outer rectangle */}
            <rect x="5" y="5" width={w - 10} height={h - 10} fill="#FFFEF8" stroke="#D4AF37" strokeWidth="2.5" rx="2" />

            {/* Main grid lines */}
            <line x1={col1} y1={cy} x2={col5} y2={cy} stroke="#6BA3D4" strokeWidth="2" />
            <line x1={cx} y1={row1} x2={cx} y2={row3} stroke="#6BA3D4" strokeWidth="2" />

            {/* Diagonal lines */}
            <line x1={col1} y1={row1} x2={cx} y2={cy} stroke="#90C090" strokeWidth="1.5" />
            <line x1={col5} y1={row1} x2={cx} y2={cy} stroke="#FFB380" strokeWidth="1.5" />
            <line x1={col1} y1={row3} x2={cx} y2={cy} stroke="#90C090" strokeWidth="1.5" />
            <line x1={col5} y1={row3} x2={cx} y2={cy} stroke="#6BA3D4" strokeWidth="1.5" />

            {/* Vertical dividers */}
            <line x1={col2} y1={row1} x2={col2} y2={cy} stroke="#A8C5E0" strokeWidth="1.2" />
            <line x1={col4} y1={row1} x2={col4} y2={cy} stroke="#A8C5E0" strokeWidth="1.2" />
            <line x1={col2} y1={cy} x2={col2} y2={row3} stroke="#A8C5E0" strokeWidth="1.2" />
            <line x1={col4} y1={cy} x2={col4} y2={row3} stroke="#A8C5E0" strokeWidth="1.2" />

            {/* Inner rectangle for houses 9-12 */}
            <rect x={col2} y={row1} width={col4 - col2} height={cy - row1} fill="none" stroke="#A8C5E0" strokeWidth="1.2" />

            {/* Houses */}
            {pos.map((p, i) => {
                const h = houses[i]
                return (
                    <g key={i}>
                        <text x={p.x} y={p.y} fontSize="13" fill="#666" textAnchor="middle" fontWeight="600">{p.n}</text>
                        {h.sign && <text x={p.sx} y={p.sy} fontSize="14" fill="#FF8834" textAnchor="middle" fontWeight="700" fontFamily="Noto Sans Devanagari">{h.sign}</text>}
                        {h.planets.length > 0 && <text x={p.px} y={p.py} fontSize="15" fill="#FF6B35" textAnchor="middle" fontWeight="bold" fontFamily="Noto Sans Devanagari">{h.planets.join(' ')}</text>}
                    </g>
                )
            })}
        </svg>
    )
}
