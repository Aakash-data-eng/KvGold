import React from 'react';
import { Sparkles, ArrowRight, Scale, Gem, Palette, ShieldCheck, HeartHandshake } from 'lucide-react';
import '../styles/journey.css';

export default function JourneyConclusion({ onOpenSchemeModal }) {
  return (
    <section className="journey-conclusion-section" aria-label="Gold Heritage & Customer Consultation">
      <div className="journey-conclusion-wrap" style={{ marginTop: '3.5rem', marginBottom: '3.5rem' }}>
        
        {/* ================================================================
            SECTION 18 — TRUST + HERITAGE: GOLD HAS ALWAYS MEANT MORE
            ================================================================ */}
        <div className="heritage-emotional-card" style={{ marginBottom: '2.5rem', textAlign: 'center', background: 'rgba(25, 4, 10, 0.8)', border: '1px solid rgba(212, 175, 55, 0.35)', borderRadius: '24px', padding: '3rem 2rem' }}>
          <div className="journey-conclusion-badge" style={{ margin: '0 auto 1rem' }}>
            <Sparkles size={15} style={{ color: 'var(--color-gold-bright)' }} />
            <span>HERITAGE & VALUE • பாரம்பரியமும் மதிப்பும்</span>
          </div>

          <h3 className="heritage-main-title" style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: '#FFF', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
            GOLD HAS ALWAYS MEANT MORE.
          </h3>
          <h4 className="heritage-title-ta" style={{ fontSize: '1.1rem', color: 'var(--color-gold-bright, #F9E79F)', marginBottom: '1.25rem' }}>
            தங்கம் என்றுமே ஒரு பொருளை விட அதிகம்.
          </h4>

          <div className="heritage-bullets-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', maxWidth: '900px', margin: '0 auto 2rem', textAlign: 'left' }}>
            <div className="bullet-box" style={{ background: 'rgba(12, 2, 5, 0.6)', border: '1px solid rgba(212, 175, 55, 0.25)', borderRadius: '14px', padding: '1rem' }}>
              <span style={{ color: 'var(--color-gold-bright)', fontSize: '0.8rem', fontWeight: '800' }}>✦ BEGINNING & MILESTONE</span>
              <p style={{ fontSize: '0.85rem', color: '#FFF', margin: '0.25rem 0 0.15rem' }}>It can mark a beginning & celebrate a milestone.</p>
              <span style={{ fontSize: '0.78rem', color: 'rgba(249, 231, 159, 0.75)' }}>ஒரு புதிய தொடக்கத்தையும் முக்கிய தருணத்தையும் குறிக்கலாம்.</span>
            </div>

            <div className="bullet-box" style={{ background: 'rgba(12, 2, 5, 0.6)', border: '1px solid rgba(212, 175, 55, 0.25)', borderRadius: '14px', padding: '1rem' }}>
              <span style={{ color: 'var(--color-gold-bright)', fontSize: '0.8rem', fontWeight: '800' }}>✦ TRADITION & MEMORY</span>
              <p style={{ fontSize: '0.85rem', color: '#FFF', margin: '0.25rem 0 0.15rem' }}>Carry a tradition & become a cherished memory.</p>
              <span style={{ fontSize: '0.78rem', color: 'rgba(249, 231, 159, 0.75)' }}>ஒரு பாரம்பரியத்தை தாங்கி நினைவாக மாறலாம்.</span>
            </div>

            <div className="bullet-box" style={{ background: 'rgba(12, 2, 5, 0.6)', border: '1px solid rgba(212, 175, 55, 0.25)', borderRadius: '14px', padding: '1rem' }}>
              <span style={{ color: 'var(--color-gold-bright)', fontSize: '0.8rem', fontWeight: '800' }}>✦ GENERATION TO GENERATION</span>
              <p style={{ fontSize: '0.85rem', color: '#FFF', margin: '0.25rem 0 0.15rem' }}>And pass from one generation to the next.</p>
              <span style={{ fontSize: '0.78rem', color: 'rgba(249, 231, 159, 0.75)' }}>ஒரு தலைமுறையிலிருந்து அடுத்த தலைமுறைக்கு செல்லலாம்.</span>
            </div>
          </div>

          <div className="heritage-tagline-bar" style={{ display: 'inline-block', borderTop: '1px solid rgba(212, 175, 55, 0.3)', borderBottom: '1px solid rgba(212, 175, 55, 0.3)', padding: '0.75rem 2rem' }}>
            <span style={{ fontFamily: 'Cinzel, serif', fontSize: '1rem', fontWeight: '700', color: 'var(--color-gold-bright)', letterSpacing: '0.12em' }}>
              KV GOLD — GOLD FOR TODAY. VALUE FOR TOMORROW.
            </span>
            <div style={{ fontSize: '0.85rem', color: 'rgba(247, 231, 206, 0.8)', marginTop: '0.2rem' }}>
              இன்றுக்கான தங்கம் • நாளைக்கான மதிப்பு
            </div>
          </div>
        </div>

        {/* ================================================================
            SECTION 19 & 20 — CUSTOMER CONSULTATION CTA WITH CTA HIERARCHY
            ================================================================ */}
        <div className="journey-conclusion-card" style={{ background: 'rgba(22, 5, 10, 0.85)', border: '1.5px solid rgba(212, 175, 55, 0.4)', borderRadius: '24px', padding: '3.5rem 2.5rem', textAlignment: 'center' }}>
          
          <div className="journey-conclusion-badge" style={{ margin: '0 auto 1rem' }}>
            <HeartHandshake size={15} style={{ color: 'var(--color-gold-bright)' }} />
            <span>CUSTOMER CONSULTATION • உங்களுக்கான ஆலோசனை</span>
          </div>

          <h3 className="journey-conclusion-title" style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(1.6rem, 3.2vw, 2.4rem)', color: '#FFF', letterSpacing: '0.08em' }}>
            LET'S FIND THE RIGHT GOLD FOR YOU.
          </h3>
          <h4 style={{ fontSize: '1.15rem', color: 'var(--color-gold-bright, #F9E79F)', margin: '0.25rem 0 1rem' }}>
            உங்களுக்கான சரியான தங்கத்தை தேர்வு செய்வோம்.
          </h4>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem 2rem', color: '#FFF', fontSize: '0.9rem', fontWeight: '600', margin: '0.5rem 0 1.5rem' }}>
            <span>✓ BUYING (வாங்குதல்)</span>
            <span>✓ SELLING (விற்பனை)</span>
            <span>✓ CUSTOMIZING (தனிப்பயனாக்கம்)</span>
            <span>✓ VALUATION (மதிப்பீடு)</span>
          </div>

          <p className="journey-conclusion-text" style={{ maxWidth: '650px', margin: '0 auto 2.25rem' }}>
            One conversation can help you understand your options cleanly and confidently.
            <br />
            <span style={{ color: 'rgba(249, 231, 159, 0.8)', fontSize: '0.88rem' }}>
              ஒரு ஆலோசனை உங்கள் விருப்பங்களையும் கிடைக்கக்கூடிய வாய்ப்புகளையும் தெளிவாக புரிந்துகொள்ள உதவும்.
            </span>
          </p>

          {/* DISTINCT CTA HIERARCHY (Primary, Secondary, Tertiary) */}
          <div className="cta-hierarchy-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '1.25rem' }}>
            
            {/* Primary CTA: Metallic Gold Filled Button */}
            <button
              type="button"
              className="btn-gold-primary cta-primary-btn"
              onClick={() => {
                const el = document.querySelector('#gold-collection');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{ padding: '0.95rem 2rem', fontSize: '0.88rem', fontWeight: '800' }}
            >
              <Gem size={16} />
              <span>EXPLORE GOLD</span>
              <ArrowRight size={16} />
            </button>

            {/* Secondary CTA: Gold Outlined Button */}
            <button
              type="button"
              className="cta-secondary-btn"
              onClick={() => onOpenSchemeModal && onOpenSchemeModal('தங்கம் மதிப்பீடு / விற்பனை')}
              style={{
                background: 'rgba(122, 0, 25, 0.35)',
                border: '1.5px solid var(--color-gold, #D4AF37)',
                color: 'var(--color-gold-bright, #F9E79F)',
                borderRadius: '999px',
                padding: '0.95rem 1.8rem',
                fontSize: '0.88rem',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease'
              }}
            >
              <Scale size={16} />
              <span>GET A GOLD VALUATION</span>
            </button>

            {/* Tertiary CTA: Minimal Text / Arrow */}
            <button
              type="button"
              className="cta-tertiary-btn"
              onClick={() => onOpenSchemeModal && onOpenSchemeModal('தனிப்பயன் நகை வடிவமைப்பு')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-gold-bright, #F9E79F)',
                fontSize: '0.85rem',
                fontWeight: '700',
                letterSpacing: '0.05em',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                textDecoration: 'underline',
                textUnderlineOffset: '4px'
              }}
            >
              <Palette size={15} />
              <span>DISCUSS A CUSTOM DESIGN</span>
              <ArrowRight size={14} />
            </button>

          </div>

          {/* Section 39: Final Brand Message */}
          <div style={{ marginTop: '2.75rem', paddingTop: '1.75rem', borderTop: '1px solid rgba(212, 175, 55, 0.25)' }}>
            <span style={{ fontFamily: 'Cinzel, serif', fontSize: '0.9rem', fontWeight: '800', letterSpacing: '0.18em', color: 'var(--color-gold-bright, #F9E79F)' }}>
              YOUR GOLD • YOUR CHOICE • YOUR TRUST
            </span>
            <div style={{ fontSize: '0.85rem', color: 'rgba(247, 231, 206, 0.75)', marginTop: '0.25rem' }}>
              உங்கள் தங்கம் • உங்கள் விருப்பம் • உங்கள் நம்பிக்கை • KV GOLD
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

