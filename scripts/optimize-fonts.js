import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FONTS_DIR = path.join(__dirname, '..', 'public', 'fonts');

// Direct font file URLs
const FONTS = {
  'outfit-var': 'https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4G-EiAou6Y.woff2',
  'poppins-var': 'https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2'
};

// Create fonts directory if it doesn't exist
if (!fs.existsSync(FONTS_DIR)) {
  fs.mkdirSync(FONTS_DIR, { recursive: true });
}

// Download font
async function downloadFont(fontName, url) {
  console.log(`Downloading ${fontName}...`);
  
  const fontPath = path.join(FONTS_DIR, `${fontName}.woff2`);
  
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    }, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(fontPath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded ${fontName} successfully!`);
          resolve();
        });
      } else {
        reject(new Error(`Failed to download ${fontName} - Status code: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(new Error(`Failed to download ${fontName} - ${err.message}`));
    });
  });
}

// Generate CSS
function generateFontCSS() {
  const css = `/* Generated Font CSS */
@font-face {
  font-family: 'Outfit';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url('/fonts/outfit-var.woff2') format('woff2-variations');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url('/fonts/poppins-var.woff2') format('woff2-variations');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}`;

  const cssPath = path.join(FONTS_DIR, 'fonts.css');
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('Generated fonts.css successfully!');
}

// Main function
async function main() {
  try {
    // Download fonts
    for (const [fontName, url] of Object.entries(FONTS)) {
      await downloadFont(fontName, url);
    }
    
    // Generate CSS
    generateFontCSS();
    
    console.log('All fonts downloaded and optimized successfully!');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
