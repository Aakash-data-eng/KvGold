import React, { useRef, useEffect, useState } from 'react';
import { Award } from 'lucide-react';
import '../styles/hero.css';

const TOTAL_FRAMES = 115; // 0.0s to 7.15s (strictly terminates before any pricing/rate content)

export default function Hero({ onOpenSchemeModal }) {
  const trackRef = useRef(null);
  const canvasRef = useRef(null);

  // Direct DOM Refs for 60fps style updates with zero React re-renders
  const phase1Ref = useRef(null);
  const phase2Ref = useRef(null);
  const grandRevealRef = useRef(null);

  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Accessibility: check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsReducedMotion(true);
      return;
    }

    const canvas = canvasRef.current;
    const track = trackRef.current;
    if (!canvas || !track) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Set fixed high-res 16:9 canvas dimensions matching original video master
    canvas.width = 1280;
    canvas.height = 720;

    // ------------------------------------------------------------------------
    // PRELOAD WEBP FRAME SEQUENCE (Ultra-Fast Canvas Scrubbing)
    // ------------------------------------------------------------------------
    const images = new Array(TOTAL_FRAMES);
    let lastDrawnIndex = -1;

    const getFrameSrc = (index) => {
      const numStr = String(index + 1).padStart(3, '0');
      return `/gold-frames/frame_${numStr}.webp`;
    };

    // Helper to draw a specific frame onto the canvas
    const drawFrame = (index) => {
      if (index === lastDrawnIndex) return;
      const img = images[index];

      if (img && img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, 0, 0, 1280, 720);
        lastDrawnIndex = index;
        return;
      }

      // If requested frame is still downloading, find nearest loaded frame
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = index - offset;
        if (prev >= 0 && images[prev] && images[prev].complete && images[prev].naturalWidth > 0) {
          ctx.drawImage(images[prev], 0, 0, 1280, 720);
          lastDrawnIndex = prev;
          return;
        }
        const next = index + offset;
        if (next < TOTAL_FRAMES && images[next] && images[next].complete && images[next].naturalWidth > 0) {
          ctx.drawImage(images[next], 0, 0, 1280, 720);
          lastDrawnIndex = next;
          return;
        }
      }
    };

    // Load Frame 1 immediately for instant render on first paint
    const firstImg = new Image();
    firstImg.src = getFrameSrc(0);
    images[0] = firstImg;
    firstImg.onload = () => {
      drawFrame(0);
    };

    // Background progressive loader for all remaining frames
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      images[i] = img;
    }

    // ------------------------------------------------------------------------
    // SCROLL TRACKING & SNAPPY RAF INTERPOLATION
    // ------------------------------------------------------------------------
    let targetProgress = 0;
    let currentProgress = 0;
    let isLoopRunning = false;
    let isHeroVisible = true;
    let rafId = null;

    let trackHeight = track.offsetHeight || window.innerHeight * 3.4;
    let maxScroll = Math.max(1, trackHeight - window.innerHeight);

    const updateDimensions = () => {
      if (track) {
        trackHeight = track.offsetHeight || window.innerHeight * 3.4;
        maxScroll = Math.max(1, trackHeight - window.innerHeight);
      }
    };
    window.addEventListener('resize', updateDimensions, { passive: true });

    // IntersectionObserver to sleep the RAF loop when hero is offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isHeroVisible = entry.isIntersecting;
        if (!isHeroVisible && isLoopRunning) {
          isLoopRunning = false;
          if (rafId) cancelAnimationFrame(rafId);
        } else if (isHeroVisible && !isLoopRunning) {
          triggerTick();
        }
      },
      { threshold: 0.01 }
    );
    observer.observe(track);

    // Main animation frame tick (0.05ms execution per frame)
    const tick = () => {
      if (!isHeroVisible) {
        isLoopRunning = false;
        return;
      }

      // Snappy, silky smooth lerp factor (0.24 pairs effortlessly with Lenis smooth scroll)
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.0003) {
        currentProgress += diff * 0.24;
      } else {
        currentProgress = targetProgress;
      }

      // Draw active frame onto canvas
      const frameIndex = Math.min(
        Math.max(0, Math.round(currentProgress * (TOTAL_FRAMES - 1))),
        TOTAL_FRAMES - 1
      );
      drawFrame(frameIndex);

      // ----------------------------------------------------------------------
      // PHASED STORYTELLING DIRECT DOM STYLING (ZERO OVERLAP GUARANTEED)
      // ----------------------------------------------------------------------

      // Phase 1 (Left Side Intro):
      // The moment the user starts scrolling (> 0.015), it IMMEDIATELY disappears!
      // When scrolling, "நம்பிக்கையின் சிகரம்..." is 100% removed!
      if (phase1Ref.current) {
        if (currentProgress > 0.015) {
          phase1Ref.current.style.opacity = '0';
          phase1Ref.current.style.visibility = 'hidden';
          phase1Ref.current.style.pointerEvents = 'none';
        } else {
          phase1Ref.current.style.opacity = '1';
          phase1Ref.current.style.visibility = 'visible';
          phase1Ref.current.style.pointerEvents = 'auto';
        }
      }

      // Phase 2 (Right Side Tamil Heritage Quote):
      // Only appears during scroll between 0.10 and 0.65.
      // Pure text with zero background boxes!
      if (phase2Ref.current) {
        if (currentProgress >= 0.10 && currentProgress <= 0.65) {
          let p2Opacity = 1;
          if (currentProgress < 0.22) {
            p2Opacity = (currentProgress - 0.10) / 0.12;
          } else if (currentProgress > 0.50) {
            p2Opacity = Math.max(0, 1 - (currentProgress - 0.50) / 0.15);
          }
          phase2Ref.current.style.opacity = String(p2Opacity);
          phase2Ref.current.style.visibility = 'visible';
        } else {
          phase2Ref.current.style.opacity = '0';
          phase2Ref.current.style.visibility = 'hidden';
        }
      }

      // Phase 3 (Royal Tamil Quote at Full Scroll > 0.70):
      // Pure poetic text at the bottom - zero background box!
      if (grandRevealRef.current) {
        if (currentProgress >= 0.70) {
          const grOpacity = Math.min(1, (currentProgress - 0.70) / 0.12);
          grandRevealRef.current.style.opacity = String(grOpacity);
          grandRevealRef.current.style.visibility = 'visible';
        } else {
          grandRevealRef.current.style.opacity = '0';
          grandRevealRef.current.style.visibility = 'hidden';
        }
      }

      // Settle check: only keep RAF active while interpolating
      const isProgressSettled = Math.abs(targetProgress - currentProgress) <= 0.0003;

      if (!isProgressSettled) {
        rafId = requestAnimationFrame(tick);
      } else {
        isLoopRunning = false;
      }
    };

    const triggerTick = () => {
      if (!isLoopRunning && isHeroVisible) {
        isLoopRunning = true;
        rafId = requestAnimationFrame(tick);
      }
    };

    // Passive, zero-reflow scroll handler
    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      targetProgress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
      triggerTick();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial sync
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateDimensions);
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="hero-product-scroll-track" id="hero" ref={trackRef}>
      {/* Pinned Sticky Luxury Stage */}
      <section className="hero-product-sticky-stage" aria-label="KV Gold Sovereign Presentation">
        {/* Layer 0: Warm Radial Lighting Accent */}
        <div className="hero-ambient-glow" aria-hidden="true" />

        {/* Layer 1: Butter-Smooth Scroll-Scrubbed Canvas (60–120 FPS Zero-Lag) */}
        <div className="hero-video-layer">
          <canvas
            ref={canvasRef}
            className="hero-scrub-canvas"
            aria-hidden="true"
          />
        </div>

        {/* Layer 2: Subtle Luxury Vignette & Dark Burgundy Depth */}
        <div className="hero-video-vignette" aria-hidden="true" />

        {/* Layer 3: Floating Golden Dust & Sparkles */}
        <div className="hero-gold-dust-container" aria-hidden="true">
          <span className="dust-particle p-1" />
          <span className="dust-particle p-2" />
          <span className="dust-particle p-3" />
          <span className="dust-particle p-4" />
          <span className="dust-particle p-5" />
          <span className="dust-particle p-6" />
        </div>

        {/* Layer 4: Phased Storytelling Text Overlays (Zero Overlap Guaranteed) */}

        {/* Phase 1: Initial Hero Screen (Disappears completely on scroll) */}
        <div className="hero-story-overlay hero-phase-1" ref={phase1Ref}>
          <div className="hero-subtle-badge">
            <Award size={14} style={{ color: 'var(--color-gold-bright)' }} />
            <span className="hero-subtle-badge-text">✦ 100% தூய 916 BIS ஹால்மார்க் தங்கம் ✦</span>
          </div>

          <h1 className="hero-phase-title">
            நம்பிக்கையின் சிகரம்.{' '}
            <span className="shimmer-gold-text">தூய 22 கேரட் தங்கம்.</span>
          </h1>

          <p className="hero-phase-desc">
            பரம்பரை பொற்கொல்லர்களின் கைவண்ணத்தில் உருவான ராஜ மாங்காய் இலை ஆரம். கீழே ஸ்க்ரோல் செய்து இந்த நிகரற்ற தங்கக் கலைப்படைப்பை தரிசியுங்கள்.
          </p>
        </div>

        {/* Phase 2: Poetic Tamil Heritage Quote on Right (Pure Text - NO Background Box) */}
        <div className="hero-story-overlay hero-phase-2" ref={phase2Ref} style={{ opacity: 0, visibility: 'hidden' }}>
          <p className="hero-quote-serif">
            "தென்னகத்து திருமண மங்கலத்தின் புனிதமும், தலைமுறை தலைமுறையாய் நிலைத்து நிற்கும் தூய அன்பின் பொன் சாட்சியும் இதுவே."
          </p>
          <div className="hero-quote-caption">
            ✦ BIS 916 இறையாண்மைப் பொன் • பாரம்பரியக் கைவினைத்திறன் ✦
          </div>
        </div>

        {/* Phase 3: Royal Tamil Gold Quote at Full Scroll - NO Background Box (100% Unobstructed Video View) */}
        <div className="hero-finale-text-overlay" ref={grandRevealRef} style={{ opacity: 0, visibility: 'hidden' }}>
          <h2 className="hero-finale-title">“என்றும் குறையாத மங்கலம் • தலைமுறை காக்கும் பொன் செல்வம்”</h2>
          <p className="hero-finale-sub">✦ தூய்மையின் அடையாளம் • உங்கள் குடும்பத்தின் பெருமை • KV GOLD ✦</p>
        </div>
      </section>
    </div>
  );
}
