// Generate chart images for PDF embedding
// Converts SVG-based charts to canvas and returns base64 PNG data URLs

const PLANET_SYMBOLS = {
    Sun: 'सु',
    Moon: 'च',
    Mars: 'मं',
    Mercury: 'बु',
    Jupiter: 'गु',
    Venus: 'शु',
    Saturn: 'श',
    Rahu: 'रा',
    Ketu: 'के'
}

/**
 * Generate a North Indian style chart image
 * @param {Object} kundaliData - The kundali data
 * @param {string} chartType - 'lagna', 'navamsha', or 'chalit'
 * @returns {Promise<string>} Base64 data URL of the chart image
 */
export async function generateChartImage(kundaliData, chartType = 'lagna') {
    // Create canvas
    const canvas = document.createElement('canvas')
    const size = 400
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')

    // Set background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, size, size)

    // Initialize houses
    const houses = Array(12).fill(null).map(() => [])

    // Place planets in houses based on chart type
    if (chartType === 'lagna' || chartType === 'chalit') {
        // Lagna/Chalit chart - use actual house positions
        Object.entries(kundaliData.planets).forEach(([planet, data]) => {
            const houseIndex = data.house - 1
            houses[houseIndex].push(PLANET_SYMBOLS[planet])
        })
        // Add ascendant to first house
        houses[0].push('ल')
    } else if (chartType === 'navamsha') {
        // Navamsha chart - simplified calculation
        Object.entries(kundaliData.planets).forEach(([planet, data]) => {
            const navamshaHouse = calculateNavamshaHouse(data.degree, data.sign)
            houses[navamshaHouse].push(PLANET_SYMBOLS[planet])
        })
    }

    // Draw the chart
    drawNorthIndianChart(ctx, houses, size)

    // Convert to base64 data URL
    return canvas.toDataURL('image/png')
}

/**
 * Draw North Indian style diamond chart on canvas
 */
function drawNorthIndianChart(ctx, houses, size) {
    const centerX = size / 2
    const centerY = size / 2
    const radius = size * 0.4

    // Set up drawing styles
    ctx.strokeStyle = '#f97316'
    ctx.lineWidth = 2

    // Draw diamond outline
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - radius)
    ctx.lineTo(centerX + radius, centerY)
    ctx.lineTo(centerX, centerY + radius)
    ctx.lineTo(centerX - radius, centerY)
    ctx.closePath()
    ctx.stroke()

    // Draw inner divisions
    ctx.lineWidth = 1

    // Vertical and horizontal lines
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - radius)
    ctx.lineTo(centerX, centerY + radius)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(centerX - radius, centerY)
    ctx.lineTo(centerX + radius, centerY)
    ctx.stroke()

    // Diagonal lines
    ctx.beginPath()
    ctx.moveTo(centerX - radius * 0.707, centerY - radius * 0.707)
    ctx.lineTo(centerX + radius * 0.707, centerY + radius * 0.707)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(centerX + radius * 0.707, centerY - radius * 0.707)
    ctx.lineTo(centerX - radius * 0.707, centerY + radius * 0.707)
    ctx.stroke()

    // House positions (North Indian style)
    const housePositions = [
        { x: centerX + radius * 0.6, y: centerY - radius * 0.3, label: '1' },   // Right upper
        { x: centerX + radius * 0.6, y: centerY + radius * 0.1, label: '2' },   // Right middle-upper
        { x: centerX + radius * 0.6, y: centerY + radius * 0.5, label: '3' },   // Right middle-lower
        { x: centerX + radius * 0.3, y: centerY + radius * 0.7, label: '4' },   // Bottom right
        { x: centerX + radius * 0.0, y: centerY + radius * 0.7, label: '5' },   // Bottom middle-right
        { x: centerX - radius * 0.3, y: centerY + radius * 0.7, label: '6' },   // Bottom middle-left
        { x: centerX - radius * 0.6, y: centerY + radius * 0.5, label: '7' },   // Left middle-lower
        { x: centerX - radius * 0.6, y: centerY + radius * 0.1, label: '8' },   // Left middle-upper
        { x: centerX - radius * 0.6, y: centerY - radius * 0.3, label: '9' },   // Left upper
        { x: centerX - radius * 0.3, y: centerY - radius * 0.7, label: '10' },  // Top left
        { x: centerX + radius * 0.0, y: centerY - radius * 0.7, label: '11' },  // Top middle-left
        { x: centerX + radius * 0.3, y: centerY - radius * 0.7, label: '12' }   // Top middle-right
    ]

    // Draw house numbers and planets
    housePositions.forEach((pos, index) => {
        const planets = houses[index] || []

        // Draw house number
        ctx.fillStyle = '#666666'
        ctx.font = 'bold 12px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(pos.label, pos.x, pos.y)

        // Draw planets if present
        if (planets.length > 0) {
            ctx.fillStyle = '#f97316'
            ctx.font = 'bold 16px Arial'
            ctx.fillText(planets.join(' '), pos.x, pos.y + 18)
        }
    })

    // Draw center decoration
    ctx.beginPath()
    ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI)
    ctx.fillStyle = '#fff7ed'
    ctx.fill()
    ctx.strokeStyle = '#f97316'
    ctx.lineWidth = 1
    ctx.stroke()

    // Draw Om symbol
    ctx.fillStyle = '#f97316'
    ctx.font = 'bold 20px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText('ॐ', centerX, centerY)
}

/**
 * Calculate Navamsha house position
 */
function calculateNavamshaHouse(degree, sign) {
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
        'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
    const signIndex = signs.indexOf(sign)
    const navamshaIndex = Math.floor(degree / 3.333333)
    const navamshaSign = (signIndex * 9 + navamshaIndex) % 12
    return navamshaSign
}
