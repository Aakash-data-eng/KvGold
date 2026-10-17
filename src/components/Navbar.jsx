import React, { useState, useEffect, useRef } from 'react';
import GoldPriceTicker from './GoldPriceTicker';
import '../styles/navbar.css';

export default function Navbar({ onOpenSchemeModal }) {
  const [scrolled, setScrolled] = useState(false);
  const navWrapperRef = useRef(null);
  const bannerVideoRef = useRef(null);

  // Measure and set --header-height CSS variable dynamically
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (navWrapperRef.current) {
        const height = navWrapperRef.current.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };

    updateHeaderHeight();

    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined' && navWrapperRef.current) {
      resizeObserver = new ResizeObserver(updateHeaderHeight);
      resizeObserver.observe(navWrapperRef.current);
    }

    window.addEventListener('resize', updateHeaderHeight, { passive: true });
    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, [scrolled]);

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

  // Guarantee background video playback & respect reduced motion
  useEffect(() => {
    const video = bannerVideoRef.current;
    if (!video) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, []);

  return (
    <header className="nav-wrapper" ref={navWrapperRef}>
      {/* Real Dynamic Gold & Silver Market Price Ticker */}
      <GoldPriceTicker />

      <nav className={`main-navbar ${scrolled ? 'nav-scrolled' : ''}`}>
        {/* Layer 2: Full-width cinematic background video */}
        <div className="nav-video-bg-wrap" aria-hidden="true">
          <video
            ref={bannerVideoRef}
            src="/videos/kv-gold-banner-background.mp4"
            className="nav-video-bg kv-gold-banner__video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            controls={false}
          />
        </div>

        {/* Layer 3: Subtle contrast overlay */}
        <div className="nav-contrast-overlay" aria-hidden="true" />

        {/* Layer 4: Original Banner Content (Layered Strictly Above Background Layers) */}
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

          {/* Right Wing: Heritage Quote */}
          <div className="nav-quote-wing nav-quote-right">
            <div className="quote-text-group quote-text-right">
              <span className="quote-tamil-primary">நம்பிக்கையான விற்பனையாளர்</span>
              <span className="quote-tamil-secondary">வாங்குதல் • விற்பனை • மதிப்பீடு</span>
            </div>
            <span className="quote-sparkle" aria-hidden="true">✦</span>
          </div>
        </div>

        {/* Mobile Sub-bar with Tamil Heritage Quote */}
        <div className="mobile-tamil-quote-bar">
          <span className="quote-sparkle">✦</span>
          <span>நம்பிக்கையுடன் வாங்குங்கள் • தெளிவுடன் விற்குங்கள்</span>
          <span className="quote-sparkle">✦</span>
        </div>
      </nav>
    </header>
  );
}
