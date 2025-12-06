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
    return new Promise((resolve, reject) => {
        try {
            // Create canvas outside of React's rendering
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
            const dataUrl = canvas.toDataURL('image/png')

            // Clean up
            canvas.width = 0
            canvas.height = 0

            resolve(dataUrl)
        } catch (error) {
            reject(error)
        }
    })
}






/**
 * Draw North Indian style rectangular chart on canvas (matching reference image)
 */
function drawNorthIndianChart(ctx, houses, size) {
    const padding = 30
    const width = size - (padding * 2)
    const height = width * 0.7 // Rectangular ratio
    const startX = padding
    const startY = (size - height) / 2

    // Calculate key points
    const centerX = startX + width / 2
    const centerY = startY + height / 2
    const topY = startY
    const bottomY = startY + height
    const leftX = startX
    const rightX = startX + width

    // Diagonal line colors (matching reference image)
    const colors = {
        topLeft: '#8B7355',      // Brown
        topRight: '#FF8C42',     // Orange
        bottomRight: '#4A90E2',  // Blue
        bottomLeft: '#90EE90'    // Green
    }

    // Draw outer rectangle
    ctx.strokeStyle = '#D4AF37' // Gold color
    ctx.lineWidth = 3
    ctx.strokeRect(leftX, topY, width, height)

    // Draw diagonal lines with colors
    ctx.lineWidth = 2

    // Top-left to center (brown)
    ctx.strokeStyle = colors.topLeft
    ctx.beginPath()
    ctx.moveTo(leftX, topY)
    ctx.lineTo(centerX, centerY)
    ctx.stroke()

    // Top-right to center (orange)
    ctx.strokeStyle = colors.topRight
    ctx.beginPath()
    ctx.moveTo(rightX, topY)
    ctx.lineTo(centerX, centerY)
    ctx.stroke()

    // Bottom-right to center (blue)
    ctx.strokeStyle = colors.bottomRight
    ctx.beginPath()
    ctx.moveTo(rightX, bottomY)
    ctx.lineTo(centerX, centerY)
    ctx.stroke()

    // Bottom-left to center (green)
    ctx.strokeStyle = colors.bottomLeft
    ctx.beginPath()
    ctx.moveTo(leftX, bottomY)
    ctx.lineTo(centerX, centerY)
    ctx.stroke()

    // Draw middle horizontal line (blue)
    ctx.strokeStyle = colors.bottomRight
    ctx.beginPath()
    ctx.moveTo(leftX, centerY)
    ctx.lineTo(rightX, centerY)
    ctx.stroke()

    // Draw middle vertical line (blue)
    ctx.beginPath()
    ctx.moveTo(centerX, topY)
    ctx.lineTo(centerX, bottomY)
    ctx.stroke()

    // Additional diagonal lines for house divisions
    const quarterX = width / 4
    const quarterY = height / 4

    // Left side diagonals
    ctx.strokeStyle = colors.bottomLeft
    ctx.beginPath()
    ctx.moveTo(leftX + quarterX, topY)
    ctx.lineTo(leftX, topY + quarterY)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(leftX + quarterX, bottomY)
    ctx.lineTo(leftX, bottomY - quarterY)
    ctx.stroke()

    // Right side diagonals
    ctx.strokeStyle = colors.topRight
    ctx.beginPath()
    ctx.moveTo(rightX - quarterX, topY)
    ctx.lineTo(rightX, topY + quarterY)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(rightX - quarterX, bottomY)
    ctx.lineTo(rightX, bottomY - quarterY)
    ctx.stroke()

    // House positions (North Indian rectangular style - ACCURATE)
    // Houses are numbered counter-clockwise starting from ascendant (house 1)
    const housePositions = [
        // House 1 - Right middle
        { x: rightX - 40, y: centerY, label: '1', align: 'right' },
        // House 2 - Right bottom
        { x: rightX - 50, y: bottomY - 50, label: '2', align: 'right' },
        // House 3 - Bottom right
        { x: centerX + 80, y: bottomY - 35, label: '3', align: 'center' },
        // House 4 - Bottom middle-right
        { x: centerX + 30, y: bottomY - 35, label: '4', align: 'center' },
        // House 5 - Bottom middle-left  
        { x: centerX - 30, y: bottomY - 35, label: '5', align: 'center' },
        // House 6 - Bottom left
        { x: centerX - 80, y: bottomY - 35, label: '6', align: 'center' },
        // House 7 - Left middle
        { x: leftX + 40, y: centerY, label: '7', align: 'left' },
        // House 8 - Left top
        { x: leftX + 50, y: topY + 50, label: '8', align: 'left' },
        // House 9 - Top left
        { x: centerX - 80, y: topY + 35, label: '9', align: 'center' },
        // House 10 - Top middle-left
        { x: centerX - 30, y: topY + 35, label: '10', align: 'center' },
        // House 11 - Top middle-right
        { x: centerX + 30, y: topY + 35, label: '11', align: 'center' },
        // House 12 - Top right
        { x: centerX + 80, y: topY + 35, label: '12', align: 'center' }
    ]

    // Draw house numbers and planets
    housePositions.forEach((pos, index) => {
        const planets = houses[index] || []

        // Draw house number
        ctx.fillStyle = '#4A90E2' // Blue color for numbers
        ctx.font = 'bold 16px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(pos.label, pos.x, pos.y - 10)

        // Draw planets if present
        if (planets.length > 0) {
            ctx.fillStyle = '#FF6B35' // Orange color for planets
            ctx.font = 'bold 18px Arial'
            ctx.textAlign = 'center'
            const planetText = planets.join(' ')
            ctx.fillText(planetText, pos.x, pos.y + 15)
        }
    })
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
