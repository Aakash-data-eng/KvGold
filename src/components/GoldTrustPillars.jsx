import React, { useRef, useEffect, useState } from 'react';
import { ShieldCheck, Scale, HeartHandshake, Check } from 'lucide-react';
import '../styles/trust-pillars.css';

const trustPillars = [
  {
    num: '01',
    icon: Scale,
    title: 'TRANSPARENT VALUE',
    titleTamil: 'தெளிவான மதிப்பு',
    description: 'Understand the value behind your gold.',
    descTamil: 'உங்கள் தங்கத்தின் மதிப்பை தெளிவாக அறிந்துகொள்ளுங்கள்.',
    badge: 'Fair Market Rates',
  },
  {
    num: '02',
    icon: HeartHandshake,
    title: 'CUSTOMER-FIRST SERVICE',
    titleTamil: 'வாடிக்கையாளருக்கு முன்னுரிமை',
    description: 'Your preference guides the experience.',
    descTamil: 'உங்கள் விருப்பமே எங்கள் சேவையின் வழிகாட்டி.',
    badge: 'Customer Confidence',
  },
  {
    num: '03',
    icon: ShieldCheck,
    title: 'TRUSTED QUALITY',
    titleTamil: 'நம்பிக்கையான தரம்',
    description: 'Quality, documentation and clarity at every appropriate step.',
    descTamil: 'ஒவ்வொரு பொருத்தமான கட்டத்திலும் தரம், ஆவணங்கள் மற்றும் தெளிவுக்கு முக்கியத்துவம்.',
    badge: 'Hallmark Guidance',
  },
];

export default function GoldTrustPillars() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="pillars-section" id="pillars" ref={sectionRef} aria-label="Gold Transparency Pillars">
      {/* Ambient Radial Glows */}
      <div className="pillars-ambient-glow center-glow" aria-hidden="true" />

      <div className="pillars-wrapper">
        {/* Section Header */}
        <div className={`pillars-header ${isVisible ? 'is-revealed' : ''}`}>
          <div className="pillars-eyebrow">
            <span className="eyebrow-spark">✦</span>
            <span>TRUSTED SELLER • நம்பிக்கையான விற்பனையாளர்</span>
            <span className="eyebrow-spark">✦</span>
          </div>

          <h2 className="pillars-main-title">NOT JUST GOLD. A CLEARER GOLD EXPERIENCE.</h2>
          <p className="pillars-main-title-tamil">தங்கம் மட்டுமல்ல. தெளிவான தங்க அனுபவம்.</p>

          <p className="pillars-subtitle">
            We believe trust grows when customers understand what they are buying, what they are paying for, and what they receive.
          </p>

          <p className="pillars-subtitle-tamil">
            நீங்கள் என்ன வாங்குகிறீர்கள், எதற்காக எவ்வளவு செலுத்துகிறீர்கள், எதைப் பெறுகிறீர்கள் என்பதை தெளிவாக அறிந்திருக்கும்போது நம்பிக்கை உருவாகிறது என்று நாங்கள் நம்புகிறோம்.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className={`pillars-grid pillars-3-cols ${isVisible ? 'is-revealed' : ''}`}>
          {trustPillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div key={pillar.title} className="pillar-card" style={{ transitionDelay: `${index * 0.12}s` }}>
                <div className="pillar-card-top">
                  <span className="pillar-num">{pillar.num}</span>
                  <div className="pillar-icon-ring">
                    <IconComponent size={24} strokeWidth={1.8} />
                  </div>
                </div>

                <h3 className="pillar-card-title">{pillar.title}</h3>
                <h4 className="pillar-card-title-tamil">{pillar.titleTamil}</h4>

                <p className="pillar-card-desc">"{pillar.description}"</p>
                <p className="pillar-card-desc-tamil">"{pillar.descTamil}"</p>

                <div className="pillar-card-badge">
                  <Check size={14} className="pillar-check-icon" />
                  <span>{pillar.badge}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .pillars-main-title-tamil {
          font-family: var(--font-serif, serif);
          color: var(--color-gold-bright, #F9E79F);
          font-size: 1.15rem;
          margin-top: 0.25rem;
          margin-bottom: 0.75rem;
        }
        .pillars-subtitle-tamil {
          font-size: 0.9rem;
          color: rgba(247, 231, 206, 0.75);
          max-width: 720px;
          margin: 0.35rem auto 0;
          line-height: 1.5;
        }
        .pillars-3-cols {
          grid-template-columns: repeat(3, 1fr) !important;
        }
        .pillar-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .pillar-num {
          font-family: var(--font-serif, serif);
          font-size: 1.4rem;
          font-weight: 700;
          color: rgba(212, 175, 55, 0.45);
          letter-spacing: 0.05em;
        }
        .pillar-card-title-tamil {
          font-family: var(--font-sans, sans-serif);
          font-size: 0.92rem;
          color: var(--color-gold-bright, #F9E79F);
          margin-top: 0.2rem;
          margin-bottom: 0.6rem;
          font-weight: 600;
        }
        .pillar-card-desc-tamil {
          font-size: 0.82rem;
          color: rgba(247, 231, 206, 0.7);
          margin-top: 0.25rem;
          margin-bottom: 1.1rem;
          font-style: italic;
        }
        @media (max-width: 900px) {
          .pillars-3-cols {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
