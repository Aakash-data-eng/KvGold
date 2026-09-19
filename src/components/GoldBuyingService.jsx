import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, Phone, ShieldCheck, Scale, FileText, Sparkles } from 'lucide-react';
import '../styles/gold-buying.css';

export default function GoldBuyingService({ onOpenSchemeModal }) {
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
    <section className="buying-section" id="buying-service" ref={sectionRef} aria-label="Gold Buying and Selling Service">
      {/* Ambient Lighting */}
      <div className="buying-ambient-glow center-glow" aria-hidden="true" />

      <div className="buying-wrapper">
        <div className={`buying-card-container ${isVisible ? 'is-revealed' : ''}`}>
          
          {/* Header */}
          <div className="buying-header">
            <div className="buying-eyebrow">
              <span className="eyebrow-spark">✦</span>
              <span>GOLD BUYING & SELLING SERVICE</span>
              <span className="eyebrow-spark">✦</span>
            </div>

            <h2 className="buying-title">SELL YOUR GOLD WITH CONFIDENCE</h2>

            <p className="buying-subtitle">
              Looking to sell your gold? KV GOLD offers competitive rates with a transparent evaluation process and clear documentation.
            </p>
          </div>

          {/* 3 Core Buying Features Grid */}
          <div className="buying-features-grid">
            
            <div className="buying-feature-box">
              <div className="feature-icon-ring">
                <Scale size={22} />
              </div>
              <h3 className="feature-title">Transparent Evaluation</h3>
              <p className="feature-desc">
                Precision assessment process based on daily market rates with gold testing reports available where applicable.
              </p>
            </div>

            <div className="buying-feature-box">
              <div className="feature-icon-ring">
                <ShieldCheck size={22} />
              </div>
              <h3 className="feature-title">Smarter Gold Buying</h3>
              <p className="feature-desc">
                Explore trusted, hallmarked gold jewellery with transparent pricing and clear quality documentation.
              </p>
            </div>

            <div className="buying-feature-box">
              <div className="feature-icon-ring">
                <FileText size={22} />
              </div>
              <h3 className="feature-title">Clear Documentation</h3>
              <p className="feature-desc">
                Receive clear transaction receipts, hallmark information, and valuation records for every transaction.
              </p>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="buying-actions-row">
            <button
              type="button"
              className="btn-gold-primary buying-cta-btn"
              onClick={() => onOpenSchemeModal && onOpenSchemeModal('தங்கம் விற்பனை / மதிப்பீடு')}
            >
              <Sparkles size={16} />
              <span>GET A GOLD VALUATION</span>
              <ArrowRight size={16} />
            </button>

            <a
              href="tel:9894352616"
              className="buying-phone-btn"
              aria-label="Call KV Gold Valuation Desk"
            >
              <Phone size={16} />
              <span>CALL 98943 52616 FOR VALUATION</span>
            </a>
          </div>

          {/* Bottom Hallmarked Seal Banner */}
          <div className="buying-seal-banner">
            <span className="seal-text">HALLMARKED • TESTED • TRUSTED</span>
            <span className="seal-sub">Every eligible gold product is presented with appropriate hallmark information and clear testing reports where applicable.</span>
          </div>

        </div>
      </div>
    </section>
  );
}
