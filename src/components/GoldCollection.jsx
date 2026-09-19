import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import '../styles/collection.css';

// Row 1: 10 Chain Models
const CHAIN_MODELS = [
  {
    id: 'rope',
    tamil: 'முறுக்கு சங்கிலி',
    english: 'Rope Chain',
    image: '/chains/rope-chain.png',
  },
  {
    id: 'sachin',
    tamil: 'சச்சின் செயின்',
    english: 'Sachin Chain',
    image: '/chains/sachin-chain.png',
  },
  {
    id: 'curb',
    tamil: 'கொடி சங்கிலி',
    english: 'Curb / Cable Chain',
    image: '/chains/curb-chain.png',
  },
  {
    id: 'box',
    tamil: 'பட்டை சங்கிலி / பாக்ஸ் செயின்',
    english: 'Box Chain',
    image: '/chains/box-chain.png',
  },
  {
    id: 'ball',
    tamil: 'குண்டு சங்கிலி',
    english: 'Ball / Bead Chain',
    image: '/chains/ball-chain.png',
  },
  {
    id: 'snail',
    tamil: 'நத்தை செயின் / ஸ்நெயில் செயின்',
    english: 'Snail Chain',
    image: '/chains/snail-chain.png',
  },
  {
    id: 'snake',
    tamil: 'பாம்பு செயின் / ஸ்நேக் செயின்',
    english: 'Snake Chain',
    image: '/chains/snake-chain.png',
  },
  {
    id: 'wheat',
    tamil: 'கோதுமை செயின் / வீட் செயின்',
    english: 'Wheat Chain',
    image: '/chains/wheat-chain.png',
  },
  {
    id: 'floral',
    tamil: 'மலர் சங்கிலி',
    english: 'Floral Chain',
    image: '/chains/floral-chain.png',
  },
  {
    id: 'matchbox',
    tamil: 'நெருப்புப் பெட்டி செயின் / மேட்ச் பாக்ஸ் செயின்',
    english: 'Matchbox Chain',
    image: '/chains/matchbox-chain.png',
  },
];

// Row 2: Other Gold Ornaments (Excluding chains, including Gold Coins and Gold Bars)
const OTHER_ORNAMENTS = [
  {
    id: 'rings',
    tamil: 'மோதிரங்கள்',
    english: 'Gold Rings',
    image: '/collection/rings.png',
  },
  {
    id: 'necklaces',
    tamil: 'நெக்லஸ் மாடல்கள்',
    english: 'Gold Necklaces',
    image: '/collection/necklaces.png',
  },
  {
    id: 'earrings',
    tamil: 'காதணி மாடல்கள்',
    english: 'Gold Earrings',
    image: '/collection/earrings.png',
  },
  {
    id: 'bangles',
    tamil: 'வளையல்கள்',
    english: 'Gold Bangles',
    image: '/collection/bangles.png',
  },
  {
    id: 'pendants',
    tamil: 'பெண்டண்ட்கள்',
    english: 'Gold Pendants',
    image: '/collection/pendants.png',
  },
  {
    id: 'temple-jewellery',
    tamil: 'கோவில் நகைகள்',
    english: 'Temple Jewellery',
    image: '/collection/temple-jewellery.png',
  },
  {
    id: 'gold-coins',
    tamil: 'தங்க நாணயங்கள்',
    english: 'Gold Coins',
    image: '/collection/gold-coins.png',
  },
  {
    id: 'gold-bars',
    tamil: 'தங்க கட்டிகள்',
    english: 'Gold Bars',
    image: '/collection/gold-bars.png',
  },
  {
    id: 'anklets',
    tamil: 'கால்சங்கிலிகள்',
    english: 'Gold Anklets',
    image: '/collection/anklets.png',
  },
];

// Repeat 3 times to ensure mathematical seamlessness across any viewport width
const REPEATED_CHAINS = [...CHAIN_MODELS, ...CHAIN_MODELS, ...CHAIN_MODELS];
const REPEATED_ORNAMENTS = [...OTHER_ORNAMENTS, ...OTHER_ORNAMENTS, ...OTHER_ORNAMENTS];

export default function GoldCollection({ onOpenSchemeModal }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  // Performance optimization: Pause CSS animations when section is off-screen
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="gold-collection-section"
      id="gold-collection"
      ref={sectionRef}
      aria-label="Explore Our Gold Collection"
    >
      {/* Atmospheric Ambient Lighting */}
      <div className="gold-ambient-glow gold-ambient-top" aria-hidden="true" />
      <div className="gold-ambient-glow gold-ambient-bottom" aria-hidden="true" />

      {/* ================================================================
          MAIN SECTION HEADER
          ================================================================ */}
      <div className="gold-main-header">
        <div className="gold-top-bar">
          <div className="gold-brand-tag">
            <span className="gold-tag-line" />
            <span className="gold-tag-text">
              TRADITIONAL CRAFTSMANSHIP • MODERN ELEGANCE
            </span>
          </div>

          <button
            type="button"
            className="gold-all-explore-btn"
            onClick={() =>
              onOpenSchemeModal && onOpenSchemeModal('தங்க நகை சேமிப்புத் திட்டம்')
            }
          >
            <span>EXPLORE ALL COLLECTIONS</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="gold-title-wrap">
          <div className="gold-title-sparkle" aria-hidden="true">
            <Sparkles size={18} />
          </div>
          <h2 className="gold-main-title">EXPLORE OUR GOLD COLLECTION</h2>
          <p className="gold-main-subtitle">
            Traditional Designs. Timeless Value.
          </p>
        </div>
      </div>

      {/* ================================================================
          ROW 1: CHAIN MODELS (RIGHT -> LEFT)
          ================================================================ */}
      <div className="gold-row-block gold-row-chains">
        <div className="gold-sub-header">
          <div className="gold-sub-title-wrap">
            <span className="gold-sub-badge">01</span>
            <div>
              <h3 className="gold-sub-title">CHAIN MODELS</h3>
              <p className="gold-sub-desc">Timeless Chains for Every Style</p>
            </div>
          </div>
          <span className="gold-direction-hint" aria-hidden="true">
            ← AUTO SCROLL
          </span>
        </div>

        <div className="gold-billboard-wrapper">
          <div className="gold-fade-edge gold-fade-left" aria-hidden="true" />
          <div className="gold-fade-edge gold-fade-right" aria-hidden="true" />

          <div className="gold-marquee-stage">
            <div
              className={`gold-marquee-track track-chains ${
                !isVisible ? 'track-paused' : ''
              }`}
            >
              {REPEATED_CHAINS.map((chain, index) => (
                <ProductCard
                  key={`chain-${chain.id}-${index}`}
                  item={chain}
                  onClick={() =>
                    onOpenSchemeModal &&
                    onOpenSchemeModal(`${chain.english} Scheme`)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Elegant Inter-Row Gold Divider */}
      <div className="gold-row-divider" aria-hidden="true">
        <span className="gold-row-divider-line" />
        <span className="gold-row-divider-gem">❖</span>
        <span className="gold-row-divider-line" />
      </div>

      {/* ================================================================
          ROW 2: OTHER GOLD ORNAMENTS (LEFT -> RIGHT)
          ================================================================ */}
      <div className="gold-row-block gold-row-ornaments">
        <div className="gold-sub-header">
          <div className="gold-sub-title-wrap">
            <span className="gold-sub-badge">02</span>
            <div>
              <h3 className="gold-sub-title">OTHER GOLD ORNAMENTS</h3>
              <p className="gold-sub-desc">
                Crafted Treasures for Every Occasion
              </p>
            </div>
          </div>
          <span className="gold-direction-hint" aria-hidden="true">
            AUTO SCROLL →
          </span>
        </div>

        <div className="gold-billboard-wrapper">
          <div className="gold-fade-edge gold-fade-left" aria-hidden="true" />
          <div className="gold-fade-edge gold-fade-right" aria-hidden="true" />

          <div className="gold-marquee-stage">
            <div
              className={`gold-marquee-track track-ornaments ${
                !isVisible ? 'track-paused' : ''
              }`}
            >
              {REPEATED_ORNAMENTS.map((item, index) => (
                <ProductCard
                  key={`ornament-${item.id}-${index}`}
                  item={item}
                  onClick={() =>
                    onOpenSchemeModal &&
                    onOpenSchemeModal(`${item.english} Scheme`)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================
          BOTTOM BAR & HALLMARK HERITAGE
          ================================================================ */}
      <div className="gold-collection-bottom-bar">
        <div className="gold-bottom-divider">
          <span className="gold-div-line" />
          <div className="gold-dots-group">
            <span className="gold-dot" />
            <span className="gold-dot active" />
            <span className="gold-dot" />
            <span className="gold-dot" />
            <span className="gold-dot" />
          </div>
          <span className="gold-div-line" />
        </div>
        <p className="gold-bottom-tagline">
          <span className="gold-tag-line-left" />
          A LEGACY IN GOLD • 916 BIS HALLMARK CERTIFIED
          <span className="gold-tag-line-right" />
        </p>
      </div>
    </section>
  );
}

// Reusable Luxury Product Card Component
function ProductCard({ item, onClick }) {
  return (
    <div
      className="gold-product-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${item.tamil} - ${item.english}`}
    >
      <div className="gold-card-img-box">
        <img
          src={item.image}
          alt={item.english}
          className="gold-card-img"
          loading="lazy"
        />
        <div className="gold-card-shimmer" aria-hidden="true" />
      </div>

      <div className="gold-card-meta">
        <h4 className="gold-card-tamil">{item.tamil}</h4>
        <div className="gold-card-ornament" aria-hidden="true">
          <span>✦</span>
        </div>
        <p className="gold-card-english">{item.english}</p>
      </div>

      <div className="gold-card-glow-rim" aria-hidden="true" />
    </div>
  );
}
