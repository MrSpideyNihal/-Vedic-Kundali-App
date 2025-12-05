// Prediction engine with template-based rules

const LAGNA_PREDICTIONS = {
    Aries: 'You are born with Aries ascendant, which makes you energetic, courageous, and ambitious. You have natural leadership qualities and prefer to take initiative in all matters. Mars, your ruling planet, gives you determination and competitive spirit. You may face challenges in patience and anger management. Career in sports, military, engineering, or entrepreneurship suits you well.',

    Taurus: 'With Taurus ascendant, you are practical, patient, and value stability. Venus as your ruling planet blesses you with artistic talents and love for beauty. You have strong determination and once you set a goal, you pursue it persistently. Financial security is important to you. Careers in finance, arts, agriculture, or luxury goods are favorable.',

    Gemini: 'Gemini ascendant makes you intellectually curious, communicative, and adaptable. Mercury rules your chart, giving you excellent communication skills and quick thinking. You enjoy learning and sharing knowledge. You may have multiple interests and talents. Suitable careers include writing, teaching, media, sales, or technology.',

    Cancer: 'Cancer ascendant gives you emotional depth, nurturing nature, and strong intuition. Moon as your ruling planet makes you sensitive and caring. Family and home are very important to you. You have good memory and imagination. Careers in hospitality, healthcare, education, or real estate are suitable.',

    Leo: 'With Leo ascendant, you have natural charisma, confidence, and leadership abilities. Sun rules your chart, giving you strong personality and desire for recognition. You are generous, creative, and enjoy being in the spotlight. Careers in management, entertainment, politics, or creative fields suit you.',

    Virgo: 'Virgo ascendant makes you analytical, detail-oriented, and service-minded. Mercury rules your chart, giving you practical intelligence and organizational skills. You strive for perfection and efficiency. Health and wellness are important to you. Suitable careers include healthcare, analysis, accounting, or service industries.',

    Libra: 'Libra ascendant gives you diplomatic nature, sense of justice, and appreciation for harmony. Venus rules your chart, blessing you with charm and artistic sensibilities. You value relationships and partnerships. Careers in law, diplomacy, arts, fashion, or counseling are favorable.',

    Scorpio: 'With Scorpio ascendant, you are intense, determined, and transformative. Mars and Ketu rule your chart, giving you deep insight and investigative abilities. You have strong willpower and ability to overcome challenges. Careers in research, psychology, investigation, or occult sciences suit you.',

    Sagittarius: 'Sagittarius ascendant makes you optimistic, philosophical, and adventurous. Jupiter rules your chart, giving you wisdom and desire for higher knowledge. You love freedom and exploration. Teaching, travel, law, or spiritual pursuits are favorable career paths.',

    Capricorn: 'Capricorn ascendant gives you ambition, discipline, and practical approach to life. Saturn rules your chart, teaching you patience and perseverance. You are hardworking and goal-oriented. Success may come later in life but will be lasting. Careers in administration, business, or traditional fields suit you.',

    Aquarius: 'With Aquarius ascendant, you are innovative, humanitarian, and independent. Saturn and Rahu rule your chart, giving you unique perspective and progressive thinking. You care about social causes and collective welfare. Careers in technology, social work, science, or unconventional fields are suitable.',

    Pisces: 'Pisces ascendant makes you compassionate, intuitive, and spiritually inclined. Jupiter rules your chart, blessing you with wisdom and empathy. You have vivid imagination and artistic talents. Careers in healing, arts, spirituality, or charitable work are favorable.'
}

const MOON_SIGN_PREDICTIONS = {
    Aries: 'Moon in Aries makes you emotionally independent and quick to react. You have strong emotions and need freedom in relationships. You are passionate and enthusiastic but may need to work on patience.',

    Taurus: 'Moon in Taurus gives you emotional stability and need for security. You are loyal and dependable in relationships. Material comforts and beautiful surroundings make you feel secure.',

    Gemini: 'Moon in Gemini makes you emotionally versatile and communicative. You need mental stimulation and variety. You express feelings through words and enjoy intellectual connections.',

    Cancer: 'Moon in Cancer gives you deep emotions and strong attachment to family. You are nurturing and protective. Your moods may fluctuate like the moon itself.',

    Leo: 'Moon in Leo makes you emotionally generous and need appreciation. You have warm heart and enjoy being admired. Pride and ego may affect your emotional responses.',

    Virgo: 'Moon in Virgo gives you practical emotions and analytical mind. You express care through service and attention to details. You may worry excessively about loved ones.',

    Libra: 'Moon in Libra makes you emotionally balanced and relationship-oriented. You need harmony and partnership. You are diplomatic in emotional matters.',

    Scorpio: 'Moon in Scorpio gives you intense emotions and deep feelings. You are passionate and secretive about your inner world. Transformation through emotions is your path.',

    Sagittarius: 'Moon in Sagittarius makes you emotionally optimistic and freedom-loving. You need space in relationships and enjoy philosophical discussions.',

    Capricorn: 'Moon in Capricorn gives you controlled emotions and practical approach to feelings. You may appear reserved but are deeply caring. Responsibility is important to you.',

    Aquarius: 'Moon in Aquarius makes you emotionally detached and humanitarian. You value friendship and intellectual connection. You need independence in relationships.',

    Pisces: 'Moon in Pisces gives you compassionate and intuitive emotions. You are empathetic and may absorb others\' feelings. Spiritual connection brings you peace.'
}

const NAKSHATRA_PREDICTIONS = {
    Ashwini: 'Ashwini nakshatra gives you healing abilities and pioneering spirit. You are quick, energetic, and like to help others. Ketu rules this nakshatra, giving you spiritual inclinations.',

    Bharani: 'Bharani nakshatra makes you creative and transformative. Venus rules this nakshatra, blessing you with artistic talents. You understand the cycles of life and death.',

    Krittika: 'Krittika nakshatra gives you sharp intellect and purifying nature. Sun rules this nakshatra, giving you leadership qualities and desire for truth.',

    Rohini: 'Rohini nakshatra blesses you with beauty, creativity, and material prosperity. Moon rules this nakshatra, making you attractive and nurturing.',

    Mrigashira: 'Mrigashira nakshatra makes you curious, searching, and gentle. Mars rules this nakshatra, giving you energy to pursue your interests.',

    Ardra: 'Ardra nakshatra gives you transformative power and emotional depth. Rahu rules this nakshatra, bringing sudden changes and breakthroughs.',

    Punarvasu: 'Punarvasu nakshatra blesses you with optimism and ability to bounce back. Jupiter rules this nakshatra, giving you wisdom and philosophical nature.',

    Pushya: 'Pushya nakshatra makes you nurturing, spiritual, and disciplined. Saturn rules this nakshatra, teaching you patience and service.',

    Ashlesha: 'Ashlesha nakshatra gives you mystical powers and penetrating insight. Mercury rules this nakshatra, blessing you with intelligence and communication skills.',

    Magha: 'Magha nakshatra connects you with ancestral power and royal qualities. Ketu rules this nakshatra, giving you respect for tradition and authority.',

    'Purva Phalguni': 'Purva Phalguni nakshatra blesses you with creativity, romance, and enjoyment. Venus rules this nakshatra, giving you love for arts and beauty.',

    'Uttara Phalguni': 'Uttara Phalguni nakshatra makes you generous, helpful, and organized. Sun rules this nakshatra, giving you leadership and service orientation.',

    Hasta: 'Hasta nakshatra gives you skillful hands and practical abilities. Moon rules this nakshatra, blessing you with dexterity and healing touch.',

    Chitra: 'Chitra nakshatra makes you creative, charismatic, and detail-oriented. Mars rules this nakshatra, giving you artistic vision and craftsmanship.',

    Swati: 'Swati nakshatra blesses you with independence and flexibility. Rahu rules this nakshatra, giving you adaptability and desire for freedom.',

    Vishakha: 'Vishakha nakshatra gives you determination and goal-oriented nature. Jupiter rules this nakshatra, blessing you with ambition and achievement.',

    Anuradha: 'Anuradha nakshatra makes you devoted, friendly, and successful. Saturn rules this nakshatra, teaching you loyalty and perseverance.',

    Jyeshtha: 'Jyeshtha nakshatra gives you protective nature and leadership abilities. Mercury rules this nakshatra, blessing you with authority and responsibility.',

    Mula: 'Mula nakshatra makes you investigative and transformative. Ketu rules this nakshatra, giving you ability to get to the root of matters.',

    'Purva Ashadha': 'Purva Ashadha nakshatra blesses you with invincibility and optimism. Venus rules this nakshatra, giving you confidence and victory.',

    'Uttara Ashadha': 'Uttara Ashadha nakshatra gives you leadership and lasting achievements. Sun rules this nakshatra, blessing you with determination and success.',

    Shravana: 'Shravana nakshatra makes you good listener and knowledge seeker. Moon rules this nakshatra, giving you wisdom and communication abilities.',

    Dhanishta: 'Dhanishta nakshatra blesses you with wealth and musical talents. Mars rules this nakshatra, giving you rhythm and prosperity.',

    Shatabhisha: 'Shatabhisha nakshatra gives you healing powers and mystical knowledge. Rahu rules this nakshatra, blessing you with unconventional wisdom.',

    'Purva Bhadrapada': 'Purva Bhadrapada nakshatra makes you intense and transformative. Jupiter rules this nakshatra, giving you spiritual depth and idealism.',

    'Uttara Bhadrapada': 'Uttara Bhadrapada nakshatra blesses you with wisdom and compassion. Saturn rules this nakshatra, giving you depth and understanding.',

    Revati: 'Revati nakshatra gives you nurturing nature and spiritual completion. Mercury rules this nakshatra, blessing you with prosperity and protection.'
}

export function getPredictions(kundaliData) {
    return {
        lagna: LAGNA_PREDICTIONS[kundaliData.ascendant.sign] || 'Your ascendant sign indicates unique qualities that shape your personality and life path.',

        moonSign: MOON_SIGN_PREDICTIONS[kundaliData.moonSign.sign] || 'Your moon sign reveals your emotional nature and inner self.',

        sunSign: `Sun in ${kundaliData.sunSign.sign} represents your core identity and life purpose. The Sun's position influences your vitality, ego, and sense of self. This placement shapes how you express your individuality and pursue your goals.`,

        nakshatra: NAKSHATRA_PREDICTIONS[kundaliData.nakshatra.name] || `${kundaliData.nakshatra.name} nakshatra influences your personality and life path with unique characteristics.`
    }
}
