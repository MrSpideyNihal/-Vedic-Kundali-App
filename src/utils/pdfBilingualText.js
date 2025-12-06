// Bilingual text for PDF generation
// Returns appropriate text based on language preference

export const getText = (isHindi, english, hindi) => {
    return isHindi ? `${hindi} / ${english}` : english
}

export const pdfText = {
    // Cover page
    coverTitle: (isHindi) => isHindi ? 'वैदिक कुंडली' : 'Vedic Kundali',
    coverSubtitle: (isHindi) => isHindi ? 'Horoscope Report' : 'Horoscope Report',

    // Table of Contents
    tableOfContents: (isHindi) => isHindi ? 'विषय सूची / Table of Contents' : 'Table of Contents',
    sections: {
        mainDetails: (isHindi) => isHindi ? 'मुख्य विवरण / Main Details' : 'Main Details',
        planetaryPositions: (isHindi) => isHindi ? 'ग्रह स्थिति / Planetary Positions' : 'Planetary Positions',
        kundaliCharts: (isHindi) => isHindi ? 'कुंडली चक्र / Kundali Charts' : 'Kundali Charts',
        keyPoints: (isHindi) => isHindi ? 'प्रमुख बिंदु / Key Points' : 'Key Points',
        predictions: (isHindi) => isHindi ? 'विस्तृत भविष्यफल / Detailed Predictions' : 'Detailed Predictions',
        dashas: (isHindi) => isHindi ? 'विम्शोत्तरी दशा / Vimshottari Dasha' : 'Vimshottari Dasha',
        yogas: (isHindi) => isHindi ? 'योग एवं दोष / Yogas and Doshas' : 'Yogas and Doshas',
        remedies: (isHindi) => isHindi ? 'उपाय / Remedies' : 'Remedies',
    },

    // Chart titles
    lagnaChart: (isHindi) => isHindi ? 'लग्न कुंडली (D1) / Lagna Kundali (D1)' : 'Lagna Kundali (D1)',
    navamshaChart: (isHindi) => isHindi ? 'नवांश कुंडली (D9) / Navamsha Kundali (D9)' : 'Navamsha Kundali (D9)',
    chalitChart: (isHindi) => isHindi ? 'चलित चक्र / Chalit Chakra' : 'Chalit Chakra',

    // Table headers
    planet: (isHindi) => isHindi ? 'ग्रह / Planet' : 'Planet',
    sign: (isHindi) => isHindi ? 'राशि / Sign' : 'Sign',
    degree: (isHindi) => isHindi ? 'अंश / Degree' : 'Degree',
    house: (isHindi) => isHindi ? 'भाव / House' : 'House',
    nakshatra: (isHindi) => isHindi ? 'नक्षत्र / Nakshatra' : 'Nakshatra',
    pada: (isHindi) => isHindi ? 'पाद / Pada' : 'Pada',

    // Dosha names
    mangalDosha: (isHindi) => isHindi ? 'मांगलिक दोष / Mangal Dosha' : 'Mangal Dosha',
    kaalSarpDosha: (isHindi) => isHindi ? 'कालसर्प दोष / Kaal Sarp Dosha' : 'Kaal Sarp Dosha',
    sadeSati: (isHindi) => isHindi ? 'साढ़े साती / Sade Sati' : 'Sade Sati',

    // Remedies
    generalRemedies: (isHindi) => isHindi ? 'सामान्य उपाय / General Remedies' : 'General Remedies',
    gemstones: (isHindi) => isHindi ? 'रत्न / Recommended Gemstones' : 'Recommended Gemstones',
    luckyDaysColors: (isHindi) => isHindi ? 'शुभ दिन और रंग / Lucky Days and Colors' : 'Lucky Days and Colors',

    // Subsections
    beneficialYogas: (isHindi) => isHindi ? 'लाभकारी योग / Beneficial Yogas' : 'Beneficial Yogas',
    doshas: (isHindi) => isHindi ? 'दोष / Doshas' : 'Doshas',
}
