# Vedic Kundali Web Application

A complete, production-ready web application for generating accurate Vedic Kundali (horoscope) PDFs with detailed predictions, charts, and remedies. Built with React, Netlify Functions, and Swiss Ephemeris for 100% accurate astrological calculations.

## 🌟 Features

- **Accurate Vedic Calculations**: Uses Swiss Ephemeris library with Lahiri Ayanamsa
- **Comprehensive PDF Reports**: 15+ sections including:
  - Birth details and Panchang
  - Planetary positions with nakshatras
  - Kundali charts (Lagna, Navamsha, Chalit)
  - Detailed predictions for Lagna, Moon, Sun, and Nakshatra
  - Vimshottari Dasha system
  - Yogas and Doshas (Mangal, Kaal Sarp, Sade Sati)
  - Remedies and recommendations
- **Beautiful UI**: Modern, responsive design with orange/yellow theme
- **Location Search**: Integrated with Nominatim API for accurate coordinates
- **Customizable**: Settings page to customize astrologer details
- **Netlify Ready**: Fully configured for one-click deployment

## 📋 Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Netlify account (for deployment)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Locally

```bash
npm run dev
```

The application will open at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

## 📦 Project Structure

```
Astology/
├── public/                 # Static assets
├── src/
│   ├── components/        # React components
│   │   ├── KundaliForm.jsx
│   │   ├── LocationSearch.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── PDFPreview.jsx
│   │   └── SettingsPage.jsx
│   ├── utils/            # Utility functions
│   │   ├── validators.js
│   │   ├── pdfGenerator.js
│   │   ├── chartRenderer.js
│   │   └── predictionEngine.js
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── netlify/
│   └── functions/
│       └── calculate-kundali.js  # Serverless function
├── netlify.toml          # Netlify configuration
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🔧 Configuration

### Settings Page

Access the settings page by clicking the gear icon in the header. You can customize:

- Astrologer Name
- Email
- Phone Number(s)
- Address (Hindi/English)
- Software Name
- Copyright Year

Settings are saved in browser's localStorage.

### Environment Variables

No environment variables required! The app uses free Nominatim API for location search.

## 🌐 Deployment to Netlify

### Method 1: Git-based Deployment (Recommended)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. Go to [Netlify](https://netlify.com) and sign in

3. Click "Add new site" → "Import an existing project"

4. Select your GitHub repository

5. Netlify will auto-detect the settings from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`

6. Click "Deploy site"

### Method 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

## 📚 How to Use

1. **Fill the Form**:
   - Enter full name (first, middle, last)
   - Select date of birth
   - Enter exact time of birth (HH:MM:SS format)
   - Search and select birth location

2. **Generate Kundali**:
   - Click "कुंडली बनाएं" (Generate Kundali)
   - Wait for calculations (may take 10-30 seconds)

3. **Download PDF**:
   - Preview the generated PDF
   - Click "Download PDF" to save

## 🔬 Technical Details

### Astrological Calculations

The app uses Swiss Ephemeris (`swisseph` npm package) for accurate calculations:

- **Ayanamsa**: Lahiri (most commonly used in Vedic astrology)
- **House System**: Placidus
- **Planetary Positions**: Tropical converted to Sidereal
- **Nakshatras**: 27 lunar mansions with pada calculation
- **Dashas**: Vimshottari Dasha system (120-year cycle)

### PDF Generation

Uses `pdfmake` library for client-side PDF generation with:

- Custom Hindi fonts (Noto Sans Devanagari)
- Multi-page support
- Tables, charts, and formatted text
- Page numbering and headers/footers

### Location Search

Uses Nominatim (OpenStreetMap) API:

- Free, no API key required
- Autocomplete suggestions
- Coordinate display in traditional format (e.g., 19N57 79E18)
- Timezone calculation based on longitude

## 🐛 Troubleshooting

### Common Issues

**1. Swiss Ephemeris Error**

If you get errors related to `swisseph`:

```bash
# Reinstall the package
npm uninstall swisseph
npm install swisseph@2.10.3
```

**2. PDF Generation Fails**

- Check browser console for errors
- Ensure all required data is calculated
- Try with a different birth date/time

**3. Location Search Not Working**

- Check internet connection
- Nominatim API may have rate limits (wait a few seconds between searches)
- Try searching with more specific terms (e.g., "Chandrapur, Maharashtra, India")

**4. Netlify Function Timeout**

- Functions have 10-second timeout on free tier
- Complex calculations may take longer
- Consider upgrading Netlify plan for longer timeouts

### Build Errors

**PowerShell Execution Policy Error**:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

**Module Not Found**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📖 API Reference

### Netlify Function: `/calculate-kundali`

**Endpoint**: `/.netlify/functions/calculate-kundali`

**Method**: POST

**Request Body**:
```json
{
  "firstName": "AVYAAN",
  "middleName": "BHANUPRATAP",
  "lastName": "UPADHYAY",
  "dateOfBirth": "2024-05-20",
  "timeOfBirth": "09:33:00",
  "location": {
    "name": "Chandrapur, Maharashtra, India",
    "lat": 19.95,
    "lon": 79.30,
    "timezone": 5.5
  }
}
```

**Response**:
```json
{
  "ayanamsa": 24.123456,
  "ascendant": {
    "sign": "Cancer",
    "degree": 0.34,
    "longitude": 90.34
  },
  "planets": { ... },
  "panchang": { ... },
  "currentDasha": { ... },
  "yogas": [...],
  "doshas": { ... }
}
```

## 🎨 Customization

### Changing Theme Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#your-color',
    // ... other shades
  }
}
```

### Adding More Predictions

Edit `src/utils/predictionEngine.js` and add more templates for different combinations.

### Modifying PDF Layout

Edit `src/utils/pdfGenerator.js` to customize sections, fonts, colors, and layout.

## 📄 License

Copyright © 2025 Dhruv Astro Software. All rights reserved.

## 🤝 Support

For issues or questions:
- Check the troubleshooting section above
- Review the code comments for implementation details
- Ensure all dependencies are correctly installed

## 🙏 Acknowledgments

- Swiss Ephemeris for accurate astronomical calculations
- Nominatim/OpenStreetMap for location data
- pdfmake for PDF generation
- Tailwind CSS for beautiful styling

---

**Note**: This application is for educational and personal use. For professional astrological consultations, please consult a qualified astrologer.
