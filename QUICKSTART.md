# Quick Start Guide

## Installation Complete! ✅

All dependencies have been installed successfully (194 packages).

## Next Steps

### 1. Run the Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`

### 2. Test the Application

Use the following test data:

- **Name**: AVYAAN BHANUPRATAP UPADHYAY
- **Date of Birth**: 20-05-2024
- **Time of Birth**: 09:33:00
- **Location**: Search for "Chandrapur, Maharashtra, India"

### 3. Generate Kundali

1. Fill in the form with the test data
2. Click "कुंडली बनाएं" (Generate Kundali)
3. Wait for calculations (10-30 seconds)
4. Preview and download the PDF

### 4. Customize Settings

Click the gear icon (⚙️) in the header to customize:
- Astrologer name
- Contact details
- Software branding

### 5. Deploy to Netlify

#### Option A: Git-based Deployment
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

Then connect your repository on Netlify.

#### Option B: Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

## Important Notes

- **Calculations**: Uses simplified astronomical calculations (Swiss Ephemeris optional)
- **Accuracy**: Calculations are approximate but suitable for educational purposes
- **Location Search**: Uses free Nominatim API (no API key required)
- **PDF Generation**: Happens client-side in the browser

## Troubleshooting

If you encounter any issues:

1. **Port already in use**: Change port in `vite.config.js`
2. **PDF generation fails**: Check browser console for errors
3. **Location search slow**: Nominatim has rate limits, wait between searches

## Features Included

✅ User input form with validation
✅ Location search with autocomplete
✅ Planetary position calculations
✅ Kundali charts (Lagna, Navamsha, Chalit)
✅ Panchang details
✅ Vimshottari Dasha system
✅ Yogas and Doshas detection
✅ PDF generation with 15+ sections
✅ Hindi language support
✅ Customizable settings
✅ Responsive design
✅ Netlify deployment ready

Enjoy your Vedic Kundali application! 🕉️
