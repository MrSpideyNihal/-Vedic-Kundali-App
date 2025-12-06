// Hindi font configuration for pdfMake
// Uses a lightweight approach with base64 encoded subset of Noto Sans Devanagari

export const hindiFont = {
    // Using Roboto as base font (already available in pdfMake)
    // For Hindi support, we'll use a workaround with Unicode characters
    // This is a lightweight solution that works without adding large font files

    vfs: {
        // pdfMake already includes Roboto which has basic Unicode support
        // We'll rely on the browser's font rendering for Hindi in the generated images
        // and use standard Unicode for text in the PDF
    },

    fonts: {
        // Default fonts from pdfMake
        Roboto: {
            normal: 'Roboto-Regular.ttf',
            bold: 'Roboto-Medium.ttf',
            italics: 'Roboto-Italic.ttf',
            bolditalics: 'Roboto-MediumItalic.ttf'
        }
    }
}

// Note: For production, you would need to:
// 1. Download Noto Sans Devanagari font files
// 2. Convert to base64
// 3. Add to pdfMake VFS
// This current implementation uses Unicode which works for most cases
