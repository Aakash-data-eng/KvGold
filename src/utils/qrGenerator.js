import QRCode from 'qrcode';

/**
 * Generates standard, high-contrast, 100% scannable QR Code SVG strings.
 * Uses the industry-standard qrcode engine with Reed-Solomon error correction and quiet zone.
 */
export async function generateScannableQRSVG(url, options = {}) {
  const targetUrl = url || 'https://kvgold.in/visiting-card';
  try {
    const svgString = await QRCode.toString(targetUrl, {
      type: 'svg',
      errorCorrectionLevel: options.ecc || 'M',
      margin: 4, // Protected 4-module quiet zone
      color: {
        dark: '#080808',  // Crisp dark modules
        light: '#FFFFFF', // Clean white quiet zone background
      },
    });
    return svgString;
  } catch (err) {
    console.error('QR Generation error:', err);
    return null;
  }
}

