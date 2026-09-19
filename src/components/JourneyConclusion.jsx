import React from 'react';
import { Sparkles, TrendingUp, ArrowRight } from 'lucide-react';
import '../styles/journey.css';

export default function JourneyConclusion({ onOpenSchemeModal }) {
  return (
    <section className="journey-conclusion-section" aria-label="The Journey Continues">
      <div className="journey-conclusion-wrap" style={{ marginTop: '3.5rem', marginBottom: '3.5rem' }}>
        <div className="journey-conclusion-card">
          <div className="journey-conclusion-badge">
            <Sparkles size={15} style={{ color: 'var(--color-gold-bright)' }} />
            <span>THE JOURNEY CONTINUES</span>
          </div>

          <h3 className="journey-conclusion-title">
            தலைமுறை தலைமுறையாய் உங்கள் குடும்பத்தின் பொன் பாதுகாப்பு
          </h3>

          <p className="journey-conclusion-text">
            2005-ல் ₹7,000 ஆக இருந்த ஒரு சவரன் தங்கம், இன்று ₹1,21,600 என்ற வரலாற்றுச் சிகரத்தை எட்டியுள்ளது.
            காலங்கள் மாறினாலும் குறையாத மதிப்புமிக்க செல்வப் பெருக்கத்தை இன்றே KV GOLD உடன் தொடங்குங்கள்.
          </p>

          <button
            type="button"
            className="btn-gold-primary journey-cta-action"
            onClick={() => onOpenSchemeModal && onOpenSchemeModal('தங்க சேமிப்புத் திட்டம்')}
          >
            <TrendingUp size={18} />
            <span>உங்கள் பொன் பயணத்தைத் தொடங்குங்கள்</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
