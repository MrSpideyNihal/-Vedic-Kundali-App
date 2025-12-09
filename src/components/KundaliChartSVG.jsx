// North Indian Kundali Chart - RECTANGULAR GRID (Dhruv Astro Format)
// NOT diamond - it's a rectangle divided by diagonals!

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

    // RECTANGULAR GRID dimensions (Dhruv Astro style)
    const w = 500, h = 360
    const cx = w / 2, cy = h / 2
    const margin = 40

    // North Indian RECTANGULAR layout - house positions
    // Based on Dhruv Astro reference
    const housesLayout = [
        // HOUSE 1 - RIGHT middle
        { num: 1, nx: w - margin - 25, ny: cy, sx: w - margin - 10, sy: cy - 15, px: w - margin - 40, py: cy + 8 },
        // HOUSE 2 - RIGHT bottom corner
        { num: 2, nx: w - margin - 25, ny: h - margin - 25, sx: w - margin - 10, sy: h - margin - 10, px: w - margin - 45, py: h - margin - 40 },
        // HOUSE 3 - BOTTOM right
        { num: 3, nx: w * 0.625, ny: h - margin - 20, sx: w * 0.625, sy: h - margin - 5, px: w * 0.625, py: h - margin - 40 },
        // HOUSE 4 - BOTTOM middle
        { num: 4, nx: cx, ny: h - margin - 20, sx: cx, sy: h - margin - 5, px: cx, py: h - margin - 40 },
        // HOUSE 5 - BOTTOM left
        { num: 5, nx: w * 0.375, ny: h - margin - 20, sx: w * 0.375, sy: h - margin - 5, px: w * 0.375, py: h - margin - 40 },
        // HOUSE 6 - LEFT bottom corner
        { num: 6, nx: margin + 25, ny: h - margin - 25, sx: margin + 10, sy: h - margin - 10, px: margin + 45, py: h - margin - 40 },
        // HOUSE 7 - LEFT middle
        { num: 7, nx: margin + 25, ny: cy, sx: margin + 10, sy: cy - 15, px: margin + 40, py: cy + 8 },
        // HOUSE 8 - LEFT top corner
        { num: 8, nx: margin + 25, ny: margin + 25, sx: margin + 10, sy: margin + 10, px: margin + 45, py: margin + 40 },
        // HOUSE 9 - TOP left (inner)
        { num: 9, nx: w * 0.375, ny: margin + 60, sx: w * 0.375, sy: margin + 40, px: w * 0.375, py: margin + 85 },
        // HOUSE 10 - TOP middle (inner)
        { num: 10, nx: cx, ny: margin + 60, sx: cx, sy: margin + 40, px: cx, py: margin + 85 },
        // HOUSE 11 - TOP right (inner)
        { num: 11, nx: w * 0.625, ny: margin + 60, sx: w * 0.625, sy: margin + 40, px: w * 0.625, py: margin + 85 },
        // HOUSE 12 - RIGHT top (inner)
        { num: 12, nx: w - margin - 70, ny: cy - 60, sx: w - margin - 55, sy: cy - 75, px: w - margin - 70, py: cy - 40 }
    ]

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
            {/* OUTER RECTANGLE BORDER */}
            <rect x="5" y="5" width={w - 10} height={h - 10}
                fill="#FFFDF6" stroke="#D4AF37" strokeWidth="2.5" rx="2" />

            {/* MAIN CROSS LINES - Horizontal and Vertical */}
            <line x1={margin} y1={cy} x2={w - margin} y2={cy} stroke="#6BA3D4" strokeWidth="2" />
            <line x1={cx} y1={margin} x2={cx} y2={h - margin} stroke="#6BA3D4" strokeWidth="2" />

            {/* DIAGONAL LINES - Creating triangular sections */}
            {/* Top-left to center diagonals */}
            <line x1={margin} y1={margin} x2={cx} y2={cy} stroke="#90C090" strokeWidth="1.5" />
            {/* Top-right to center diagonals */}
            <line x1={w - margin} y1={margin} x2={cx} y2={cy} stroke="#FFB380" strokeWidth="1.5" />
            {/* Bottom-left to center diagonals */}
            <line x1={margin} y1={h - margin} x2={cx} y2={cy} stroke="#90C090" strokeWidth="1.5" />
            {/* Bottom-right to center diagonals */}
            <line x1={w - margin} y1={h - margin} x2={cx} y2={cy} stroke="#6BA3D4" strokeWidth="1.5" />

            {/* Inner rectangle for houses 9-12 */}
            <rect x={w * 0.3} y={margin} width={w * 0.4} height={cy - margin}
                fill="none" stroke="#9DC4E8" strokeWidth="1.5" />
            <line x1={w * 0.3} y1={cy - 30} x2={w * 0.7} y2={cy - 30} stroke="#9DC4E8" strokeWidth="1" />

            {/* Vertical dividers in top section */}
            <line x1={w * 0.375} y1={margin} x2={w * 0.375} y2={cy} stroke="#9DC4E8" strokeWidth="1.2" />
            <line x1={cx} y1={margin} x2={cx} y2={cy - 30} stroke="#9DC4E8" strokeWidth="1.2" />
            <line x1={w * 0.625} y1={margin} x2={w * 0.625} y2={cy} stroke="#9DC4E8" strokeWidth="1.2" />

            {/* Vertical dividers in bottom section */}
            <line x1={w * 0.375} y1={cy} x2={w * 0.375} y2={h - margin} stroke="#9DC4E8" strokeWidth="1.2" />
            <line x1={w * 0.625} y1={cy} x2={w * 0.625} y2={h - margin} stroke="#9DC4E8" strokeWidth="1.2" />

            {/* HOUSES - Numbers, Signs, Planets */}
            {housesLayout.map((h, idx) => {
                const data = houses[idx]
                return (
                    <g key={idx}>
                        <text x={h.nx} y={h.ny} fontSize="13" fill="#555"
                            textAnchor="middle" fontWeight="600">{h.num}</text>

                        {data.sign && (
                            <text x={h.sx} y={h.sy} fontSize="14" fill="#FF8834"
                                textAnchor="middle" fontWeight="700"
                                fontFamily="Noto Sans Devanagari, sans-serif">{data.sign}</text>
                        )}

                        {data.planets.length > 0 && (
                            <text x={h.px} y={h.py} fontSize="15" fill="#FF6B35"
                                textAnchor="middle" fontWeight="bold"
                                fontFamily="Noto Sans Devanagari, sans-serif">{data.planets.join(' ')}</text>
                        )}
                    </g>
                )
            })}
        </svg>
    )
}
