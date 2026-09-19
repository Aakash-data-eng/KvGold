import React, { useState, useEffect } from 'react';
import '../styles/navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="nav-wrapper">
      <nav className={`main-navbar ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="container navbar-centered-layout">
          {/* Left Wing: Authentic Royal Tamil Gold Quote */}
          <div className="nav-quote-wing nav-quote-left">
            <span className="quote-sparkle" aria-hidden="true">✦</span>
            <div className="quote-text-group">
              <span className="quote-tamil-primary">காலம் வென்ற தூய பொன்</span>
              <span className="quote-tamil-secondary">தலைமுறை காக்கும் பெருமை • 916 ஹால்மார்க்</span>
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
              <span className="brand-tagline">Haute Joaillerie & Sovereign Wealth</span>
            </div>
          </a>

          {/* Right Wing: Authentic Royal Tamil Gold Quote */}
          <div className="nav-quote-wing nav-quote-right">
            <div className="quote-text-group quote-text-right">
              <span className="quote-tamil-primary">நிலைத்த செல்வம் • மங்கல ஒளி</span>
              <span className="quote-tamil-secondary">இறையாண்மை தரம் • குறையாத மதிப்பு</span>
            </div>
            <span className="quote-sparkle" aria-hidden="true">✦</span>
          </div>
        </div>

        {/* Mobile Sub-bar with Tamil Heritage Quote */}
        <div className="mobile-tamil-quote-bar">
          <span className="quote-sparkle">✦</span>
          <span>காலம் வென்ற தூய பொன் • தலைமுறை காக்கும் செல்வம்</span>
          <span className="quote-sparkle">✦</span>
        </div>
      </nav>
    </header>
  );
}
