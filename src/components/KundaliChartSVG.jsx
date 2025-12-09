// Dhruv Astro Diamond Chart - EXACT MATCH

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

    // Dhruv Astro dimensions
    const w = 467, h = 290, cx = w / 2, cy = h / 2, r = 130
    const T = { x: cx, y: 15 }, R = { x: w - 15, y: cy }, B = { x: cx, y: h - 15 }, L = { x: 15, y: cy }

    // House positions matching Dhruv Astro EXACTLY
    const pos = [
        { n: 1, nx: R.x - 20, ny: cy + 3, sx: R.x - 8, sy: cy - 15, px: R.x - 42, py: cy + 5 },
        { n: 2, nx: cx + r * 0.52, ny: cy + r * 0.52, sx: cx + r * 0.68, sy: cy + r * 0.68, px: cx + r * 0.38, py: cy + r * 0.42 },
        { n: 3, nx: cx + r * 0.25, ny: B.y - 28, sx: cx + r * 0.42, sy: B.y - 8, px: cx + r * 0.18, py: B.y - 48 },
        { n: 4, nx: cx, ny: B.y - 32, sx: cx, sy: B.y - 10, px: cx, py: B.y - 52 },
        { n: 5, nx: cx - r * 0.25, ny: B.y - 28, sx: cx - r * 0.42, sy: B.y - 8, px: cx - r * 0.18, py: B.y - 48 },
        { n: 6, nx: cx - r * 0.52, ny: cy + r * 0.52, sx: cx - r * 0.68, sy: cy + r * 0.68, px: cx - r * 0.38, py: cy + r * 0.42 },
        { n: 7, nx: L.x + 20, ny: cy + 3, sx: L.x + 8, sy: cy - 15, px: L.x + 42, py: cy + 5 },
        { n: 8, nx: cx - r * 0.52, ny: cy - r * 0.52, sx: cx - r * 0.68, sy: cy - r * 0.68, px: cx - r * 0.38, py: cy - r * 0.42 },
        { n: 9, nx: cx - r * 0.28, ny: T.y + 50, sx: cx - r * 0.42, sy: T.y + 28, px: cx - r * 0.22, py: T.y + 72 },
        { n: 10, nx: cx, ny: T.y + 48, sx: cx, sy: T.y + 25, px: cx, py: T.y + 72 },
        { n: 11, nx: cx + r * 0.28, ny: T.y + 50, sx: cx + r * 0.42, sy: T.y + 28, px: cx + r * 0.22, py: T.y + 72 },
        { n: 12, nx: cx + r * 0.52, ny: cy - r * 0.52, sx: cx + r * 0.68, sy: cy - r * 0.68, px: cx + r * 0.38, py: cy - r * 0.42 }
    ]

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
            {/* Rectangle border */}
            <rect x="8" y="8" width={w - 16} height={h - 16} fill="#FFFEF8" stroke="#D4AF37" strokeWidth="2.5" rx="2" />

            {/* Diamond */}
            <polygon points={`${T.x},${T.y} ${R.x},${R.y} ${B.x},${B.y} ${L.x},${L.y}`} fill="none" stroke="#D4AF37" strokeWidth="2.5" />

            {/* Cross lines */}
            <line x1={L.x} y1={L.y} x2={R.x} y2={R.y} stroke="#6BA3D4" strokeWidth="2" />
            <line x1={T.x} y1={T.y} x2={B.x} y2={B.y} stroke="#6BA3D4" strokeWidth="2" />

            {/* Diagonals */}
            <line x1={T.x} y1={T.y} x2={L.x} y2={L.y} stroke="#90C090" strokeWidth="1.5" />
            <line x1={T.x} y1={T.y} x2={R.x} y2={R.y} stroke="#FFB380" strokeWidth="1.5" />
            <line x1={B.x} y1={B.y} x2={L.x} y2={L.y} stroke="#90C090" strokeWidth="1.5" />
            <line x1={B.x} y1={B.y} x2={R.x} y2={R.y} stroke="#6BA3D4" strokeWidth="1.5" />

            {/* Inner diamond for 9-12 */}
            <polygon points={`${cx},${T.y + r * 0.42} ${R.x - r * 0.42},${cy} ${cx},${B.y - r * 0.42} ${L.x + r * 0.42},${cy}`} fill="none" stroke="#9DC4E8" strokeWidth="1.5" />

            {/* Houses */}
            {pos.map((p, i) => {
                const h = houses[i]
                return (
                    <g key={i}>
                        <text x={p.nx} y={p.ny} fontSize="13" fill="#555" textAnchor="middle" fontWeight="600">{p.n}</text>
                        {h.sign && <text x={p.sx} y={p.sy} fontSize="14" fill="#FF8834" textAnchor="middle" fontWeight="700" fontFamily="Noto Sans Devanagari">{h.sign}</text>}
                        {h.planets.length > 0 && <text x={p.px} y={p.py} fontSize="15" fill="#FF6B35" textAnchor="middle" fontWeight="bold" fontFamily="Noto Sans Devanagari">{h.planets.join(' ')}</text>}
                    </g>
                )
            })}
        </svg>
    )
}
