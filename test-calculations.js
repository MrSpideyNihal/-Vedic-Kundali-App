// Simplified test using astronomy-engine's correct API
import * as Astronomy from 'astronomy-engine';

console.log('Testing Kundali Calculations for Avyaan');
console.log('Birth: May 20, 2024, 9:33 AM IST, Chandrapur');
console.log('='.repeat(60));

// Birth details
const astroDate = new Date(2024, 4, 20, 9, 33, 0); // May 20, 2024, 9:33 AM
const astroTime = Astronomy.MakeTime(astroDate);

console.log('AstroTime created:', astroTime);

// Calculate Lahiri Ayanamsa
const t = (astroTime.tt - 2451545.0) / 36525.0;
const ayanamsa = 23.85 + (50.27974 * t) + (0.000567 * t * t);
console.log('\\nAyanamsa:', ayanamsa.toFixed(4), '°');

// Helper to get ecliptic longitude
function getEclipticLongitude(body, time) {
    const equ = Astronomy.Equator(body, time, null, true, true);
    const ecl = Astronomy.Ecliptic(equ.vec);
    return ecl.elon;
}

// Get planetary positions
console.log('\\nTropical Longitudes:');
const sunTrop = getEclipticLongitude('Sun', astroTime);
console.log('Sun:', sunTrop.toFixed(2), '°');

const moonTrop = getEclipticLongitude('Moon', astroTime);
console.log('Moon:', moonTrop.toFixed(2), '°');

const marsTrop = getEclipticLongitude('Mars', astroTime);
console.log('Mars:', marsTrop.toFixed(2), '°');

const mercuryTrop = getEclipticLongitude('Mercury', astroTime);
console.log('Mercury:', mercuryTrop.toFixed(2), '°');

const jupiterTrop = getEclipticLongitude('Jupiter', astroTime);
console.log('Jupiter:', jupiterTrop.toFixed(2), '°');

const venusTrop = getEclipticLongitude('Venus', astroTime);
console.log('Venus:', venusTrop.toFixed(2), '°');

const saturnTrop = getEclipticLongitude('Saturn', astroTime);
console.log('Saturn:', saturnTrop.toFixed(2), '°');

// Convert to sidereal
const toSidereal = (trop) => {
    let sid = trop - ayanamsa;
    while (sid < 0) sid += 360;
    while (sid >= 360) sid -= 360;
    return sid;
};

const ZODIAC_SIGNS = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const getSign = (lon) => ZODIAC_SIGNS[Math.floor(lon / 30)];

console.log('\\nSidereal (Vedic) Positions:');
const sunSid = toSidereal(sunTrop);
console.log('Sun:', sunSid.toFixed(2), '° -', getSign(sunSid));

const moonSid = toSidereal(moonTrop);
console.log('Moon:', moonSid.toFixed(2), '° -', getSign(moonSid), '← KEY TEST');

const marsSid = toSidereal(marsTrop);
console.log('Mars:', marsSid.toFixed(2), '° -', getSign(marsSid));

const mercurySid = toSidereal(mercuryTrop);
console.log('Mercury:', mercurySid.toFixed(2), '° -', getSign(mercurySid));

const jupiterSid = toSidereal(jupiterTrop);
console.log('Jupiter:', jupiterSid.toFixed(2), '° -', getSign(jupiterSid));

const venusSid = toSidereal(venusTrop);
console.log('Venus:', venusSid.toFixed(2), '° -', getSign(venusSid));

const saturnSid = toSidereal(saturnTrop);
console.log('Saturn:', saturnSid.toFixed(2), '° -', getSign(saturnSid));

console.log('\\n' + '='.repeat(60));
console.log('Expected from PDF:');
console.log('Sun: Taurus (Krittika)');
console.log('Moon: Virgo (Chitra) ← Should match!');
console.log('Mars: Pisces (Revati)');
console.log('Mercury: Aries (Ashwini)');
console.log('Jupiter: Taurus (Krittika)');
console.log('Venus: Taurus (Krittika)');
console.log('Saturn: Aquarius (Purva Bhadrapada)');
