import React, { useEffect, useRef } from 'react';

/**
 * KVGoldCinematicBackground — Ultra Premium 3D Gold Universe (V2 Engine)
 * Features:
 * 1. 3D Molten Gold River & Multi-Ribbon Terrain Field (Diagonally Flowing)
 * 2. Periodic Gold Shimmer Reflection Events (Light sweeping across gold surfaces)
 * 3. 4-Tier Perspective Z-Depth Architecture (Far, Mid, Near, Micro Highlights)
 * 4. 3D Rotating Metallic Gold Shards / Fragments
 * 5. Gold Dust Streams & 3D Particle Storm (90% faint, 8% medium, 2% bright)
 * 6. Travelling Gold Light Trails with smooth fade-in/fade-out
 * 7. Volumetric Burgundy Velvet Atmospheric Fog & 5 Spotlights
 * 8. Cinematic Organic 45s Camera Loop & Subtle Mouse Parallax
 * 9. Content Safe Zone (Center dark mask for crystal-clear readability)
 * 10. Tab Visibility Auto-Pause & Reduced Motion Support
 */
export default function KVGoldCinematicBackground() {
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

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mouse movement lerp for smooth parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX - width / 2) * 0.35;
      targetMouseY = (e.clientY - height / 2) * 0.35;
    };

    let lastFrameTime = 0;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const isMobileScreen = width < 768;
      dpr = isMobileScreen ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.25);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        if (!animFrameId) {
          animFrameId = requestAnimationFrame(render);
        }
      } else {
        if (animFrameId) {
          cancelAnimationFrame(animFrameId);
          animFrameId = null;
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

    // -------------------------------------------------------------------------
    // 3D ENVIRONMENT ENGINE DATA
    // -------------------------------------------------------------------------
    const FOV = 480;
    const isMobile = width < 768;

    // 1. 3D Molten Gold River Grid (Diagonally Orientated Terrain - Mobile Tier)
    const cols = isMobile ? 16 : 38;
    const rows = isMobile ? 12 : 26;
    const spacingX = isMobile ? 65 : 68;
    const spacingY = isMobile ? 52 : 54;

    const gridPoints = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        gridPoints.push({
          origX: (c - cols / 2) * spacingX + (r - rows / 2) * 15, // Diagonal slant
          origY: (r - rows / 2) * spacingY + 120,
          origZ: (r - rows / 2) * 32 - (c - cols / 2) * 12,
          c,
          r,
        });
      }
    }

    // 2. 3D Gold Particle Storm Pool (Optimized for Mobile)
    const particleCount = isMobile ? 30 : 125;
    const particles = Array.from({ length: particleCount }, (_, i) => {
      const typeRand = Math.random();
      let opacityBase = 0.18;
      let particleType = 'faint';

      if (typeRand > 0.98) {
        particleType = 'bright';
        opacityBase = Math.random() * 0.35 + 0.65;
      } else if (typeRand > 0.90) {
        particleType = 'medium';
        opacityBase = Math.random() * 0.25 + 0.35;
      } else {
        opacityBase = Math.random() * 0.15 + 0.08;
      }

      return {
        x: (Math.random() - 0.5) * width * 2.0,
        y: (Math.random() - 0.5) * height * 2.0,
        z: Math.random() * 900 - 400,
        size: particleType === 'bright' ? Math.random() * 3.2 + 1.8 : Math.random() * 2.0 + 0.6,
        baseOpacity: opacityBase,
        speedZ: Math.random() * 0.45 + 0.12,
        speedY: -(Math.random() * 0.28 + 0.06),
        speedX: (Math.random() - 0.5) * 0.2,
        pulseSpeed: Math.random() * 0.018 + 0.006,
        pulseAngle: Math.random() * Math.PI * 2,
        color: particleType === 'bright' ? '#FFF7DB' : Math.random() > 0.4 ? '#F0D99A' : '#D4AF62',
      };
    });

    // 3. 3D Rotating Metallic Gold Shards (Floating Fragments - Mobile Tier)
    const shardCount = isMobile ? 3 : 12;
    const shards = Array.from({ length: shardCount }, () => ({
      x: (Math.random() - 0.5) * width * 1.5,
      y: (Math.random() - 0.5) * height * 1.5,
      z: Math.random() * 600 - 200,
      size: Math.random() * 7 + 4.5,
      rotX: Math.random() * Math.PI * 2,
      rotY: Math.random() * Math.PI * 2,
      rotZ: Math.random() * Math.PI * 2,
      rotSpeedX: (Math.random() - 0.5) * 0.012,
      rotSpeedY: (Math.random() - 0.5) * 0.014,
      rotSpeedZ: (Math.random() - 0.5) * 0.008,
      opacity: Math.random() * 0.4 + 0.2,
    }));

    // 4. Gold Light Trails (Travelling Laser Reflections - Mobile Tier)
    const streakCount = isMobile ? 2 : 8;
    const streaks = Array.from({ length: streakCount }, () => ({
      x: (Math.random() - 0.5) * width,
      y: (Math.random() - 0.5) * height,
      z: Math.random() * 500 - 150,
      length: Math.random() * 160 + 90,
      angle: Math.random() * 0.5 - 0.25,
      speed: Math.random() * 1.8 + 0.9,
      opacity: 0,
      maxOpacity: Math.random() * 0.42 + 0.18,
      life: 0,
      maxLife: Math.random() * 220 + 160,
    }));

    let time = 0;
    let shimmerPhase = 0; // Sweeping shimmer wave trigger

    // -------------------------------------------------------------------------
    // CENTRALIZED 3D RENDER ENGINE
    // -------------------------------------------------------------------------
    const render = (now) => {
      if (!isTabVisible) return;

      // Mobile FPS throttle (~30fps for smooth background without blocking main thread scroll)
      if (isMobile && now && now - lastFrameTime < 32) {
        animFrameId = requestAnimationFrame(render);
        return;
      }
      lastFrameTime = now || 0;

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.045;
      mouseY += (targetMouseY - mouseY) * 0.045;

      // 45s Organic Seamless Camera Drift Loop
      const camTime = time * 0.0003;
      const camX = Math.sin(camTime) * 75 + Math.sin(camTime * 1.7) * 35 + mouseX;
      const camY = Math.cos(camTime * 0.8) * 45 + Math.cos(camTime * 1.3) * 25 + mouseY;
      const camZ = Math.sin(camTime * 0.5) * 35;

      const halfW = width / 2;
      const halfH = height / 2;

      // Update periodic Gold Shimmer Event every ~8 seconds
      shimmerPhase = (Math.sin(time * 0.003) + 1) * 0.5;

      // -----------------------------------------------------------------------
      // LAYER 1: VOLUMETRIC BURGUNDY VELVET CLOUDS & 5 GOLD LIGHT BLOOMS
      // -----------------------------------------------------------------------
      // Top Center Spotlight Bloom
      const bloom1X = halfW + Math.sin(time * 0.0003) * 80;
      const bloom1Y = height * 0.08 + Math.cos(time * 0.0004) * 30;
      const gradBloom1 = ctx.createRadialGradient(bloom1X, bloom1Y, 40, bloom1X, bloom1Y, 550);
      gradBloom1.addColorStop(0, 'rgba(240, 217, 154, 0.16)');
      gradBloom1.addColorStop(0.45, 'rgba(122, 0, 25, 0.24)');
      gradBloom1.addColorStop(1, 'transparent');
      ctx.fillStyle = gradBloom1;
      ctx.fillRect(0, 0, width, height);

      // Upper Left Burgundy Volumetric Cloud
      const cloud1X = halfW * 0.2 + Math.cos(time * 0.00025) * 90;
      const cloud1Y = halfH * 0.5 + Math.sin(time * 0.0003) * 50;
      const gradCloud1 = ctx.createRadialGradient(cloud1X, cloud1Y, 30, cloud1X, cloud1Y, 600);
      gradCloud1.addColorStop(0, 'rgba(69, 17, 23, 0.36)');
      gradCloud1.addColorStop(0.5, 'rgba(35, 9, 13, 0.22)');
      gradCloud1.addColorStop(1, 'transparent');
      ctx.fillStyle = gradCloud1;
      ctx.fillRect(0, 0, width, height);

      // Lower Right Warm Burgundy Cloud
      const cloud2X = halfW * 1.6 + Math.sin(time * 0.00035) * 110;
      const cloud2Y = halfH * 1.4 + Math.cos(time * 0.0002) * 70;
      const gradCloud2 = ctx.createRadialGradient(cloud2X, cloud2Y, 40, cloud2X, cloud2Y, 650);
      gradCloud2.addColorStop(0, 'rgba(90, 15, 25, 0.32)');
      gradCloud2.addColorStop(0.5, 'rgba(35, 7, 13, 0.20)');
      gradCloud2.addColorStop(1, 'transparent');
      ctx.fillStyle = gradCloud2;
      ctx.fillRect(0, 0, width, height);

      // -----------------------------------------------------------------------
      // LAYER 2: 3D MOLTEN GOLD RIVER & MULTI-RIBBON TERRAIN FIELD
      // -----------------------------------------------------------------------
      const projectedGrid = [];
      const waveTime = time * 0.009;

      gridPoints.forEach((p) => {
        // Multi-harmonic liquid metal wave math
        const waveZ =
          Math.sin(p.c * 0.16 + waveTime) * 45 +
          Math.cos(p.r * 0.20 + waveTime * 0.85) * 35 +
          Math.sin((p.c + p.r) * 0.11 + waveTime * 0.65) * 22;

        const worldX = p.origX - camX * 0.65;
        const worldY = p.origY + waveZ - camY * 0.65;
        const worldZ = p.origZ + 420 + camZ;

        const scale = FOV / Math.max(1, worldZ);
        const projX = halfW + worldX * scale;
        const projY = halfH + worldY * scale;

        projectedGrid.push({ projX, projY, scale, c: p.c, r: p.r, worldZ, waveZ });
      });

      // 4 Multi-Ribbon Render Layers with Shimmer Boost
      const ribbonStyles = [
        { color: 'rgba(138, 100, 46, ', widthMult: 3.5, alphaBase: 0.18 }, // Ribbon 1: Large slow dark gold
        { color: 'rgba(201, 162, 77, ', widthMult: 2.5, alphaBase: 0.24 }, // Ribbon 2: Medium warm gold
        { color: 'rgba(212, 175, 98, ', widthMult: 1.8, alphaBase: 0.30 }, // Ribbon 3: Thin brighter gold
        { color: 'rgba(240, 217, 154, ', widthMult: 1.2, alphaBase: 0.38 }, // Ribbon 4: Champagne highlight ribbon
      ];

      ribbonStyles.forEach((rib, ribIdx) => {
        for (let r = ribIdx; r < rows; r += 4) {
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
          const shimmerBoost = Math.sin(r * 0.5 + waveTime * 2.0) * shimmerPhase * 0.15;
          const alpha = Math.min(0.5, Math.max(0.05, (samplePt ? samplePt.scale : 0.8) * (rib.alphaBase + shimmerBoost)));

          ctx.strokeStyle = `${rib.color}${alpha})`;
          ctx.lineWidth = Math.max(0.7, (samplePt ? samplePt.scale : 1) * rib.widthMult);
          ctx.stroke();
        }
      });

      // Render Molten Gold Particle Nodes on Wave Vertices
      projectedGrid.forEach((pt) => {
        if (pt.c % 2 === 0 && pt.r % 2 === 0) {
          const shimmerBoost = Math.sin(pt.c * 0.3 + waveTime * 2.5) * shimmerPhase * 0.2;
          const alpha = Math.min(0.55, Math.max(0.05, pt.scale * (0.35 + shimmerBoost)));
          const size = Math.max(0.9, pt.scale * 2.4);

          ctx.beginPath();
          ctx.arc(pt.projX, pt.projY, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(240, 217, 154, ${alpha})`;
          ctx.fill();
        }
      });

      // -----------------------------------------------------------------------
      // LAYER 3: 3D GOLD PARTICLE STORM (FAR -> NEAR Z-DEPTH PERSPECTIVE)
      // -----------------------------------------------------------------------
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.z -= p.speedZ;
          p.y += p.speedY;
          p.x += p.speedX;
          p.pulseAngle += p.pulseSpeed;

          // Seamless Z wrap
          if (p.z < -400) {
            p.z = 500;
            p.x = (Math.random() - 0.5) * width * 2.0;
            p.y = (Math.random() - 0.5) * height * 2.0;
          }
          if (p.y < -height) p.y = height;
        }

        const worldX = p.x - camX * 0.95;
        const worldY = p.y - camY * 0.95;
        const worldZ = p.z + 420 + camZ;

        const scale = FOV / Math.max(1, worldZ);
        const projX = halfW + worldX * scale;
        const projY = halfH + worldY * scale;

        const currentOpacity = Math.max(0.05, (p.baseOpacity + Math.sin(p.pulseAngle) * 0.15) * (scale * 0.95));

        ctx.save();
        ctx.beginPath();
        ctx.arc(projX, projY, Math.max(0.5, p.size * scale), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(0.85, currentOpacity);
        ctx.fill();
        ctx.restore();
      });

      // -----------------------------------------------------------------------
      // LAYER 4: 3D ROTATING METALLIC GOLD SHARDS (FLOATING FRAGMENTS)
      // -----------------------------------------------------------------------
      shards.forEach((s) => {
        if (!prefersReducedMotion) {
          s.rotX += s.rotSpeedX;
          s.rotY += s.rotSpeedY;
          s.rotZ += s.rotSpeedZ;
        }

        const worldX = s.x - camX;
        const worldY = s.y - camY;
        const worldZ = s.z + 420 + camZ;

        const scale = FOV / Math.max(1, worldZ);
        const projX = halfW + worldX * scale;
        const projY = halfH + worldY * scale;
        const sz = s.size * scale;

        ctx.save();
        ctx.translate(projX, projY);
        ctx.rotate(s.rotZ);

        ctx.beginPath();
        ctx.moveTo(0, -sz * Math.cos(s.rotX));
        ctx.lineTo(sz * Math.cos(s.rotY), 0);
        ctx.lineTo(0, sz * Math.cos(s.rotX));
        ctx.lineTo(-sz * Math.cos(s.rotY), 0);
        ctx.closePath();

        ctx.fillStyle = `rgba(212, 175, 98, ${Math.min(0.45, s.opacity * scale)})`;
        ctx.strokeStyle = `rgba(240, 217, 154, ${Math.min(0.65, s.opacity * scale * 1.4)})`;
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

      // -----------------------------------------------------------------------
      // LAYER 5: TRAVELLING GOLD LIGHT TRAILS (LASER REFLECTIONS)
      // -----------------------------------------------------------------------
      streaks.forEach((st) => {
        if (!prefersReducedMotion) {
          st.life += 1;
          st.x += st.speed * 2.4;
          st.y += st.speed * st.angle * 2.4;

          const progress = st.life / st.maxLife;
          if (progress < 0.22) {
            st.opacity = (progress / 0.22) * st.maxOpacity;
          } else if (progress > 0.78) {
            st.opacity = ((1 - progress) / 0.22) * st.maxOpacity;
          } else {
            st.opacity = st.maxOpacity;
          }

          if (st.life >= st.maxLife || st.x > width * 0.85) {
            st.life = 0;
            st.x = -halfW - Math.random() * 250;
            st.y = (Math.random() - 0.5) * height;
            st.z = Math.random() * 500 - 150;
          }
        }

        const worldX = st.x - camX * 0.85;
        const worldY = st.y - camY * 0.85;
        const worldZ = st.z + 420 + camZ;

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
        ctx.lineWidth = Math.max(1, 2.0 * scale);
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
    <div className="kv-cinematic-3d-background-root" aria-hidden="true">
      {/* Base Dark Black & Burgundy Atmospheric Foundation */}
      <div className="kv-cinematic-bg-base" />

      {/* 5 Soft Gold Light Ambient Spotlights */}
      <div className="kv-cinematic-bg-spots" />

      {/* 3D Living Atmosphere Canvas */}
      <canvas ref={canvasRef} className="kv-cinematic-bg-canvas" />

      {/* Content Safe Zone (Subtle Center Dark Mask for Maximum Readability) */}
      <div className="kv-cinematic-safe-zone" />

      {/* Soft Vignette Edge Integration */}
      <div className="kv-cinematic-bg-vignette" />

      <style>{`
        .kv-cinematic-3d-background-root {
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

        .kv-cinematic-bg-base {
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

        .kv-cinematic-bg-spots {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle 500px at 50% 8%, rgba(240, 217, 154, 0.15) 0%, transparent 70%),
            radial-gradient(circle 550px at 5% 45%, rgba(212, 175, 98, 0.13) 0%, transparent 70%),
            radial-gradient(circle 550px at 95% 70%, rgba(212, 175, 98, 0.13) 0%, transparent 70%);
        }

        .kv-cinematic-bg-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: block;
          opacity: 0.96;
        }

        /* Subtle Center Dark Mask ensuring 100% typography & card readability */
        .kv-cinematic-safe-zone {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 65% 75% at 50% 50%, rgba(5, 3, 4, 0.30) 0%, transparent 85%);
        }

        .kv-cinematic-bg-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 36%, rgba(5, 3, 4, 0.48) 76%, rgba(5, 3, 4, 0.80) 100%);
        }

        @media (max-width: 768px) {
          .kv-cinematic-bg-base {
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
