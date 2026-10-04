import React, { useState, useEffect } from 'react';
import GoldPriceTicker from './GoldPriceTicker';
import { Globe } from 'lucide-react';
import '../styles/navbar.css';

export default function Navbar({ onOpenSchemeModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('kv_gold_lang') || 'en';
  });

  useEffect(() => {
    let currentScrolled = false;
    const handleScroll = () => {
      const isScrolled = window.scrollY > 40;
      if (isScrolled !== currentScrolled) {
        currentScrolled = isScrolled;
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'ta' : 'en';
    setLang(nextLang);
    localStorage.setItem('kv_gold_lang', nextLang);
    window.dispatchEvent(new CustomEvent('kv_gold_lang_changed', { detail: nextLang }));
  };

  return (
    <header className="nav-wrapper">
      {/* Real Dynamic Gold & Silver Market Price Ticker */}
      <GoldPriceTicker />

      <nav className={`main-navbar ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="container navbar-centered-layout">
          {/* Left Wing: Authentic Royal Tamil Gold Quote */}
          <div className="nav-quote-wing nav-quote-left">
            <span className="quote-sparkle" aria-hidden="true">✦</span>
            <div className="quote-text-group">
              <span className="quote-tamil-primary">காலம் வென்ற தூய பொன்</span>
              <span className="quote-tamil-secondary">நம்பிக்கையான சேவை • 916 ஹால்மார்க்</span>
            </div>
          </div>

          {/* Center: KV GOLD Luxury Brand Emblem & Company Name */}
          <a href="#" className="brand-logo brand-logo-centered" aria-label="KV Gold Home">
            <div className="brand-crest-frame">
              <div className="brand-crest-inner">
                <span className="brand-monogram">KV</span>
                <div className="brand-crest-shimmer" aria-hidden="true" />
              </div>
            </div>
            <div className="brand-text-col">
              <span className="brand-name">KV GOLD</span>
              <span className="brand-tagline">TRUSTED SELLER • SOVEREIGN WEALTH</span>
            </div>
          </a>

          {/* Right Wing: Language Toggle & Heritage Quote */}
          <div className="nav-quote-wing nav-quote-right">
            <button
              type="button"
              className="lang-switcher-btn"
              onClick={toggleLanguage}
              aria-label="Toggle Language between English and Tamil"
              title="Switch Language / மொழியை மாற்ற"
            >
              <Globe size={13} className="lang-globe-icon" />
              <span className={lang === 'en' ? 'lang-active' : 'lang-dim'}>EN</span>
              <span className="lang-sep">|</span>
              <span className={lang === 'ta' ? 'lang-active' : 'lang-dim'}>தமிழ்</span>
            </button>
            <div className="quote-text-group quote-text-right">
              <span className="quote-tamil-primary">நம்பிக்கையான விற்பனையாளர்</span>
              <span className="quote-tamil-secondary">வாங்குதல் • விற்பனை • மதிப்பீடு</span>
            </div>
            <span className="quote-sparkle" aria-hidden="true">✦</span>
          </div>
        </div>

        {/* Mobile Sub-bar with Tamil Heritage Quote & Quick Switcher */}
        <div className="mobile-tamil-quote-bar">
          <span className="quote-sparkle">✦</span>
          <span>நம்பிக்கையுடன் வாங்குங்கள் • தெளிவுடன் விற்குங்கள்</span>
          <button
            type="button"
            className="mobile-lang-pill"
            onClick={toggleLanguage}
          >
            {lang === 'en' ? 'தமிழ்' : 'EN'}
          </button>
          <span className="quote-sparkle">✦</span>
        </div>
      </nav>

      <style>{`
        .lang-switcher-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(122, 0, 25, 0.35);
          border: 1px solid rgba(212, 175, 55, 0.4);
          border-radius: 20px;
          padding: 0.25rem 0.65rem;
          color: var(--color-gold-bright, #F9E79F);
          font-family: var(--font-sans, sans-serif);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
        }
        .lang-switcher-btn:hover {
          background: rgba(122, 0, 25, 0.65);
          border-color: var(--color-gold-bright, #F9E79F);
          transform: translateY(-1px);
        }
        .lang-globe-icon {
          color: var(--color-gold, #D4AF37);
        }
        .lang-active {
          color: var(--color-gold-bright, #FFF2B2);
          font-weight: 800;
          text-shadow: 0 0 6px rgba(249, 231, 159, 0.6);
        }
        .lang-dim {
          color: rgba(247, 231, 206, 0.5);
          font-weight: 500;
        }
        .lang-sep {
          color: rgba(212, 175, 55, 0.35);
        }
        .mobile-lang-pill {
          background: rgba(212, 175, 55, 0.2);
          border: 1px solid rgba(212, 175, 55, 0.4);
          color: #FFF2B2;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 0.1rem 0.45rem;
          border-radius: 12px;
          cursor: pointer;
          margin-left: 0.5rem;
        }
      `}</style>
    </header>
  );
}

