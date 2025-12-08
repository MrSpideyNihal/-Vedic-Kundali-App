import { pdfText } from './pdfBilingualText'

// Zodiac signs in Hindi
const ZODIAC_HINDI = {
    Aries: 'मेष',
    Taurus: 'वृषभ',
    Gemini: 'मिथुन',
    Cancer: 'कर्क',
    Leo: 'सिंह',
    Virgo: 'कन्या',
    Libra: 'तुला',
    Scorpio: 'वृश्चिक',
    Sagittarius: 'धनु',
    Capricorn: 'मकर',
    Aquarius: 'कुंभ',
    Pisces: 'मीन'
}

// Helper functions for enhanced PDF sections


// House Analysis
export function generateHouseAnalysis(kundaliData, isHindi) {
    const houseNames = isHindi ? [
        'प्रथम भाव (लग्न)', 'द्वितीय भाव', 'तृतीय भाव', 'चतुर्थ भाव',
        'पंचम भाव', 'षष्ठ भाव', 'सप्तम भाव', 'अष्टम भाव',
        'नवम भाव', 'दशम भाव', 'एकादश भाव', 'द्वादश भाव'
    ] : [
        '1st House (Ascendant)', '2nd House', '3rd House', '4th House',
        '5th House', '6th House', '7th House', '8th House',
        '9th House', '10th House', '11th House', '12th House'
    ];

    const houseSignificance = isHindi ? [
        'व्यक्तित्व, स्वास्थ्य, शारीरिक रूप',
        'धन, परिवार, वाणी',
        'भाई-बहन, साहस, पराक्रम',
        'मां, सुख, संपत्ति, वाहन',
        'संतान, बुद्धि, पूर्व पुण्य',
        'शत्रु, रोग, ऋण',
        'जीवनसाथी, व्यापार, साझेदारी',
        'आयु, मृत्यु, गुप्त विद्या',
        'भाग्य, धर्म, पिता',
        'कर्म, व्यवसाय, सम्मान',
        'लाभ, आय, बड़े भाई',
        'व्यय, हानि, मोक्ष'
    ] : [
        'Personality, Health, Physical Appearance',
        'Wealth, Family, Speech',
        'Siblings, Courage, Communication',
        'Mother, Happiness, Property, Vehicles',
        'Children, Intelligence, Past Deeds',
        'Enemies, Diseases, Debts',
        'Spouse, Business, Partnerships',
        'Longevity, Death, Occult',
        'Fortune, Religion, Father',
        'Career, Profession, Honor',
        'Gains, Income, Elder Siblings',
        'Expenses, Losses, Salvation'
    ];

    // Get planets in each house
    const housePlanets = Array(12).fill(null).map(() => []);
    Object.entries(kundaliData.planets).forEach(([planet, data]) => {
        housePlanets[data.house - 1].push(planet);
    });

    return [
        { text: pdfText.sections.houseAnalysis(isHindi), style: 'sectionTitle' },

        {
            table: {
                widths: ['15%', '25%', '60%'],
                body: [
                    [
                        { text: isHindi ? 'भाव' : 'House', style: 'tableHeader', alignment: 'center' },
                        { text: isHindi ? 'ग्रह' : 'Planets', style: 'tableHeader', alignment: 'center' },
                        { text: isHindi ? 'कारक तत्व' : 'Significance', style: 'tableHeader', alignment: 'center' }
                    ],
                    ...houseNames.map((house, index) => [
                        { text: house, alignment: 'center', fontSize: 9 },
                        {
                            text: housePlanets[index].length > 0
                                ? housePlanets[index].join(', ')
                                : (isHindi ? 'कोई नहीं' : 'None'),
                            alignment: 'center',
                            fontSize: 9
                        },
                        { text: houseSignificance[index], fontSize: 9 }
                    ])
                ]
            },
            layout: {
                fillColor: function (rowIndex, node, columnIndex) {
                    return (rowIndex === 0) ? '#f97316' : (rowIndex % 2 === 0 ? '#fff7ed' : null)
                }
            }
        }
    ];
}

// Panchang Predictions
export function generatePanchangPredictions(kundaliData, isHindi) {
    const panchangAnalysis = isHindi
        ? `इस कुंडली में ${kundaliData.panchang.tithi} तिथि है। ${kundaliData.panchang.weekday} के दिन जन्म लेने वाले व्यक्ति में विशेष गुण होते हैं। ${kundaliData.panchang.nakshatra} नक्षत्र जन्मकुंडली में महत्वपूर्ण भूमिका निभाता है। ${kundaliData.panchang.yoga} योग शुभ फलदायी है।`
        : `This kundali has ${kundaliData.panchang.tithi} Tithi. People born on ${kundaliData.panchang.weekday} possess special qualities. The nakshatra plays an important role in determining life path. ${kundaliData.panchang.yoga} Yoga is auspicious.`;

    return [
        { text: pdfText.sections.panchangPhal(isHindi), style: 'sectionTitle' },
        { text: panchangAnalysis, margin: [0, 0, 0, 15], alignment: 'justify' }
    ];
}

// Antardasha Predictions
export function generateAntardashaPhala(kundaliData, isHindi) {
    const currentDasha = kundaliData.currentDasha.planet;

    const antardashaText = isHindi
        ? `वर्तमान में ${currentDasha} महादशा चल रही है। इस दशा के अंतर्गत विभिन्न अंतर्दशाएं आती हैं जो जीवन के विभिन्न पहलुओं को प्रभावित करती हैं। प्रत्येक अंतर्दशा अपने ग्रह के अनुसार विशेष फल देती है।`
        : `Currently ${currentDasha} Mahadasha is running. Under this Mahadasha, various Antardashas influence different aspects of life. Each Antardasha gives results according to its planet.`;

    return [
        { text: pdfText.sections.antardashaPhala(isHindi), style: 'sectionTitle' },
        { text: antardashaText, margin: [0, 0, 0, 15], alignment: 'justify' }
    ];
}

// Mangal Dosha Detailed Analysis
export function generateMangalDoshaAnalysis(kundaliData, isHindi) {
    const hasMangalDosha = kundaliData.doshas.mangal;
    const marsHouse = kundaliData.planets.Mars.house;

    const analysis = hasMangalDosha
        ? (isHindi
            ? `इस कुंडली में मंगल ${marsHouse} भाव में स्थित है, जिससे मांगलिक दोष बन रहा है। यह दोष विवाह में कठिनाई, पति-पत्नी में अनबन, या जीवनसाथी के स्वास्थ्य पर प्रभाव डाल सकता है। हालांकि, उपयुक्त उपाय और शुभ योग इस दोष के प्रभाव को कम कर सकते हैं।`
            : `In this kundali, Mars is placed in ${marsHouse}th house, forming Mangal Dosha. This dosha can cause difficulties in marriage, discord between spouses, or affect partner's health. However, appropriate remedies and auspicious yogas can reduce its effects.`)
        : (isHindi
            ? `इस कुंडली में मांगलिक दोष नहीं है। मंगल ${marsHouse} भाव में स्थित है जो शुभ स्थिति है। विवाह और वैवाहिक जीवन सुखमय रहेगा।`
            : `This kundali does not have Mangal Dosha. Mars is placed in ${marsHouse}th house which is auspicious. Marriage and married life will be happy.`);

    return [
        { text: pdfText.sections.mangalDoshaAnalysis(isHindi), style: 'sectionTitle' },
        { text: analysis, margin: [0, 0, 0, 15], alignment: 'justify' }
    ];
}

// Kaal Sarp Dosha Analysis
export function generateKaalSarpAnalysis(kundaliData, isHindi) {
    const hasKaalSarp = kundaliData.doshas.kaalSarp;

    const analysis = hasKaalSarp
        ? (isHindi
            ? `इस कुंडली में कालसर्प दोष/योग बन रहा है। सभी ग्रह राहु-केतु की अक्ष के एक ओर स्थित हैं। यह योग जीवन में कुछ विशेष चुनौतियां ला सकता है, लेकिन कड़ी मेहनत और उपायों से इनका सामना किया जा सकता है। कालसर्प योग वाले व्यक्ति अक्सर आध्यात्मिक रूप से उन्नत होते हैं।`
            : `This kundali has Kaal Sarp Dosha/Yoga. All planets are positioned on one side of the Rahu-Ketu axis. This yoga may bring certain challenges in life, but with hard work and remedies, these can be overcome. People with Kaal Sarp Yoga are often spiritually advanced.`)
        : (isHindi
            ? `इस कुंडली में कालसर्प दोष नहीं है। ग्रह राहु-केतु की अक्ष के दोनों ओर स्थित हैं जो शुभ स्थिति है।`
            : `This kundali does not have Kaal Sarp Dosha. Planets are positioned on both sides of the Rahu-Ketu axis which is auspicious.`);

    return [
        { text: pdfText.sections.kaalSarpAnalysis(isHindi), style: 'sectionTitle' },
        { text: analysis, margin: [0, 0, 0, 15], alignment: 'justify' }
    ];
}

// Sade Sati Report
export function generateSadeSatiReport(kundaliData, isHindi) {
    const hasSadeSati = kundaliData.doshas.sadeSati;
    const moonSign = kundaliData.moonSign.sign;

    const analysis = hasSadeSati
        ? (isHindi
            ? `वर्तमान में साढ़े साती का दौर चल रहा है। चंद्र राशि ${ZODIAC_HINDI[moonSign]} है और शनि इसके निकट स्थित है। यह लगभग ढाई वर्ष की अवधि होती है जो जीवन में कुछ कठिनाइयां ला सकती है। हालांकि, यह आत्मिक विकास और परिपक्वता का समय भी है। शनि के उपाय करने से लाभ होगा।`
            : `Currently in Sade Sati period. Moon sign is ${moonSign} and Saturn is positioned near it. This is approximately 7.5 year period that may bring some difficulties. However, it is also a time of spiritual growth and maturity. Saturn remedies will be beneficial.`)
        : (isHindi
            ? `वर्तमान में साढ़े साती नहीं चल रही है। शनि चंद्र राशि से दूर स्थित है जो शुभ है।`
            : `Sade Sati is not currently active. Saturn is positioned away from Moon sign which is auspicious.`);

    return [
        { text: pdfText.sections.sadeSatiReport(isHindi), style: 'sectionTitle' },
        { text: analysis, margin: [0, 0, 0, 15], alignment: 'justify' }
    ];
}
