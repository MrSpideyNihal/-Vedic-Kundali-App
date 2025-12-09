// FINAL - Exact Dhruv Astro Diamond Chart - NO MORE CHANGES

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

    const w = 470, h = 450, cx = w / 2, cy = h / 2, r = 170
    const T = { x: cx, y: cy - r }, R = { x: cx + r, y: cy }, B = { x: cx, y: cy + r }, L = { x: cx - r, y: cy }

    // Exact Dhruv Astro house positions
    const pos = [
        { n: 1, nx: R.x - 25, ny: cy, sx: R.x - 12, sy: cy - 22, px: R.x - 50, py: cy + 5 },
        { n: 2, nx: cx + r * 0.55, ny: cy + r * 0.38, sx: cx + r * 0.72, sy: cy + r * 0.65, px: cx + r * 0.45, py: cy + r * 0.28 },
        { n: 3, nx: cx + r * 0.22, ny: B.y - 40, sx: cx + r * 0.42, sy: B.y - 12, px: cx + r * 0.18, py: B.y - 65 },
        { n: 4, nx: cx, ny: B.y - 50, sx: cx, sy: B.y - 18, px: cx, py: B.y - 75 },
        { n: 5, nx: cx - r * 0.22, ny: B.y - 40, sx: cx - r * 0.42, sy: B.y - 12, px: cx - r * 0.18, py: B.y - 65 },
        { n: 6, nx: cx - r * 0.55, ny: cy + r * 0.38, sx: cx - r * 0.72, sy: cy + r * 0.65, px: cx - r * 0.45, py: cy + r * 0.28 },
        { n: 7, nx: L.x + 25, ny: cy, sx: L.x + 12, sy: cy - 22, px: L.x + 50, py: cy + 5 },
        { n: 8, nx: cx - r * 0.55, ny: cy - r * 0.38, sx: cx - r * 0.72, sy: cy - r * 0.65, px: cx - r * 0.45, py: cy - r * 0.28 },
        { n: 9, nx: cx - r * 0.28, ny: T.y + 70, sx: cx - r * 0.45, sy: T.y + 42, px: cx - r * 0.22, py: T.y + 95 },
        { n: 10, nx: cx, ny: T.y + 65, sx: cx, sy: T.y + 35, px: cx, py: T.y + 92 },
        { n: 11, nx: cx + r * 0.28, ny: T.y + 70, sx: cx + r * 0.45, sy: T.y + 42, px: cx + r * 0.22, py: T.y + 95 },
        { n: 12, nx: cx + r * 0.3, ny: cy + r * 0.05, sx: cx + r * 0.48, sy: cy + r * 0.28, px: cx + r * 0.25, py: cy - r * 0.05 }
    ]

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
            <rect x="15" y="10" width={w - 30} height={h - 20} fill="#FFFEF8" stroke="#D4AF37" strokeWidth="2.5" rx="2" />
            <polygon points={`${T.x},${T.y} ${R.x},${R.y} ${B.x},${B.y} ${L.x},${L.y}`} fill="none" stroke="#D4AF37" strokeWidth="2.5" />
            <line x1={L.x} y1={L.y} x2={R.x} y2={R.y} stroke="#6BA3D4" strokeWidth="2" />
            <line x1={T.x} y1={T.y} x2={B.x} y2={B.y} stroke="#6BA3D4" strokeWidth="2" />
            <line x1={T.x} y1={T.y} x2={L.x + r * 0.5} y2={cy - r * 0.5} stroke="#90C090" strokeWidth="1.5" />
            <line x1={T.x} y1={T.y} x2={R.x - r * 0.5} y2={cy - r * 0.5} stroke="#FFB380" strokeWidth="1.5" />
            <line x1={B.x} y1={B.y} x2={L.x + r * 0.5} y2={cy + r * 0.5} stroke="#90C090" strokeWidth="1.5" />
            <line x1={B.x} y1={B.y} x2={R.x - r * 0.5} y2={cy + r * 0.5} stroke="#6BA3D4" strokeWidth="1.5" />
            <polygon points={`${cx},${T.y + r * 0.38} ${R.x - r * 0.5},${cy} ${cx},${cy + r * 0.38} ${L.x + r * 0.5},${cy}`} fill="none" stroke="#A8C5E0" strokeWidth="1.5" />
            {pos.map((p, i) => {
                const h = houses[i]
                return (
                    <g key={i}>
                        <text x={p.nx} y={p.ny} fontSize="13" fill="#666" textAnchor="middle" fontWeight="600">{p.n}</text>
                        {h.sign && <text x={p.sx} y={p.sy} fontSize="14" fill="#FF8834" textAnchor="middle" fontWeight="700" fontFamily="Noto Sans Devanagari">{h.sign}</text>}
                        {h.planets.length > 0 && <text x={p.px} y={p.py} fontSize="15" fill="#FF6B35" textAnchor="middle" fontWeight="bold" fontFamily="Noto Sans Devanagari">{h.planets.join(' ')}</text>}
                    </g>
                )
            })}
        </svg>
    )
}
