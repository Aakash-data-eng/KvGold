/**
 * KV GOLD — Centralized Business Card & Contact Configuration
 */

export const KV_GOLD_CONTACT = {
  companyName: 'KV GOLD',
  tagline: 'TRUSTED SELLER • SOVEREIGN WEALTH',
  subTagline: 'Trusted gold. Timeless value. Thoughtfully crafted.',
  subTaglineTamil: 'நம்பிக்கையான தங்கம். காலத்தால் நிலைக்கும் மதிப்பு. அக்கறையுடன் உருவாக்கப்பட்ட நகைகள்.',
  phone: '+91 98943 52616',
  phoneRaw: '9894352616',
  email: 'info@kvgold.in',
  whatsappUrl: 'https://chat.whatsapp.com/LMO9P9TuHJxLToDEeX2YPH?s=cl&p=a&mlu=4&ilr=4',
  website: 'https://kvgold.in',
  locations: 'Chennai • Coimbatore • Madurai • Salem',
  deliveryNotice: 'Delivery Available Across Tamil Nadu',
  services: [
    { title: 'BUY GOLD JEWELLERY', tamil: 'தங்க நகைகள் வாங்குதல்' },
    { title: 'SELL YOUR GOLD', tamil: 'உங்கள் தங்கத்தை விற்க' },
    { title: 'GOLD VALUATION', tamil: 'தங்க மதிப்பீடு (No Obligation)' },
    { title: 'CUSTOM JEWELLERY', tamil: 'தனிப்பயன் நகை வடிவமைப்பு' },
  ],
};

/**
 * Resolves the primary URL encoded inside the QR Code
 */
export function getVCardUrl() {
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/visiting-card`;
  }
  return 'https://kvgold.in/visiting-card';
}

/**
 * Generates and downloads a real .vcf vCard file for mobile & desktop contact saving
 */
export function downloadVCardFile() {
  const vcardData = `BEGIN:VCARD
VERSION:3.0
FN:KV GOLD
ORG:KV GOLD;Trusted Seller & Sovereign Wealth
TEL;TYPE=WORK,VOICE:+919894352616
EMAIL;TYPE=WORK:info@kvgold.in
URL:https://kvgold.in
NOTE:KV GOLD - Gold You Can Trust. Service You Can Count On.
ADR;TYPE=WORK:;;Chennai / Coimbatore / Madurai / Salem;Tamil Nadu;;India
END:VCARD`;

  const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'KV_GOLD.vcf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
