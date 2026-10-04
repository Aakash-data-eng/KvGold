import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight } from 'lucide-react';
import '../styles/gold-tree.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Data-Driven Deterministic Ornament Positions (Attached to SVG Golden Tree Branches)
const GOLD_ORNAMENTS = [
  {
    id: 'hero-necklace',
    name: 'Bridal Gold Necklace',
    tamil: 'மாங்கல்ய நெக்லஸ்',
    image: '/collection/necklaces.png',
    x: 50, // Center Top Branch
    y: 22,
    scale: 1.1,
    depth: 4, // Hero depth
    rotation: 0,
    label: '22K HALLMARKED',
    threadY1: 8,
  },
  {
    id: 'hero-temple',
    name: 'Temple Heritage Jewellery',
    tamil: 'கோவில் நகைகள்',
    image: '/collection/temple-jewellery.png',
    x: 26, // Left Upper Branch
    y: 32,
    scale: 0.96,
    depth: 4,
    rotation: -3,
    label: 'CRAFTSMANSHIP',
    threadY1: 14,
  },
  {
    id: 'hero-pendant',
    name: 'Sovereign Gold Pendant',
    tamil: 'தங்க பெண்டண்ட்',
    image: '/collection/pendants.png',
    x: 74, // Right Upper Branch
    y: 32,
    scale: 0.96,
    depth: 4,
    rotation: 3,
    label: 'SWISS GRADE 24K',
    threadY1: 14,
  },
  {
    id: 'mid-bangles',
    name: 'Antique Gold Bangles',
    tamil: 'வளையல்கள்',
    image: '/collection/bangles.png',
    x: 18, // Far Left Branch
    y: 48,
    scale: 0.85,
    depth: 3,
    rotation: -2,
    threadY1: 28,
  },
  {
    id: 'mid-earrings',
    name: 'Royal Gold Earrings',
    tamil: 'காதணிகள்',
    image: '/collection/earrings.png',
    x: 82, // Far Right Branch
    y: 48,
    scale: 0.85,
    depth: 3,
    rotation: 2,
    threadY1: 28,
  },
  {
    id: 'mid-coin',
    name: '24K Gold Sovereign Coin',
    tamil: 'தங்க நாணயம்',
    image: '/collection/gold-coins.png',
    x: 50, // Center Trunk Node
    y: 52,
    scale: 0.84,
    depth: 3,
    rotation: 0,
    label: 'SOVEREIGN WEALTH',
    threadY1: 38,
  },
  {
    id: 'far-rings',
    name: 'Diamond Cut Gold Rings',
    tamil: 'மோதிரங்கள்',
    image: '/collection/rings.png',
    x: 35, // Lower Left Branch
    y: 65,
    scale: 0.78,
    depth: 2,
    rotation: -1,
    threadY1: 45,
  },
  {
    id: 'far-anklets',
    name: 'Traditional Gold Anklets',
    tamil: 'கால்சங்கிலி',
    image: '/collection/anklets.png',
    x: 65, // Lower Right Branch
    y: 65,
    scale: 0.78,
    depth: 2,
    rotation: 1,
    threadY1: 45,
  },
  {
    id: 'far-bars',
    name: 'Bullion Gold Bar',
    tamil: 'தங்க கட்டி',
    image: '/collection/gold-bars.png',
    x: 50, // Bottom Center Root Node
    y: 76,
    scale: 0.74,
    depth: 2,
    rotation: 0,
    threadY1: 60,
  },
];

export default function GoldTreeExperience({ onOpenSchemeModal }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const rectRef = useRef(null);
  const rafRef = useRef(null);
  const ornamentRefs = useRef([]);

  // GSAP ScrollTrigger Entrance Sequence
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      // 1. Header & SVG Tree Trunk illuminate
      tl.fromTo(
        '.tree-header-wrapper',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
        .fromTo(
          '.tree-svg-container',
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 1.0, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          '.tree-thread-line',
          { opacity: 0, strokeDashoffset: 100 },
          { opacity: 0.65, strokeDashoffset: 0, duration: 0.8, stagger: 0.05 },
          '-=0.6'
        );

      // 2. Ornaments reveal progressively
      ornamentRefs.current.forEach((el, idx) => {
        if (el) {
          tl.fromTo(
            el,
            { opacity: 0, scale: 0.7, y: -20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'back.out(1.4)' },
            `-=${idx === 0 ? 0.4 : 0.62}`
          );
        }
      });

      // 3. Footer tagline & CTA reveal
      tl.fromTo(
        '.tree-footer-bar',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.2'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Pointer Movement Parallax & Physical Sway (Zero React re-renders, zero layout thrashing)
  const handlePointerEnter = () => {
    if (stageRef.current) {
      rectRef.current = stageRef.current.getBoundingClientRect();
    }
  };

  const handlePointerMove = (e) => {
    if (!rectRef.current || e.pointerType === 'touch' || !sectionRef.current) return;

    const w = rectRef.current.width || window.innerWidth;
    const h = rectRef.current.height || window.innerHeight;
    const normX = (e.clientX - rectRef.current.left) / w - 0.5;
    const normY = (e.clientY - rectRef.current.top) / h - 0.5;

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (sectionRef.current) {
          sectionRef.current.style.setProperty('--norm-x', String(normX));
          sectionRef.current.style.setProperty('--norm-y', String(normY));
          sectionRef.current.style.setProperty('--mouse-px', `${e.clientX - rectRef.current.left}px`);
          sectionRef.current.style.setProperty('--mouse-py', `${e.clientY - rectRef.current.top}px`);
          sectionRef.current.style.setProperty('--mouse-opacity', '1');
        }
      });
    }
  };

  const handlePointerLeave = () => {
    if (sectionRef.current) {
      sectionRef.current.style.setProperty('--norm-x', '0');
      sectionRef.current.style.setProperty('--norm-y', '0');
      sectionRef.current.style.setProperty('--mouse-opacity', '0');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (stageRef.current) {
        rectRef.current = stageRef.current.getBoundingClientRect();
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      className="gold-tree-section"
      ref={sectionRef}
      id="gold-tree-experience"
      aria-label="The Gold Tree - Interactive Jewellery Experience"
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Layer 1: Ambient Warm Gold Radial Bloom */}
      <div className="tree-ambient-bloom" aria-hidden="true" />

      {/* Layer 2: Interactive Showroom Spotlight */}
      <div className="tree-pointer-spotlight" aria-hidden="true" />

      {/* Layer 3: Floating Gold Dust Particles */}
      <div className="tree-particles-layer" aria-hidden="true">
        <span className="tree-dust-particle tp-1" />
        <span className="tree-dust-particle tp-2" />
        <span className="tree-dust-particle tp-3" />
        <span className="tree-dust-particle tp-4" />
        <span className="tree-dust-particle tp-5" />
        <span className="tree-dust-particle tp-6" />
      </div>

      {/* Layer 4: Vignette Border Integration */}
      <div className="tree-vignette" aria-hidden="true" />

      {/* Header Editorial Copy */}
      <div className="tree-header-wrapper">
        <div className="tree-eyebrow">
          <span className="tree-eyebrow-spark">✦</span>
          <span>THE ART OF GOLD</span>
          <span className="tree-eyebrow-spark">✦</span>
        </div>
        <h2 className="tree-main-title">WHERE GOLD TAKES FORM</h2>
        <p className="tree-subtitle">
          A living expression of craftsmanship, tradition and timeless value.
        </p>
      </div>

      {/* Interactive Tree Stage */}
      <div className="tree-stage-wrapper" ref={stageRef}>
        {/* SVG Golden Tree Base Silhouette & Branch Architecture */}
        <svg
          className="tree-svg-container"
          viewBox="0 0 1000 620"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Golden Tree Silhouette"
        >
          <defs>
            {/* Trunk & Branch Metallic Gold Gradient */}
            <linearGradient id="goldTrunkGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#350610" />
              <stop offset="35%" stopColor="#8C6A18" />
              <stop offset="70%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#FFF2B2" />
            </linearGradient>

            {/* Thread Gradient */}
            <linearGradient id="goldThreadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF2B2" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.4" />
            </linearGradient>

            {/* Glowing Attachment Node Filter */}
            <filter id="nodeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Golden Tree Trunk Base */}
          <path
            d="M500 600 C490 540, 480 480, 500 420 C520 360, 510 300, 500 240 C490 180, 500 120, 500 80"
            fill="none"
            stroke="url(#goldTrunkGrad)"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Major Limbs & Branches (Symmetrical Luxury Arching) */}
          {/* Upper Crown Branches */}
          <path d="M500 240 Q420 180 320 160" fill="none" stroke="url(#goldTrunkGrad)" strokeWidth="7" strokeLinecap="round" />
          <path d="M500 240 Q580 180 680 160" fill="none" stroke="url(#goldTrunkGrad)" strokeWidth="7" strokeLinecap="round" />

          {/* Upper Left & Right Mid Branches */}
          <path d="M495 310 Q380 260 260 210" fill="none" stroke="url(#goldTrunkGrad)" strokeWidth="8" strokeLinecap="round" />
          <path d="M505 310 Q620 260 740 210" fill="none" stroke="url(#goldTrunkGrad)" strokeWidth="8" strokeLinecap="round" />

          {/* Lower Outer Branches */}
          <path d="M490 390 Q340 340 180 300" fill="none" stroke="url(#goldTrunkGrad)" strokeWidth="9" strokeLinecap="round" />
          <path d="M510 390 Q660 340 820 300" fill="none" stroke="url(#goldTrunkGrad)" strokeWidth="9" strokeLinecap="round" />

          {/* Lower Secondary Shoots */}
          <path d="M492 440 Q390 420 350 400" fill="none" stroke="url(#goldTrunkGrad)" strokeWidth="6" strokeLinecap="round" />
          <path d="M508 440 Q610 420 650 400" fill="none" stroke="url(#goldTrunkGrad)" strokeWidth="6" strokeLinecap="round" />

          {/* Filigree Leaves & Glowing Attachment Nodes */}
          <circle cx="500" cy="80" r="5" fill="#FFF7DB" filter="url(#nodeGlow)" />
          <circle cx="320" cy="160" r="4.5" fill="#F9E79F" filter="url(#nodeGlow)" />
          <circle cx="680" cy="160" r="4.5" fill="#F9E79F" filter="url(#nodeGlow)" />
          <circle cx="260" cy="210" r="5" fill="#FFF2B2" filter="url(#nodeGlow)" />
          <circle cx="740" cy="210" r="5" fill="#FFF2B2" filter="url(#nodeGlow)" />
          <circle cx="180" cy="300" r="5.5" fill="#F9E79F" filter="url(#nodeGlow)" />
          <circle cx="820" cy="300" r="5.5" fill="#F9E79F" filter="url(#nodeGlow)" />
          <circle cx="350" cy="400" r="4" fill="#D4AF37" />
          <circle cx="650" cy="400" r="4" fill="#D4AF37" />

          {/* SVG Golden Thread Connectors to Hanging Ornaments */}
          {GOLD_ORNAMENTS.map((ornament) => {
            const nodeX = (ornament.x / 100) * 1000;
            const targetY = (ornament.y / 100) * 620;
            const startY = (ornament.threadY1 / 100) * 620;

            return (
              <line
                key={`thread-${ornament.id}`}
                x1={nodeX}
                y1={startY}
                x2={nodeX}
                y2={targetY}
                className="tree-thread-line"
              />
            );
          })}
        </svg>

        {/* Data-Driven Hanging Gold Ornaments */}
        {GOLD_ORNAMENTS.map((ornament, idx) => (
          <div
            key={ornament.id}
            ref={(el) => (ornamentRefs.current[idx] = el)}
            className="tree-ornament-item"
            data-depth={ornament.depth}
            style={{
              left: `${ornament.x}%`,
              top: `${ornament.y}%`,
              transform: `translate(-50%, -10%) scale(${ornament.scale})`,
              '--base-rot': `${ornament.rotation}deg`,
            }}
            onClick={() =>
              onOpenSchemeModal && onOpenSchemeModal(`${ornament.name} Scheme`)
            }
            role="button"
            tabIndex={0}
            aria-label={`${ornament.tamil} - ${ornament.name}`}
          >
            <div className="ornament-inner-card">
              <img
                src={ornament.image}
                alt={ornament.name}
                className="ornament-img"
                loading="lazy"
              />
              <div className="ornament-shimmer-glint" aria-hidden="true" />
              {ornament.label && (
                <span className="ornament-hero-label">{ornament.label}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Tagline & Exploration Button */}
      <div className="tree-footer-bar">
        <span className="tree-tagline-text">
          FROM ROOTS TO RADIANCE • CRAFTED FOR GENERATIONS
        </span>
        <button
          type="button"
          className="tree-explore-btn"
          onClick={() =>
            onOpenSchemeModal && onOpenSchemeModal('தங்க நகை சேமிப்புத் திட்டம்')
          }
        >
          <Sparkles size={15} />
          <span>EXPLORE THE GOLD COLLECTION</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </section>
  );
}
