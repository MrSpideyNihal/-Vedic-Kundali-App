import * as Astronomy from 'astronomy-engine';

const testDate = new Date('2024-05-20T04:03:00.000Z');
const astroTime = Astronomy.MakeTime(testDate);

console.log('AstroTime object fields:');
console.log(JSON.stringify(astroTime, null, 2));

// Test Lahiri Ayanamsa with different JD values
const jd1 = astroTime.tt;
const jd2 = astroTime.tt + 2451545.0;

console.log(`\nTesting Ayanamsa with different JD values:`);
console.log(`JD from .tt field: ${jd1.toFixed(2)}`);
console.log(`JD with J2000 offset: ${jd2.toFixed(2)}`);

function calcAyanamsa(jd) {
    const t = (jd - 2451545.0) / 36525.0;
    return 22.460 + 1.3972 * t + 0.00013 * t * t;
}

console.log(`\nAyanamsa with JD=${jd1.toFixed(2)}: ${calcAyanamsa(jd1).toFixed(4)}°`);
console.log(`Ayanamsa with JD=${jd2.toFixed(2)}: ${calcAyanamsa(jd2).toFixed(4)}°`);
console.log(`\nExpected Ayanamsa for May 2024: ~24.12°`);
