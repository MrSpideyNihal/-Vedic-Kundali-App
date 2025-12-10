// South Indian Rectangular Grid Style - Descending House Pattern

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

    // Rectangular grid dimensions
    const w = 440, h = 330
    const cellW = 110, cellH = 82.5
    const startX = 0, startY = 0

    // South Indian descending pattern: 12,1,2,3 / 11,X,X,4 / 10,X,X,5 / 9,8,7,6
    const gridLayout = [
        [11, 0, 1, 2],   // Row 0: Houses 12, 1, 2, 3
        [10, -1, -1, 3], // Row 1: Houses 11, empty, empty, 4
        [9, -1, -1, 4],  // Row 2: Houses 10, empty, empty, 5
        [8, 7, 6, 5]     // Row 3: Houses 9, 8, 7, 6
    ]

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" style={{ backgroundColor: '#FFFEF8' }}>
            {/* Outer border */}
            <rect x="0" y="0" width={w} height={h} fill="none" stroke="#D4AF37" strokeWidth="3" />

            {/* Draw grid cells */}
            {gridLayout.map((row, rowIdx) => 
                row.map((houseIdx, colIdx) => {
                    const x = startX + colIdx * cellW
                    const y = startY + rowIdx * cellH
                    
                    return (
                        <g key={`${rowIdx}-${colIdx}`}>
                            {/* Cell border */}
                            <rect 
                                x={x} 
                                y={y} 
                                width={cellW} 
                                height={cellH} 
                                fill="none" 
                                stroke="#6BA3D4" 
                                strokeWidth="1.5" 
                            />
                            
                            {houseIdx >= 0 && (() => {
                                const h = houses[houseIdx]
                                const houseNum = houseIdx + 1
                                
                                return (
                                    <>
                                        {/* House number - top left corner */}
                                        <text 
                                            x={x + 8} 
                                            y={y + 14} 
                                            fontSize="11" 
                                            fill="#444" 
                                            fontWeight="600"
                                        >
                                            {houseNum}
                                        </text>
                                        
                                        {/* Sign symbol - top right corner */}
                                        {h.sign && (
                                            <text 
                                                x={x + cellW - 8} 
                                                y={y + 16} 
                                                fontSize="13" 
                                                fill="#FF8834" 
                                                textAnchor="end" 
                                                fontWeight="700" 
                                                fontFamily="Noto Sans Devanagari"
                                            >
                                                {h.sign}
                                            </text>
                                        )}
                                        
                                        {/* Planets - center of cell */}
                                        {h.planets.length > 0 && (
                                            <text 
                                                x={x + cellW / 2} 
                                                y={y + cellH / 2 + 5} 
                                                fontSize="14" 
                                                fill="#FF6B35" 
                                                textAnchor="middle" 
                                                fontWeight="bold" 
                                                fontFamily="Noto Sans Devanagari"
                                            >
                                                {h.planets.join(' ')}
                                            </text>
                                        )}
                                    </>
                                )
                            })()}
                        </g>
                    )
                })
            )}

            {/* Diagonal lines for inner cells (decorative) */}
            <line 
                x1={cellW} 
                y1={cellH} 
                x2={cellW * 3} 
                y2={cellH} 
                stroke="#90C090" 
                strokeWidth="1" 
            />
            <line 
                x1={cellW} 
                y1={cellH * 3} 
                x2={cellW * 3} 
                y2={cellH * 3} 
                stroke="#90C090" 
                strokeWidth="1" 
            />
            <line 
                x1={cellW} 
                y1={cellH} 
                x2={cellW} 
                y2={cellH * 3} 
                stroke="#FFB380" 
                strokeWidth="1" 
            />
            <line 
                x1={cellW * 3} 
                y1={cellH} 
                x2={cellW * 3} 
                y2={cellH * 3} 
                stroke="#FFB380" 
                strokeWidth="1" 
            />
            <line 
                x1={cellW} 
                y1={cellH} 
                x2={cellW * 3} 
                y2={cellH * 3} 
                stroke="#A8C5E0" 
                strokeWidth="1" 
            />
            <line 
                x1={cellW * 3} 
                y1={cellH} 
                x2={cellW} 
                y2={cellH * 3} 
                stroke="#A8C5E0" 
                strokeWidth="1" 
            />
        </svg>
    )
}
