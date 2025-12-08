// Pure language text for PDF generation
// Returns ONLY Hindi OR English (no bilingual format)

export const pdfText = {
    // Cover page
    coverTitle: (isHindi) => isHindi ? 'वैदिक कुंडली' : 'Vedic Kundali',
    coverSubtitle: (isHindi) => isHindi ? 'जन्म कुंडली रिपोर्ट' : 'Birth Horoscope Report',

    // Table of Contents
    tableOfContents: (isHindi) => isHindi ? 'विषय सूची' : 'Table of Contents',

    // Section Titles
    sections: {
        mainDetails: (isHindi) => isHindi ? 'मुख्य विवरण' : 'Main Details',
        planetaryPositions: (isHindi) => isHindi ? 'ग्रह स्थिति' : 'Planetary Positions',
        kundaliCharts: (isHindi) => isHindi ? 'कुंडली चक्र' : 'Kundali Charts',
        keyPoints: (isHindi) => isHindi ? 'कुंडली के मुख्य बिंदु' : 'Key Points of Kundali',
        predictions: (isHindi) => isHindi ? 'विस्तृत भविष्यफल' : 'Detailed Predictions',
        dashas: (isHindi) => isHindi ? 'विम्शोत्तरी महादशा' : 'Vimshottari Mahadasha',
        yogas: (isHindi) => isHindi ? 'कुंडली में उपस्थित विभिन्न विशेष योग व राजयोग' : 'Special Yogas and Raja Yogas',
        remedies: (isHindi) => isHindi ? 'उपाय' : 'Remedies',
        houseAnalysis: (isHindi) => isHindi ? 'भाव फल' : 'House Analysis',
        lagnaReport: (isHindi) => isHindi ? 'लग्न रिपोर्ट' : 'Ascendant Report',
        moonReport: (isHindi) => isHindi ? 'चंद्र राशि रिपोर्ट' : 'Moon Sign Report',
        sunReport: (isHindi) => isHindi ? 'सूर्य राशि रिपोर्ट' : 'Sun Sign Report',
        nakshatraReport: (isHindi) => isHindi ? 'नक्षत्र रिपोर्ट' : 'Nakshatra Report',
        panchangPhal: (isHindi) => isHindi ? 'पंचांग फल' : 'Panchang Predictions',
        mangalDoshaAnalysis: (isHindi) => isHindi ? 'मंगलदोष विवेचन' : 'Mangal Dosha Analysis',
        kaalSarpAnalysis: (isHindi) => isHindi ? 'कालसर्प दोष / योग - कालसर्प उपाय' : 'Kaal Sarp Dosha Analysis',
        sadeSatiReport: (isHindi) => isHindi ? 'साढ़े साती रिपोर्ट' : 'Sade Sati Report',
        antardashaPhala: (isHindi) => isHindi ? 'अंतर्दशा फल' : 'Antardasha Predictions',
        numerology: (isHindi) => isHindi ? 'अंक ज्योतिष रिपोर्ट' : 'Numerology Report',
        gochar: (isHindi) => isHindi ? 'गोचर (आज का गोचर)' : 'Transit Predictions',
        varshphal: (isHindi) => isHindi ? 'वार्षिक कुंडली' : 'Annual Horoscope',
    },

    // Chart titles
    lagnaChart: (isHindi) => isHindi ? 'लग्न कुंडली (D1)' : 'Lagna Kundali (D1)',
    navamshaChart: (isHindi) => isHindi ? 'नवांश कुंडली (D9)' : 'Navamsha Kundali (D9)',
    chalitChart: (isHindi) => isHindi ? 'चलित तालिका एवं चलित चक्र' : 'Chalit Table and Chart',
    moonChart: (isHindi) => isHindi ? 'चंद्र कुंडली' : 'Moon Chart',

    // Table headers
    planet: (isHindi) => isHindi ? 'ग्रह' : 'Planet',
    sign: (isHindi) => isHindi ? 'राशि' : 'Sign',
    degree: (isHindi) => isHindi ? 'अंश' : 'Degree',
    house: (isHindi) => isHindi ? 'भाव' : 'House',
    nakshatra: (isHindi) => isHindi ? 'नक्षत्र' : 'Nakshatra',
    pada: (isHindi) => isHindi ? 'पाद' : 'Pada',
    longitude: (isHindi) => isHindi ? 'देशांतर' : 'Longitude',
    latitude: (isHindi) => isHindi ? 'अक्षांश' : 'Latitude',
    retrograde: (isHindi) => isHindi ? 'वक्री' : 'Retrograde',

    // Basic Info
    name: (isHindi) => isHindi ? 'नाम' : 'Name',
    dateOfBirth: (isHindi) => isHindi ? 'जन्म तिथि' : 'Date of Birth',
    timeOfBirth: (isHindi) => isHindi ? 'जन्म समय' : 'Time of Birth',
    placeOfBirth: (isHindi) => isHindi ? 'जन्म स्थान' : 'Place of Birth',
    ayanamsa: (isHindi) => isHindi ? 'अयनांश' : 'Ayanamsa',
    ascendant: (isHindi) => isHindi ? 'लग्न' : 'Ascendant',
    moonSign: (isHindi) => isHindi ? 'चंद्र राशि' : 'Moon Sign',
    sunSign: (isHindi) => isHindi ? 'सूर्य राशि' : 'Sun Sign',
    birthNakshatra: (isHindi) => isHindi ? 'जन्म नक्षत्र' : 'Birth Nakshatra',

    // Panchang
    tithi: (isHindi) => isHindi ? 'तिथि' : 'Tithi',
    karana: (isHindi) => isHindi ? 'करण' : 'Karana',
    yoga: (isHindi) => isHindi ? 'योग' : 'Yoga',
    weekday: (isHindi) => isHindi ? 'वार' : 'Weekday',

    // Dosha names
    mangalDosha: (isHindi) => isHindi ? 'मांगलिक दोष' : 'Mangal Dosha',
    kaalSarpDosha: (isHindi) => isHindi ? 'कालसर्प दोष' : 'Kaal Sarp Dosha',
    sadeSati: (isHindi) => isHindi ? 'साढ़े साती' : 'Sade Sati',

    // Remedies
    generalRemedies: (isHindi) => isHindi ? 'सामान्य उपाय' : 'General Remedies',
    gemstones: (isHindi) => isHindi ? 'रत्न सुझाव' : 'Gemstone Recommendations',
    mantras: (isHindi) => isHindi ? 'मंत्र सुझाव' : 'Mantra Recommendations',
    yantras: (isHindi) => isHindi ? 'यंत्र सुझाव' : 'Yantra Recommendations',
    rudrakshas: (isHindi) => isHindi ? 'रुद्राक्ष सुझाव' : 'Rudraksha Recommendations',
    luckyDaysColors: (isHindi) => isHindi ? 'शुभ घड़ी, दिन और रंग' : 'Lucky Time, Days and Colors',
    deity: (isHindi) => isHindi ? 'इष्ट देवता' : 'Deity',
    fasting: (isHindi) => isHindi ? 'व्रत' : 'Fasting',
    charity: (isHindi) => isHindi ? 'दान' : 'Charity',

    // Subsections
    beneficialYogas: (isHindi) => isHindi ? 'लाभकारी योग' : 'Beneficial Yogas',
    doshas: (isHindi) => isHindi ? 'दोष' : 'Doshas',
    present: (isHindi) => isHindi ? 'उपस्थित' : 'Present',
    notPresent: (isHindi) => isHindi ? 'उपस्थित नहीं' : 'Not Present',
    remediesRecommended: (isHindi) => isHindi ? 'उपाय आवश्यक' : 'Remedies Recommended',

    // Dasha
    mahadasha: (isHindi) => isHindi ? 'महादशा' : 'Mahadasha',
    antardasha: (isHindi) => isHindi ? 'अंतर्दशा' : 'Antardasha',
    pratyantardasha: (isHindi) => isHindi ? 'प्रत्यंतर्दशा' : 'Pratyantardasha',
    startDate: (isHindi) => isHindi ? 'आरंभ तिथि' : 'Start Date',
    endDate: (isHindi) => isHindi ? 'समाप्ति तिथि' : 'End Date',
    duration: (isHindi) => isHindi ? 'अवधि' : 'Duration',
    balance: (isHindi) => isHindi ? 'शेष' : 'Balance',
    years: (isHindi) => isHindi ? 'वर्ष' : 'Years',
    months: (isHindi) => isHindi ? 'माह' : 'Months',
    days: (isHindi) => isHindi ? 'दिन' : 'Days',

    // Copyright
    copyright: (isHindi) => isHindi ? 'सर्वाधिकार सुरक्षित' : 'All Rights Reserved',
    developedBy: (isHindi) => isHindi ? 'विकसित' : 'Developed by',
    horoscopeBy: (isHindi) => isHindi ? 'कुंडली निर्माता' : 'Horoscope By',
}
