import pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import { formatDateForDisplay, formatTimeForDisplay, getFullName } from './validators'
import { getPredictions } from './predictionEngine'
import { generateChartImage } from './chartImageGenerator'

// Initialize pdfMake with fonts
if (pdfFonts && pdfFonts.pdfMake && pdfFonts.pdfMake.vfs) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs
}

// Get settings from localStorage
function getSettings() {
    const savedSettings = localStorage.getItem('kundaliSettings')
    if (savedSettings) {
        try {
            const parsed = JSON.parse(savedSettings)
            // Always use locked values
            return {
                ...parsed,
                softwareName: 'Rodge Astro Software',
                developer: 'Nihal Rodge',
                copyrightYear: new Date().getFullYear(),
            }
        } catch (err) {
            console.error('Error loading settings:', err)
        }
    }
    return {
        astrologerName: '',
        email: '',
        phone: '',
        address: '',
        pdfLanguage: 'english',
        softwareName: 'Rodge Astro Software',
        developer: 'Nihal Rodge',
        copyrightYear: new Date().getFullYear(),
    }
}

// Planet symbols in Hindi
const PLANET_SYMBOLS = {
    Sun: 'सु',
    Moon: 'च',
    Mars: 'मं',
    Mercury: 'बु',
    Jupiter: 'गु',
    Venus: 'शु',
    Saturn: 'श',
    Rahu: 'रा',
    Ketu: 'के',
    Ascendant: 'ल'
}

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

export async function generatePDF(kundaliData, formData) {
    const settings = getSettings()
    const fullName = getFullName(formData)
    const dateStr = formatDateForDisplay(formData.dateOfBirth)
    const timeStr = formatTimeForDisplay(formData.timeOfBirth)

    // Format coordinates
    const lat = formData.location.lat
    const lon = formData.location.lon
    const latDir = lat >= 0 ? 'N' : 'S'
    const lonDir = lon >= 0 ? 'E' : 'W'
    const latDeg = Math.floor(Math.abs(lat))
    const latMin = Math.round((Math.abs(lat) - latDeg) * 60)
    const lonDeg = Math.floor(Math.abs(lon))
    const lonMin = Math.round((Math.abs(lon) - lonDeg) * 60)
    const coordStr = `${latDeg}${latDir}${latMin} ${lonDeg}${lonDir}${lonMin}`

    const locationStr = `${formData.location.city || formData.location.name.split(',')[0]}(${coordStr} ${formData.location.timezone >= 0 ? '+' : ''}${formData.location.timezone})`

    // Get predictions
    const predictions = getPredictions(kundaliData)

    // Define document structure
    const docDefinition = {
        pageSize: 'A4',
        pageMargins: [40, 60, 40, 60],

        header: function (currentPage, pageCount) {
            if (currentPage === 1) return null

            return {
                columns: [
                    { text: fullName, style: 'header', alignment: 'left', margin: [40, 20, 0, 0] },
                    { text: `Page ${currentPage} of ${pageCount}`, style: 'header', alignment: 'right', margin: [0, 20, 40, 0] }
                ]
            }
        },

        footer: function (currentPage, pageCount) {
            if (currentPage === 1) return null

            return {
                text: `© ${settings.copyrightYear} ${settings.softwareName}. All rights reserved.`,
                alignment: 'center',
                style: 'footer',
                margin: [0, 0, 0, 20]
            }
        },

        content: [
            // Cover Page
            ...generateCoverPage(fullName, dateStr, timeStr, locationStr, settings),

            { text: '', pageBreak: 'after' },

            // Table of Contents
            ...generateTableOfContents(),

            { text: '', pageBreak: 'after' },

            // Main Details Section
            ...generateMainDetails(kundaliData, formData, dateStr, timeStr, locationStr),

            { text: '', pageBreak: 'after' },

            // Planetary Positions
            ...generatePlanetaryPositions(kundaliData),

            { text: '', pageBreak: 'after' },

            // Kundali Charts
            ...(await generateKundaliCharts(kundaliData)),

            { text: '', pageBreak: 'after' },

            // Key Points
            ...generateKeyPoints(kundaliData),

            { text: '', pageBreak: 'after' },

            // Predictions
            ...generatePredictions(predictions),

            { text: '', pageBreak: 'after' },

            // Dashas
            ...generateDashas(kundaliData),

            { text: '', pageBreak: 'after' },

            // Yogas and Doshas
            ...generateYogasAndDoshas(kundaliData),

            { text: '', pageBreak: 'after' },

            // Remedies
            ...generateRemedies(kundaliData),
        ],

        styles: {
            header: {
                fontSize: 10,
                color: '#666'
            },
            footer: {
                fontSize: 8,
                color: '#999'
            },
            coverTitle: {
                fontSize: 28,
                bold: true,
                color: '#f97316',
                alignment: 'center',
                margin: [0, 20, 0, 10]
            },
            coverSubtitle: {
                fontSize: 16,
                alignment: 'center',
                color: '#666',
                margin: [0, 0, 0, 30]
            },
            sectionTitle: {
                fontSize: 18,
                bold: true,
                color: '#f97316',
                margin: [0, 0, 0, 15]
            },
            subsectionTitle: {
                fontSize: 14,
                bold: true,
                color: '#ea580c',
                margin: [0, 10, 0, 10]
            },
            tableHeader: {
                bold: true,
                fontSize: 11,
                color: 'white',
                fillColor: '#f97316'
            },
            normal: {
                fontSize: 10,
                lineHeight: 1.3
            },
            hindi: {
                fontSize: 11,
                lineHeight: 1.4
            }
        },

        defaultStyle: {
            font: 'Roboto',
            fontSize: 10
        }
    }

    return new Promise((resolve, reject) => {
        try {
            const pdfDocGenerator = pdfMake.createPdf(docDefinition)
            pdfDocGenerator.getBlob((blob) => {
                resolve(blob)
            })
        } catch (error) {
            reject(error)
        }
    })
}

function generateCoverPage(fullName, dateStr, timeStr, locationStr, settings) {
    return [
        { text: 'OM', fontSize: 48, alignment: 'center', margin: [0, 40, 0, 20], color: '#f97316', fontWeight: 'bold' },
        { text: 'Vedic Kundali', style: 'coverTitle' },
        { text: 'Horoscope Report', style: 'coverSubtitle' },

        {
            canvas: [
                {
                    type: 'line',
                    x1: 100, y1: 0,
                    x2: 415, y2: 0,
                    lineWidth: 2,
                    lineColor: '#f97316'
                }
            ],
            margin: [0, 20, 0, 30]
        },

        {
            table: {
                widths: ['30%', '70%'],
                body: [
                    [{ text: 'Name:', bold: true }, { text: fullName, bold: true, fontSize: 14, color: '#f97316' }],
                    [{ text: 'Date of Birth:', bold: true }, dateStr],
                    [{ text: 'Time of Birth:', bold: true }, timeStr],
                    [{ text: 'Place of Birth:', bold: true }, locationStr],
                ]
            },
            layout: 'noBorders',
            margin: [60, 0, 60, 40]
        },

        {
            canvas: [
                {
                    type: 'line',
                    x1: 100, y1: 0,
                    x2: 415, y2: 0,
                    lineWidth: 2,
                    lineColor: '#f97316'
                }
            ],
            margin: [0, 20, 0, 30]
        },

        { text: 'Horoscope By', fontSize: 12, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
        { text: settings.astrologerName || 'Astrologer Name', fontSize: 14, bold: true, color: '#f97316', alignment: 'center', margin: [0, 0, 0, 5] },
        { text: settings.address || '', fontSize: 10, alignment: 'center', margin: [0, 0, 0, 5] },
        { text: settings.phone || '', fontSize: 10, alignment: 'center', margin: [0, 0, 0, 30] },

        {
            text: `Copyright © ${settings.copyrightYear} by Rodge Astro Software. All rights reserved.\\nDeveloped by Nihal Rodge\\nIt is illegal to modify this PDF. Check complete Terms of Use.`,
            fontSize: 8,
            color: '#666',
            alignment: 'center',
            margin: [40, 40, 40, 0]
        }
    ]
}

function generateTableOfContents() {
    const sections = [
        { title: 'Main Details', page: 3 },
        { title: 'Planetary Positions', page: 4 },
        { title: 'Kundali Charts', page: 5 },
        { title: 'Key Points', page: 6 },
        { title: 'Detailed Predictions', page: 7 },
        { title: 'Vimshottari Dasha', page: 8 },
        { title: 'Yogas and Doshas', page: 9 },
        { title: 'Remedies', page: 10 },
    ]

    return [
        { text: 'Table of Contents', style: 'coverTitle', margin: [0, 40, 0, 30] },

        {
            table: {
                widths: ['*', 'auto'],
                body: sections.map(section => [
                    { text: section.title, fontSize: 11, margin: [0, 5, 0, 5] },
                    { text: section.page.toString(), fontSize: 11, alignment: 'right', margin: [0, 5, 0, 5] }
                ])
            },
            layout: {
                hLineWidth: function (i, node) {
                    return (i === 0 || i === node.table.body.length) ? 2 : 1
                },
                vLineWidth: function (i, node) {
                    return 0
                },
                hLineColor: function (i, node) {
                    return '#f97316'
                }
            }
        }
    ]
}

function generateMainDetails(kundaliData, formData, dateStr, timeStr, locationStr) {
    const fullName = getFullName(formData)

    return [
        { text: 'Main Details', style: 'sectionTitle' },

        {
            table: {
                widths: ['40%', '60%'],
                body: [
                    [{ text: 'Name', style: 'tableHeader' }, { text: 'Details', style: 'tableHeader' }],
                    ['Full Name', fullName],
                    ['Date of Birth', dateStr],
                    ['Time of Birth', timeStr],
                    ['Place of Birth', locationStr],
                    ['Ayanamsa / अयनांश', `Lahiri: ${kundaliData.ayanamsa.toFixed(6)}°`],
                    ['Ascendant / लग्न', `${ZODIAC_HINDI[kundaliData.ascendant.sign]} (${kundaliData.ascendant.sign})`],
                    ['Moon Sign / चंद्र राशि', `${ZODIAC_HINDI[kundaliData.moonSign.sign]} (${kundaliData.moonSign.sign})`],
                    ['Sun Sign / सूर्य राशि', `${ZODIAC_HINDI[kundaliData.sunSign.sign]} (${kundaliData.sunSign.sign})`],
                    ['Birth Nakshatra / जन्म नक्षत्र', `${kundaliData.nakshatra.name} - ${kundaliData.nakshatra.pada}`],
                    ['Tithi / तिथि', kundaliData.panchang.tithi],
                    ['Karana / करण', kundaliData.panchang.karana],
                    ['Yoga / योग', kundaliData.panchang.yoga],
                    ['Day / वार', kundaliData.panchang.weekday],
                ]
            },
            layout: {
                fillColor: function (rowIndex, node, columnIndex) {
                    return (rowIndex === 0) ? '#f97316' : (rowIndex % 2 === 0 ? '#fff7ed' : null)
                }
            }
        }
    ]
}

function generatePlanetaryPositions(kundaliData) {
    const planets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu']

    return [
        { text: 'Planetary Positions', style: 'sectionTitle' },

        {
            table: {
                widths: ['15%', '20%', '15%', '15%', '15%', '20%'],
                body: [
                    [
                        { text: 'Planet', style: 'tableHeader', alignment: 'center' },
                        { text: 'Sign', style: 'tableHeader', alignment: 'center' },
                        { text: 'Degree', style: 'tableHeader', alignment: 'center' },
                        { text: 'House', style: 'tableHeader', alignment: 'center' },
                        { text: 'Nakshatra', style: 'tableHeader', alignment: 'center' },
                        { text: 'Pada', style: 'tableHeader', alignment: 'center' },
                    ],
                    ...planets.map(planet => {
                        const planetData = kundaliData.planets[planet]
                        return [
                            { text: `${PLANET_SYMBOLS[planet]} ${planet}`, alignment: 'center' },
                            { text: `${ZODIAC_HINDI[planetData.sign]}\n${planetData.sign}`, alignment: 'center', fontSize: 9 },
                            { text: planetData.degree.toFixed(2) + '°', alignment: 'center' },
                            { text: planetData.house, alignment: 'center' },
                            { text: planetData.nakshatra, alignment: 'center', fontSize: 9 },
                            { text: planetData.pada, alignment: 'center' },
                        ]
                    })
                ]
            },
            layout: {
                fillColor: function (rowIndex, node, columnIndex) {
                    return (rowIndex === 0) ? '#f97316' : (rowIndex % 2 === 0 ? '#fff7ed' : null)
                }
            }
        }
    ]
}

async function generateKundaliCharts(kundaliData) {
    // Generate chart images
    const lagnaChartImage = await generateChartImage(kundaliData, 'lagna')
    const navamshaChartImage = await generateChartImage(kundaliData, 'navamsha')
    const chalitChartImage = await generateChartImage(kundaliData, 'chalit')

    return [
        { text: 'Kundali Charts', style: 'sectionTitle' },

        { text: 'Lagna Kundali (D1)', style: 'subsectionTitle' },
        { text: '[North Indian Style Chart]', fontSize: 9, color: '#666', margin: [0, 0, 0, 10] },
        { image: lagnaChartImage, width: 300, alignment: 'center', margin: [0, 0, 0, 30] },

        { text: 'Navamsha Kundali (D9)', style: 'subsectionTitle' },
        { text: '[North Indian Style Chart]', fontSize: 9, color: '#666', margin: [0, 0, 0, 10] },
        { image: navamshaChartImage, width: 300, alignment: 'center', margin: [0, 0, 0, 30] },

        { text: 'Chalit Chakra', style: 'subsectionTitle' },
        { text: '[Bhava Chalit Chart]', fontSize: 9, color: '#666', margin: [0, 0, 0, 10] },
        { image: chalitChartImage, width: 300, alignment: 'center' },
    ]
}

function generateKeyPoints(kundaliData) {
    return [
        { text: 'Key Points of Your Kundali', style: 'sectionTitle' },

        {
            ul: [
                `Ascendant (Lagna): ${kundaliData.ascendant.sign} at ${kundaliData.ascendant.degree.toFixed(2)}°`,
                `Moon Sign (Rashi): ${kundaliData.moonSign.sign}`,
                `Sun Sign: ${kundaliData.sunSign.sign}`,
                `Birth Nakshatra: ${kundaliData.nakshatra.name} (Pada ${kundaliData.nakshatra.pada})`,
                `Nakshatra Lord: ${kundaliData.nakshatra.lord}`,
                `Vimshottari Dasha: ${kundaliData.currentDasha.planet} Mahadasha`,
                `Dasha Balance: ${kundaliData.currentDasha.balance.years}Y ${kundaliData.currentDasha.balance.months}M ${kundaliData.currentDasha.balance.days}D`,
                `Yogas Present: ${kundaliData.yogas.length} beneficial yogas found`,
                `Mangal Dosha: ${kundaliData.doshas.mangal ? 'Present' : 'Not Present'}`,
                `Kaal Sarp Dosha: ${kundaliData.doshas.kaalSarp ? 'Present' : 'Not Present'}`,
            ],
            margin: [20, 0, 0, 20]
        }
    ]
}

function generatePredictions(predictions) {
    return [
        { text: 'Detailed Predictions', style: 'sectionTitle' },

        { text: 'Lagna (Ascendant) Report', style: 'subsectionTitle' },
        { text: predictions.lagna, margin: [0, 0, 0, 15], alignment: 'justify' },

        { text: 'Moon Sign Report', style: 'subsectionTitle' },
        { text: predictions.moonSign, margin: [0, 0, 0, 15], alignment: 'justify' },

        { text: 'Sun Sign Report', style: 'subsectionTitle' },
        { text: predictions.sunSign, margin: [0, 0, 0, 15], alignment: 'justify' },

        { text: 'Nakshatra Report', style: 'subsectionTitle' },
        { text: predictions.nakshatra, margin: [0, 0, 0, 15], alignment: 'justify' },
    ]
}

function generateDashas(kundaliData) {
    return [
        { text: 'Vimshottari Dasha System', style: 'sectionTitle' },

        { text: `Current Mahadasha: ${kundaliData.currentDasha.planet}`, style: 'subsectionTitle' },
        { text: `Balance: ${kundaliData.currentDasha.balance.years} Years, ${kundaliData.currentDasha.balance.months} Months, ${kundaliData.currentDasha.balance.days} Days`, margin: [0, 0, 0, 20] },

        {
            table: {
                widths: ['25%', '25%', '25%', '25%'],
                body: [
                    [
                        { text: 'Mahadasha', style: 'tableHeader' },
                        { text: 'Start Date', style: 'tableHeader' },
                        { text: 'End Date', style: 'tableHeader' },
                        { text: 'Duration', style: 'tableHeader' },
                    ],
                    ...kundaliData.dashaSequence.map(dasha => [
                        dasha.planet,
                        dasha.startDate,
                        dasha.endDate,
                        `${dasha.years} years`
                    ])
                ]
            },
            layout: {
                fillColor: function (rowIndex, node, columnIndex) {
                    return (rowIndex === 0) ? '#f97316' : (rowIndex % 2 === 0 ? '#fff7ed' : null)
                }
            }
        }
    ]
}

function generateYogasAndDoshas(kundaliData) {
    return [
        { text: 'Yogas and Doshas', style: 'sectionTitle' },

        { text: 'Beneficial Yogas', style: 'subsectionTitle' },
        {
            ul: kundaliData.yogas.length > 0 ? kundaliData.yogas : ['No major yogas detected'],
            margin: [20, 0, 0, 20]
        },

        { text: 'Doshas', style: 'subsectionTitle' },
        {
            table: {
                widths: ['40%', '60%'],
                body: [
                    [{ text: 'Dosha', style: 'tableHeader' }, { text: 'Status', style: 'tableHeader' }],
                    ['Mangal Dosha', kundaliData.doshas.mangal ? 'Present - Remedies recommended' : 'Not Present'],
                    ['Kaal Sarp Dosha', kundaliData.doshas.kaalSarp ? 'Present - Remedies recommended' : 'Not Present'],
                    ['Sade Sati', kundaliData.doshas.sadeSati ? 'Active - Current phase' : 'Not Active'],
                ]
            },
            layout: {
                fillColor: function (rowIndex, node, columnIndex) {
                    return (rowIndex === 0) ? '#f97316' : null
                }
            }
        }
    ]
}

function generateRemedies(kundaliData) {
    return [
        { text: 'Remedies and Recommendations', style: 'sectionTitle' },

        { text: 'General Remedies', style: 'subsectionTitle' },
        {
            ul: [
                'Recite mantras of your ruling planet daily',
                'Wear gemstones as recommended by your astrologer',
                'Perform charity on specific days',
                'Observe fasts on auspicious days',
                'Visit temples regularly',
            ],
            margin: [20, 0, 0, 20]
        },

        { text: 'Recommended Gemstones', style: 'subsectionTitle' },
        { text: `For ${kundaliData.ascendant.sign} Ascendant: ${getRecommendedGemstone(kundaliData.ascendant.sign)}`, margin: [0, 0, 0, 20] },

        { text: 'Lucky Days and Colors', style: 'subsectionTitle' },
        {
            table: {
                widths: ['50%', '50%'],
                body: [
                    [{ text: 'Attribute', style: 'tableHeader' }, { text: 'Recommendation', style: 'tableHeader' }],
                    ['Lucky Day', getLuckyDay(kundaliData.ascendant.sign)],
                    ['Lucky Color', getLuckyColor(kundaliData.ascendant.sign)],
                    ['Lucky Number', getLuckyNumber(kundaliData.ascendant.sign)],
                ]
            },
            layout: {
                fillColor: function (rowIndex, node, columnIndex) {
                    return (rowIndex === 0) ? '#f97316' : (rowIndex % 2 === 0 ? '#fff7ed' : null)
                }
            }
        }
    ]
}

function getRecommendedGemstone(sign) {
    const gemstones = {
        'Aries': 'Red Coral (मूंगा)',
        'Taurus': 'Diamond (हीरा)',
        'Gemini': 'Emerald (पन्ना)',
        'Cancer': 'Pearl (मोती)',
        'Leo': 'Ruby (माणिक)',
        'Virgo': 'Emerald (पन्ना)',
        'Libra': 'Diamond (हीरा)',
        'Scorpio': 'Red Coral (मूंगा)',
        'Sagittarius': 'Yellow Sapphire (पुखराज)',
        'Capricorn': 'Blue Sapphire (नीलम)',
        'Aquarius': 'Blue Sapphire (नीलम)',
        'Pisces': 'Yellow Sapphire (पुखराज)',
    }
    return gemstones[sign] || 'Consult an astrologer'
}

function getLuckyDay(sign) {
    const days = {
        'Aries': 'Tuesday',
        'Taurus': 'Friday',
        'Gemini': 'Wednesday',
        'Cancer': 'Monday',
        'Leo': 'Sunday',
        'Virgo': 'Wednesday',
        'Libra': 'Friday',
        'Scorpio': 'Tuesday',
        'Sagittarius': 'Thursday',
        'Capricorn': 'Saturday',
        'Aquarius': 'Saturday',
        'Pisces': 'Thursday',
    }
    return days[sign] || 'Sunday'
}

function getLuckyColor(sign) {
    const colors = {
        'Aries': 'Red',
        'Taurus': 'White, Pink',
        'Gemini': 'Green',
        'Cancer': 'White, Silver',
        'Leo': 'Gold, Orange',
        'Virgo': 'Green',
        'Libra': 'White, Pink',
        'Scorpio': 'Red, Maroon',
        'Sagittarius': 'Yellow',
        'Capricorn': 'Black, Dark Blue',
        'Aquarius': 'Blue',
        'Pisces': 'Yellow, Orange',
    }
    return colors[sign] || 'White'
}

function getLuckyNumber(sign) {
    const numbers = {
        'Aries': '9',
        'Taurus': '6',
        'Gemini': '5',
        'Cancer': '2',
        'Leo': '1',
        'Virgo': '5',
        'Libra': '6',
        'Scorpio': '9',
        'Sagittarius': '3',
        'Capricorn': '8',
        'Aquarius': '8',
        'Pisces': '3',
    }
    return numbers[sign] || '1'
}
