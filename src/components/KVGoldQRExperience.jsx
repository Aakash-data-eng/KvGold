import React, { useRef, useEffect, useState } from 'react';
import '../styles/qr-experience.css';

export default function KVGoldQRExperience() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.innerWidth <= 768) {
      setIsVisible(true);
    }

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Trigger section entrance on scroll and control mascot playback
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!isReducedMotion && videoRef.current && videoRef.current.paused) {
            videoRef.current.play().catch(() => {});
          }
        } else {
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.08, rootMargin: '120px 0px 120px 0px' }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  return (
    <section
      className="qr-experience-section"
      id="qr-experience"
      ref={sectionRef}
      aria-label="KV Gold Digital Business Card Experience"
    >
      {/* Ambient Burgundy & Gold Atmosphere */}
      <div className="qr-ambient-glow center-glow" aria-hidden="true" />
      <div className="qr-ambient-glow right-glow" aria-hidden="true" />

      {/* Floating Gold Dust Particles */}
      <div className="qr-particles-layer" aria-hidden="true">
        <span className="qr-particle qp1" />
        <span className="qr-particle qp2" />
        <span className="qr-particle qp3" />
        <span className="qr-particle qp4" />
      </div>

      <div className="qr-wrapper">
        <div className={`qr-main-container ${isVisible ? 'is-revealed' : ''}`}>

          {/* LEFT COLUMN: Editorial Business Invitation */}
          <div className="qr-text-col">
            <div className="qr-eyebrow">
              <span className="eyebrow-spark">✦</span>
              <span>A LITTLE MORE FROM KV GOLD • KV GOLD-ஐ இன்னும் நெருக்கமாக அறியுங்கள்</span>
              <span className="eyebrow-spark">✦</span>
            </div>

            <h2 className="qr-main-title">MEET KV GOLD,<br />BEYOND THE SCREEN</h2>
            <h3 className="qr-main-title-ta">உங்கள் மொபைலில் KV GOLD-ஐ சேமித்துக்கொள்ளுங்கள்</h3>

            <p className="qr-support-desc">
              Scan to access our digital visiting card, contact details, services and more.
            </p>
            <p className="qr-support-desc-ta">
              QR-ஐ scan செய்து எங்கள் digital visiting card, தொடர்பு விவரங்கள், சேவைகள் மற்றும் மேலும் பல தகவல்களை ஒரே இடத்தில் தெரிந்துகொள்ளுங்கள்.
            </p>
          </div>

          {/* RIGHT COLUMN: DEDICATED MASCOT HIDE-AND-SEEK QR STAGE */}
          <div className="qr-stage-col">

            {/* "SCAN THE QR" CALLOUT BANNER ABOVE STAGE */}
            <div className="scan-qr-delight-text text-visible" aria-hidden="true">
              <span className="delight-en">✦ SCAN THE QR ✦</span>
              <span className="delight-ta">ஸ்கேன் செய்யுங்கள்</span>
            </div>

            {/* DEDICATED HIDE-AND-SEEK STAGE CONTAINER */}
            <div className="qr-stage-inner">

              {/* Layer 2: Hide-and-Seek Animated Mascot Video (Behind QR Image) */}
              <div className="qr-mascot-video-wrap" aria-hidden="true">
                <video
                  ref={videoRef}
                  src="/videos/kv-gold-qr-mascot.mp4"
                  poster="/videos/kv-gold-qr-mascot-poster.jpg"
                  className="qr-mascot-video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  disablePictureInPicture
                  controls={false}
                />
              </div>

              {/* Layer 4: Exact Static Foreground Scannable QR Code */}
              <div className="qr-card-foreground">
                <img
                  src="/images/kvgold-qr-exact.png"
                  alt="KV GOLD digital visiting card QR code"
                  className="official-qr-image"
                  draggable={false}
                  loading="eager"
                />
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
