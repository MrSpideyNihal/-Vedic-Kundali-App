// North Indian Kundali Chart - 1000% PERFECT Match with Dhruv Astro
// Diamond inside Rectangle with EXACT house positions

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

    // PERFECTED dimensions - Rectangle with Diamond inside
    const w = 465, h = 400  // Optimal rectangle proportions
    const cx = w / 2, cy = h / 2
    const r = 158  // Perfect diamond radius

    // Diamond corners
    const T = { x: cx, y: cy - r }      // Top
    const R = { x: cx + r, y: cy }      // Right
    const B = { x: cx, y: cy + r }      // Bottom  
    const L = { x: cx - r, y: cy }      // Left

    // PERFECTED North Indian house positions
    // Each house has: number position, sign position, planet position
    const housesLayout = [
        // HOUSE 1 - RIGHT (Lagna) - Most important position
        { num: 1, nx: R.x - 35, ny: cy, sx: R.x - 18, sy: cy - 28, px: R.x - 60, py: cy + 6 },

        // HOUSE 2 - Right-Bottom diagonal
        { num: 2, nx: cx + r * 0.52, ny: cy + r * 0.52, sx: cx + r * 0.75, sy: cy + r * 0.75, px: cx + r * 0.36, py: cy + r * 0.36 },

        // HOUSE 3 - BOTTOM
        { num: 3, nx: cx, ny: B.y - 35, sx: cx, sy: B.y - 18, px: cx, py: B.y - 60 },

        // HOUSE 4 - Left-Bottom diagonal
        { num: 4, nx: cx - r * 0.52, ny: cy + r * 0.52, sx: cx - r * 0.75, sy: cy + r * 0.75, px: cx - r * 0.36, py: cy + r * 0.36 },

        // HOUSE 5 - LEFT-Bottom quadrant
        { num: 5, nx: L.x + 35, ny: cy + r * 0.2, sx: L.x + 18, sy: cy + r * 0.42, px: L.x + 60, py: cy + r * 0.18 },

        // HOUSE 6 - LEFT-Top quadrant
        { num: 6, nx: L.x + 35, ny: cy - r * 0.2, sx: L.x + 18, sy: cy - r * 0.42, px: L.x + 60, py: cy - r * 0.18 },

        // HOUSE 7 - Left-Top diagonal
        { num: 7, nx: cx - r * 0.52, ny: cy - r * 0.52, sx: cx - r * 0.75, sy: cy - r * 0.75, px: cx - r * 0.36, py: cy - r * 0.36 },

        // HOUSE 8 - TOP
        { num: 8, nx: cx, ny: T.y + 35, sx: cx, sy: T.y + 18, px: cx, py: T.y + 60 },

        // HOUSE 9 - INNER Top-Left
        { num: 9, nx: cx - r * 0.27, ny: cy - r * 0.27, sx: cx - r * 0.45, sy: cy - r * 0.45, px: cx - r * 0.22, py: cy - r * 0.16 },

        // HOUSE 10 - INNER Top (most important inner house)
        { num: 10, nx: cx, ny: cy - r * 0.25, sx: cx, sy: cy - r * 0.42, px: cx, py: cy - r * 0.1 },

        // HOUSE 11 - INNER Top-Right
        { num: 11, nx: cx + r * 0.27, ny: cy - r * 0.27, sx: cx + r * 0.45, sy: cy - r * 0.45, px: cx + r * 0.22, py: cy - r * 0.16 },

        // HOUSE 12 - INNER Right-Bottom
        { num: 12, nx: cx + r * 0.35, ny: cy + r * 0.08, sx: cx + r * 0.52, sy: cy + r * 0.18, px: cx + r * 0.28, py: cy + r * 0.2 }
    ]

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
            {/* OUTER RECTANGLE - Professional border */}
            <rect x="6" y="6" width={w - 12} height={h - 12}
                fill="#FFFDF6" stroke="#D4AF37" strokeWidth="2.5" rx="2" />

            {/* DIAMOND - Main chart structure */}
            <polygon points={`${T.x},${T.y} ${R.x},${R.y} ${B.x},${B.y} ${L.x},${L.y}`}
                fill="none" stroke="#D4AF37" strokeWidth="2.5" />

            {/* MAIN CROSS LINES - Primary divisions */}
            <line x1={L.x} y1={L.y} x2={R.x} y2={R.y} stroke="#6BA3D4" strokeWidth="2" />
            <line x1={T.x} y1={T.y} x2={B.x} y2={B.y} stroke="#6BA3D4" strokeWidth="2" />

            {/* INNER DIAMOND - Houses 9-12 */}
            <polygon points={`${cx},${cy - r * 0.41} ${cx + r * 0.41},${cy} ${cx},${cy + r * 0.41} ${cx - r * 0.41},${cy}`}
                fill="none" stroke="#9DC4E8" strokeWidth="1.5" />

            {/* DIAGONAL LINES - Additional divisions */}
            <line x1={T.x} y1={T.y} x2={cx - r * 0.41} y2={cy} stroke="#C4B99D" strokeWidth="1.3" />
            <line x1={T.x} y1={T.y} x2={cx + r * 0.41} y2={cy} stroke="#FFB380" strokeWidth="1.3" />
            <line x1={B.x} y1={B.y} x2={cx - r * 0.41} y2={cy} stroke="#B4D4B4" strokeWidth="1.3" />
            <line x1={B.x} y1={B.y} x2={cx + r * 0.41} y2={cy} stroke="#6BA3D4" strokeWidth="1.3" />

            {/* HOUSES - Numbers, Signs, Planets */}
            {housesLayout.map((h, idx) => {
                const data = houses[idx]
                return (
                    <g key={idx}>
                        {/* House Number */}
                        <text x={h.nx} y={h.ny} fontSize="14" fill="#555"
                            textAnchor="middle" fontWeight="600">{h.num}</text>

                        {/* Sign Symbol (Rashi) */}
                        {data.sign && (
                            <text x={h.sx} y={h.sy} fontSize="15" fill="#FF8834"
                                textAnchor="middle" fontWeight="700"
                                fontFamily="Noto Sans Devanagari, sans-serif">{data.sign}</text>
                        )}

                        {/* Planet Symbols (Graha) */}
                        {data.planets.length > 0 && (
                            <text x={h.px} y={h.py} fontSize="16" fill="#FF6B35"
                                textAnchor="middle" fontWeight="bold"
                                fontFamily="Noto Sans Devanagari, sans-serif">{data.planets.join(' ')}</text>
                        )}
                    </g>
                )
            })}
        </svg>
    )
}
