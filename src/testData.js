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
        lat: 19.95,
        lon: 79.30,
        city: 'Chandrapur',
        state: 'Maharashtra',
        country: 'India',
        timezone: 5.5
    }
}

// Expected results for verification
export const expectedResults = {
    ascendant: {
        sign: 'Cancer',
        approximateDegree: 0.34 // This will vary slightly based on exact time
    },
    moonSign: {
        sign: 'Taurus'
    },
    sunSign: {
        sign: 'Taurus'
    },
    nakshatra: {
        name: 'Krittika',
        pada: 3
    }
}
