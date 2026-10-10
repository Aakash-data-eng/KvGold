import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, Shield, Award, ArrowRight } from 'lucide-react';
import '../styles/founders.css';

export default function Founders({ onOpenSchemeModal }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const ownerMetaRef = useRef(null);
  const cofounderMetaRef = useRef(null);
  const closingBarRef = useRef(null);
  const ambientGlowRef = useRef(null);
  const duoRowRef = useRef(null);

  const hasShimmeredRef = useRef(false);
  const [hasShimmered, setHasShimmered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let isSectionVisible = false;
    let rafId = null;

    let cachedSectionTopOffset = 0;
    let cachedSectionHeight = 0;

    const measureSection = () => {
      if (section) {
        const rect = section.getBoundingClientRect();
        cachedSectionTopOffset = rect.top + window.scrollY;
        cachedSectionHeight = rect.height || section.offsetHeight;
      }
    };

    const enforceMobileVisibility = () => {
      if (headerRef.current) {
        headerRef.current.style.opacity = '1';
        headerRef.current.style.transform = 'none';
      }
      if (ownerMetaRef.current) {
        ownerMetaRef.current.style.opacity = '1';
        ownerMetaRef.current.style.transform = 'none';
      }
      if (cofounderMetaRef.current) {
        cofounderMetaRef.current.style.opacity = '1';
        cofounderMetaRef.current.style.transform = 'none';
      }
      if (closingBarRef.current) {
        closingBarRef.current.style.opacity = '1';
        closingBarRef.current.style.transform = 'none';
      }
      if (duoRowRef.current) {
        duoRowRef.current.classList.add('is-revealed');
      }
      if (ambientGlowRef.current) {
        ambientGlowRef.current.style.opacity = '1';
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isSectionVisible = entry.isIntersecting;
        if (isSectionVisible) {
          if (window.innerWidth <= 768) {
            enforceMobileVisibility();
          } else {
            measureSection();
            updateScrollProgress();
          }
        }
      },
      { rootMargin: '150px 0px 150px 0px' }
    );
    observer.observe(section);

    const updateScrollProgress = () => {
      rafId = null;
      if (!isSectionVisible) return;

      // On mobile screens, keep all elements 100% visible without scroll-linked opacity hiding or reflows
      if (window.innerWidth <= 768) {
        enforceMobileVisibility();
        return;
      }

      const windowHeight = window.innerHeight;
      const rectTop = cachedSectionTopOffset - window.scrollY;

      // Calculate scroll progress (0 when section top enters viewport, 1 when middle is in view)
      const totalDistance = windowHeight + cachedSectionHeight;
      const currentPos = windowHeight - rectTop;
      const rawProgress = currentPos / totalDistance;
      const progress = Math.min(1, Math.max(0, rawProgress * 1.4));

      // Direct CSS Variable Update (Zero React Re-renders on Scroll)
      section.style.setProperty('--scroll-p', progress);

      // Direct DOM style updates for child elements (Desktop/Tablet)
      if (ambientGlowRef.current) {
        ambientGlowRef.current.style.transform = `translate(-50%, -50%) scale(${0.75 + progress * 0.45})`;
        ambientGlowRef.current.style.opacity = String(Math.min(1, progress * 1.5));
      }

      if (headerRef.current) {
        headerRef.current.style.opacity = String(Math.min(1, progress * 2.2));
        headerRef.current.style.transform = `translateY(${(1 - Math.min(1, progress * 2)) * -25}px)`;
      }

      const metaOpacity = Math.min(1, Math.max(0, (progress - 0.25) * 2.5));
      const metaTranslate = (1 - metaOpacity) * 20;

      if (ownerMetaRef.current) {
        ownerMetaRef.current.style.opacity = String(metaOpacity);
        ownerMetaRef.current.style.transform = `translateY(${metaTranslate}px)`;
      }

      if (cofounderMetaRef.current) {
        cofounderMetaRef.current.style.opacity = String(metaOpacity);
        cofounderMetaRef.current.style.transform = `translateY(${metaTranslate}px)`;
      }

      if (duoRowRef.current) {
        if (progress > 0.18) {
          duoRowRef.current.classList.add('is-revealed');
        }
      }

      if (closingBarRef.current) {
        const closingOpacity = Math.min(1, Math.max(0, (progress - 0.45) * 2));
        closingBarRef.current.style.opacity = String(closingOpacity);
        closingBarRef.current.style.transform = `translateY(${(1 - closingOpacity) * 20}px)`;
      }

      if (progress > 0.45 && !hasShimmeredRef.current) {
        hasShimmeredRef.current = true;
        setHasShimmered(true);
      }
    };

    const handleScroll = () => {
      if (!isSectionVisible || window.innerWidth <= 768 || rafId) return;
      rafId = requestAnimationFrame(updateScrollProgress);
    };

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        enforceMobileVisibility();
      } else {
        measureSection();
        updateScrollProgress();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      className="founders-section"
      id="founders"
      ref={sectionRef}
      aria-label="Leadership - The People Behind KV Gold"
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
        ref={ambientGlowRef}
        className="founders-ambient-glow center-glow"
        aria-hidden="true"
      />
      <div className="founders-ambient-glow left-glow" aria-hidden="true" />
      <div className="founders-ambient-glow right-glow" aria-hidden="true" />

      <div className="founders-wrapper">
        {/* Section Header */}
        <div className="founders-header" ref={headerRef}>
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
              <p className="center-brand-sub">TRUSTED SELLER • SOVEREIGN WEALTH</p>
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
          <div className="founders-duo-row" ref={duoRowRef}>
            
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
                <div className="founder-meta" ref={ownerMetaRef}>
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
                <div className="founder-meta" ref={cofounderMetaRef}>
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
        <div className="founders-closing-bar" ref={closingBarRef}>
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
