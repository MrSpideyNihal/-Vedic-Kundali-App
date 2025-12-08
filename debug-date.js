import * as Astronomy from 'astronomy-engine';

// Test date creation
const year = 2024, month = 5, day = 20, hours = 9, minutes = 33, seconds = 0;
const timezoneOffset = 5.5;
const offsetHours = Math.floor(timezoneOffset);
const offsetMinutes = Math.round((timezoneOffset % 1) * 60);

console.log('=== DEBUGGING DATE CREATION ===');
console.log(`Input: ${year}-${month}-${day} ${hours}:${minutes}:${seconds} IST`);
console.log(`Timezone offset: ${timezoneOffset} (${offsetHours}h ${offsetMinutes}m)`);

// Method 1: Date.UTC
const utcTimestamp1 = Date.UTC(year, month - 1, day, hours - offsetHours, minutes - offsetMinutes, seconds);
const utcDate1 = new Date(utcTimestamp1);
console.log('\nMethod 1 (Date.UTC):');
console.log(`  UTC Timestamp: ${utcTimestamp1}`);
console.log(`  UTC Date: ${utcDate1.toISOString()}`);
console.log(`  Year: ${utcDate1.getFullYear()}, Month: ${utcDate1.getMonth() + 1}, Day: ${utcDate1.getDate()}`);

const astroTime1 = Astronomy.MakeTime(utcDate1);
console.log(`  JD (TT): ${astroTime1.tt.toFixed(2)}`);
console.log(`  JD (UT): ${astroTime1.ut.toFixed(2)}`);

// Method 2: Direct date creation
const localDate = new Date(year, month - 1, day, hours, minutes, seconds);
console.log('\nLocal Date Created:');
console.log(`  ${localDate.toISOString()}`);
console.log(`  Timestamp: ${localDate.getTime()}`);

const utcTimestamp2 = localDate.getTime() - (timezoneOffset * 60 * 60 * 1000);
const utcDate2 = new Date(utcTimestamp2);
console.log('\nMethod 2 (Manual offset):');
console.log(`  UTC Date: ${utcDate2.toISOString()}`);
const astroTime2 = Astronomy.MakeTime(utcDate2);
console.log(`  JD (TT): ${astroTime2.tt.toFixed(2)}`);

// Method 3: Test with simple date
const testDate = new Date('2024-05-20T04:03:00.000Z');
console.log('\nMethod 3 (ISO String):');
console.log(`  UTC Date: ${testDate.toISOString()}`);
const astroTime3 = Astronomy.MakeTime(testDate);
console.log(`  JD (TT): ${astroTime3.tt.toFixed(2)}`);

// Expected JD for May 20, 2024
console.log('\n=== EXPECTED ===');
console.log('JD for May 20, 2024 should be approximately: 2460450');
