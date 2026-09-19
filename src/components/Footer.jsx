import React, { useRef, useEffect, useState } from 'react';
import { Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import SocialFlipButton from './SocialFlipButton';
import '../styles/footer.css';

export default function Footer() {
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <footer className="footer-section" ref={footerRef} id="footer" aria-label="KV Gold Footer">
      {/* Ambient Lighting & Particles */}
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
                <span className="footer-brand-sub">HAUTE JOAILLERIE & SOVEREIGN WEALTH</span>
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
              <li><a href="#collection">GOLD COLLECTION</a></li>
              <li><a href="#why-kv-gold">WHY KV GOLD</a></li>
              <li><a href="#journey">JOURNEY OF GOLD</a></li>
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
                  <span className="locations-text">Chennai • Coimbatore • Madurai • Salem</span>
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

        {/* Premium Gold Divider with Traveling Light Sheen */}
        <div className="footer-gold-divider">
          <div className="divider-sheen-line" aria-hidden="true" />
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
