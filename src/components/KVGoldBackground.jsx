import React, { useEffect, useRef } from 'react';

/**
 * KVGoldBackground — Brand New Global Luxury Background Component
 * Full-Website Atmosphere: Dark Black + Deep Burgundy + Flowing Gold Waves + Gold Dust + Gold Blooms
 */
export default function KVGoldBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Motion preference check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // Gold Wave Ribbons configuration
    const waves = [
      {
        yRatio: 0.18,
        amplitude: 65,
        frequency: 0.0018,
        speed: 0.0004,
        phase: 0,
        lineWidth: 2.8,
        colorStart: 'rgba(232, 214, 163, 0.28)',
        colorMid: 'rgba(212, 175, 98, 0.22)',
        colorEnd: 'rgba(138, 100, 46, 0.05)',
      },
      {
        yRatio: 0.38,
        amplitude: 85,
        frequency: 0.0012,
        speed: -0.0003,
        phase: 1.5,
        lineWidth: 3.5,
        colorStart: 'rgba(249, 231, 159, 0.25)',
        colorMid: 'rgba(184, 138, 59, 0.20)',
        colorEnd: 'rgba(110, 15, 28, 0.08)',
      },
      {
        yRatio: 0.62,
        amplitude: 75,
        frequency: 0.0015,
        speed: 0.00035,
        phase: 3.1,
        lineWidth: 3.0,
        colorStart: 'rgba(212, 175, 98, 0.26)',
        colorMid: 'rgba(201, 162, 77, 0.18)',
        colorEnd: 'rgba(138, 100, 46, 0.05)',
      },
      {
        yRatio: 0.84,
        amplitude: 95,
        frequency: 0.0010,
        speed: -0.00025,
        phase: 4.8,
        lineWidth: 4.0,
        colorStart: 'rgba(232, 214, 163, 0.24)',
        colorMid: 'rgba(184, 138, 59, 0.18)',
        colorEnd: 'rgba(122, 0, 25, 0.08)',
      },
    ];

    // Gold Dust particles pool
    const particleCount = width < 768 ? 40 : 75;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      baseOpacity: Math.random() * 0.45 + 0.15,
      pulseSpeed: Math.random() * 0.015 + 0.005,
      pulseAngle: Math.random() * Math.PI * 2,
      speedY: -(Math.random() * 0.25 + 0.08),
      speedX: (Math.random() - 0.5) * 0.15,
      color: Math.random() > 0.4 ? '#E8D6A3' : '#D4AF62',
    }));

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Flowing Gold Wave Field Ribbons
      waves.forEach((w) => {
        if (!prefersReducedMotion) {
          w.phase += w.speed;
        }

        const baseY = height * w.yRatio;

        ctx.save();
        ctx.beginPath();

        const grad = ctx.createLinearGradient(0, baseY - w.amplitude, width, baseY + w.amplitude);
        grad.addColorStop(0, w.colorStart);
        grad.addColorStop(0.5, w.colorMid);
        grad.addColorStop(1, w.colorEnd);

        ctx.strokeStyle = grad;
        ctx.lineWidth = w.lineWidth;
        ctx.lineCap = 'round';

        // Draw smooth wave curve across viewport width
        let started = false;
        for (let x = -20; x <= width + 20; x += 12) {
          const y = baseY + Math.sin(x * w.frequency + w.phase) * w.amplitude + Math.cos(x * w.frequency * 0.6 + w.phase * 0.8) * (w.amplitude * 0.35);

          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        ctx.restore();
      });

      // 2. Draw Sparse Shimmering Gold Dust Particles
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.y += p.speedY;
          p.x += p.speedX;
          p.pulseAngle += p.pulseSpeed;

          // Wrap around edges seamlessly
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
        }

        const currentOpacity = Math.max(0.08, p.baseOpacity + Math.sin(p.pulseAngle) * 0.2);

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentOpacity;
        ctx.fill();
        ctx.restore();
      });

      time += 1;
      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <div className="kv-global-background-root" aria-hidden="true">
      {/* Layer 1: Base Dark Black & Burgundy Atmospheric Glows */}
      <div className="kv-bg-base-layer" />

      {/* Layer 2: Gold Light Blooms */}
      <div className="kv-bg-gold-blooms" />

      {/* Layer 3: Canvas for Flowing Gold Waves & Stardust Particles */}
      <canvas ref={canvasRef} className="kv-bg-wave-canvas" />

      {/* Layer 4: Soft Vignette Depth */}
      <div className="kv-bg-vignette-overlay" />

      <style>{`
        .kv-global-background-root {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
          background-color: #060404;
        }

        .kv-bg-base-layer {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212, 175, 98, 0.22) 0%, rgba(122, 0, 25, 0.26) 38%, transparent 70%),
            radial-gradient(ellipse 65% 55% at 12% 28%, rgba(115, 20, 32, 0.32) 0%, transparent 65%),
            radial-gradient(ellipse 70% 50% at 88% 50%, rgba(185, 138, 48, 0.18) 0%, rgba(90, 12, 22, 0.26) 42%, transparent 68%),
            radial-gradient(ellipse 65% 55% at 15% 78%, rgba(115, 20, 32, 0.30) 0%, transparent 60%),
            radial-gradient(ellipse 85% 55% at 50% 100%, rgba(212, 175, 98, 0.20) 0%, rgba(100, 16, 26, 0.28) 45%, transparent 75%),
            #060404;
        }

        .kv-bg-gold-blooms {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle 450px at 50% 12%, rgba(249, 231, 159, 0.14) 0%, transparent 70%),
            radial-gradient(circle 500px at 8% 45%, rgba(212, 175, 98, 0.12) 0%, transparent 70%),
            radial-gradient(circle 500px at 92% 70%, rgba(212, 175, 98, 0.12) 0%, transparent 70%);
        }

        .kv-bg-wave-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: block;
          opacity: 0.95;
        }

        .kv-bg-vignette-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 40%, rgba(6, 4, 4, 0.45) 80%, rgba(6, 4, 4, 0.75) 100%);
        }

        @media (max-width: 768px) {
          .kv-bg-base-layer {
            background:
              radial-gradient(ellipse 90% 50% at 50% 0%, rgba(212, 175, 98, 0.18) 0%, rgba(122, 0, 25, 0.22) 40%, transparent 70%),
              radial-gradient(ellipse 70% 50% at 90% 50%, rgba(185, 138, 48, 0.14) 0%, rgba(90, 12, 22, 0.20) 45%, transparent 70%),
              radial-gradient(ellipse 90% 55% at 50% 100%, rgba(212, 175, 98, 0.16) 0%, rgba(100, 16, 26, 0.22) 45%, transparent 75%),
              #060404;
          }
        }
      `}</style>
    </div>
  );
}
