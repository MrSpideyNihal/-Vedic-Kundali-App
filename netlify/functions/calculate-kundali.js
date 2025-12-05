// Netlify serverless function for Vedic astrology calculations
// Using simplified astronomical calculations

// Swiss Ephemeris is not available, using simplified calculations
const swisseph = null;

// Zodiac signs
const ZODIAC_SIGNS = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
]

// Nakshatras (27 lunar mansions)
const NAKSHATRAS = [
    { name: 'Ashwini', lord: 'Ketu' },
    { name: 'Bharani', lord: 'Venus' },
    { name: 'Krittika', lord: 'Sun' },
    { name: 'Rohini', lord: 'Moon' },
    { name: 'Mrigashira', lord: 'Mars' },
    { name: 'Ardra', lord: 'Rahu' },
    { name: 'Punarvasu', lord: 'Jupiter' },
    { name: 'Pushya', lord: 'Saturn' },
    { name: 'Ashlesha', lord: 'Mercury' },
    { name: 'Magha', lord: 'Ketu' },
    { name: 'Purva Phalguni', lord: 'Venus' },
    { name: 'Uttara Phalguni', lord: 'Sun' },
    { name: 'Hasta', lord: 'Moon' },
    { name: 'Chitra', lord: 'Mars' },
    { name: 'Swati', lord: 'Rahu' },
    { name: 'Vishakha', lord: 'Jupiter' },
    { name: 'Anuradha', lord: 'Saturn' },
    { name: 'Jyeshtha', lord: 'Mercury' },
    { name: 'Mula', lord: 'Ketu' },
    { name: 'Purva Ashadha', lord: 'Venus' },
    { name: 'Uttara Ashadha', lord: 'Sun' },
    { name: 'Shravana', lord: 'Moon' },
    { name: 'Dhanishta', lord: 'Mars' },
    { name: 'Shatabhisha', lord: 'Rahu' },
    { name: 'Purva Bhadrapada', lord: 'Jupiter' },
    { name: 'Uttara Bhadrapada', lord: 'Saturn' },
    { name: 'Revati', lord: 'Mercury' }
]

// Vimshottari Dasha sequence and durations (in years)
const DASHA_SEQUENCE = [
    { planet: 'Ketu', years: 7 },
    { planet: 'Venus', years: 20 },
    { planet: 'Sun', years: 6 },
    { planet: 'Moon', years: 10 },
    { planet: 'Mars', years: 7 },
    { planet: 'Rahu', years: 18 },
    { planet: 'Jupiter', years: 16 },
    { planet: 'Saturn', years: 19 },
    { planet: 'Mercury', years: 17 },
]

exports.handler = async (event, context) => {
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
    }

    // Handle preflight request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        }
    }

    try {
        const data = JSON.parse(event.body)

        // Extract birth details
        const { dateOfBirth, timeOfBirth, location } = data

        // Parse date and time
        const [year, month, day] = dateOfBirth.split('-').map(Number)
        const [hours, minutes, seconds = 0] = timeOfBirth.split(':').map(Number)

        // Use simplified calculations
        const kundaliData = calculateSimplified(year, month, day, hours, minutes, seconds, location)

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(kundaliData)
        }

    } catch (error) {
        console.error('Error:', error)
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        }
    }
}

// Simplified calculation method
function calculateSimplified(year, month, day, hours, minutes, seconds, location) {
    // Calculate Julian Day (simplified)
    const a = Math.floor((14 - month) / 12)
    const y = year + 4800 - a
    const m = month + 12 * a - 3
    const jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045
    const jdFraction = (hours - 12) / 24 + minutes / 1440 + seconds / 86400
    const julianDay = jd + jdFraction

    // Lahiri Ayanamsa (simplified formula)
    const ayanamsa = 23.85 + (julianDay - 2451545.0) / 36525 * 0.013

    // Calculate approximate planetary positions (simplified)
    const daysSinceEpoch = julianDay - 2451545.0

    // Sun's mean longitude (simplified)
    const sunLong = (280.46 + 0.9856474 * daysSinceEpoch) % 360
    const sunSidereal = (sunLong - ayanamsa + 360) % 360

    // Moon's mean longitude (simplified)
    const moonLong = (218.32 + 13.176396 * daysSinceEpoch) % 360
    const moonSidereal = (moonLong - ayanamsa + 360) % 360

    // Other planets (very simplified - for demonstration)
    const marsLong = (355.45 + 0.5240207 * daysSinceEpoch) % 360
    const marsSidereal = (marsLong - ayanamsa + 360) % 360

    const mercuryLong = (252.25 + 4.0923344 * daysSinceEpoch) % 360
    const mercurySidereal = (mercuryLong - ayanamsa + 360) % 360

    const jupiterLong = (34.35 + 0.0830912 * daysSinceEpoch) % 360
    const jupiterSidereal = (jupiterLong - ayanamsa + 360) % 360

    const venusLong = (181.98 + 1.6021302 * daysSinceEpoch) % 360
    const venusSidereal = (venusLong - ayanamsa + 360) % 360

    const saturnLong = (50.08 + 0.0334442 * daysSinceEpoch) % 360
    const saturnSidereal = (saturnLong - ayanamsa + 360) % 360

    // Rahu (North Node) - simplified
    const rahuLong = (125.04 - 0.0529539 * daysSinceEpoch + 360 * 10) % 360
    const rahuSidereal = (rahuLong - ayanamsa + 360) % 360

    // Ketu is 180° opposite to Rahu
    const ketuSidereal = (rahuSidereal + 180) % 360

    // Calculate Ascendant (simplified using latitude and local sidereal time)
    const lst = (100.46 + 0.985647 * daysSinceEpoch + location.lon + 15 * (hours + minutes / 60)) % 360
    const ascendantLong = (lst - ayanamsa + 360) % 360

    // Helper function to get planet data
    const getPlanetData = (longitude) => {
        const sign = ZODIAC_SIGNS[Math.floor(longitude / 30)]
        const degree = longitude % 30
        const nakshatra = getNakshatra(longitude)
        const house = calculateHouse(longitude, ascendantLong)

        return {
            longitude,
            sign,
            degree,
            house,
            nakshatra: nakshatra.name,
            pada: nakshatra.pada,
            speed: 0 // Not calculated in simplified mode
        }
    }

    // Build planets object
    const planets = {
        Sun: getPlanetData(sunSidereal),
        Moon: getPlanetData(moonSidereal),
        Mars: getPlanetData(marsSidereal),
        Mercury: getPlanetData(mercurySidereal),
        Jupiter: getPlanetData(jupiterSidereal),
        Venus: getPlanetData(venusSidereal),
        Saturn: getPlanetData(saturnSidereal),
        Rahu: getPlanetData(rahuSidereal),
        Ketu: getPlanetData(ketuSidereal),
    }

    // Calculate signs
    const ascendantSign = ZODIAC_SIGNS[Math.floor(ascendantLong / 30)]
    const ascendantDegree = ascendantLong % 30
    const moonSign = planets.Moon.sign
    const sunSign = planets.Sun.sign

    // Birth Nakshatra (based on Moon)
    const birthNakshatra = getNakshatra(moonSidereal)

    // Calculate Panchang
    const panchang = calculatePanchang(julianDay, moonSidereal, sunSidereal)

    // Calculate Vimshottari Dasha
    const dashaInfo = calculateVimshottariDasha(birthNakshatra, year, month, day)

    // Detect Yogas
    const yogas = detectYogas(planets, ascendantLong)

    // Detect Doshas
    const doshas = detectDoshas(planets, ascendantLong)

    // Calculate houses (simplified - equal house system)
    const houses = []
    for (let i = 0; i < 12; i++) {
        houses.push((ascendantLong + i * 30) % 360)
    }

    return {
        ayanamsa,
        ascendant: {
            sign: ascendantSign,
            degree: ascendantDegree,
            longitude: ascendantLong
        },
        moonSign: {
            sign: moonSign
        },
        sunSign: {
            sign: sunSign
        },
        nakshatra: {
            name: birthNakshatra.name,
            pada: birthNakshatra.pada,
            lord: birthNakshatra.lord
        },
        planets,
        panchang,
        currentDasha: dashaInfo.current,
        dashaSequence: dashaInfo.sequence,
        yogas,
        doshas,
        houses
    }
}

function getNakshatra(longitude) {
    // Each nakshatra is 13°20' (13.333333°)
    const nakshatraIndex = Math.floor(longitude / 13.333333)
    const nakshatraProgress = (longitude % 13.333333) / 13.333333
    const pada = Math.floor(nakshatraProgress * 4) + 1

    const nakshatra = NAKSHATRAS[nakshatraIndex]

    return {
        name: nakshatra.name,
        lord: nakshatra.lord,
        pada
    }
}

function calculateHouse(planetLongitude, ascendantLongitude) {
    // Simplified house calculation (equal house system)
    let diff = planetLongitude - ascendantLongitude
    if (diff < 0) diff += 360

    return Math.floor(diff / 30) + 1
}

function calculatePanchang(julianDay, moonLongitude, sunLongitude) {
    // Calculate Tithi (lunar day)
    const elongation = (moonLongitude - sunLongitude + 360) % 360
    const tithiNumber = Math.floor(elongation / 12) + 1
    const tithiNames = [
        'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
        'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
        'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima/Amavasya'
    ]
    const tithi = tithiNames[Math.min(tithiNumber - 1, 14)]

    // Calculate weekday
    const weekdayNumber = Math.floor(julianDay + 1.5) % 7
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const weekday = weekdays[weekdayNumber]

    // Karana (half of Tithi)
    const karanaNumber = Math.floor(elongation / 6) % 11
    const karanas = ['Bava', 'Balava', 'Kaulava', 'Taitila', 'Garaja', 'Vanija', 'Vishti', 'Shakuni', 'Chatushpada', 'Naga', 'Kimstughna']
    const karana = karanas[karanaNumber]

    // Yoga (simplified)
    const yogaNumber = Math.floor((moonLongitude + sunLongitude) / 13.333333) % 27
    const yogas = [
        'Vishkambha', 'Priti', 'Ayushman', 'Saubhagya', 'Shobhana', 'Atiganda', 'Sukarman',
        'Dhriti', 'Shula', 'Ganda', 'Vriddhi', 'Dhruva', 'Vyaghata', 'Harshana',
        'Vajra', 'Siddhi', 'Vyatipata', 'Variyan', 'Parigha', 'Shiva', 'Siddha',
        'Sadhya', 'Shubha', 'Shukla', 'Brahma', 'Indra', 'Vaidhriti'
    ]
    const yoga = yogas[yogaNumber]

    return {
        tithi,
        karana,
        yoga,
        weekday
    }
}

function calculateVimshottariDasha(birthNakshatra, birthYear, birthMonth, birthDay) {
    // Find starting dasha based on birth nakshatra lord
    const nakshatraLord = birthNakshatra.lord
    const startIndex = DASHA_SEQUENCE.findIndex(d => d.planet === nakshatraLord)

    // Calculate dasha balance at birth (simplified - using pada)
    const totalDuration = DASHA_SEQUENCE[startIndex].years
    const completedFraction = (birthNakshatra.pada - 1) / 4
    const balanceYears = totalDuration * (1 - completedFraction)

    const balanceMonths = Math.floor((balanceYears % 1) * 12)
    const balanceDays = Math.floor(((balanceYears % 1) * 12 % 1) * 30)

    // Generate dasha sequence from birth
    const sequence = []
    let currentDate = new Date(birthYear, birthMonth - 1, birthDay)

    // Add first dasha with balance
    sequence.push({
        planet: DASHA_SEQUENCE[startIndex].planet,
        startDate: formatDate(currentDate),
        endDate: formatDate(addYears(currentDate, balanceYears)),
        years: Math.floor(balanceYears)
    })

    currentDate = addYears(currentDate, balanceYears)

    // Add remaining dashas in sequence
    for (let i = 1; i < DASHA_SEQUENCE.length; i++) {
        const dashaIndex = (startIndex + i) % DASHA_SEQUENCE.length
        const dasha = DASHA_SEQUENCE[dashaIndex]

        sequence.push({
            planet: dasha.planet,
            startDate: formatDate(currentDate),
            endDate: formatDate(addYears(currentDate, dasha.years)),
            years: dasha.years
        })

        currentDate = addYears(currentDate, dasha.years)
    }

    // Determine current dasha
    const now = new Date()
    let currentDasha = sequence[0]

    for (const dasha of sequence) {
        const endDate = new Date(dasha.endDate.split('/').reverse().join('-'))
        if (now < endDate) {
            currentDasha = dasha
            break
        }
    }

    return {
        current: {
            planet: currentDasha.planet,
            balance: {
                years: Math.floor(balanceYears),
                months: balanceMonths,
                days: balanceDays
            }
        },
        sequence: sequence.slice(0, 10) // Return first 10 dashas
    }
}

function detectYogas(planets, ascendantLongitude) {
    const yogas = []

    // Raj Yoga: Lords of kendras and trikonas together
    // Simplified detection
    if (planets.Jupiter.house === 1 || planets.Jupiter.house === 4 ||
        planets.Jupiter.house === 7 || planets.Jupiter.house === 10) {
        yogas.push('Gaja Kesari Yoga - Jupiter in Kendra from Moon')
    }

    if (planets.Venus.house === 1 || planets.Venus.house === 4) {
        yogas.push('Malavya Yoga - Venus in Kendra')
    }

    if (planets.Mars.house === 1 || planets.Mars.house === 10) {
        yogas.push('Ruchaka Yoga - Mars in Kendra')
    }

    return yogas
}

function detectDoshas(planets, ascendantLongitude) {
    const doshas = {
        mangal: false,
        kaalSarp: false,
        sadeSati: false
    }

    // Mangal Dosha: Mars in 1st, 4th, 7th, 8th, or 12th house
    if ([1, 4, 7, 8, 12].includes(planets.Mars.house)) {
        doshas.mangal = true
    }

    // Kaal Sarp Dosha: All planets between Rahu and Ketu
    const rahuLong = planets.Rahu.longitude
    const ketuLong = planets.Ketu.longitude

    let allBetween = true
    for (const [name, planet] of Object.entries(planets)) {
        if (name === 'Rahu' || name === 'Ketu') continue

        const pLong = planet.longitude
        const isBetween = (rahuLong < ketuLong)
            ? (pLong > rahuLong && pLong < ketuLong)
            : (pLong > rahuLong || pLong < ketuLong)

        if (!isBetween) {
            allBetween = false
            break
        }
    }
    doshas.kaalSarp = allBetween

    // Sade Sati: Saturn transiting 12th, 1st, or 2nd from Moon sign
    const moonSign = Math.floor(planets.Moon.longitude / 30)
    const saturnSign = Math.floor(planets.Saturn.longitude / 30)
    const diff = (saturnSign - moonSign + 12) % 12

    if (diff === 11 || diff === 0 || diff === 1) {
        doshas.sadeSati = true
    }

    return doshas
}

function addYears(date, years) {
    const newDate = new Date(date)
    newDate.setFullYear(newDate.getFullYear() + Math.floor(years))
    newDate.setMonth(newDate.getMonth() + Math.floor((years % 1) * 12))
    return newDate
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}
