// PDF Chart Generator - Creates visual charts for PDF using pdfmake canvas
// South Indian Rectangular Grid Style Kundali Charts

export function generatePDFChart(kundaliData, chartType = 'lagna') {
    const houses = Array(12).fill(null).map(() => [])

    // Place planets in houses based on chart type
    if (chartType === 'lagna') {
        Object.entries(kundaliData.planets).forEach(([planet, data]) => {
            const houseIndex = data.house - 1
            houses[houseIndex].push(getPlanetSymbol(planet))
        })
        houses[0].push('ल') // Ascendant marker
    } else if (chartType === 'navamsha') {
        Object.entries(kundaliData.planets).forEach(([planet, data]) => {
            const navamshaHouse = calculateNavamshaHouse(data.degree, data.sign)
            houses[navamshaHouse].push(getPlanetSymbol(planet))
        })
    }

    // Rectangular grid dimensions for PDF
    const w = 440, h = 330
    const cellW = 110, cellH = 82.5

    // South Indian descending pattern: 12,1,2,3 / 11,X,X,4 / 10,X,X,5 / 9,8,7,6
    const gridLayout = [
        [11, 0, 1, 2],   // Row 0: Houses 12, 1, 2, 3
        [10, -1, -1, 3], // Row 1: Houses 11, empty, empty, 4
        [9, -1, -1, 4],  // Row 2: Houses 10, empty, empty, 5
        [8, 7, 6, 5]     // Row 3: Houses 9, 8, 7, 6
    ]

    // Generate canvas drawing commands
    const canvas = [
        // Outer border
        {
            type: 'rect',
            x: 0,
            y: 0,
            w: w,
            h: h,
            lineWidth: 3,
            lineColor: '#D4AF37'
        }
    ]

    // Draw grid cells
    gridLayout.forEach((row, rowIdx) => {
        row.forEach((houseIdx, colIdx) => {
            const x = colIdx * cellW
            const y = rowIdx * cellH

            // Cell border
            canvas.push({
                type: 'rect',
                x: x,
                y: y,
                w: cellW,
                h: cellH,
                lineWidth: 1.5,
                lineColor: '#6BA3D4'
            })
        })
    })

    // Add decorative diagonal lines for inner cells
    canvas.push(
        { type: 'line', x1: cellW, y1: cellH, x2: cellW * 3, y2: cellH, lineWidth: 1, lineColor: '#90C090' },
        { type: 'line', x1: cellW, y1: cellH * 3, x2: cellW * 3, y2: cellH * 3, lineWidth: 1, lineColor: '#90C090' },
        { type: 'line', x1: cellW, y1: cellH, x2: cellW, y2: cellH * 3, lineWidth: 1, lineColor: '#FFB380' },
        { type: 'line', x1: cellW * 3, y1: cellH, x2: cellW * 3, y2: cellH * 3, lineWidth: 1, lineColor: '#FFB380' },
        { type: 'line', x1: cellW, y1: cellH, x2: cellW * 3, y2: cellH * 3, lineWidth: 1, lineColor: '#A8C5E0' },
        { type: 'line', x1: cellW * 3, y1: cellH, x2: cellW, y2: cellH * 3, lineWidth: 1, lineColor: '#A8C5E0' }
    )

    // Add house numbers and planets as text overlays
    const textElements = []
    gridLayout.forEach((row, rowIdx) => {
        row.forEach((houseIdx, colIdx) => {
            if (houseIdx >= 0) {
                const x = colIdx * cellW
                const y = rowIdx * cellH
                const planetsInHouse = houses[houseIdx]
                const houseNum = houseIdx + 1

                // House number - top left corner
                textElements.push({
                    text: houseNum.toString(),
                    absolutePosition: { x: x + 8, y: y + 14 },
                    fontSize: 11,
                    bold: true,
                    color: '#444'
                })

                // Planets - center of cell
                if (planetsInHouse.length > 0) {
                    textElements.push({
                        text: planetsInHouse.join(' '),
                        absolutePosition: { x: x + cellW / 2 - 15, y: y + cellH / 2 },
                        fontSize: 14,
                        bold: true,
                        color: '#FF6B35',
                        font: 'NotoSansDevanagari'
                    })
                }
            }
        })
    })

    return {
        canvas,
        width: w,
        height: h,
        textElements
    }
}

function getPlanetSymbol(planet) {
    const symbols = {
        Sun: 'सू',
        Moon: 'च',
        Mars: 'मं',
        Mercury: 'बु',
        Jupiter: 'गु',
        Venus: 'शु',
        Saturn: 'श',
        Rahu: 'रा',
        Ketu: 'के',
    }
    return symbols[planet] || planet.substring(0, 2)
}

function calculateNavamshaHouse(degree, sign) {
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
        'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
    const signIndex = signs.indexOf(sign)
    const navamshaIndex = Math.floor(degree / 3.333333)
    const navamshaSign = (signIndex * 9 + navamshaIndex) % 12
    return navamshaSign
}
