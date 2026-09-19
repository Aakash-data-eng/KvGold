import React, { useEffect, useRef } from 'react';

export default function GoldParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Multi-tier particle pool
    const particleCount = 65;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      speedY: -(Math.random() * 0.35 + 0.1),
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.65 + 0.25,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      angle: Math.random() * Math.PI * 2,
      depth: Math.random() * 0.6 + 0.4, // Depth for 3D parallax
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const parallaxOffsetX = (mouseX - width / 2) * 0.015;
      const parallaxOffsetY = (mouseY - height / 2) * 0.015;

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.angle += p.pulseSpeed;

        const currentOpacity = p.opacity + Math.sin(p.angle) * 0.3;

        // Wrap around borders
        if (p.y < -15) {
          p.y = height + 15;
          p.x = Math.random() * width;
        }
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        const drawX = p.x + parallaxOffsetX * p.depth;
        const drawY = p.y + parallaxOffsetY * p.depth;

        ctx.save();
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);

        // Pure fast fill without expensive shadowBlur
        ctx.fillStyle = `rgba(249, 231, 159, ${Math.max(0.08, currentOpacity)})`;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85,
      }}
    />
  );
}
