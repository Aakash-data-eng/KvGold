import React, { useRef, useEffect, useState } from 'react';
import { generateQRSVGPath } from '../utils/qrGenerator';
import { getVCardUrl } from '../config/vcardConfig';
import '../styles/qr-experience.css';

export default function KVGoldQRExperience() {
  const sectionRef = useRef(null);
  const interactionZoneRef = useRef(null);
  const characterHeadRef = useRef(null);
  const sequenceTimersRef = useRef([]);

  const [isVisible, setIsVisible] = useState(false);
  // Mascot States: 'IDLE' | 'NOTICE' | 'ENTERING' | 'LOOKING_AT_USER' | 'LOOKING_AT_QR' | 'POINTING' | 'HOLDING' | 'EXITING'
  const [mascotState, setMascotState] = useState('IDLE');
  const [vcardUrl, setVcardUrl] = useState('https://kvgold.in/visiting-card');

  useEffect(() => {
    setVcardUrl(getVCardUrl());

    const section = sectionRef.current;
    if (!section) return;

    let mobileSequencePlayed = false;

    // IntersectionObserver triggers section entrance & mobile auto-play once
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);

        // Mobile / Touch behavior: Play 1 short cinematic sequence when section enters viewport
        if (entry.isIntersecting && !mobileSequencePlayed && window.matchMedia('(max-width: 960px)').matches) {
          mobileSequencePlayed = true;
          triggerCinematicSequence(3500);
        }
      },
      { threshold: 0.25 }
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

  // Coordinated Mascot Entrance Storyboard
  const triggerCinematicSequence = (autoRetreatDelay = 0) => {
    clearSequenceTimers();

    // 1. 0ms: Visitor cursor enters QR zone -> NOTICE state (QR border glows, character notices)
    setMascotState('NOTICE');

    // 2. 200ms: Character begins physically stepping/moving into view from hidden right position
    sequenceTimersRef.current.push(
      setTimeout(() => setMascotState('ENTERING'), 200)
    );

    // 3. 600ms: Character arrives beside QR & turns face DIRECTLY to look at visitor/cursor (Eye contact!)
    sequenceTimersRef.current.push(
      setTimeout(() => setMascotState('LOOKING_AT_USER'), 600)
    );

    // 4. 1100ms: Character turns head toward the QR code ("Look here")
    sequenceTimersRef.current.push(
      setTimeout(() => setMascotState('LOOKING_AT_QR'), 1100)
    );

    // 5. 1500ms: Character raises hand pointing toward QR code + "SCAN THE QR" text reveals ABOVE QR
    sequenceTimersRef.current.push(
      setTimeout(() => setMascotState('POINTING'), 1500)
    );

    // 6. 1900ms: Mascot holds pose with subtle breathing animation
    sequenceTimersRef.current.push(
      setTimeout(() => {
        setMascotState('HOLDING');

        // Optional auto-retreat for mobile touches
        if (autoRetreatDelay > 0) {
          sequenceTimersRef.current.push(
            setTimeout(() => triggerRetreat(), autoRetreatDelay)
          );
        }
      }, 1900)
    );
  };

  // Smooth Character Exit Sequence
  const triggerRetreat = () => {
    clearSequenceTimers();
    // 1. Text disappears first, character steps backward to exit
    setMascotState('EXITING');

    // 2. 800ms: Completely hidden in IDLE state
    sequenceTimersRef.current.push(
      setTimeout(() => setMascotState('IDLE'), 800)
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
      triggerCinematicSequence(3500);
    }
  };

  // Subtle Eye/Head Tracking (Max 5-8 degrees rotation, active during HOLDING or LOOKING_AT_USER)
  const handlePointerMove = (e) => {
    if (!interactionZoneRef.current || !characterHeadRef.current) return;
    if (mascotState !== 'LOOKING_AT_USER' && mascotState !== 'HOLDING') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = interactionZoneRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;

    const headRotY = relativeX * 8; // -4 to +4 deg
    const headRotX = relativeY * -5; // -2.5 to +2.5 deg

    if (characterHeadRef.current) {
      characterHeadRef.current.style.transform = `rotateX(${headRotX}deg) rotateY(${headRotY}deg)`;
    }
  };

  // Generate SVG QR Matrix Path (STATIC, 100% SCANNABLE)
  const qrData = generateQRSVGPath(vcardUrl, 240);

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
                    THE MASCOT ACTOR (HIDDEN IN IDLE, ENTERS FROM RIGHT ON HOVER)
                    Full crown, face, green gems, upper body, and coin visible!
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
                    STATIC, NON-CLICKABLE SCANNABLE QR CODE CARD
                    ================================================================ */}
                <div className={`qr-card-frame ${isNoticeOrActive ? 'frame-active' : ''}`}>
                  {/* Sheen animation on frame when cursor notices */}
                  <div className="qr-frame-sheen" aria-hidden="true" />

                  {/* Gold Corner Accents */}
                  <div className="qr-corner top-l" />
                  <div className="qr-corner top-r" />
                  <div className="qr-corner bot-l" />
                  <div className="qr-corner bot-r" />

                  {/* Scannable QR Matrix SVG Box */}
                  <div className="qr-canvas-box">
                    <svg
                      className="qr-svg-matrix"
                      viewBox={`0 0 ${qrData.moduleCount * qrData.cellSize} ${qrData.moduleCount * qrData.cellSize}`}
                      role="img"
                      aria-label="KV GOLD digital visiting card QR code"
                    >
                      {/* Quiet Zone Burgundy Canvas */}
                      <rect width="100%" height="100%" fill="#160309" />

                      {/* Quiet Zone Golden Border */}
                      <rect
                        x="4"
                        y="4"
                        width={qrData.moduleCount * qrData.cellSize - 8}
                        height={qrData.moduleCount * qrData.cellSize - 8}
                        fill="none"
                        stroke="rgba(212, 175, 55, 0.35)"
                        strokeWidth="1.5"
                        rx="8"
                      />

                      {/* High Contrast Golden QR Path */}
                      <path d={qrData.pathD} fill="#F9E79F" />

                      {/* Central KV Crest Emblem */}
                      <g transform={`translate(${(qrData.moduleCount * qrData.cellSize)/2 - 16}, ${(qrData.moduleCount * qrData.cellSize)/2 - 16})`}>
                        <rect width="32" height="32" rx="8" fill="#1C040C" stroke="#D4AF37" strokeWidth="1.5" />
                        <text x="16" y="20" textAnchor="middle" fill="#F9E79F" fontSize="13" fontWeight="900" fontFamily="serif">
                          KV
                        </text>
                      </g>
                    </svg>
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

