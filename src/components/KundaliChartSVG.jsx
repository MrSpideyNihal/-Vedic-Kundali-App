// EXACT Dhruv Astro Match - Based on Reference Screenshot

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

    // Exact Dhruv Astro dimensions from reference
    const w = 380, h = 280, cx = w / 2, cy = h / 2
    const pad = 25
    const T = { x: cx, y: pad }, R = { x: w - pad, y: cy }, B = { x: cx, y: h - pad }, L = { x: pad, y: cy }

    // Exact house positions from Dhruv Astro reference
    const pos = [
        { n: 1, x: R.x - 18, y: cy + 3, sx: R.x - 8, sy: cy - 12, px: R.x - 35, py: cy + 5 },
        { n: 2, x: cx + 65, y: cy + 50, sx: cx + 80, sy: cy + 65, px: cx + 50, py: cy + 40 },
        { n: 3, x: cx + 25, y: B.y - 18, sx: cx + 40, sy: B.y - 6, px: cx + 18, py: B.y - 35 },
        { n: 4, x: cx, y: B.y - 22, sx: cx, sy: B.y - 8, px: cx, py: B.y - 38 },
        { n: 5, x: cx - 25, y: B.y - 18, sx: cx - 40, sy: B.y - 6, px: cx - 18, py: B.y - 35 },
        { n: 6, x: cx - 65, y: cy + 50, sx: cx - 80, sy: cy + 65, px: cx - 50, py: cy + 40 },
        { n: 7, x: L.x + 18, y: cy + 3, sx: L.x + 8, sy: cy - 12, px: L.x + 35, py: cy + 5 },
        { n: 8, x: cx - 65, y: cy - 50, sx: cx - 80, sy: cy - 65, px: cx - 50, py: cy - 40 },
        { n: 9, x: cx - 30, y: T.y + 35, sx: cx - 42, sy: T.y + 20, px: cx - 25, py: T.y + 52 },
        { n: 10, x: cx, y: T.y + 32, sx: cx, sy: T.y + 18, px: cx, py: T.y + 50 },
        { n: 11, x: cx + 30, y: T.y + 35, sx: cx + 42, sy: T.y + 20, px: cx + 25, py: T.y + 52 },
        { n: 12, x: cx + 65, y: cy - 50, sx: cx + 80, sy: cy - 65, px: cx + 50, py: cy - 40 }
    ]

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" style={{ backgroundColor: '#FFFEF8' }}>
            {/* Border */}
            <rect x="5" y="5" width={w - 10} height={h - 10} fill="none" stroke="#D4AF37" strokeWidth="2" rx="1" />

            {/* Diamond */}
            <polygon points={`${T.x},${T.y} ${R.x},${R.y} ${B.x},${B.y} ${L.x},${L.y}`} fill="none" stroke="#D4AF37" strokeWidth="2" />

            {/* Main cross */}
            <line x1={L.x} y1={L.y} x2={R.x} y2={R.y} stroke="#6BA3D4" strokeWidth="1.5" />
            <line x1={T.x} y1={T.y} x2={B.x} y2={B.y} stroke="#6BA3D4" strokeWidth="1.5" />

            {/* Diagonals */}
            <line x1={T.x} y1={T.y} x2={L.x} y2={L.y} stroke="#90C090" strokeWidth="1.2" />
            <line x1={T.x} y1={T.y} x2={R.x} y2={R.y} stroke="#FFB380" strokeWidth="1.2" />
            <line x1={B.x} y1={B.y} x2={L.x} y2={L.y} stroke="#90C090" strokeWidth="1.2" />
            <line x1={B.x} y1={B.y} x2={R.x} y2={R.y} stroke="#6BA3D4" strokeWidth="1.2" />

            {/* Inner diamond */}
            <polygon points={`${cx},${T.y + 55} ${R.x - 55},${cy} ${cx},${B.y - 55} ${L.x + 55},${cy}`} fill="none" stroke="#A8C5E0" strokeWidth="1.2" />

            {/* Houses */}
            {pos.map((p, i) => {
                const h = houses[i]
                return (
                    <g key={i}>
                        <text x={p.x} y={p.y} fontSize="12" fill="#444" textAnchor="middle" fontWeight="600">{p.n}</text>
                        {h.sign && <text x={p.sx} y={p.sy} fontSize="13" fill="#FF8834" textAnchor="middle" fontWeight="700" fontFamily="Noto Sans Devanagari">{h.sign}</text>}
                        {h.planets.length > 0 && <text x={p.px} y={p.py} fontSize="14" fill="#FF6B35" textAnchor="middle" fontWeight="bold" fontFamily="Noto Sans Devanagari">{h.planets.join(' ')}</text>}
                    </g>
                )
            })}
        </svg>
    )
}
