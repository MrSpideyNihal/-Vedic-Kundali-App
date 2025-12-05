// Chart rendering utilities for North Indian style Kundali

export function drawKundaliChart(kundaliData) {
    // North Indian diamond-shaped chart
    // This is a text-based representation
    const houses = Array(12).fill([])

    // Place planets in houses
    Object.entries(kundaliData.planets).forEach(([planet, data]) => {
        const houseIndex = data.house - 1
        if (!houses[houseIndex]) houses[houseIndex] = []
        houses[houseIndex].push(getPlanetSymbol(planet))
    })

    // Add ascendant to first house
    houses[0].push('ल')

    // Create chart layout
    const chart = `
              ${formatHouse(houses[11])}
          ┌───────────────┐
          │               │
  ${formatHouse(houses[10])}  │               │  ${formatHouse(houses[0])}
          │               │
          ├───────────────┤
          │               │
  ${formatHouse(houses[9])}   │               │  ${formatHouse(houses[1])}
          │               │
          ├───────────────┤
          │               │
  ${formatHouse(houses[8])}   │               │  ${formatHouse(houses[2])}
          │               │
          └───────────────┘
              ${formatHouse(houses[3])}
              
  ${formatHouse(houses[7])}                   ${formatHouse(houses[4])}
  
              ${formatHouse(houses[6])}
              
              ${formatHouse(houses[5])}
  `

    return chart
}

export function drawNavamshaChart(kundaliData) {
    // Similar to Lagna chart but for Navamsha positions
    const houses = Array(12).fill([])

    // Calculate Navamsha positions (simplified)
    Object.entries(kundaliData.planets).forEach(([planet, data]) => {
        const navamshaHouse = calculateNavamshaHouse(data.degree, data.sign)
        if (!houses[navamshaHouse]) houses[navamshaHouse] = []
        houses[navamshaHouse].push(getPlanetSymbol(planet))
    })

    const chart = `
              ${formatHouse(houses[11])}
          ┌───────────────┐
          │               │
  ${formatHouse(houses[10])}  │               │  ${formatHouse(houses[0])}
          │               │
          ├───────────────┤
          │               │
  ${formatHouse(houses[9])}   │               │  ${formatHouse(houses[1])}
          │               │
          ├───────────────┤
          │               │
  ${formatHouse(houses[8])}   │               │  ${formatHouse(houses[2])}
          │               │
          └───────────────┘
              ${formatHouse(houses[3])}
              
  ${formatHouse(houses[7])}                   ${formatHouse(houses[4])}
  
              ${formatHouse(houses[6])}
              
              ${formatHouse(houses[5])}
  `

    return chart
}

export function drawChalitChart(kundaliData) {
    // Chalit (Bhava Chalit) chart
    return drawKundaliChart(kundaliData) // Simplified - same as Lagna for now
}

function getPlanetSymbol(planet) {
    const symbols = {
        Sun: 'सु',
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

function formatHouse(planets) {
    if (!planets || planets.length === 0) return '    '
    return planets.join(' ').padEnd(4, ' ')
}

function calculateNavamshaHouse(degree, sign) {
    // Simplified Navamsha calculation
    // Each sign is divided into 9 parts of 3°20' each
    const signIndex = getSignIndex(sign)
    const navamshaIndex = Math.floor(degree / 3.333333)
    const navamshaSign = (signIndex * 9 + navamshaIndex) % 12
    return navamshaSign
}

function getSignIndex(sign) {
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
        'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
    return signs.indexOf(sign)
}
