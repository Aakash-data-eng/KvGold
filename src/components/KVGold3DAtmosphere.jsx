import React, { useEffect, useRef } from 'react';

/**
 * KVGold3DAtmosphere — Cinematic 3D Living Background Engine
 * Features:
 * 1. 3D Molten Gold Particle Wave Terrain
 * 2. 4-Tier Z-Depth Architecture (Far, Mid, Near, Micro-Highlights)
 * 3. Floating 3D Rotating Metallic Gold Shards
 * 4. Thin Travelling Gold Light Streaks
 * 5. Volumetric Deep Burgundy Atmospheric Clouds
 * 6. Slow Organic Cinematic Camera Drift & Parallax
 * 7. Tab-Visibility Auto-Pause & Reduced-Motion Support
 */
export default function KVGold3DAtmosphere() {
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
    let isTabVisible = true;

    // Check motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mouse position for subtle parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX - width / 2) * 0.4;
      targetMouseY = (e.clientY - height / 2) * 0.4;
    };

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

    // -------------------------------------------------------------------------
    // 3D SCENE DATA & POOLS
    // -------------------------------------------------------------------------
    const FOV = 450;

    // 1. 3D Wave Field Grid (Midground)
    const isMobile = width < 768;
    const cols = isMobile ? 24 : 42;
    const rows = isMobile ? 18 : 28;
    const spacingX = isMobile ? 55 : 65;
    const spacingY = isMobile ? 45 : 55;

    const gridPoints = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        gridPoints.push({
          origX: (c - cols / 2) * spacingX,
          origY: (r - rows / 2) * spacingY + 140, // Tilt downward
          origZ: (r - rows / 2) * 35,
          c,
          r,
        });
      }
    }

    // 2. 3D Floating Gold Particles (Far, Mid, Near)
    const particleCount = isMobile ? 45 : 95;
    const particles = Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * width * 1.8,
      y: (Math.random() - 0.5) * height * 1.8,
      z: Math.random() * 800 - 300, // Z depth from -300 to 500
      size: Math.random() * 2.5 + 0.8,
      opacity: Math.random() * 0.5 + 0.2,
      speedZ: Math.random() * 0.4 + 0.1,
      speedY: -(Math.random() * 0.25 + 0.08),
      speedX: (Math.random() - 0.5) * 0.15,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      pulseAngle: Math.random() * Math.PI * 2,
      color: Math.random() > 0.4 ? '#F0D99A' : '#D4AF62',
    }));

    // 3. 3D Rotating Gold Shards (Floating Metallic Fragments)
    const shardCount = isMobile ? 6 : 14;
    const shards = Array.from({ length: shardCount }, () => ({
      x: (Math.random() - 0.5) * width * 1.4,
      y: (Math.random() - 0.5) * height * 1.4,
      z: Math.random() * 500 - 150,
      size: Math.random() * 6 + 4,
      rotX: Math.random() * Math.PI * 2,
      rotY: Math.random() * Math.PI * 2,
      rotZ: Math.random() * Math.PI * 2,
      rotSpeedX: (Math.random() - 0.5) * 0.015,
      rotSpeedY: (Math.random() - 0.5) * 0.015,
      rotSpeedZ: (Math.random() - 0.5) * 0.01,
      opacity: Math.random() * 0.45 + 0.25,
    }));

    // 4. Travelling Gold Light Streaks
    const streakCount = isMobile ? 3 : 7;
    const streaks = Array.from({ length: streakCount }, () => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * 400 - 100,
      length: Math.random() * 140 + 80,
      angle: Math.random() * 0.4 - 0.2, // Subtle diagonal angle
      speed: Math.random() * 1.5 + 0.8,
      opacity: 0,
      maxOpacity: Math.random() * 0.45 + 0.2,
      life: 0,
      maxLife: Math.random() * 200 + 150,
    }));

    let time = 0;

    // -------------------------------------------------------------------------
    // RENDER LOOP
    // -------------------------------------------------------------------------
    const render = () => {
      if (!isTabVisible) {
        animFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth Lerp Mouse Movement
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      // Camera Drift
      const camDriftX = Math.sin(time * 0.0004) * 40 + mouseX;
      const camDriftY = Math.cos(time * 0.0003) * 25 + mouseY;
      const camDriftZ = Math.sin(time * 0.0002) * 30;

      const halfW = width / 2;
      const halfH = height / 2;

      // -----------------------------------------------------------------------
      // LAYER 1: DEEP BURGUNDY VOLUMETRIC ATMOSPHERIC CLOUDS (FAR BACKGROUND)
      // -----------------------------------------------------------------------
      const cloudX1 = halfW + Math.sin(time * 0.0002) * 120;
      const cloudY1 = halfH * 0.4 + Math.cos(time * 0.00025) * 60;
      const grad1 = ctx.createRadialGradient(cloudX1, cloudY1, 50, cloudX1, cloudY1, 650);
      grad1.addColorStop(0, 'rgba(69, 17, 23, 0.35)');
      grad1.addColorStop(0.5, 'rgba(35, 9, 13, 0.25)');
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const cloudX2 = halfW * 1.4 + Math.cos(time * 0.0003) * 100;
      const cloudY2 = halfH * 1.3 + Math.sin(time * 0.0003) * 80;
      const grad2 = ctx.createRadialGradient(cloudX2, cloudY2, 40, cloudX2, cloudY2, 550);
      grad2.addColorStop(0, 'rgba(50, 13, 18, 0.30)');
      grad2.addColorStop(0.6, 'rgba(22, 7, 10, 0.20)');
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // -----------------------------------------------------------------------
      // LAYER 2: 3D MOLTEN GOLD WAVE TERRAIN (MIDGROUND)
      // -----------------------------------------------------------------------
      const projectedGrid = [];
      const waveTime = time * 0.008;

      gridPoints.forEach((p) => {
        // Dynamic 3D Wave Harmonics
        const waveZ =
          Math.sin(p.c * 0.18 + waveTime) * 38 +
          Math.cos(p.r * 0.22 + waveTime * 0.8) * 30 +
          Math.sin((p.c + p.r) * 0.12 + waveTime * 0.6) * 20;

        const worldX = p.origX - camDriftX * 0.6;
        const worldY = p.origY + waveZ - camDriftY * 0.6;
        const worldZ = p.origZ + 400 + camDriftZ;

        const scale = FOV / Math.max(1, worldZ);
        const projX = halfW + worldX * scale;
        const projY = halfH + worldY * scale;

        projectedGrid.push({ projX, projY, scale, c: p.c, r: p.r, worldZ });
      });

      // Render Wave Ribbons Across Columns
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        let started = false;

        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const pt = projectedGrid[idx];
          if (!pt) continue;

          if (!started) {
            ctx.moveTo(pt.projX, pt.projY);
            started = true;
          } else {
            ctx.lineTo(pt.projX, pt.projY);
          }
        }

        const samplePt = projectedGrid[r * cols];
        const alpha = Math.min(0.28, Math.max(0.04, (samplePt ? samplePt.scale : 0.8) * 0.32));
        ctx.strokeStyle = `rgba(212, 175, 98, ${alpha})`;
        ctx.lineWidth = Math.max(0.8, samplePt ? samplePt.scale * 1.8 : 1);
        ctx.stroke();
      }

      // Render Wave Vertices as Golden Molten Particles
      projectedGrid.forEach((pt) => {
        if (pt.c % 2 === 0 && pt.r % 2 === 0) {
          const alpha = Math.min(0.35, Math.max(0.05, pt.scale * 0.4));
          const size = Math.max(0.8, pt.scale * 2.2);

          ctx.beginPath();
          ctx.arc(pt.projX, pt.projY, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(240, 217, 154, ${alpha})`;
          ctx.fill();
        }
      });

      // -----------------------------------------------------------------------
      // LAYER 3: 3D FLOATING GOLD DUST & STARDUST PARTICLES (FAR -> NEAR Z-DEPTH)
      // -----------------------------------------------------------------------
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.z -= p.speedZ;
          p.y += p.speedY;
          p.x += p.speedX;
          p.pulseAngle += p.pulseSpeed;

          // Wrap around Z depth
          if (p.z < -300) {
            p.z = 500;
            p.x = (Math.random() - 0.5) * width * 1.8;
            p.y = (Math.random() - 0.5) * height * 1.8;
          }
          if (p.y < -height) p.y = height;
        }

        const worldX = p.x - camDriftX * 0.9;
        const worldY = p.y - camDriftY * 0.9;
        const worldZ = p.z + 400 + camDriftZ;

        const scale = FOV / Math.max(1, worldZ);
        const projX = halfW + worldX * scale;
        const projY = halfH + worldY * scale;

        const currentOpacity = Math.max(0.06, (p.opacity + Math.sin(p.pulseAngle) * 0.2) * (scale * 0.9));

        ctx.save();
        ctx.beginPath();
        ctx.arc(projX, projY, Math.max(0.5, p.size * scale), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(0.7, currentOpacity);
        ctx.fill();
        ctx.restore();
      });

      // -----------------------------------------------------------------------
      // LAYER 4: 3D ROTATING METALLIC GOLD SHARDS
      // -----------------------------------------------------------------------
      shards.forEach((s) => {
        if (!prefersReducedMotion) {
          s.rotX += s.rotSpeedX;
          s.rotY += s.rotSpeedY;
          s.rotZ += s.rotSpeedZ;
        }

        const worldX = s.x - camDriftX;
        const worldY = s.y - camDriftY;
        const worldZ = s.z + 400 + camDriftZ;

        const scale = FOV / Math.max(1, worldZ);
        const projX = halfW + worldX * scale;
        const projY = halfH + worldY * scale;
        const sz = s.size * scale;

        // Simple 3D diamond projection
        ctx.save();
        ctx.translate(projX, projY);
        ctx.rotate(s.rotZ);

        ctx.beginPath();
        ctx.moveTo(0, -sz * Math.cos(s.rotX));
        ctx.lineTo(sz * Math.cos(s.rotY), 0);
        ctx.lineTo(0, sz * Math.cos(s.rotX));
        ctx.lineTo(-sz * Math.cos(s.rotY), 0);
        ctx.closePath();

        ctx.fillStyle = `rgba(212, 175, 98, ${Math.min(0.4, s.opacity * scale)})`;
        ctx.strokeStyle = `rgba(240, 217, 154, ${Math.min(0.6, s.opacity * scale * 1.3)})`;
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

      // -----------------------------------------------------------------------
      // LAYER 5: TRAVELLING GOLD LIGHT STREAKS (LASER GLOWS)
      // -----------------------------------------------------------------------
      streaks.forEach((st) => {
        if (!prefersReducedMotion) {
          st.life += 1;
          st.x += st.speed * 2.2;
          st.y += st.speed * st.angle * 2.2;

          // Fade in / Fade out life cycle
          const progress = st.life / st.maxLife;
          if (progress < 0.25) {
            st.opacity = (progress / 0.25) * st.maxOpacity;
          } else if (progress > 0.75) {
            st.opacity = ((1 - progress) / 0.25) * st.maxOpacity;
          } else {
            st.opacity = st.maxOpacity;
          }

          if (st.life >= st.maxLife || st.x > width * 0.8) {
            st.life = 0;
            st.x = -halfW - Math.random() * 200;
            st.y = (Math.random() - 0.5) * height;
            st.z = Math.random() * 400 - 100;
          }
        }

        const worldX = st.x - camDriftX * 0.8;
        const worldY = st.y - camDriftY * 0.8;
        const worldZ = st.z + 400 + camDriftZ;

        const scale = FOV / Math.max(1, worldZ);
        const projX = halfW + worldX * scale;
        const projY = halfH + worldY * scale;

        const endX = projX + st.length * scale;
        const endY = projY + st.length * st.angle * scale;

        ctx.save();
        ctx.beginPath();
        const grad = ctx.createLinearGradient(projX, projY, endX, endY);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(0.5, `rgba(240, 217, 154, ${st.opacity})`);
        grad.addColorStop(1, 'transparent');

        ctx.strokeStyle = grad;
        ctx.lineWidth = Math.max(1, 1.8 * scale);
        ctx.moveTo(projX, projY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
        ctx.restore();
      });

      time += 1;
      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <div className="kv-global-3d-background-root" aria-hidden="true">
      {/* Base Dark Black & Burgundy Atmospheric Foundation */}
      <div className="kv-3d-bg-base" />

      {/* Soft Gold Light Ambient Spotlights */}
      <div className="kv-3d-bg-gold-spots" />

      {/* 3D Living Atmosphere Canvas */}
      <canvas ref={canvasRef} className="kv-3d-bg-canvas" />

      {/* Soft Vignette Edge Integration */}
      <div className="kv-3d-bg-vignette" />

      <style>{`
        .kv-global-3d-background-root {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
          background-color: #050304;
        }

        .kv-3d-bg-base {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 85% 55% at 50% 0%, rgba(212, 175, 98, 0.22) 0%, rgba(122, 0, 25, 0.28) 38%, transparent 70%),
            radial-gradient(ellipse 70% 55% at 10% 30%, rgba(115, 20, 32, 0.32) 0%, transparent 65%),
            radial-gradient(ellipse 75% 50% at 90% 55%, rgba(185, 138, 48, 0.18) 0%, rgba(90, 12, 22, 0.28) 42%, transparent 68%),
            radial-gradient(ellipse 70% 55% at 15% 82%, rgba(115, 20, 32, 0.30) 0%, transparent 60%),
            radial-gradient(ellipse 90% 55% at 50% 100%, rgba(212, 175, 98, 0.20) 0%, rgba(100, 16, 26, 0.30) 45%, transparent 75%),
            #050304;
        }

        .kv-3d-bg-gold-spots {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle 480px at 50% 10%, rgba(240, 217, 154, 0.14) 0%, transparent 70%),
            radial-gradient(circle 520px at 5% 48%, rgba(212, 175, 98, 0.12) 0%, transparent 70%),
            radial-gradient(circle 520px at 95% 72%, rgba(212, 175, 98, 0.12) 0%, transparent 70%);
        }

        .kv-3d-bg-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: block;
          opacity: 0.96;
        }

        .kv-3d-bg-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 38%, rgba(5, 3, 4, 0.45) 78%, rgba(5, 3, 4, 0.78) 100%);
        }

        @media (max-width: 768px) {
          .kv-3d-bg-base {
            background:
              radial-gradient(ellipse 90% 50% at 50% 0%, rgba(212, 175, 98, 0.18) 0%, rgba(122, 0, 25, 0.22) 40%, transparent 70%),
              radial-gradient(ellipse 70% 50% at 90% 50%, rgba(185, 138, 48, 0.14) 0%, rgba(90, 12, 22, 0.20) 45%, transparent 70%),
              radial-gradient(ellipse 90% 55% at 50% 100%, rgba(212, 175, 98, 0.16) 0%, rgba(100, 16, 26, 0.22) 45%, transparent 75%),
              #050304;
          }
        }
      `}</style>
    </div>
  );
}
