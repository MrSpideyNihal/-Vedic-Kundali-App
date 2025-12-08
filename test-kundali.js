// Simple test to verify the fixed kundali calculations work
import { handler } from './netlify/functions/calculate-kundali.js';

// Test data for Avyaan
const testEvent = {
    httpMethod: 'POST',
    body: JSON.stringify({
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
        },
        firstName: 'AVYAAN',
        middleName: 'BHANUPRATAP',
        lastName: 'UPADHYAY'
    })
};

console.log('================================================================================');
console.log('Testing Kundali Calculation for Avyaan Bhanupratap Upadhyay');
console.log('Birth: May 20, 2024, 9:33 AM IST, Chandrapur, Maharashtra');
console.log('================================================================================');
console.log('');

handler(testEvent, {}).then(response => {
    console.log('');
    console.log('SUCCESS! Kundali calculation completed without errors.');
    console.log('');

    const result = JSON.parse(response.body);

    console.log('VERIFICATION AGAINST REFERENCE PDF:');
    console.log('====================================');
    console.log('');

    console.log('ASCENDANT (Lagna):');
    console.log('  Calculated: ' + result.ascendant.sign + ' (' + result.ascendant.degree.toFixed(2) + '°)');
    console.log('  Expected: Cancer (Punarvasu 4th pada)');
    console.log('  Status: ' + (result.ascendant.sign === 'Cancer' ? 'CORRECT' : 'WRONG'));
    console.log('');

    console.log('MOON SIGN (Chandra Rashi):');
    console.log('  Calculated: ' + result.moonSign.sign + ' - ' + result.planets.Moon.nakshatra + ' (pada ' + result.planets.Moon.pada + ')');
    console.log('  Expected: Virgo - Chitra');
    console.log('  Status: ' + (result.moonSign.sign === 'Virgo' ? 'CORRECT' : 'WRONG'));
    console.log('');

    console.log('SUN SIGN:');
    console.log('  Calculated: ' + result.sunSign.sign + ' - ' + result.planets.Sun.nakshatra);
    console.log('  Expected: Taurus - Krittika');
    console.log('  Status: ' + (result.sunSign.sign === 'Taurus' ? 'CORRECT' : 'WRONG'));
    console.log('');

    console.log('ALL PLANETARY POSITIONS:');
    console.log('========================');
    console.log('');

    const expected = {
        Sun: { sign: 'Taurus', nakshatra: 'Krittika' },
        Moon: { sign: 'Virgo', nakshatra: 'Chitra' },
        Mars: { sign: 'Pisces', nakshatra: 'Revati' },
        Mercury: { sign: 'Aries', nakshatra: 'Ashwini' },
        Jupiter: { sign: 'Taurus', nakshatra: 'Krittika' },
        Venus: { sign: 'Taurus', nakshatra: 'Krittika' },
        Saturn: { sign: 'Aquarius', nakshatra: 'Purva Bhadrapada' },
        Rahu: { sign: 'Pisces', nakshatra: 'Revati' },
        Ketu: { sign: 'Virgo', nakshatra: 'Hasta' }
    };

    let correctCount = 0;
    let totalCount = 0;

    for (const [planet, data] of Object.entries(result.planets)) {
        const exp = expected[planet];
        const signMatch = data.sign === exp.sign;
        const nakshatraMatch = data.nakshatra === exp.nakshatra;

        console.log(planet + ':');
        console.log('  Calculated: ' + data.sign + ' (' + data.degree.toFixed(2) + '°) - ' + data.nakshatra + ' (pada ' + data.pada + ')');
        console.log('  Expected: ' + exp.sign + ' - ' + exp.nakshatra);
        console.log('  Sign: ' + (signMatch ? 'OK' : 'WRONG') + '  Nakshatra: ' + (nakshatraMatch ? 'OK' : 'WRONG'));
        console.log('');

        if (signMatch) correctCount++;
        if (nakshatraMatch) correctCount++;
        totalCount += 2;
    }

    const accuracy = (correctCount / totalCount * 100).toFixed(1);

    console.log('================================================================================');
    console.log('ACCURACY SCORE: ' + correctCount + '/' + totalCount + ' (' + accuracy + '%)');
    console.log('================================================================================');
    console.log('');

    if (accuracy >= 90) {
        console.log('EXCELLENT! Kundali calculations are highly accurate!');
        console.log('');
    } else if (accuracy >= 70) {
        console.log('GOOD, but some minor discrepancies detected.');
        console.log('');
    } else {
        console.log('POOR accuracy. Significant errors detected.');
        console.log('');
    }

    console.log('ADDITIONAL DETAILS:');
    console.log('  Ayanamsa: ' + result.ayanamsa.toFixed(4) + '°');
    console.log('  Current Dasha: ' + result.currentDasha.planet);
    console.log('  Yogas: ' + (result.yogas.length > 0 ? result.yogas.join(', ') : 'None detected'));
    console.log('  Doshas: Mangal=' + result.doshas.mangal + ', Kaal Sarp=' + result.doshas.kaalSarp + ', Sade Sati=' + result.doshas.sadeSati);

}).catch(error => {
    console.log('');
    console.error('ERROR: Kundali calculation failed!');
    console.error('Error details:', error);
    console.error(error.stack);
    process.exit(1);
});
