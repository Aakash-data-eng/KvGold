import React, { useRef, useEffect, useState } from 'react';
import { Volume2, VolumeX, RotateCcw, Sparkles } from 'lucide-react';
import '../styles/video-reveal.css';
import '../styles/why-kv-gold-video.css';

export default function WhyKVGoldVideo() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  const [doorState, setDoorState] = useState('closed'); // 'closed' | 'opening' | 'open'
  const [isMuted, setIsMuted] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // IntersectionObserver triggers when 35% of section enters viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;

          // Phase 1: Small cinematic pause (~350ms)
          const pauseTimer = setTimeout(() => {
            // Phase 2: Doors open smoothly (1.5s animation)
            setDoorState('opening');

            // Phase 3: Start video playback when doors are opening (~800ms)
            const videoTimer = setTimeout(() => {
              if (videoRef.current) {
                videoRef.current.play().catch((err) => {
                  console.warn('Autoplay prevented by browser policy:', err);
                });
              }
            }, 800);

            // Phase 4: Mark doors fully open
            const openTimer = setTimeout(() => {
              setDoorState('open');
            }, 1550);

            return () => {
              clearTimeout(videoTimer);
              clearTimeout(openTimer);
            };
          }, 350);

          return () => clearTimeout(pauseTimer);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleEnded = () => {
    setIsCompleted(true);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => {
        setIsCompleted(false);
      });
    }
  };

  return (
    <section
      className="video-reveal-section why-kv-gold-video-section"
      id="why-kv-gold"
      ref={sectionRef}
      aria-label="Why KV Gold - Brand Difference & Film"
    >
      {/* Header */}
      <div className="video-reveal-header">
        <div className="video-reveal-badge">
          <Sparkles size={14} />
          <span>THE KV GOLD DIFFERENCE</span>
        </div>
        <h2 className="video-reveal-title">WHY KV GOLD?</h2>
        <p className="video-reveal-subtitle">
          Gold is more than a purchase — it is a decision about value, trust and quality. Discover what makes the KV GOLD experience different.
        </p>
      </div>

      {/* Main Cinematic Video Stage */}
      <div className="video-reveal-stage">
        <div className="video-reveal-viewport">
          {/* HTML5 Video Element */}
          <video
            ref={videoRef}
            src="/videos/why-kv-gold.mp4"
            className="video-reveal-media"
            muted={isMuted}
            playsInline
            preload="auto"
            onEnded={handleEnded}
          />

          {/* Luxury Film Vignette Overlay */}
          <div className="video-reveal-vignette" aria-hidden="true" />

          {/* Video Control Overlays */}
          <div className="video-controls-overlay">
            <button
              type="button"
              className="video-control-btn mute-btn"
              onClick={toggleMute}
              title={isMuted ? 'Unmute video' : 'Mute video'}
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              <span>{isMuted ? 'UNMUTE' : 'MUTED'}</span>
            </button>

            {isCompleted && (
              <button
                type="button"
                className="video-control-btn replay-btn"
                onClick={handleReplay}
                title="Replay film"
                aria-label="Replay film"
              >
                <RotateCcw size={16} />
                <span>REPLAY FILM</span>
              </button>
            )}
          </div>
        </div>

        {/* ================================================================
            EXACT GOLDEN LUXURY DOUBLE DOORS REVEAL SYSTEM
            Symmetrically parts from center to reveal the video behind
            ================================================================ */}
        <div
          className={`video-vault-doors door-state-${doorState}`}
          aria-hidden={doorState === 'open'}
        >
          {/* Left Door Panel */}
          <div className="vault-door vault-door-left">
            <div className="vault-door-surface">
              <div className="vault-door-frame">
                <div className="vault-filigree top-left" />
                <div className="vault-filigree bottom-left" />
                
                <div className="vault-door-crest">
                  <div className="vault-crest-ring">
                    <span className="vault-crest-letters">KV</span>
                  </div>
                  <span className="vault-crest-label">TRANSPARENT VALUE</span>
                </div>
              </div>

              {/* Right Edge Golden Handle */}
              <div className="vault-door-handle handle-left">
                <span className="vault-handle-pillar" />
                <span className="vault-handle-gold-bar" />
                <span className="vault-handle-pillar" />
              </div>
            </div>
          </div>

          {/* Right Door Panel */}
          <div className="vault-door vault-door-right">
            <div className="vault-door-surface">
              <div className="vault-door-frame">
                <div className="vault-filigree top-right" />
                <div className="vault-filigree bottom-right" />
                
                <div className="vault-door-crest">
                  <div className="vault-crest-ring">
                    <span className="vault-crest-letters">KV</span>
                  </div>
                  <span className="vault-crest-label">HALLMARKED PURITY</span>
                </div>
              </div>

              {/* Left Edge Golden Handle */}
              <div className="vault-door-handle handle-right">
                <span className="vault-handle-pillar" />
                <span className="vault-handle-gold-bar" />
                <span className="vault-handle-pillar" />
              </div>
            </div>
          </div>

          {/* Center Seam Golden Light Beam */}
          <div className="vault-center-seam" />

          {/* Centered Intro Badge */}
          <div className="vault-intro-badge">
            <span className="vault-intro-dot">✦</span>
            <span className="vault-intro-text">DISCOVER THE KV GOLD DIFFERENCE</span>
            <span className="vault-intro-dot">✦</span>
          </div>
        </div>
      </div>
    </section>
  );
}
