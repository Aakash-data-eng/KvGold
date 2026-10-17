import React, { useRef, useEffect } from 'react';

export interface MurmurationPalette {
  skyTop?: string;
  skyLow?: string;
  sun?: string;
  ink?: string;
}

export interface MurmurationWordmarkProps {
  word?: string;
  birds?: number;
  preset?: 'night' | 'dusk' | 'dawn' | 'paper';
  palette?: MurmurationPalette;
  flyFor?: number;
  holdFor?: number;
  reeds?: boolean;
  interactive?: boolean;
  height?: string | number;
  className?: string;
  wordPositionY?: number; // 0.0 to 1.0 (default 0.24 for framing in upper atmosphere)
}

const PRESETS: Record<string, Required<MurmurationPalette>> = {
  night: {
    skyTop: '#100307',
    skyLow: '#260810',
    sun: '#9A6A28',
    ink: '#E4C777',
  },
  dusk: {
    skyTop: '#1b1b3a',
    skyLow: '#693668',
    sun: '#d9822b',
    ink: '#110b11',
  },
  dawn: {
    skyTop: '#1a2238',
    skyLow: '#f2a65a',
    sun: '#ffe57f',
    ink: '#18121e',
  },
  paper: {
    skyTop: '#f7f4ea',
    skyLow: '#e8dec8',
    sun: '#d4af37',
    ink: '#2b221b',
  },
};

interface Boid {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  hasTarget: boolean;
  size: number;
  wingPhase: number;
  wingSpeed: number;
  color: string;
  maxSpeed: number;
  personalNoiseOffset: number;
}

export default function MurmurationWordmark({
  word = 'GOLD',
  birds = 1800,
  preset = 'night',
  palette: customPalette,
  flyFor = 6,
  holdFor = 2.5,
  reeds = false,
  interactive = false,
  height = '100%',
  className = '',
  wordPositionY,
}: MurmurationWordmarkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Active palette configuration
  const activePalette = {
    ...(PRESETS[preset] || PRESETS.night),
    ...customPalette,
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let heightPx = 0;
    let dpr = 1;
    let isVisible = false;
    let rafId: number | null = null;
    let isReducedMotion = false;

    // Check prefers-reduced-motion
    if (typeof window !== 'undefined') {
      isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    // Adaptive bird count for mobile performance
    const isMobileViewport = typeof window !== 'undefined' && window.innerWidth < 768;
    const actualBirdCount = isMobileViewport ? Math.min(birds, 950) : birds;

    // State machine: 'FLYING' | 'CONVERGING' | 'HOLDING' | 'SCATTERING'
    let state: 'FLYING' | 'CONVERGING' | 'HOLDING' | 'SCATTERING' = 'FLYING';
    let stateTimer = 0;
    let lastTime = performance.now();

    // Flock center trajectory for organic undulating waves
    let wavePhaseX = Math.random() * Math.PI * 2;
    let wavePhaseY = Math.random() * Math.PI * 2;

    // Golden ink color variations for shimmer
    const inkBase = activePalette.ink;
    const shimmerColors = [
      inkBase,
      '#FFF0B8',
      '#F9E79F',
      '#D4AF37',
      '#E8C868',
      '#C59B27',
    ];

    // Initialize boids
    const boids: Boid[] = [];
    const initBoids = (w: number, h: number) => {
      boids.length = 0;
      for (let i = 0; i < actualBirdCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2.0 + Math.random() * 2.8;
        boids.push({
          x: Math.random() * (w || 1000),
          y: Math.random() * (h || 600),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          targetX: 0,
          targetY: 0,
          hasTarget: false,
          size: 1.3 + Math.random() * 1.5,
          wingPhase: Math.random() * Math.PI * 2,
          wingSpeed: 0.18 + Math.random() * 0.16,
          color: shimmerColors[i % shimmerColors.length],
          maxSpeed: 3.5 + Math.random() * 2.0,
          personalNoiseOffset: Math.random() * 100,
        });
      }
    };

    // Extract target points from offscreen rendering of the word
    let wordTargets: { x: number; y: number }[] = [];
    let activeCenterY = 220;

    const computeWordTargets = (w: number, h: number) => {
      if (!w || !h) return;
      const offCanvas = document.createElement('canvas');
      const offCtx = offCanvas.getContext('2d');
      if (!offCtx) return;

      offCanvas.width = w;
      offCanvas.height = h;

      const targetCenterX = w * 0.5;

      // Position wordmark cleanly in the open atmospheric horizon between header and timeline
      const isMobile = w < 768;
      let targetCenterY = wordPositionY !== undefined
        ? (wordPositionY <= 1.0 ? h * wordPositionY : wordPositionY)
        : (isMobile ? 210 : 350);

      activeCenterY = targetCenterY;

      // Responsive font size tailored to available atmospheric opening
      const fontSize = isMobile
        ? Math.min(Math.max(w * 0.16, 44), 74)
        : Math.min(Math.max(w * 0.12, 75), 135);

      offCtx.font = `900 ${Math.round(fontSize)}px "Cinzel", "Plus Jakarta Sans", "Times New Roman", serif`;
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.lineWidth = Math.max(3.5, fontSize * 0.045);
      offCtx.strokeStyle = '#FFFFFF';
      offCtx.fillStyle = '#FFFFFF';
      offCtx.strokeText(word, targetCenterX, targetCenterY);
      offCtx.fillText(word, targetCenterX, targetCenterY);

      const imgData = offCtx.getImageData(0, 0, w, h);
      const data = imgData.data;
      const points: { x: number; y: number }[] = [];

      // Sample pixels along letter strokes
      const step = isMobile ? 2 : 3;
      for (let py = 0; py < h; py += step) {
        for (let px = 0; px < w; px += step) {
          const idx = (py * w + px) * 4;
          if (data[idx + 3] > 120) {
            points.push({ x: px, y: py });
          }
        }
      }

      // Shuffle points randomly for organic starling distribution
      for (let i = points.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = points[i];
        points[i] = points[j];
        points[j] = temp;
      }

      wordTargets = points;

      // Assign targets to boids
      boids.forEach((boid, idx) => {
        if (points.length > 0) {
          const pt = points[idx % points.length];
          boid.targetX = pt.x + (Math.random() - 0.5) * 1.5;
          boid.targetY = pt.y + (Math.random() - 0.5) * 1.5;
          boid.hasTarget = true;
        } else {
          boid.hasTarget = false;
        }
      });
    };

    // Pointer hawk coordinates (if interactive)
    let pointerX = -9999;
    let pointerY = -9999;
    const handlePointerMove = (e: PointerEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      pointerX = e.clientX - rect.left;
      pointerY = e.clientY - rect.top;
    };
    const handlePointerLeave = () => {
      pointerX = -9999;
      pointerY = -9999;
    };

    if (interactive) {
      canvas.addEventListener('pointermove', handlePointerMove, { passive: true });
      canvas.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    }

    // Resize handler
    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      width = Math.floor(rect.width);
      heightPx = Math.floor(rect.height);

      if (width <= 0 || heightPx <= 0) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(heightPx * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${heightPx}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (boids.length === 0) {
        initBoids(width, heightPx);
      }
      computeWordTargets(width, heightPx);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });
    resizeObserver.observe(container);
    updateDimensions();

    // Intersection observer to halt RAF when offscreen
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !rafId) {
          lastTime = performance.now();
          rafId = requestAnimationFrame(animateLoop);
        } else if (!isVisible && rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
      { rootMargin: '200px 0px 200px 0px' }
    );
    intersectionObserver.observe(container);

    // Main animation loop
    const animateLoop = (now: number) => {
      if (!isVisible) {
        rafId = null;
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      stateTimer += dt;

      if (typeof window !== 'undefined') {
        (window as any).__murmuration = {
          state,
          stateTimer: Math.round(stateTimer * 10) / 10,
          activeCenterY,
          targetCount: wordTargets.length,
          boidsWithTarget: boids.filter(b => b.hasTarget).length,
        };
      }

      // State transitions
      if (state === 'FLYING' && stateTimer >= flyFor) {
        state = 'CONVERGING';
        stateTimer = 0;
      } else if (state === 'CONVERGING' && stateTimer >= 3.2) {
        state = 'HOLDING';
        stateTimer = 0;
      } else if (state === 'HOLDING' && stateTimer >= holdFor) {
        state = 'SCATTERING';
        stateTimer = 0;

        // Disperse with burst velocities radiating outwards from word center
        const targetCenterX = width * 0.5;
        boids.forEach((b) => {
          const dx = b.x - targetCenterX;
          const dy = b.y - activeCenterY;
          const dist = Math.hypot(dx, dy) || 1;
          const burstMag = 5.2 + Math.random() * 6.5;
          b.vx = (dx / dist) * burstMag + (Math.random() - 0.5) * 4;
          b.vy = (dy / dist) * burstMag + (Math.random() - 0.5) * 4;
        });
      } else if (state === 'SCATTERING' && stateTimer >= 1.6) {
        state = 'FLYING';
        stateTimer = 0;
      }

      // Update wave currents
      wavePhaseX += dt * 0.45;
      wavePhaseY += dt * 0.35;
      const waveTargetX = width * 0.5 + Math.sin(wavePhaseX) * (width * 0.35);
      const waveTargetY = heightPx * 0.32 + Math.cos(wavePhaseY) * (heightPx * 0.22);

      // Clear canvas
      ctx.clearRect(0, 0, width, heightPx);

      // Draw subtle background sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, heightPx);
      skyGrad.addColorStop(0, activePalette.skyTop || '#100307');
      skyGrad.addColorStop(0.55, activePalette.skyLow || '#260810');
      skyGrad.addColorStop(1, '#0C0205');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, heightPx);

      // Draw atmospheric golden sunlight glow
      if (activePalette.sun) {
        const sunGrad = ctx.createRadialGradient(
          width * 0.5,
          activeCenterY,
          10,
          width * 0.5,
          activeCenterY,
          Math.min(width * 0.45, 380)
        );
        sunGrad.addColorStop(0, 'rgba(154, 106, 40, 0.22)');
        sunGrad.addColorStop(0.5, 'rgba(122, 0, 25, 0.12)');
        sunGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = sunGrad;
        ctx.fillRect(0, 0, width, heightPx);
      }

      // During wordmark HOLDING state, render an ultra-smooth golden aura behind the letter formation
      if (state === 'HOLDING') {
        const wordGlow = ctx.createRadialGradient(
          width * 0.5,
          activeCenterY,
          20,
          width * 0.5,
          activeCenterY,
          Math.min(width * 0.38, 280)
        );
        wordGlow.addColorStop(0, 'rgba(249, 231, 159, 0.28)');
        wordGlow.addColorStop(0.5, 'rgba(212, 175, 55, 0.12)');
        wordGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = wordGlow;
        ctx.fillRect(0, 0, width, heightPx);
      }

      // Update and render boids
      const boidCount = boids.length;
      const speedMultiplier = isReducedMotion ? 0.3 : 1.0;

      for (let i = 0; i < boidCount; i++) {
        const b = boids[i];

        if (state === 'HOLDING') {
          // Precise hover shimmer around target letter coordinates
          if (b.hasTarget) {
            const jitterX = Math.sin(now * 0.003 + b.personalNoiseOffset) * 1.3;
            const jitterY = Math.cos(now * 0.0035 + b.personalNoiseOffset) * 1.1;
            b.x += (b.targetX + jitterX - b.x) * 0.35;
            b.y += (b.targetY + jitterY - b.y) * 0.35;
            b.vx = jitterX * 0.5;
            b.vy = jitterY * 0.5;
          }
        } else if (state === 'CONVERGING') {
          // Dynamic starling arrival ease into letter formation
          if (b.hasTarget) {
            const dx = b.targetX - b.x;
            const dy = b.targetY - b.y;
            const dist = Math.hypot(dx, dy);

            const maxApproachSpeed = Math.min(Math.max(b.maxSpeed, dist * 0.09), 16);
            const rampedSpeed = maxApproachSpeed * Math.min(dist / 40, 1.0);
            const targetVx = (dx / (dist || 1)) * rampedSpeed;
            const targetVy = (dy / (dist || 1)) * rampedSpeed;

            const steerFactor = dist < 50 ? 0.22 : 0.14;
            b.vx += (targetVx - b.vx) * steerFactor;
            b.vy += (targetVy - b.vy) * steerFactor;
          }
        } else {
          // 'FLYING' & 'SCATTERING': Organic murmuration swarm steering
          // 1. Pull towards undulating wave center
          const toWaveX = waveTargetX - b.x;
          const toWaveY = waveTargetY - b.y;
          const waveDist = Math.hypot(toWaveX, toWaveY) || 1;

          b.vx += (toWaveX / waveDist) * 0.15;
          b.vy += (toWaveY / waveDist) * 0.15;

          // 2. Swirling turbulent curl
          const curlAngle = Math.sin(b.x * 0.005 + wavePhaseX) * Math.cos(b.y * 0.005 + wavePhaseY);
          b.vx += Math.cos(curlAngle) * 0.22;
          b.vy += Math.sin(curlAngle) * 0.22;

          // 3. Pointer Hawk avoidance (if interactive)
          if (interactive && pointerX > 0 && pointerY > 0) {
            const hawkDx = b.x - pointerX;
            const hawkDy = b.y - pointerY;
            const hawkDist = Math.hypot(hawkDx, hawkDy);
            if (hawkDist < 120) {
              const repel = (120 - hawkDist) / 120;
              b.vx += (hawkDx / (hawkDist || 1)) * repel * 4.5;
              b.vy += (hawkDy / (hawkDist || 1)) * repel * 4.5;
            }
          }

          // 4. Soft screen boundary containment
          const pad = 40;
          if (b.x < pad) b.vx += 0.4;
          if (b.x > width - pad) b.vx -= 0.4;
          if (b.y < pad) b.vy += 0.4;
          if (b.y > heightPx - pad) b.vy -= 0.4;

          // Cap speed
          const currentSpeed = Math.hypot(b.vx, b.vy);
          if (currentSpeed > b.maxSpeed) {
            b.vx = (b.vx / currentSpeed) * b.maxSpeed;
            b.vy = (b.vy / currentSpeed) * b.maxSpeed;
          }
        }

        // Apply position update
        b.x += b.vx * speedMultiplier;
        b.y += b.vy * speedMultiplier;

        // Animate wing flap
        b.wingPhase += b.wingSpeed * (Math.hypot(b.vx, b.vy) + 1.0) * speedMultiplier;

        // Render bird silhouette
        const angle = Math.atan2(b.vy, b.vx);
        const wingFlap = Math.sin(b.wingPhase) * b.size * 1.5;

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(angle);

        ctx.beginPath();
        // Nose beak tip
        ctx.moveTo(b.size * 1.4, 0);
        // Left wing tip
        ctx.lineTo(-b.size * 0.4, -b.size * 2.2 + wingFlap);
        // Tail notch
        ctx.lineTo(-b.size * 0.2, 0);
        // Right wing tip
        ctx.lineTo(-b.size * 0.4, b.size * 2.2 - wingFlap);
        ctx.closePath();

        ctx.fillStyle = b.color;
        ctx.fill();

        ctx.restore();
      }

      // Optional reeds silhouette (disabled for luxury jewellery aesthetic)
      if (reeds) {
        ctx.fillStyle = '#060102';
        for (let rx = 0; rx < width; rx += 14) {
          const rh = 35 + Math.sin(rx * 0.05 + wavePhaseX) * 15;
          ctx.beginPath();
          ctx.moveTo(rx, heightPx);
          ctx.lineTo(rx + 4, heightPx - rh);
          ctx.lineTo(rx + 8, heightPx);
          ctx.fill();
        }
      }

      rafId = requestAnimationFrame(animateLoop);
    };

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (interactive) {
        canvas.removeEventListener('pointermove', handlePointerMove);
        canvas.removeEventListener('pointerleave', handlePointerLeave);
      }
    };
  }, [word, birds, preset, customPalette, flyFor, holdFor, reeds, interactive, wordPositionY]);

  return (
    <div
      ref={containerRef}
      className={`murmuration-wordmark-root ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: height || '100%',
        overflow: 'hidden',
        pointerEvents: interactive ? 'auto' : 'none',
      }}
      aria-label={`Bird Murmuration forming word ${word}`}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          pointerEvents: interactive ? 'auto' : 'none',
        }}
      />
    </div>
  );
}

export { MurmurationWordmark };
