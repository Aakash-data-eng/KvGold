import React, { useEffect, useRef } from 'react';

export default function MouseGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    // Only activate for non-touch fine pointers
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const glowEl = glowRef.current;
    if (!glowEl) return;

    let animationFrameId;
    let targetX = -500;
    let targetY = -500;
    let currentX = -500;
    let currentY = -500;
    let isVisible = false;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        glowEl.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      glowEl.style.opacity = '0';
    };

    const render = () => {
      // GPU transform translation with zero React re-renders
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      glowEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '560px',
        height: '560px',
        margin: '-280px 0 0 -280px',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 99,
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.075) 0%, rgba(122, 0, 25, 0.03) 45%, transparent 70%)',
        willChange: 'transform',
        transform: 'translate3d(-500px, -500px, 0)',
        opacity: 0,
        transition: 'opacity 0.4s ease',
      }}
      aria-hidden="true"
    />
  );
}
