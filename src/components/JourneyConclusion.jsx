import React, { useState, useRef } from 'react';
import { Sparkles, ArrowRight, Scale, Gem, Palette, HeartHandshake, ChevronRight } from 'lucide-react';
import '../styles/journey.css';

export default function JourneyConclusion({ onOpenSchemeModal }) {
  const [activePanel, setActivePanel] = useState(1);
  const mobileTrackRef = useRef(null);

  const handleMobileScroll = () => {
    if (!mobileTrackRef.current) return;
    const track = mobileTrackRef.current;
    const scrollLeft = track.scrollLeft;
    const panelWidth = track.clientWidth * 0.86 + 12; // 86vw + 12px gap
    const index = Math.min(6, Math.max(1, Math.round(scrollLeft / panelWidth) + 1));
    setActivePanel(index);
  };

  return (
    <section className="journey-conclusion-section" aria-label="Gold Heritage & Customer Consultation">
      <div className="journey-conclusion-wrap">

        {/* ================================================================
            DESKTOP LAYOUT (>= 768px)
            ================================================================ */}
        <div className="heritage-desktop-layout">
          
          {/* SECTION 18 — HERITAGE & VALUE */}
          <div className="heritage-emotional-card">
            <div className="journey-conclusion-badge">
              <Sparkles size={15} style={{ color: 'var(--color-gold-bright)' }} />
              <span>HERITAGE & VALUE • பாரம்பரியமும் மதிப்பும்</span>
            </div>

            <h3 className="heritage-main-title">
              GOLD HAS ALWAYS MEANT MORE.
            </h3>
            <h4 className="heritage-title-ta">
              தங்கம் என்றுமே ஒரு பொருளை விட அதிகம்.
            </h4>

            <div className="heritage-bullets-grid">
              <div className="bullet-box">
                <span className="bullet-tag">✦ BEGINNING & MILESTONE</span>
                <p className="bullet-en">It can mark a beginning & celebrate a milestone.</p>
                <span className="bullet-ta">ஒரு புதிய தொடக்கத்தையும் முக்கிய தருணத்தையும் குறிக்கலாம்.</span>
              </div>

              <div className="bullet-box">
                <span className="bullet-tag">✦ TRADITION & MEMORY</span>
                <p className="bullet-en">Carry a tradition & become a cherished memory.</p>
                <span className="bullet-ta">ஒரு பாரம்பரியத்தை தாங்கி நினைவாக மாறலாம்.</span>
              </div>

              <div className="bullet-box">
                <span className="bullet-tag">✦ GENERATION TO GENERATION</span>
                <p className="bullet-en">And pass from one generation to the next.</p>
                <span className="bullet-ta">ஒரு தலைமுறையிலிருந்து அடுத்த தலைமுறைக்கு செல்லலாம்.</span>
              </div>
            </div>

            <div className="heritage-tagline-bar">
              <span className="tagline-en">
                KV GOLD — GOLD FOR TODAY. VALUE FOR TOMORROW.
              </span>
              <div className="tagline-ta">
                இன்றுக்கான தங்கம் • நாளைக்கான மதிப்பு
              </div>
            </div>
          </div>

          {/* SECTION 19 & 20 — CUSTOMER CONSULTATION */}
          <div className="journey-conclusion-card">
            <div className="journey-conclusion-badge">
              <HeartHandshake size={15} style={{ color: 'var(--color-gold-bright)' }} />
              <span>CUSTOMER CONSULTATION • உங்களுக்கான ஆலோசனை</span>
            </div>

            <h3 className="journey-conclusion-title">
              LET'S FIND THE RIGHT GOLD FOR YOU.
            </h3>
            <h4 className="consultation-sub-ta">
              உங்களுக்கான சரியான தங்கத்தை தேர்வு செய்வோம்.
            </h4>

            <div className="consultation-services-pills">
              <span>✓ BUYING (வாங்குதல்)</span>
              <span>✓ SELLING (விற்பனை)</span>
              <span>✓ CUSTOMIZING (தனிப்பயனாக்கம்)</span>
              <span>✓ VALUATION (மதிப்பீடு)</span>
            </div>

            <p className="journey-conclusion-text">
              One conversation can help you understand your options cleanly and confidently.
              <br />
              <span className="text-ta">
                ஒரு ஆலோசனை உங்கள் விருப்பங்களையும் கிடைக்கக்கூடிய வாய்ப்புகளையும் தெளிவாக புரிந்துகொள்ள உதவும்.
              </span>
            </p>

            {/* DISTINCT CTA HIERARCHY */}
            <div className="cta-hierarchy-row">
              <button
                type="button"
                className="btn-gold-primary cta-primary-btn"
                onClick={() => {
                  const el = document.querySelector('#gold-collection');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Gem size={16} />
                <span>EXPLORE GOLD</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className="cta-secondary-btn"
                onClick={() => onOpenSchemeModal && onOpenSchemeModal('தங்கம் மதிப்பீடு / விற்பனை')}
              >
                <Scale size={16} />
                <span>GET A GOLD VALUATION</span>
              </button>

              <button
                type="button"
                className="cta-tertiary-btn"
                onClick={() => onOpenSchemeModal && onOpenSchemeModal('தனிப்பயன் நகை வடிவமைப்பு')}
              >
                <Palette size={15} />
                <span>DISCUSS A CUSTOM DESIGN</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Final Brand Message */}
            <div className="heritage-footer-trust">
              <span className="trust-en">
                YOUR GOLD • YOUR CHOICE • YOUR TRUST
              </span>
              <div className="trust-ta">
                உங்கள் தங்கம் • உங்கள் விருப்பம் • உங்கள் நம்பிக்கை • KV GOLD
              </div>
            </div>
          </div>

        </div>

        {/* ================================================================
            MOBILE LOCAL HORIZONTAL SWIPE EXPLORATION (< 768px)
            ================================================================ */}
        <div className="heritage-mobile-container">
          
          {/* Top Swipe Indicator Header */}
          <div className="mobile-swipe-header">
            <div className="swipe-hint">
              <Sparkles size={13} style={{ color: 'var(--color-gold-bright)' }} />
              <span>SWIPE TO EXPLORE</span>
              <ChevronRight size={14} className="swipe-chevron" />
            </div>
            <div className="panel-counter">
              <span>0{activePanel}</span>
              <span className="counter-divider">/</span>
              <span className="counter-total">06</span>
            </div>
          </div>

          {/* Local Horizontal Track */}
          <div 
            className="mobile-horizontal-track" 
            ref={mobileTrackRef}
            onScroll={handleMobileScroll}
          >

            {/* PANEL 1: HERITAGE OVERVIEW */}
            <div className={`mobile-panel-card ${activePanel === 1 ? 'is-active' : ''}`}>
              <div className="journey-conclusion-badge">
                <Sparkles size={14} style={{ color: 'var(--color-gold-bright)' }} />
                <span>HERITAGE & VALUE</span>
              </div>
              <h3 className="mobile-panel-title">
                GOLD HAS ALWAYS MEANT MORE.
              </h3>
              <p className="mobile-panel-ta">
                தங்கம் என்றுமே ஒரு பொருளை விட அதிகம்.
              </p>
              <div className="mobile-panel-tagline">
                <span>KV GOLD — GOLD FOR TODAY. VALUE FOR TOMORROW.</span>
                <div className="tagline-ta-sub">இன்றுக்கான தங்கம் • நாளைக்கான மதிப்பு</div>
              </div>
            </div>

            {/* PANEL 2: BEGINNING & MILESTONE */}
            <div className={`mobile-panel-card ${activePanel === 2 ? 'is-active' : ''}`}>
              <span className="bullet-tag">✦ BEGINNING & MILESTONE</span>
              <h4 className="mobile-bullet-title">CELEBRATE LIFE'S MOMENTS</h4>
              <p className="bullet-en">It can mark a beginning & celebrate a milestone.</p>
              <span className="bullet-ta">ஒரு புதிய தொடக்கத்தையும் முக்கிய தருணத்தையும் குறிக்கலாம்.</span>
            </div>

            {/* PANEL 3: TRADITION & MEMORY */}
            <div className={`mobile-panel-card ${activePanel === 3 ? 'is-active' : ''}`}>
              <span className="bullet-tag">✦ TRADITION & MEMORY</span>
              <h4 className="mobile-bullet-title">CHERISHED HERITAGE</h4>
              <p className="bullet-en">Carry a tradition & become a cherished memory.</p>
              <span className="bullet-ta">ஒரு பாரம்பரியத்தை தாங்கி நினைவாக மாறலாம்.</span>
            </div>

            {/* PANEL 4: GENERATION TO GENERATION */}
            <div className={`mobile-panel-card ${activePanel === 4 ? 'is-active' : ''}`}>
              <span className="bullet-tag">✦ GENERATION TO GENERATION</span>
              <h4 className="mobile-bullet-title">ENDURING VALUE</h4>
              <p className="bullet-en">And pass from one generation to the next.</p>
              <span className="bullet-ta">ஒரு தலைமுறையிலிருந்து அடுத்த தலைமுறைக்கு செல்லலாம்.</span>
            </div>

            {/* PANEL 5: CUSTOMER CONSULTATION */}
            <div className={`mobile-panel-card ${activePanel === 5 ? 'is-active' : ''}`}>
              <div className="journey-conclusion-badge">
                <HeartHandshake size={14} style={{ color: 'var(--color-gold-bright)' }} />
                <span>CONSULTATION</span>
              </div>
              <h3 className="mobile-panel-title">
                LET'S FIND THE RIGHT GOLD FOR YOU.
              </h3>
              <p className="mobile-panel-ta">
                உங்களுக்கான சரியான தங்கத்தை தேர்வு செய்வோம்.
              </p>
              <div className="consultation-services-pills">
                <span>✓ BUYING</span>
                <span>✓ SELLING</span>
                <span>✓ CUSTOMIZING</span>
                <span>✓ VALUATION</span>
              </div>
            </div>

            {/* PANEL 6: CONSULTATION ACTIONS & CTAs */}
            <div className={`mobile-panel-card ${activePanel === 6 ? 'is-active' : ''}`}>
              <p className="mobile-cta-intro">
                One conversation can help you understand your options cleanly and confidently.
              </p>
              <div className="mobile-cta-column">
                <button
                  type="button"
                  className="btn-gold-primary cta-primary-btn"
                  onClick={() => {
                    const el = document.querySelector('#gold-collection');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Gem size={15} />
                  <span>EXPLORE GOLD</span>
                </button>

                <button
                  type="button"
                  className="cta-secondary-btn"
                  onClick={() => onOpenSchemeModal && onOpenSchemeModal('தங்கம் மதிப்பீடு / விற்பனை')}
                >
                  <Scale size={15} />
                  <span>GOLD VALUATION</span>
                </button>

                <button
                  type="button"
                  className="cta-tertiary-btn"
                  onClick={() => onOpenSchemeModal && onOpenSchemeModal('தனிப்பயன் நகை வடிவமைப்பு')}
                >
                  <Palette size={14} />
                  <span>CUSTOM DESIGN</span>
                </button>
              </div>
              <div className="mobile-trust-bottom">
                YOUR GOLD • YOUR CHOICE • YOUR TRUST
              </div>
            </div>

          </div>

          {/* Dots Indicator */}
          <div className="mobile-dots-indicator">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <span key={i} className={`dot ${activePanel === i ? 'is-active' : ''}`} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}


