import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import '../styles/scroll-explore.css';

// Register GSAP ScrollTrigger plugin once safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function KVGoldScrollExplore() {
  const sectionRef = useRef(null);
  const goldBloomRef = useRef(null);
  const lineLayerRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const transparencyRef = useRef(null);
  const supportingRef = useRef(null);
  const revealMsgRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Check prefers-reduced-motion for static fallback
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (revealMsgRef.current) {
        revealMsgRef.current.style.opacity = '1';
        revealMsgRef.current.style.transform = 'none';
      }
      return;
    }

    // GSAP Context for 100% clean React cleanup
    const ctx = gsap.context(() => {
      // Master ScrollTrigger Timeline scrubbed smoothly to scroll position
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'bottom 20%',
          scrub: 1.0,
        },
      });

      // Phase 1: Scroll CTA indicator fades out & eyebrow shifts
      if (ctaRef.current) {
        tl.to(ctaRef.current, { opacity: 0, y: 25, duration: 0.25 }, 0);
      }
      if (eyebrowRef.current) {
        tl.to(eyebrowRef.current, { y: -18, opacity: 0.75, duration: 0.3 }, 0);
      }

      // Phase 1 & 2: Main heading scales & Gold Energy Bloom expands
      if (headingRef.current) {
        tl.to(headingRef.current, { scale: 1.06, y: -20, duration: 0.4 }, 0.1);
      }
      if (goldBloomRef.current) {
        tl.to(goldBloomRef.current, { scale: 1.5, opacity: 0.38, duration: 0.5 }, 0.1);
      }

      // Phase 3: "TRANSPARENCY" becomes dominant focal point
      if (transparencyRef.current) {
        tl.to(
          transparencyRef.current,
          { scale: 1.08, opacity: 1, textShadow: '0 0 35px rgba(249, 231, 159, 0.75)', duration: 0.45 },
          0.2
        );
      }

      // Phase 4: Architectural Gold Lines drift
      if (lineLayerRef.current) {
        tl.to(lineLayerRef.current, { opacity: 0.16, x: 30, duration: 0.5 }, 0.25);
      }

      // Phase 5: Reveal Message ("WHERE GOLD MEETS TRUST.")
      if (revealMsgRef.current) {
        tl.to(
          revealMsgRef.current,
          { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out' },
          0.4
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleScrollClick = () => {
    const collectionEl = document.querySelector('#gold-collection');
    if (collectionEl) {
      collectionEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="scroll-explore-section"
      ref={sectionRef}
      id="scroll-explore-gateway"
      aria-label="The KV Gold Standard - Transparency & Commitment"
    >
      {/* Layer 1: Expanding Radial Gold Energy Bloom */}
      <div className="scroll-explore-gold-bloom" ref={goldBloomRef} aria-hidden="true" />

      {/* Layer 2: Architectural Gold Lines (3 Diagonal Accents) */}
      <div className="scroll-explore-line-layer" ref={lineLayerRef} aria-hidden="true">
        <span className="scroll-explore-line line-1" />
        <span className="scroll-explore-line line-2" />
        <span className="scroll-explore-line line-3" />
      </div>

      {/* Layer 3: Faint Floating Gold Dust Particles */}
      <div className="scroll-explore-particle-layer" aria-hidden="true">
        <span className="scroll-explore-particle p-explore-1" />
        <span className="scroll-explore-particle p-explore-2" />
        <span className="scroll-explore-particle p-explore-3" />
        <span className="scroll-explore-particle p-explore-4" />
        <span className="scroll-explore-particle p-explore-5" />
        <span className="scroll-explore-particle p-explore-6" />
      </div>

      {/* Layer 4: Vignette Border Integration */}
      <div className="scroll-explore-vignette" aria-hidden="true" />

      {/* Main Centered Editorial Composition Stage */}
      <div className="scroll-explore-stage">
        {/* Eyebrow */}
        <div className="scroll-explore-eyebrow" ref={eyebrowRef}>
          <span className="eyebrow-sparkle">✦</span>
          <span>TRANSPARENCY & ASSURANCE</span>
          <span className="eyebrow-sparkle">✦</span>
        </div>

        {/* Main Title: OUR COMMITMENT TO GOLD */}
        <div className="scroll-explore-heading-box" ref={headingRef}>
          <h2 className="scroll-explore-main-title">OUR COMMITMENT TO GOLD</h2>
        </div>

        {/* Secondary Title: TRANSPARENCY */}
        <div className="scroll-explore-transparency-wrap" ref={transparencyRef}>
          <h3 className="scroll-explore-transparency-title">TRANSPARENCY</h3>
        </div>

        {/* Supporting Copy */}
        <p className="scroll-explore-supporting" ref={supportingRef}>
          At KV GOLD, every gold transaction is anchored in verified hallmarking, transparent
          pricing, and trusted documentation.
        </p>

        {/* Scroll Phase 5: Reveal Message ("WHERE GOLD MEETS TRUST.") */}
        <div className="scroll-explore-reveal-block" ref={revealMsgRef}>
          <h4 className="scroll-explore-reveal-title">WHERE GOLD MEETS TRUST.</h4>
          <p className="scroll-explore-reveal-sub">Crafted with clarity. Chosen with confidence.</p>
        </div>
      </div>

      {/* Scroll CTA Indicator (Bottom Center) */}
      <div
        className="scroll-explore-cta-wrap"
        ref={ctaRef}
        onClick={handleScrollClick}
        role="button"
        tabIndex={0}
        aria-label="Scroll down to explore KV Gold"
      >
        <div className="scroll-explore-cta-line" aria-hidden="true">
          <span className="scroll-explore-cta-line-sheen" />
        </div>
        <ChevronDown size={18} className="scroll-explore-chevron" />
        <span className="scroll-explore-cta-text">SCROLL TO EXPLORE</span>
        <span className="scroll-explore-cta-sub">THE KV GOLD STANDARD</span>
      </div>
    </section>
  );
}
