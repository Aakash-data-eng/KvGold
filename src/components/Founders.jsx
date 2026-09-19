import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, Shield, Award, ArrowRight } from 'lucide-react';
import '../styles/founders.css';

export default function Founders({ onOpenSchemeModal }) {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasShimmered, setHasShimmered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let rafId;

    const updateScrollProgress = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress (0 when section top enters viewport, 1 when middle is in view)
      const totalDistance = windowHeight + rect.height;
      const currentPos = windowHeight - rect.top;
      const rawProgress = currentPos / totalDistance;
      const clampedProgress = Math.min(1, Math.max(0, rawProgress * 1.4));

      setScrollProgress(clampedProgress);

      if (clampedProgress > 0.45 && !hasShimmered) {
        setHasShimmered(true);
      }
    };

    const handleScroll = () => {
      rafId = requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [hasShimmered]);

  return (
    <section
      className="founders-section"
      id="founders"
      ref={sectionRef}
      aria-label="Leadership - The People Behind KV Gold"
      style={{
        '--scroll-p': scrollProgress,
      }}
    >
      {/* Ambient Floating Gold Particles */}
      <div className="founders-particles-layer" aria-hidden="true">
        <span className="gold-particle p1" />
        <span className="gold-particle p2" />
        <span className="gold-particle p3" />
        <span className="gold-particle p4" />
        <span className="gold-particle p5" />
        <span className="gold-particle p6" />
      </div>

      {/* Ambient Radial Glows */}
      <div
        className="founders-ambient-glow center-glow"
        aria-hidden="true"
        style={{
          transform: `translate(-50%, -50%) scale(${0.75 + scrollProgress * 0.45})`,
          opacity: Math.min(1, scrollProgress * 1.5),
        }}
      />
      <div className="founders-ambient-glow left-glow" aria-hidden="true" />
      <div className="founders-ambient-glow right-glow" aria-hidden="true" />

      <div className="founders-wrapper">
        {/* Section Header */}
        <div
          className="founders-header"
          style={{
            opacity: Math.min(1, scrollProgress * 2.2),
            transform: `translateY(${(1 - Math.min(1, scrollProgress * 2)) * -25}px)`,
          }}
        >
          <div className="founders-badge">
            <Sparkles size={14} />
            <span>LEADERSHIP & VISION</span>
          </div>

          <h2 className="founders-main-title">THE PEOPLE BEHIND KV GOLD</h2>
          <p className="founders-subtitle">
            Founded in 2024 • Built with Vision, Trust & Craftsmanship
          </p>
        </div>

        {/* ================================================================
            SCROLL-DRIVEN COMPOSITION TRANSFORMATION:
            1. TOP: KV GOLD BRAND ANCHOR (PHYSICALLY RISES UPWARD ON SCROLL)
            2. BOTTOM: THE TWO FOUNDERS (MOVE INWARD & SUBTLY SHRINK)
            ================================================================ */}
        <div className="founders-composition-container">
          
          {/* TOP CENTER BRANDING ANCHOR: PHYSICALLY RISES UPWARD DURING SCROLL */}
          <div className="center-heritage-bridge">
            <div className="center-crest-glow" aria-hidden="true" />

            {/* Monogram Emblem */}
            <div className="center-crest-emblem">
              <div className="center-emblem-ring">
                <span className="center-emblem-monogram">KV</span>
              </div>
              <div className="center-emblem-spark" aria-hidden="true">✦</div>
            </div>

            {/* Brand Title & Metallic Shimmer */}
            <div className="center-brand-content">
              <h3 className={`center-brand-title ${hasShimmered ? 'shimmer-active' : ''}`}>
                KV GOLD
              </h3>
              <p className="center-brand-sub">HAUTE JOAILLERIE & SOVEREIGN WEALTH</p>
              <div className="center-divider-gold">
                <span className="center-line" />
                <span className="center-dot" />
                <span className="center-line" />
              </div>
              <div className="center-est-badge">
                <span>EST. 2024</span>
              </div>
            </div>
          </div>

          {/* TWO FOUNDERS ROW: MOVES INWARD TOWARD CENTER BELOW THE BRANDING */}
          <div className={`founders-duo-row ${scrollProgress > 0.18 ? 'is-revealed' : ''}`}>
            
            {/* LEFT: OWNER / FOUNDER */}
            <div className="founder-col founder-col-owner">
              <div className="founder-card-frame">
                {/* Portrait Frame */}
                <div className="founder-portrait-box">
                  <img
                    src="/founders/founder.jpg"
                    alt="KV Gold Owner and Founder"
                    className="founder-portrait-img"
                    loading="lazy"
                  />
                  <div className="founder-portrait-vignette" aria-hidden="true" />
                  <div className="founder-portrait-rim" aria-hidden="true" />
                </div>

                {/* Founder Editorial Meta */}
                <div
                  className="founder-meta"
                  style={{
                    opacity: Math.min(1, Math.max(0, (scrollProgress - 0.25) * 2.5)),
                    transform: `translateY(${(1 - Math.min(1, Math.max(0, (scrollProgress - 0.25) * 2.5))) * 20}px)`,
                  }}
                >
                  <div className="founder-role-tag">
                    <span className="founder-tag-dot" />
                    <span className="founder-role-title">OWNER / FOUNDER</span>
                  </div>

                  <h3 className="founder-name">தலைமை இயக்குநர் • Founder</h3>

                  <p className="founder-bio">
                    Driving the vision behind KV GOLD with a focus on trust, craftsmanship and a timeless approach to gold.
                  </p>

                  <p className="founder-bio-tamil">
                    நம்பிக்கை, நேர்த்தி மற்றும் காலம் கடந்த தங்க மதிப்பீட்டின் உறுதியான அடித்தளத்தில் KV GOLD-ஐ வழிநடத்துகிறார்.
                  </p>

                  <div className="founder-divider-line" aria-hidden="true" />

                  {/* 3 Principles */}
                  <div className="founder-principles-list">
                    <div className="principle-item">
                      <span className="principle-spark">✦</span>
                      <span className="principle-text">TRUST</span>
                    </div>
                    <div className="principle-item">
                      <span className="principle-spark">✦</span>
                      <span className="principle-text">CRAFTSMANSHIP</span>
                    </div>
                    <div className="principle-item">
                      <span className="principle-spark">✦</span>
                      <span className="principle-text">VISION</span>
                    </div>
                  </div>

                  <div className="founder-pillar-tag">
                    <Shield size={14} />
                    <span>Pillar of Trust & Integrity</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: CO-FOUNDER */}
            <div className="founder-col founder-col-cofounder">
              <div className="founder-card-frame">
                {/* Portrait Frame */}
                <div className="founder-portrait-box">
                  <img
                    src="/founders/co-founder.jpg"
                    alt="KV Gold Co-Founder"
                    className="founder-portrait-img"
                    loading="lazy"
                  />
                  <div className="founder-portrait-vignette" aria-hidden="true" />
                  <div className="founder-portrait-rim" aria-hidden="true" />
                </div>

                {/* Co-Founder Editorial Meta */}
                <div
                  className="founder-meta"
                  style={{
                    opacity: Math.min(1, Math.max(0, (scrollProgress - 0.25) * 2.5)),
                    transform: `translateY(${(1 - Math.min(1, Math.max(0, (scrollProgress - 0.25) * 2.5))) * 20}px)`,
                  }}
                >
                  <div className="founder-role-tag">
                    <span className="founder-tag-dot" />
                    <span className="founder-role-title">CO-FOUNDER</span>
                  </div>

                  <h3 className="founder-name">இணை நிறுவனர் • Co-Founder</h3>

                  <p className="founder-bio">
                    Helping shape the brand's journey through thoughtful growth, modern presentation and customer-focused values.
                  </p>

                  <p className="founder-bio-tamil">
                    வாடிக்கையாளர் நம்பிக்கை, நிலையான வளர்ச்சி மற்றும் நவீன வடிவமைப்புடன் KV GOLD-ன் பயணத்தை முன்னெடுத்துச் செல்கிறார்.
                  </p>

                  <div className="founder-divider-line" aria-hidden="true" />

                  {/* 3 Principles */}
                  <div className="founder-principles-list">
                    <div className="principle-item">
                      <span className="principle-spark">✦</span>
                      <span className="principle-text">INNOVATION</span>
                    </div>
                    <div className="principle-item">
                      <span className="principle-spark">✦</span>
                      <span className="principle-text">GROWTH</span>
                    </div>
                    <div className="principle-item">
                      <span className="principle-spark">✦</span>
                      <span className="principle-text">CUSTOMER FOCUS</span>
                    </div>
                  </div>

                  <div className="founder-pillar-tag">
                    <Award size={14} />
                    <span>Strategic Growth & Innovation</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Section Closing Heritage Statement */}
        <div
          className="founders-closing-bar"
          style={{
            opacity: Math.min(1, Math.max(0, (scrollProgress - 0.45) * 2)),
            transform: `translateY(${(1 - Math.min(1, Math.max(0, (scrollProgress - 0.45) * 2))) * 20}px)`,
          }}
        >
          <div className="founders-closing-divider">
            <span className="founders-div-line" />
            <span className="founders-div-crest">❖</span>
            <span className="founders-div-line" />
          </div>

          <p className="founders-closing-text">
            CRAFTING THE FUTURE OF KV GOLD • A LEGACY OF PURITY & VALUE
          </p>

          <button
            type="button"
            className="btn-gold-primary founders-cta-btn"
            onClick={() => onOpenSchemeModal && onOpenSchemeModal('நிறுவன சேமிப்புத் திட்டம்')}
          >
            <span>KV GOLD உடன் இணையுங்கள்</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
