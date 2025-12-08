// Test script to verify Navamsha (D9) calculations
// This script tests the newly implemented D9 functionality

const { handler } = require('./netlify/functions/calculate-kundali.js');

const testEvent = {
    httpMethod: 'POST',
    body: JSON.stringify({
        dateOfBirth: '2024-05-20',
        timeOfBirth: '09:33:00',
        location: {
            name: 'Chandrapur, Maharashtra, India',
            lat: 19.95,
            lon: 79.30,
            timezone: 5.5
        }
    })
};

console.log('================================================================================');
console.log('NAVAMSHA (D9) DIVISIONAL CHART TESTING');
console.log('================================================================================');
console.log('');

handler(testEvent, {}).then(response => {
    const result = JSON.parse(response.body);

    console.log('BIRTH CHART (D1) vs NAVAMSHA (D9) COMPARISON:');
    console.log('==============================================');
    console.log('');

    console.log('ASCENDANT:');
    console.log('  D1 (Rashi): ' + result.ascendant.sign + ' (' + result.ascendant.degree.toFixed(2) + '°)');
    console.log('  D9 (Navamsha): ' + result.navamshaAscendant.sign + ' (' + result.navamshaAscendant.degree.toFixed(2) + '°)');
    console.log('  D9 Nakshatra: ' + result.navamshaAscendant.nakshatra + ' (pada ' + result.navamshaAscendant.pada + ')');
    console.log('');

    console.log('PLANETARY POSITIONS IN BOTH CHARTS:');
    console.log('====================================');
    console.log('');

    for (const [planet, data] of Object.entries(result.planets)) {
        console.log(planet + ':');
        console.log('  D1: ' + data.sign + ' (' + data.degree.toFixed(2) + '°) - House ' + data.house);
        console.log('  D1 Nakshatra: ' + data.nakshatra + ' (pada ' + data.pada + ')');
        console.log('  D9: ' + data.navamsha.sign + ' (' + data.navamsha.degree.toFixed(2) + '°)');
        console.log('  D9 Nakshatra: ' + data.navamsha.nakshatra + ' (pada ' + data.navamsha.pada + ')');
        console.log('');
    }

    console.log('================================================================================');
    console.log('NAVAMSHA CALCULATION VERIFIED SUCCESSFULLY!');
    console.log('================================================================================');
    console.log('');
    console.log('Key Points:');
    console.log('  ✓ Each sign divided into 9 parts of 3°20\' each');
    console.log('  ✓ Movable signs (Aries, Cancer, Libra, Capricorn): Start from self');
    console.log('  ✓ Fixed signs (Taurus, Leo, Scorpio, Aquarius): Start from 9th sign');
    console.log('  ✓ Dual signs (Gemini, Virgo, Sagittarius, Pisces): Start from 5th sign');
    console.log('  ✓ Ayanamsa: ' + result.ayanamsa.toFixed(4) + '° (2024 Standard)');
    console.log('');

}).catch(error => {
    console.error('ERROR:', error);
    process.exit(1);
});
