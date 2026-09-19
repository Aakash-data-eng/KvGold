import React, { useRef, useEffect, useState } from 'react';
import '../styles/journey.css';

const MILESTONES = [
  {
    year: '2005',
    price: '₹7,000',
    unit: '22K / Per Sovereign',
    tamilNote: 'தொடக்கக் காலம் • அடிப்படை மதிப்பு',
    growth: 'தொடக்க மதிப்பு',
    side: 'left',
  },
  {
    year: '2010',
    price: '₹18,500',
    unit: '22K / Per Sovereign',
    tamilNote: '5 ஆண்டுகளில் அசுர வளர்ச்சி',
    growth: '+164% வளர்ச்சி',
    side: 'right',
  },
  {
    year: '2015',
    price: '₹26,343',
    unit: '22K / Per Sovereign',
    tamilNote: 'நம்பிக்கையான தொடர் முதலீடு',
    growth: '+42% தொடர் வளர்ச்சி',
    side: 'left',
  },
  {
    year: '2020',
    price: '₹48,651',
    unit: '22K / Per Sovereign',
    tamilNote: 'பாதுகாப்பின் நிலையான சிகரம்',
    growth: '+85% நம்பகத்தன்மை',
    side: 'right',
  },
  {
    year: '2025',
    price: '₹99,000',
    unit: '22K / Per Sovereign',
    tamilNote: 'வரலாற்று நவீன மைல்கல்',
    growth: '+103% அசுர சாதனை',
    side: 'left',
  },
  {
    year: '2026',
    price: '₹1,21,600',
    unit: '22K / Per Sovereign',
    tamilNote: 'வரலாற்று உச்சம் • 17x பெருமை',
    growth: '17x வரலாற்றுப் பெருமை',
    side: 'right',
    isFinal: true,
  },
];

export default function JourneyOfGold({ onOpenSchemeModal }) {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const svgLaserRef = useRef(null);
  const rowRefs = useRef([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  });

  // Track responsive breakpoint
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll storytelling logic
  useEffect(() => {
    const timeline = timelineRef.current;
    const svgLaser = svgLaserRef.current;
    if (!timeline) return;

    let pathLength = 1000;
    if (svgLaser && svgLaser.getTotalLength) {
      pathLength = svgLaser.getTotalLength();
      svgLaser.style.strokeDasharray = `${pathLength} ${pathLength}`;
      svgLaser.style.strokeDashoffset = `${pathLength}`;
    }

    let rafId = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        const viewportCenter = window.innerHeight * 0.52;

        // 1. Calculate closest active row
        let closestIdx = 0;
        let minDistance = Infinity;

        rowRefs.current.forEach((row, idx) => {
          if (!row) return;
          const rect = row.getBoundingClientRect();
          const rowCenter = rect.top + rect.height / 2;
          const dist = Math.abs(rowCenter - viewportCenter);

          // Bias slightly towards reached items
          if (rowCenter <= viewportCenter + 120 && dist < minDistance) {
            minDistance = dist;
            closestIdx = idx;
          }
        });

        setActiveIndex(closestIdx);

        // 2. Animate central SVG laser path down to active row
        if (svgLaser) {
          const timelineRect = timeline.getBoundingClientRect();
          const timelineTop = timelineRect.top;
          const timelineHeight = timelineRect.height;
          
          if (timelineHeight > 0) {
            const scrolledWithin = viewportCenter - timelineTop;
            const progress = Math.min(Math.max(scrolledWithin / timelineHeight, 0), 1);
            const drawLength = pathLength * (1 - progress);
            svgLaser.style.strokeDashoffset = `${drawLength}`;
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      className="journey-section"
      id="journey-of-gold"
      ref={sectionRef}
      aria-label="Journey of Gold Historical Timeline"
    >
      {/* Background Ambience */}
      <div className="journey-ambient-glow" aria-hidden="true" />
      <div className="journey-ambient-orb" aria-hidden="true" />

      <div className="journey-wrapper">
        {/* Section Header */}
        <div className="journey-header">
          <div className="journey-header-dot" aria-hidden="true" />
          <h2 className="journey-title">Journey of Gold</h2>
          <p className="journey-subtitle">
            தங்கத்தின் விலை வரலாற்றுப் பயணம் • Tracing the Timeless Value of Sovereign Wealth
          </p>
        </div>

        {/* Structured Timeline Container */}
        <div className="journey-timeline" ref={timelineRef}>
          {/* Central Vertical Winding Gold Spine (Desktop / Tablet) */}
          <div className="journey-spine-track" aria-hidden="true">
            <svg
              className="journey-spine-svg"
              viewBox="0 0 40 1000"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="laserGoldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2B2" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#FFEAA7" />
                </linearGradient>
                <filter id="spineGoldGlow" x="-50%" y="-20%" width="200%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Passive Background Winding Track */}
              <path
                d="M 20,0 Q 12,80 20,165 Q 28,250 20,335 Q 12,500 20,665 Q 28,830 20,1000"
                className="journey-spine-base-path"
              />

              {/* Active Scroll-Driven Glowing Laser Path */}
              <path
                ref={svgLaserRef}
                d="M 20,0 Q 12,80 20,165 Q 28,250 20,335 Q 12,500 20,665 Q 28,830 20,1000"
                className="journey-spine-laser-path"
                filter="url(#spineGoldGlow)"
              />
            </svg>
          </div>

          {/* 6 Discrete Milestone Rows */}
          {MILESTONES.map((item, idx) => {
            const isCurrent = idx === activeIndex;
            const isPast = idx < activeIndex;

            const stateClass = isCurrent
              ? 'is-active'
              : isPast
              ? 'is-past'
              : 'is-upcoming';

            return (
              <div
                key={item.year}
                ref={(el) => (rowRefs.current[idx] = el)}
                className={`journey-row journey-row-${item.side} ${stateClass}`}
              >
                {/* Left Column (Desktop) */}
                <div className="journey-col journey-col-left">
                  {!isMobile && item.side === 'left' && (
                    <MilestoneCard item={item} isCurrent={isCurrent} />
                  )}
                </div>

                {/* Center Node Column */}
                <div className="journey-col journey-col-node">
                  <div className="journey-node-anchor">
                    <div
                      className={`journey-node ${
                        idx <= activeIndex ? 'is-lit' : ''
                      } ${isCurrent ? 'is-pulse' : ''}`}
                    >
                      <span className="journey-node-inner" />
                    </div>

                    {/* Connector line bridging node to card */}
                    <div
                      className={`journey-connector connector-${
                        isMobile ? 'right' : item.side
                      } ${idx <= activeIndex ? 'connector-lit' : ''}`}
                    />
                  </div>
                </div>

                {/* Right Column (Desktop or Mobile) */}
                <div className="journey-col journey-col-right">
                  {/* On desktop, show when side is right. On mobile, show ALL cards here */}
                  {(isMobile || item.side === 'right') && (
                    <MilestoneCard item={item} isCurrent={isCurrent} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Reusable Discrete Milestone Card
function MilestoneCard({ item, isCurrent }) {
  return (
    <div
      className={`journey-card ${item.isFinal ? 'journey-card-final' : ''} ${
        isCurrent ? 'card-glow' : ''
      }`}
    >
      {/* 3D Realistic Gold Bullion Visual */}
      <div className="journey-card-visual">
        <img
          src="/gold-bars.jpg"
          alt={`KV Gold ${item.year} Bullion`}
          className="journey-card-img"
          loading="lazy"
        />
        <span className="journey-card-sparkle" aria-hidden="true" />
      </div>

      {/* Card Content & Details */}
      <div className="journey-card-details">
        <div className="journey-card-topline">
          <span className="journey-card-year">YEAR {item.year}</span>
          <span className="journey-card-badge">{item.growth}</span>
        </div>

        <div className="journey-card-price">{item.price}</div>
        <div className="journey-card-unit">{item.unit}</div>
        <div className="journey-card-note">{item.tamilNote}</div>
      </div>
    </div>
  );
}
