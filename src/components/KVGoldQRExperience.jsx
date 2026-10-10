import React, { useRef, useEffect, useState } from 'react';
import { generateScannableQRSVG } from '../utils/qrGenerator';
import { getVCardUrl } from '../config/vcardConfig';
import '../styles/qr-experience.css';

export default function KVGoldQRExperience() {
  const sectionRef = useRef(null);
  const interactionZoneRef = useRef(null);
  const characterHeadRef = useRef(null);
  const sequenceTimersRef = useRef([]);

  const [isVisible, setIsVisible] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);
  // Mascot States: 'IDLE' | 'NOTICE' | 'ENTERING' | 'LOOKING_AT_USER' | 'LOOKING_AT_QR' | 'POINTING' | 'HOLDING' | 'EXITING'
  const [mascotState, setMascotState] = useState('IDLE');
  const [vcardUrl, setVcardUrl] = useState('https://kvgold.in/visiting-card');
  const [qrSvgHtml, setQrSvgHtml] = useState('');

  useEffect(() => {
    const url = getVCardUrl();
    setVcardUrl(url);

    // Generate standard 100% scannable QR Code SVG
    generateScannableQRSVG(url).then((svg) => {
      if (svg) setQrSvgHtml(svg);
    });

    const section = sectionRef.current;
    if (!section) return;

    if (window.innerWidth <= 768) {
      setIsVisible(true);
    }

    let mobileSequencePlayed = false;

    // IntersectionObserver triggers section entrance & mobile auto-play once
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Mobile / Touch behavior: Play 1 short cinematic sequence when section enters viewport
          if (!mobileSequencePlayed && window.matchMedia('(max-width: 960px)').matches) {
            mobileSequencePlayed = true;
            triggerCinematicSequence(3800);
          }
        }
      },
      { threshold: 0.01, rootMargin: '100px 0px 100px 0px' }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      clearSequenceTimers();
    };
  }, []);

  const clearSequenceTimers = () => {
    sequenceTimersRef.current.forEach((t) => clearTimeout(t));
    sequenceTimersRef.current = [];
  };

  // Coordinated Mascot Entrance Storyboard (Emerging from BEHIND the QR Card)
  const triggerCinematicSequence = (autoRetreatDelay = 0) => {
    clearSequenceTimers();

    // 1. 0ms: Visitor cursor enters QR zone -> NOTICE state
    setMascotState('NOTICE');

    // 2. 150ms: Character begins physically stepping/peeking out from BEHIND the QR Card
    sequenceTimersRef.current.push(
      setTimeout(() => setMascotState('ENTERING'), 150)
    );

    // 3. 550ms: Character arrives beside QR & turns face DIRECTLY to look at visitor/cursor (Eye contact!)
    sequenceTimersRef.current.push(
      setTimeout(() => setMascotState('LOOKING_AT_USER'), 550)
    );

    // 4. 1000ms: Character turns gaze toward the QR code ("Look here")
    sequenceTimersRef.current.push(
      setTimeout(() => setMascotState('LOOKING_AT_QR'), 1000)
    );

    // 5. 1400ms: Character raises hand pointing toward QR code + "SCAN THE QR" text reveals ABOVE QR
    sequenceTimersRef.current.push(
      setTimeout(() => setMascotState('POINTING'), 1400)
    );

    // 6. 1800ms: Mascot holds pose with subtle breathing animation
    sequenceTimersRef.current.push(
      setTimeout(() => {
        setMascotState('HOLDING');

        // Optional auto-retreat for mobile touches
        if (autoRetreatDelay > 0) {
          sequenceTimersRef.current.push(
            setTimeout(() => triggerRetreat(), autoRetreatDelay)
          );
        }
      }, 1800)
    );
  };

  // Smooth Character Exit Sequence (Retreating BEHIND the QR Card)
  const triggerRetreat = () => {
    clearSequenceTimers();
    // 1. Text disappears first, character steps backward behind QR card
    setMascotState('EXITING');

    // 2. 750ms: Completely hidden behind QR in IDLE state
    sequenceTimersRef.current.push(
      setTimeout(() => setMascotState('IDLE'), 750)
    );
  };

  // Pointer Handlers (ON DEDICATED QR HOVER ZONE ONLY)
  const handleMouseEnter = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    triggerCinematicSequence(0);
  };

  const handleMouseLeave = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    triggerRetreat();
  };

  // Mobile Tap Replay (QR code itself remains 100% non-clickable)
  const handleMobileZoneTap = () => {
    if (window.matchMedia('(max-width: 960px)').matches) {
      triggerCinematicSequence(3800);
    }
  };

  // Subtle Eye/Head Tracking (Max 5 degrees, active during HOLDING or LOOKING_AT_USER)
  const handlePointerMove = (e) => {
    if (!interactionZoneRef.current || !characterHeadRef.current) return;
    if (mascotState !== 'LOOKING_AT_USER' && mascotState !== 'HOLDING') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = interactionZoneRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

    const headRotY = relativeX * 6; // -3 to +3 deg
    const headRotX = relativeY * -4; // -2 to +2 deg

    if (characterHeadRef.current) {
      characterHeadRef.current.style.transform = `rotateX(${headRotX}deg) rotateY(${headRotY}deg)`;
    }
  };

  const isNoticeOrActive = mascotState !== 'IDLE' && mascotState !== 'EXITING';
  const showScanText = mascotState === 'POINTING' || mascotState === 'HOLDING';

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

          {/* RIGHT COLUMN: DEDICATED QR STAGE + 3D MASCOT ACTOR */}
          <div className="qr-stage-col">

            {/* DEDICATED HOVER / TOUCH INTERACTION ZONE */}
            <div
              className="qr-interaction-zone"
              ref={interactionZoneRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handlePointerMove}
              onClick={handleMobileZoneTap}
            >

              {/* ================================================================
                  "SCAN THE QR" TYPOGRAPHY CALLOUT (POSITIONED STRICTLY ABOVE QR)
                  Appears ONLY after Mascot arrives and points to the QR code!
                  ================================================================ */}
              <div className={`scan-qr-delight-text ${showScanText ? 'text-visible' : ''}`} aria-hidden="true">
                <span className="delight-en">✦ SCAN THE QR ✦</span>
                <span className="delight-ta">ஸ்கேன் செய்யுங்கள்</span>
              </div>

              <div className="qr-stage-inner">

                {/* ================================================================
                    BEHIND-THE-QR MASCOT ACTOR (LAYERED BEHIND QR CARD FRAME)
                    Renders at z-index: 2 (behind qr-card-frame z-index: 10)
                    Initial State: Hidden directly behind the QR card frame!
                    Active State: Peeks out from BEHIND the right edge of the card.
                    ================================================================ */}
                <div
                  className={`qr-gold-mascot mascot-state-${mascotState.toLowerCase()}`}
                  aria-hidden="true"
                >
                  <div className="mascot-head-container" ref={characterHeadRef}>
                    <img
                      src="/mascot/gold-mascot-clean.png"
                      alt="KV Gold Interactive Mascot Character"
                      className="mascot-img-render"
                      draggable={false}
                    />
                  </div>
                </div>

                {/* ================================================================
                    STATIC, NON-CLICKABLE 100% SCANNABLE QR CODE CARD
                    Renders at z-index: 10 (ABOVE character layer)
                    ================================================================ */}
                <div className={`qr-card-frame ${isNoticeOrActive ? 'frame-active' : ''}`}>
                  {/* Subtle golden sheen on frame edge when cursor notices */}
                  <div className="qr-frame-sheen" aria-hidden="true" />

                  {/* Gold Corner Accents */}
                  <div className="qr-corner top-l" />
                  <div className="qr-corner top-r" />
                  <div className="qr-corner bot-l" />
                  <div className="qr-corner bot-r" />

                  {/* High Contrast Scannable White QR Box displaying User Provided Official QR Image */}
                  <div className="qr-canvas-box">
                    <img
                      src="/kvgold-qr-official.png"
                      alt="KV GOLD Digital Visiting Card Official QR Code"
                      className="official-qr-image"
                      draggable={false}
                    />
                  </div>

                  {/* Sparkle Accent */}
                  <div className="qr-sparkle-star" aria-hidden="true">
                    ✦
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


