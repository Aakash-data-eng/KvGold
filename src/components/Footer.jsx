import React, { useRef, useEffect, useState } from 'react';
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import SocialFlipButton from './SocialFlipButton';
import '../styles/footer.css';

export default function Footer() {
  const footerRef = useRef(null);
  const ditherRef = useRef(null);
  const rectRef = useRef(null);
  const rafRef = useRef(null);
  const [isVisible, setIsVisible] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);

  // IntersectionObserver for subtle section reveal
  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    if (window.innerWidth <= 768) {
      setIsVisible(true);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.01, rootMargin: '100px 0px 100px 0px' }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Pointer spotlight interaction (Zero React re-renders, zero layout thrashing)
  const handlePointerEnter = () => {
    if (ditherRef.current) {
      rectRef.current = ditherRef.current.getBoundingClientRect();
    }
  };

  const handlePointerMove = (e) => {
    if (!rectRef.current || e.pointerType === 'touch') return;
    const x = e.clientX - rectRef.current.left;
    const y = e.clientY - rectRef.current.top;

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (ditherRef.current) {
          ditherRef.current.style.setProperty('--mouse-x', `${x}px`);
          ditherRef.current.style.setProperty('--mouse-y', `${y}px`);
          ditherRef.current.style.setProperty('--mouse-opacity', '1');
        }
      });
    }
  };

  const handlePointerLeave = () => {
    if (ditherRef.current) {
      ditherRef.current.style.setProperty('--mouse-opacity', '0');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (ditherRef.current) {
        rectRef.current = ditherRef.current.getBoundingClientRect();
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <footer className="footer-section" ref={footerRef} id="footer" aria-label="KV Gold Footer">
      {/* Ambient Lighting */}
      <div className="footer-ambient-glow center-glow" aria-hidden="true" />
      <div className="footer-ambient-glow top-glow" aria-hidden="true" />

      <div className="footer-wrapper">
        {/* Main 3-Area Editorial Grid */}
        <div className={`footer-main-grid ${isVisible ? 'is-revealed' : ''}`}>
          
          {/* AREA 1 — BRAND */}
          <div className="footer-area footer-area-brand">
            <a href="#hero" className="footer-brand-logo" aria-label="KV Gold Home">
              <div className="footer-crest-emblem">
                <span className="footer-monogram">KV</span>
              </div>
              <div className="footer-brand-text">
                <span className="footer-brand-name">KV GOLD</span>
                <span className="footer-brand-sub">TRUSTED SELLER • SOVEREIGN WEALTH</span>
              </div>
            </a>

            <p className="footer-brand-tagline">
              Trusted gold. Timeless value. Thoughtfully crafted.
            </p>

            <div className="footer-trust-pill">
              <ShieldCheck size={14} />
              <span>HALLMARKED GOLD • QUALITY & TRANSPARENCY</span>
            </div>
          </div>

          {/* AREA 2 — ESSENTIAL LINKS */}
          <div className="footer-area footer-area-links">
            <h4 className="footer-area-title">EXPLORE</h4>
            <ul className="footer-nav-list">
              <li><a href="#hero">HOME</a></li>
              <li><a href="#gold-collection">GOLD COLLECTION</a></li>
              <li><a href="#why-kv-gold">WHY KV GOLD</a></li>
              <li><a href="#journey-of-gold">JOURNEY OF GOLD</a></li>
              <li><a href="#founders">LEADERSHIP & VISION</a></li>
              <li><a href="#testimonials">CUSTOMER REVIEWS</a></li>
            </ul>
          </div>

          {/* AREA 3 — CONNECT / CONTACT */}
          <div className="footer-area footer-area-contact">
            <h4 className="footer-area-title">CONNECT</h4>
            <ul className="footer-contact-list">
              <li className="contact-item">
                <Phone size={15} className="contact-icon" />
                <a href="tel:9894352616" className="contact-link">+91 98943 52616</a>
              </li>
              <li className="contact-item">
                <Mail size={15} className="contact-icon" />
                <a href="mailto:info@kvgold.in" className="contact-link">info@kvgold.in</a>
              </li>
              <li className="contact-item locations-item">
                <MapPin size={15} className="contact-icon" />
                <div className="locations-block">
                  <span className="locations-text">Coimbatore</span>
                  <span className="delivery-badge">Delivery Available Across Tamil Nadu</span>
                </div>
              </li>
            </ul>

            {/* Compact Social Media Flip Buttons inside CONNECT Column */}
            <div className="footer-connect-social">
              <SocialFlipButton />
            </div>
          </div>

        </div>

        {/* Premium Gold Divider with Sheen Line */}
        <div className="footer-gold-divider">
          <div className="divider-sheen-line" aria-hidden="true" />
        </div>

        {/* ================================================================
            DITHERED CINEMATIC BRAND SIGNATURE SECTION
            Negative-Space Brand Wordmark formed by a drifting metallic gold dot field
            ================================================================ */}
        <div
          className={`footer-dither-stage ${isVisible ? 'is-revealed' : ''}`}
          ref={ditherRef}
          onPointerEnter={handlePointerEnter}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          aria-label="KV Gold Brand Signature"
        >
          {/* Interactive Gold Pointer Spotlight Overlay */}
          <div className="dither-pointer-spotlight" aria-hidden="true" />

          {/* Ambient Warm Gold Radial Bloom */}
          <div className="dither-ambient-bloom" aria-hidden="true" />

          {/* Dithered Metallic Gold Dot Field Layer with Seamless Leftward Drift */}
          <div className="dither-dot-field" aria-hidden="true" />

          {/* SVG Negative Space Cutout for KV GOLD Wordmark */}
          <div className="dither-wordmark-container">
            <svg
              className="dither-wordmark-svg"
              viewBox="0 0 1000 240"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="KV GOLD"
            >
              <defs>
                {/* SVG Cutout Mask: Dot Field passes through white mask; Black text cuts out negative space */}
                <mask id="kvGoldWordmarkMask">
                  <rect width="100%" height="100%" fill="white" />
                  <text
                    x="50%"
                    y="54%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fontFamily="'Cinzel', 'Cormorant Garamond', 'Playfair Display', serif"
                    fontWeight="900"
                    fontSize="145"
                    letterSpacing="18"
                    fill="black"
                  >
                    KV GOLD
                  </text>
                </mask>

                {/* Subdued Gold Rim Gradient */}
                <linearGradient id="goldRimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2B2" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#8A641E" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Masked Dark Overlay creating negative space cutout for letters */}
              <rect
                width="100%"
                height="100%"
                fill="#080306"
                mask="url(#kvGoldWordmarkMask)"
              />

              {/* Subdued Gold Outline Rim */}
              <text
                x="50%"
                y="54%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontFamily="'Cinzel', 'Cormorant Garamond', 'Playfair Display', serif"
                fontWeight="900"
                fontSize="145"
                letterSpacing="18"
                fill="none"
                stroke="url(#goldRimGradient)"
                strokeWidth="1.2"
                opacity="0.65"
              >
                KV GOLD
              </text>
            </svg>

            {/* Subtitle Tagline */}
            <div className="dither-tagline">
              <span className="dither-tagline-text">
                TRUSTED SELLER • SOVEREIGN WEALTH
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Minimal Copyright Area */}
        <div className="footer-bottom-row">
          <div className="footer-copyright-text">
            © {new Date().getFullYear()} KV GOLD. All Rights Reserved.
          </div>
          <div className="footer-bottom-tag">
            CRAFTED FOR GENERATIONS
          </div>
        </div>
      </div>
    </footer>
  );
}
