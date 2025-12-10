// PDF Chart Generator - Creates visual charts for PDF using pdfmake canvas
// North Indian Diamond Style Kundali Charts

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

    // Create canvas-based diamond chart for PDF
    const size = 400
    const center = size / 2
    const radius = size / 2.5

    // Calculate diamond points
    const top = { x: center, y: center - radius }
    const right = { x: center + radius, y: center }
    const bottom = { x: center, y: center + radius }
    const left = { x: center - radius, y: center }

    // House positions in diamond layout (North Indian style)
    const housePositions = [
        { x: center + radius * 0.6, y: center - radius * 0.3 }, // 1
        { x: center + radius * 0.6, y: center + radius * 0.3 }, // 2
        { x: center + radius * 0.3, y: center + radius * 0.6 }, // 3
        { x: center, y: center + radius * 0.8 }, // 4
        { x: center - radius * 0.3, y: center + radius * 0.6 }, // 5
        { x: center - radius * 0.6, y: center + radius * 0.3 }, // 6
        { x: center - radius * 0.6, y: center - radius * 0.3 }, // 7
        { x: center - radius * 0.3, y: center - radius * 0.6 }, // 8
        { x: center, y: center - radius * 0.8 }, // 9
        { x: center + radius * 0.3, y: center - radius * 0.6 }, // 10
        { x: center + radius * 0.6, y: center - radius * 0.6 }, // 11
        { x: center, y: center - radius * 0.4 }, // 12
    ]

    // Generate canvas drawing commands
    const canvas = [
        // Outer diamond
        {
            type: 'polyline',
            lineWidth: 2,
            lineColor: '#f97316',
            closePath: true,
            points: [
                { x: top.x, y: top.y },
                { x: right.x, y: right.y },
                { x: bottom.x, y: bottom.y },
                { x: left.x, y: left.y }
            ]
        },
        // Inner cross lines
        { type: 'line', x1: top.x, y1: top.y, x2: bottom.x, y2: bottom.y, lineWidth: 1, lineColor: '#f97316' },
        { type: 'line', x1: left.x, y1: left.y, x2: right.x, y2: right.y, lineWidth: 1, lineColor: '#f97316' },
        // Diagonal lines
        { type: 'line', x1: center, y1: top.y, x2: right.x, y2: center, lineWidth: 1, lineColor: '#f97316' },
        { type: 'line', x1: right.x, y1: center, x2: center, y2: bottom.y, lineWidth: 1, lineColor: '#f97316' },
        { type: 'line', x1: center, y1: bottom.y, x2: left.x, y2: center, lineWidth: 1, lineColor: '#f97316' },
        { type: 'line', x1: left.x, y1: center, x2: center, y2: top.y, lineWidth: 1, lineColor: '#f97316' },
    ]

    // Add house numbers and planets as text overlays
    const textElements = []
    housePositions.forEach((pos, index) => {
        const planetsInHouse = houses[index]
        if (planetsInHouse.length > 0) {
            textElements.push({
                text: planetsInHouse.join(' '),
                absolutePosition: { x: pos.x - 15, y: pos.y - 5 },
                fontSize: 12,
                bold: true,
                color: '#f97316'
            })
        }
        // House number
        textElements.push({
            text: (index + 1).toString(),
            absolutePosition: { x: pos.x + 20, y: pos.y - 8 },
            fontSize: 8,
            color: '#666'
        })
    })

    return {
        canvas,
        width: size,
        height: size,
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
