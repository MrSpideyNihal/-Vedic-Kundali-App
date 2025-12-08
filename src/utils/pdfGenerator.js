    import pdfMake from 'pdfmake/build/pdfmake'
    import * as pdfFonts from 'pdfmake/build/vfs_fonts'
    import { formatDateForDisplay, formatTimeForDisplay, getFullName } from './validators'
    import { getPredictions } from './predictionEngine'
    import { generateChartImage } from './chartImageGenerator'
    import { pdfText } from './pdfBilingualText'
    import {
        generateHouseAnalysis,
        generatePanchangPredictions,
        generateAntardashaPhala,
        generateMangalDoshaAnalysis,
        generateKaalSarpAnalysis,
        generateSadeSatiReport
    } from './pdfEnhancedSections'


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

        // Get language preference from formData
        const isHindi = formData.pdfLanguage === 'hindi'

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
                ...generateCoverPage(fullName, dateStr, timeStr, locationStr, settings, isHindi),

                { text: '', pageBreak: 'after' },

                // Table of Contents
                ...generateTableOfContents(isHindi),

                { text: '', pageBreak: 'after' },

                // Main Details Section
                ...generateMainDetails(kundaliData, formData, dateStr, timeStr, locationStr, isHindi),

                { text: '', pageBreak: 'after' },

                // Planetary Positions
                ...generatePlanetaryPositions(kundaliData, isHindi),

                { text: '', pageBreak: 'after' },

                // Kundali Charts
                ...(await generateKundaliCharts(kundaliData, isHindi)),

                { text: '', pageBreak: 'after' },

                // Key Points
                ...generateKeyPoints(kundaliData, isHindi),

                { text: '', pageBreak: 'after' },

                // House Analysis (Bhava Phal)
                ...generateHouseAnalysis(kundaliData, isHindi),

                { text: '', pageBreak: 'after' },

                // Predictions
                ...generatePredictions(predictions, isHindi),

                { text: '', pageBreak: 'after' },

                // Panchang Predictions
                ...generatePanchangPredictions(kundaliData, isHindi),

                { text: '', pageBreak: 'after' },

                // Dashas
                ...generateDashas(kundaliData, isHindi),

                { text: '', pageBreak: 'after' },

                // Antardasha Predictions
                ...generateAntardashaPhala(kundaliData, isHindi),

                { text: '', pageBreak: 'after' },

                // Yogas and Doshas
                ...generateYogasAndDoshas(kundaliData, isHindi),

                { text: '', pageBreak: 'after' },

                // Mangal Dosha Detailed Analysis
                ...generateMangalDoshaAnalysis(kundaliData, isHindi),

                { text: '', pageBreak: 'after' },

                // Kaal Sarp Dosha Analysis
                ...generateKaalSarpAnalysis(kundaliData, isHindi),

                { text: '', pageBreak: 'after' },

                // Sade Sati Report
                ...generateSadeSatiReport(kundaliData, isHindi),

                { text: '', pageBreak: 'after' },

                // Remedies (Enhanced)
                ...generateRemedies(kundaliData, isHindi),
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

    function generateCoverPage(fullName, dateStr, timeStr, locationStr, settings, isHindi) {
        return [
            { text: 'OM', fontSize: 48, alignment: 'center', margin: [0, 40, 0, 20], color: '#f97316', fontWeight: 'bold' },
            { text: pdfText.coverTitle(isHindi), style: 'coverTitle' },
            { text: pdfText.coverSubtitle(isHindi), style: 'coverSubtitle' },

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

            { text: pdfText.horoscopeBy(isHindi), fontSize: 12, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
            { text: settings.astrologerName || (isHindi ? 'ज्योतिषी का नाम' : 'Astrologer Name'), fontSize: 14, bold: true, color: '#f97316', alignment: 'center', margin: [0, 0, 0, 5] },
            { text: settings.address || '', fontSize: 10, alignment: 'center', margin: [0, 0, 0, 5] },
            { text: settings.phone || '', fontSize: 10, alignment: 'center', margin: [0, 0, 0, 30] },

            {
                text: isHindi
                    ? `${pdfText.copyright(isHindi)} © ${settings.copyrightYear} Rodge Astro Software\\n${pdfText.developedBy(isHindi)}: Nihal Rodge`
                    : `Copyright © ${settings.copyrightYear} by Rodge Astro Software. ${pdfText.copyright(isHindi)}.\\n${pdfText.developedBy(isHindi)} Nihal Rodge`,
                fontSize: 8,
                color: '#666',
                alignment: 'center',
                margin: [40, 40, 40, 0]
            }
        ]
    }

    function generateTableOfContents(isHindi) {
        const sections = [
            { title: pdfText.sections.mainDetails(isHindi), page: 3 },
            { title: pdfText.sections.planetaryPositions(isHindi), page: 4 },
            { title: pdfText.sections.kundaliCharts(isHindi), page: 5 },
            { title: pdfText.sections.keyPoints(isHindi), page: 6 },
            { title: pdfText.sections.houseAnalysis(isHindi), page: 7 },
            { title: pdfText.sections.lagnaReport(isHindi), page: 8 },
            { title: pdfText.sections.moonReport(isHindi), page: 9 },
            { title: pdfText.sections.sunReport(isHindi), page: 10 },
            { title: pdfText.sections.nakshatraReport(isHindi), page: 11 },
            { title: pdfText.sections.panchangPhal(isHindi), page: 12 },
            { title: pdfText.sections.dashas(isHindi), page: 13 },
            { title: pdfText.sections.antardashaPhala(isHindi), page: 14 },
            { title: pdfText.sections.yogas(isHindi), page: 15 },
            { title: pdfText.sections.mangalDoshaAnalysis(isHindi), page: 16 },
            { title: pdfText.sections.kaalSarpAnalysis(isHindi), page: 17 },
            { title: pdfText.sections.sadeSatiReport(isHindi), page: 18 },
            { title: pdfText.sections.remedies(isHindi), page: 19 },
        ]

        return [
            { text: pdfText.tableOfContents(isHindi), style: 'coverTitle', margin: [0, 40, 0, 30] },

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

    function generateMainDetails(kundaliData, formData, dateStr, timeStr, locationStr, isHindi) {
        const fullName = getFullName(formData)

        return [
            { text: pdfText.sections.mainDetails(isHindi), style: 'sectionTitle' },

            {
                table: {
                    widths: ['40%', '60%'],
                    body: [
                        [
                            { text: isHindi ? 'विवरण' : 'Field', style: 'tableHeader' },
                            { text: isHindi ? 'जानकारी' : 'Details', style: 'tableHeader' }
                        ],
                        [pdfText.name(isHindi), fullName],
                        [pdfText.dateOfBirth(isHindi), dateStr],
                        [pdfText.timeOfBirth(isHindi), timeStr],
                        [pdfText.placeOfBirth(isHindi), locationStr],
                        [
                            pdfText.ayanamsa(isHindi),
                            `${isHindi ? 'लाहिरी' : 'Lahiri'}: ${kundaliData.ayanamsa.toFixed(6)}°`
                        ],
                        [
                            pdfText.ascendant(isHindi),
                            isHindi ? ZODIAC_HINDI[kundaliData.ascendant.sign] : kundaliData.ascendant.sign
                        ],
                        [
                            pdfText.moonSign(isHindi),
                            isHindi ? ZODIAC_HINDI[kundaliData.moonSign.sign] : kundaliData.moonSign.sign
                        ],
                        [
                            pdfText.sunSign(isHindi),
                            isHindi ? ZODIAC_HINDI[kundaliData.sunSign.sign] : kundaliData.sunSign.sign
                        ],
                        [
                            pdfText.birthNakshatra(isHindi),
                            `${kundaliData.nakshatra.name} - ${isHindi ? 'पाद' : 'Pada'} ${kundaliData.nakshatra.pada}`
                        ],
                        [pdfText.tithi(isHindi), kundaliData.panchang.tithi],
                        [pdfText.karana(isHindi), kundaliData.panchang.karana],
                        [pdfText.yoga(isHindi), kundaliData.panchang.yoga],
                        [pdfText.weekday(isHindi), kundaliData.panchang.weekday],
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

    function generatePlanetaryPositions(kundaliData, isHindi) {
        const planets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu']

        const planetNames = {
            'Sun': isHindi ? 'सूर्य' : 'Sun',
            'Moon': isHindi ? 'चंद्र' : 'Moon',
            'Mars': isHindi ? 'मंगल' : 'Mars',
            'Mercury': isHindi ? 'बुध' : 'Mercury',
            'Jupiter': isHindi ? 'गुरु' : 'Jupiter',
            'Venus': isHindi ? 'शुक्र' : 'Venus',
            'Saturn': isHindi ? 'शनि' : 'Saturn',
            'Rahu': isHindi ? 'राहु' : 'Rahu',
            'Ketu': isHindi ? 'केतु' : 'Ketu',
        }

        return [
            { text: pdfText.sections.planetaryPositions(isHindi), style: 'sectionTitle' },

            {
                table: {
                    widths: ['15%', '20%', '15%', '15%', '15%', '20%'],
                    body: [
                        [
                            { text: pdfText.planet(isHindi), style: 'tableHeader', alignment: 'center' },
                            { text: pdfText.sign(isHindi), style: 'table Header', alignment: 'center' },
                            { text: pdfText.degree(isHindi), style: 'tableHeader', alignment: 'center' },
                            { text: pdfText.house(isHindi), style: 'tableHeader', alignment: 'center' },
                            { text: pdfText.nakshatra(isHindi), style: 'tableHeader', alignment: 'center' },
                            { text: pdfText.pada(isHindi), style: 'tableHeader', alignment: 'center' },
                        ],
                        ...planets.map(planet => {
                            const planetData = kundaliData.planets[planet]
                            return [
                                { text: `${PLANET_SYMBOLS[planet]} ${planetNames[planet]}`, alignment: 'center' },
                                { text: isHindi ? ZODIAC_HINDI[planetData.sign] : planetData.sign, alignment: 'center' },
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

    async function generateKundaliCharts(kundaliData, isHindi) {
        // Generate chart images
        const lagnaChartImage = await generateChartImage(kundaliData, 'lagna')
        const navamshaChartImage = await generateChartImage(kundaliData, 'navamsha')
        const chalitChartImage = await generateChartImage(kundaliData, 'chalit')

        return [
            { text: pdfText.sections.kundaliCharts(isHindi), style: 'sectionTitle' },

            { text: pdfText.lagnaChart(isHindi), style: 'subsectionTitle' },
            { text: '[North Indian Style Chart]', fontSize: 9, color: '#666', margin: [0, 0, 0, 10] },
            { image: lagnaChartImage, width: 300, alignment: 'center', margin: [0, 0, 0, 30] },

            { text: pdfText.navamshaChart(isHindi), style: 'subsectionTitle' },
            { text: '[North Indian Style Chart]', fontSize: 9, color: '#666', margin: [0, 0, 0, 10] },
            { image: navamshaChartImage, width: 300, alignment: 'center', margin: [0, 0, 0, 30] },

            { text: pdfText.chalitChart(isHindi), style: 'subsectionTitle' },
            { text: '[Bhava Chalit Chart]', fontSize: 9, color: '#666', margin: [0, 0, 0, 10] },
            { image: chalitChartImage, width: 300, alignment: 'center' },
        ]
    }

    function generateKeyPoints(kundaliData, isHindi) {
        return [
            { text: pdfText.sections.keyPoints(isHindi), style: 'sectionTitle' },

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

    function generatePredictions(predictions, isHindi) {
        return [
            { text: pdfText.sections.predictions(isHindi), style: 'sectionTitle' },

            { text: pdfText.sections.lagnaReport(isHindi), style: 'subsectionTitle' },
            { text: predictions.lagna, margin: [0, 0, 0, 15], alignment: 'justify' },

            { text: pdfText.sections.moonReport(isHindi), style: 'subsectionTitle' },
            { text: predictions.moonSign, margin: [0, 0, 0, 15], alignment: 'justify' },

            { text: pdfText.sections.sunReport(isHindi), style: 'subsectionTitle' },
            { text: predictions.sunSign, margin: [0, 0, 0, 15], alignment: 'justify' },

            { text: pdfText.sections.nakshatraReport(isHindi), style: 'subsectionTitle' },
            { text: predictions.nakshatra, margin: [0, 0, 0, 15], alignment: 'justify' },
        ]
    }

    function generateDashas(kundaliData, isHindi) {
        const currentMahadashaText = isHindi
            ? `वर्तमान ${pdfText.mahadasha(isHindi)}: ${kundaliData.currentDasha.planet}`
            : `${pdfText.mahadasha(isHindi)}: ${kundaliData.currentDasha.planet}`;

        const balanceText = isHindi
            ? `${pdfText.balance(isHindi)}: ${kundaliData.currentDasha.balance.years} वर्ष, ${kundaliData.currentDasha.balance.months} माह, ${kundaliData.currentDasha.balance.days} दिन`
            : `${pdfText.balance(isHindi)}: ${kundaliData.currentDasha.balance.years} ${pdfText.years(isHindi)}, ${kundaliData.currentDasha.balance.months} ${pdfText.months(isHindi)}, ${kundaliData.currentDasha.balance.days} ${pdfText.days(isHindi)}`;

        return [
            { text: pdfText.sections.dashas(isHindi), style: 'sectionTitle' },

            { text: currentMahadashaText, style: 'subsectionTitle' },
            { text: balanceText, margin: [0, 0, 0, 20] },

            {
                table: {
                    widths: ['25%', '25%', '25%', '25%'],
                    body: [
                        [
                            { text: pdfText.mahadasha(isHindi), style: 'tableHeader' },
                            { text: pdfText.startDate(isHindi), style: 'tableHeader' },
                            { text: pdfText.endDate(isHindi), style: 'tableHeader' },
                            { text: pdfText.duration(isHindi), style: 'tableHeader' },
                        ],
                        ...kundaliData.dashaSequence.map(dasha => [
                            dasha.planet,
                            dasha.startDate,
                            dasha.endDate,
                            `${dasha.years} ${isHindi ? 'वर्ष' : 'years'}`
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

    function generateYogasAndDoshas(kundaliData, isHindi) {
        return [
            { text: pdfText.sections.yogas(isHindi), style: 'sectionTitle' },

            { text: pdfText.beneficialYogas(isHindi), style: 'subsectionTitle' },
            {
                ul: kundaliData.yogas.length > 0 ? kundaliData.yogas : ['No major yogas detected'],
                margin: [20, 0, 0, 20]
            },

            { text: pdfText.doshas(isHindi), style: 'subsectionTitle' },
            {
                table: {
                    widths: ['40%', '60%'],
                    body: [
                        [
                            { text: isHindi ? 'दोष' : 'Dosha', style: 'tableHeader' },
                            { text: isHindi ? 'स्थिति' : 'Status', style: 'tableHeader' }
                        ],
                        [
                            pdfText.mangalDosha(isHindi),
                            kundaliData.doshas.mangal
                                ? (isHindi ? 'उपस्थित - उपाय आवश्यक' : 'Present - Remedies recommended')
                                : (isHindi ? 'उपस्थित नहीं' : 'Not Present')
                        ],
                        [
                            pdfText.kaalSarpDosha(isHindi),
                            kundaliData.doshas.kaalSarp
                                ? (isHindi ? 'उपस्थित - उपाय आवश्यक' : 'Present - Remedies recommended')
                                : (isHindi ? 'उपस्थित नहीं' : 'Not Present')
                        ],
                        [
                            pdfText.sadeSati(isHindi),
                            kundaliData.doshas.sadeSati
                                ? (isHindi ? 'सक्रिय - वर्तमान चरण' : 'Active - Current phase')
                                : (isHindi ? 'सक्रिय नहीं' : 'Not Active')
                        ],
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

    function generateRemedies(kundaliData, isHindi) {
        const ascendantSign = kundaliData.ascendant.sign;
        const nakshatraLord = kundaliData.nakshatra.lord;

        // Mantra recommendations
        const mantras = getMantrasForSign(ascendantSign, isHindi);
        const yantra = getYantraForSign(ascendantSign, isHindi);
        const rudraksha = getRudrakshaRecommendation(ascendantSign, isHindi);
        const deity = getDeityForSign(ascendantSign, isHindi);

        return [
            { text: pdfText.sections.remedies(isHindi), style: 'sectionTitle' },

            { text: pdfText.generalRemedies(isHindi), style: 'subsectionTitle' },
            {
                ul: isHindi ? [
                    'अपने राशि स्वामी का मंत्र जाप दैनिक करें',
                    'ज्योतिषी द्वारा सुझाए गए रत्न धारण करें',
                    'विशेष दिनों में दान करें',
                    'शुभ दिनों में व्रत रखें',
                    'नियमित रूप से मंदिर जाएं',
                    'अपने इष्ट देव की पूजा करें'
                ] : [
                    'Recite mantras of your ruling planet daily',
                    'Wear gemstones as recommended by astrologer',
                    'Perform charity on specific days',
                    'Observe fasts on auspicious days',
                    'Visit temples regularly',
                    'Worship your chosen deity'
                ],
                margin: [20, 0, 0, 20]
            },

            { text: pdfText.mantras(isHindi), style: 'subsectionTitle' },
            { text: mantras, margin: [0, 0, 0, 20], alignment: 'justify' },

            { text: pdfText.yantras(isHindi), style: 'subsectionTitle' },
            { text: yantra, margin: [0, 0, 0, 20] },

            { text: pdfText.rudrakshas(isHindi), style: 'subsectionTitle' },
            { text: rudraksha, margin: [0, 0, 0, 20] },

            { text: pdfText.deity(isHindi), style: 'subsectionTitle' },
            { text: deity, margin: [0, 0, 0, 20] },

            { text: pdfText.gemstones(isHindi), style: 'subsectionTitle' },
            {
                text: isHindi
                    ? `${ascendantSign} लग्न के लिए: ${getRecommendedGemstone(ascendantSign)}`
                    : `For ${ascendantSign} Ascendant: ${getRecommendedGemstone(ascendantSign)}`,
                margin: [0, 0, 0, 20]
            },

            { text: pdfText.luckyDaysColors(isHindi), style: 'subsectionTitle' },
            {
                table: {
                    widths: ['50%', '50%'],
                    body: [
                        [
                            { text: isHindi ? 'गुण' : 'Attribute', style: 'tableHeader' },
                            { text: isHindi ? 'सुझाव' : 'Recommendation', style: 'tableHeader' }
                        ],
                        [isHindi ? 'शुभ दिन' : 'Lucky Day', getLuckyDay(ascendantSign)],
                        [isHindi ? 'शुभ रंग' : 'Lucky Color', getLuckyColor(ascendantSign)],
                        [isHindi ? 'शुभ अंक' : 'Lucky Number', getLuckyNumber(ascendantSign)],
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

    function getMantrasForSign(sign, isHindi) {
        const mantras = {
            'Aries': isHindi ? 'मंगल मंत्र: "ॐ अं अंगारकाय नमः" - प्रतिदिन 108 बार' : 'Mars Mantra: "Om Ang Angarakaya Namah" - 108 times daily',
            'Taurus': isHindi ? 'शुक्र मंत्र: "ॐ शं शुक्राय नमः" - प्रतिदिन 108 बार' : 'Venus Mantra: "Om Sham Shukraya Namah" - 108 times daily',
            'Gemini': isHindi ? 'बुध मंत्र: "ॐ बुं बुधाय नमः" - प्रतिदिन 108 बार' : 'Mercury Mantra: "Om Bum Budhaaya Namah" - 108 times daily',
            'Cancer': isHindi ? 'चंद्र मंत्र: "ॐ सोम सोमाय नमः" - प्रतिदिन 108 बार' : 'Moon Mantra: "Om Som Somaaya Namah" - 108 times daily',
            'Leo': isHindi ? 'सूर्य मंत्र: "ॐ सूं सूर्याय नमः" - प्रतिदिन 108 बार' : 'Sun Mantra: "Om Soom Sooryaaya Namah" - 108 times daily',
            'Virgo': isHindi ? 'बुध मंत्र: "ॐ बुं बुधाय नमः" - प्रतिदिन 108 बार' : 'Mercury Mantra: "Om Bum Budhaaya Namah" - 108 times daily',
            'Libra': isHindi ? 'शुक्र मंत्र: "ॐ शं शुक्राय नमः" - प्रतिदिन 108 बार' : 'Venus Mantra: "Om Sham Shukraya Namah" - 108 times daily',
            'Scorpio': isHindi ? 'मंगल मंत्र: "ॐ अं अंगारकाय नमः" - प्रतिदिन 108 बार' : 'Mars Mantra: "Om Ang Angarakaya Namah" - 108 times daily',
            'Sagittarius': isHindi ? 'गुरु मंत्र: "ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः" - प्रतिदिन 108 बार' : 'Jupiter Mantra: "Om Gram Greem Graum Sah Gurave Namah" - 108 times daily',
            'Capricorn': isHindi ? 'शनि मंत्र: "ॐ शं शनैश्चराय नमः" - प्रतिदिन 108 बार' : 'Saturn Mantra: "Om Sham Shanaishcharaaya Namah" - 108 times daily',
            'Aquarius': isHindi ? 'शनि मंत्र: "ॐ शं शनैश्चराय नमः" - प्रतिदिन 108 बार' : 'Saturn Mantra: "Om Sham Shanaishcharaaya Namah" - 108 times daily',
            'Pisces': isHindi ? 'गुरु मंत्र: "ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः" - प्रतिदिन 108 बार' : 'Jupiter Mantra: "Om Gram Greem Graum Sah Gurave Namah" - 108 times daily',
        };
        return mantras[sign] || '';
    }

    function getYantraForSign(sign, isHindi) {
        const yantras = {
            'Aries': isHindi ? 'मंगल यंत्र' : 'Mars Yantra',
            'Taurus': isHindi ? 'शुक्र यंत्र' : 'Venus Yantra',
            'Gemini': isHindi ? 'बुध यंत्र' : 'Mercury Yantra',
            'Cancer': isHindi ? 'चंद्र यंत्र' : 'Moon Yantra',
            'Leo': isHindi ? 'सूर्य यंत्र' : 'Sun Yantra',
            'Virgo': isHindi ? 'बुध यंत्र' : 'Mercury Yantra',
            'Libra': isHindi ? 'शुक्र यंत्र' : 'Venus Yantra',
            'Scorpio': isHindi ? 'मंगल यंत्र' : 'Mars Yantra',
            'Sagittarius': isHindi ? 'गुरु यंत्र' : 'Jupiter Yantra',
            'Capricorn': isHindi ? 'शनि यंत्र' : 'Saturn Yantra',
            'Aquarius': isHindi ? 'शनि यंत्र' : 'Saturn Yantra',
            'Pisces': isHindi ? 'गुरु यंत्र' : 'Jupiter Yantra',
        };
        return yantras[sign] || '';
    }

    function getRudrakshaRecommendation(sign, isHindi) {
        const rudrakshas = {
            'Aries': isHindi ? '3 मुखी रुद्राक्ष (मंगल के लिए)' : '3 Mukhi Rudraksha (for Mars)',
            'Taurus': isHindi ? '6 मुखी रुद्राक्ष (शुक्र के लिए)' : '6 Mukhi Rudraksha (for Venus)',
            'Gemini': isHindi ? '4 मुखी रुद्राक्ष (बुध के लिए)' : '4 Mukhi Rudraksha (for Mercury)',
            'Cancer': isHindi ? '2 मुखी रुद्राक्ष (चंद्र के लिए)' : '2 Mukhi Rudraksha (for Moon)',
            'Leo': isHindi ? '1 मुखी रुद्राक्ष (सूर्य के लिए)' : '1 Mukhi Rudraksha (for Sun)',
            'Virgo': isHindi ? '4 मुखी रुद्राक्ष (बुध के लिए)' : '4 Mukhi Rudraksha (for Mercury)',
            'Libra': isHindi ? '6 मुखी रुद्राक्ष (शुक्र के लिए)' : '6 Mukhi Rudraksha (for Venus)',
            'Scorpio': isHindi ? '3 मुखी रुद्राक्ष (मंगल के लिए)' : '3 Mukhi Rudraksha (for Mars)',
            'Sagittarius': isHindi ? '5 मुखी रुद्राक्ष (गुरु के लिए)' : '5 Mukhi Rudraksha (for Jupiter)',
            'Capricorn': isHindi ? '7 मुखी रुद्राक्ष (शनि के लिए)' : '7 Mukhi Rudraksha (for Saturn)',
            'Aquarius': isHindi ? '7 मुखी रुद्राक्ष (शनि के लिए)' : '7 Mukhi Rudraksha (for Saturn)',
            'Pisces': isHindi ? '5 मुखी रुद्राक्ष (गुरु के लिए)' : '5 Mukhi Rudraksha (for Jupiter)',
        };
        return rudrakshas[sign] || '';
    }

    function getDeityForSign(sign, isHindi) {
        const deities = {
            'Aries': isHindi ? 'हनुमान जी / Lord Hanuman' : 'Lord Hanuman',
            'Taurus': isHindi ? 'लक्ष्मी माता / Goddess Lakshmi' : 'Goddess Lakshmi',
            'Gemini': isHindi ? 'भगवान विष्णु / Lord Vishnu' : 'Lord Vishnu',
            'Cancer': isHindi ? 'माता पार्वती / Goddess Parvati' : 'Goddess Parvati',
            'Leo': isHindi ? 'भगवान सूर्य / Lord Surya' : 'Lord Surya',
            'Virgo': isHindi ? 'भगवान विष्णु / Lord Vishnu' : 'Lord Vishnu',
            'Libra': isHindi ? 'लक्ष्मी माता / Goddess Lakshmi' : 'Goddess Lakshmi',
            'Scorpio': isHindi ? 'हनुमान जी / Lord Hanuman' : 'Lord Hanuman',
            'Sagittarius': isHindi ? 'भगवान शिव / Lord Shiva' : 'Lord Shiva',
            'Capricorn': isHindi ? 'भगवान शनि / Lord Saturn' : 'Lord Saturn',
            'Aquarius': isHindi ? 'भगवान शनि / Lord Saturn' : 'Lord Saturn',
            'Pisces': isHindi ? 'भगवान शिव / Lord Shiva' : 'Lord Shiva',
        };
        return deities[sign] || '';
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
