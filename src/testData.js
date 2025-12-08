// Test data for Kundali generation
// Use this data to test the application

export const testBirthData = {
    firstName: 'AVYAAN',
    middleName: 'BHANUPRATAP',
    lastName: 'UPADHYAY',
    dateOfBirth: '2024-05-20',
    timeOfBirth: '09:33:00',
    location: {
        name: 'Chandrapur, Maharashtra, India',
        lat: 19.95, // 19:57 N from PDF
        lon: 79.30, // 79:18 E from PDF
        city: 'Chandrapur',
        state: 'Maharashtra',
        country: 'India',
        timezone: 5.5 // IST
    }
}

// Expected results for verification (from actual PDF)
export const expectedResults = {
    ascendant: {
        sign: 'Cancer',
        nakshatra: 'Punarvasu',
        pada: 4
    },
    moonSign: {
        sign: 'Virgo', // Corrected from Taurus
        nakshatra: 'Chitra' // Corrected from Krittika
    },
    sunSign: {
        sign: 'Taurus',
        nakshatra: 'Krittika'
    },
    // Additional planetary positions from PDF
    planets: {
        Mars: { sign: 'Pisces', nakshatra: 'Revati' },
        Mercury: { sign: 'Aries', nakshatra: 'Ashwini' },
        Jupiter: { sign: 'Taurus', nakshatra: 'Krittika' },
        Venus: { sign: 'Taurus', nakshatra: 'Krittika' },
        Saturn: { sign: 'Aquarius', nakshatra: 'Purva Bhadrapada' },
        Rahu: { sign: 'Pisces', nakshatra: 'Revati' },
        Ketu: { sign: 'Virgo', nakshatra: 'Hasta' }
    }
}
