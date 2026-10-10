import React, { useState, useEffect, useRef } from 'react';
import '../styles/cinematic-intro.css';

/**
 * KVGoldCinematicIntro — Ultra Premium Full-Screen Brand Entry & Cinematic Audio Experience
 * 
 * Synchronized H.264 Video + AAC Sound Track.
 * Attempts unmuted audio-visual playback first; automatically falls back to muted playback
 * if browser policy restricts unmuted autoplay, ensuring immediate intro play on user arrival.
 */
export default function CinematicSiteIntro({ onComplete }) {
  const videoRef = useRef(null);
  
  // State Machine: LOADING | PLAYING | ENDING | COMPLETE
  const [phase, setPhase] = useState('LOADING');
  const [isMuted, setIsMuted] = useState(true);

  const transitionStartedRef = useRef(false);
  const exitTimeoutRef = useRef(null);

  // Un-mute Audio Helper Function
  const enableSound = () => {
    const videoEl = videoRef.current;
    if (videoEl) {
      videoEl.muted = false;
      videoEl.volume = 1.0;
      setIsMuted(false);
      console.log('[KV INTRO] Sound enabled by user interaction.');
    }
  };

  // 1. Mount Lifecycle: Body Scroll Lock, Un-mute Listeners & Playback Attempt
  useEffect(() => {
    // Enforce body scroll lock during intro
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    console.log('[KV INTRO] Full-screen cinematic audio-visual intro mounted.');

    // Global first-tap/click listener to un-mute audio automatically on user gesture
    const handleFirstTouch = () => {
      enableSound();
    };

    window.addEventListener('pointerdown', handleFirstTouch, { once: true });
    window.addEventListener('click', handleFirstTouch, { once: true });

    // Reduced Motion Accessibility Check
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      console.log('[KV INTRO] Reduced motion preference detected. Exiting.');
      startExitTransition();
    }

    // Defensive Safety Timeout (16s) if media pipeline hangs
    const safetyTimer = setTimeout(() => {
      if (!transitionStartedRef.current) {
        console.warn('[KV INTRO] Safety timeout reached. Completing intro.');
        startExitTransition();
      }
    }, 16000);

    // Trigger playback on mount
    attemptPlay();

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('pointerdown', handleFirstTouch);
      window.removeEventListener('click', handleFirstTouch);
      clearTimeout(safetyTimer);
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    };
  }, []);

  // 2. Programmatic Cinematic Audio-Visual Playback Function
  const attemptPlay = async () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    try {
      // Priority Level 1: Attempt unmuted playback for full cinematic sound experience
      videoEl.muted = false;
      videoEl.volume = 1.0;
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        await playPromise;
        console.log('[KV INTRO] Unmuted video + AAC sound playback started successfully.');
        setIsMuted(false);
        setPhase('PLAYING');
      }
    } catch (unmutedErr) {
      console.warn('[KV INTRO] Unmuted autoplay blocked by browser policy, automatically falling back to muted autoplay:', unmutedErr);
      try {
        // Fallback automatically to muted autoplay so intro plays immediately on arrival
        videoEl.muted = true;
        setIsMuted(true);
        await videoEl.play();
        setPhase('PLAYING');
        console.log('[KV INTRO] Muted video intro playback started automatically.');
      } catch (mutedErr) {
        console.error('[KV INTRO] Playback blocked completely:', mutedErr);
        setPhase('BLOCKED');
      }
    }
  };

  // 3. Driven Exit Transition Sequence (Triggered by video end or error)
  const startExitTransition = () => {
    if (transitionStartedRef.current) return;
    transitionStartedRef.current = true;
    console.log('[KV INTRO] Intro finishing. Starting gold light bloom transition.');

    setPhase('ENDING');

    if (videoRef.current) {
      try {
        videoRef.current.pause();
      } catch (e) {
        // Ignore play/pause abort errors
      }
    }

    // Hold final frame for 400ms, expand gold bloom, then fade overlay out cleanly
    exitTimeoutRef.current = setTimeout(() => {
      console.log('[KV INTRO] Intro transition complete. Revealing website & unlocking scroll.');
      setPhase('COMPLETE');
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
      if (onComplete) {
        onComplete();
      }
    }, 1200); // 1.2s luxury transition
  };

  // 4. HTML5 Video Media Event Handlers
  const handleLoadedMetadata = () => {
    console.log('[KV INTRO] Video metadata loaded. Duration:', videoRef.current?.duration);
  };

  const handleLoadedData = () => {
    console.log('[KV INTRO] Video data loaded.');
    if (phase === 'LOADING') {
      attemptPlay();
    }
  };

  const handleCanPlay = () => {
    console.log('[KV INTRO] Video canplay event fired.');
    if (phase === 'LOADING') {
      attemptPlay();
    }
  };

  const handlePlaying = () => {
    console.log('[KV INTRO] Video playing event fired.');
    setPhase('PLAYING');
  };

  const handleVideoEnded = () => {
    console.log('[KV INTRO] video.onended fired naturally. Stopping sound & starting transition.');
    setTimeout(startExitTransition, 400);
  };

  const handleVideoError = (e) => {
    console.error('[KV INTRO] Video media error:', e);
    startExitTransition();
  };

  if (phase === 'COMPLETE') {
    return null;
  }

  return (
    <div
      className={`cinematic-intro-root ${phase === 'ENDING' ? 'is-finishing' : ''}`}
      aria-label="KV GOLD Opening Brand Film with Cinematic Audio"
      onClick={enableSound}
    >
      {/* Background Atmosphere Foundation */}
      <div className="cinematic-intro-bg" />
      <div className="cinematic-intro-radial-glow" />

      {/* Gold Light Bloom Wave (Triggers on Finish Transition) */}
      <div className={`cinematic-intro-gold-bloom ${phase === 'ENDING' ? 'bloom-active' : ''}`} />

      {/* Edge-to-Edge Fullscreen Video Wrapper */}
      <div className="cinematic-intro-video-wrap">
        {/* Official Brand Film HTML5 Video Element (Video + Sound) */}
        <video
          ref={videoRef}
          src="/videos/gemini_generated_video_322f0c29.mp4"
          poster="/videos/kv-gold-intro-poster.jpg"
          className="cinematic-intro-video"
          playsInline
          autoPlay
          preload="auto"
          disablePictureInPicture
          onLoadedMetadata={handleLoadedMetadata}
          onLoadedData={handleLoadedData}
          onCanPlay={handleCanPlay}
          onPlaying={handlePlaying}
          onEnded={handleVideoEnded}
          onError={handleVideoError}
        />
      </div>

      {/* Luxury Sound Pill Toggle Badge */}
      <div className="cinematic-sound-toggle-wrap">
        <button
          type="button"
          className={`cinematic-sound-toggle-badge ${isMuted ? 'is-muted-pulsing' : 'is-unmuted'}`}
          onClick={(e) => {
            e.stopPropagation();
            if (isMuted) {
              enableSound();
            } else {
              if (videoRef.current) {
                videoRef.current.muted = true;
                setIsMuted(true);
              }
            }
          }}
          title={isMuted ? 'Enable Sound' : 'Mute Sound'}
        >
          <span className="sound-icon">{isMuted ? '🔇' : '🔊'}</span>
          <span className="sound-text">
            {isMuted ? 'TAP FOR SOUND (ஒலி இயக்கவும்)' : 'SOUND ON (ஒலி இயக்கத்தில்)'}
          </span>
        </button>
      </div>

      {/* Fallback play button if strict mobile browser policy blocks autoplay */}
      {phase === 'BLOCKED' && (
        <div className="cinematic-intro-blocked-fallback">
          <button
            type="button"
            className="cinematic-intro-play-btn"
            onClick={attemptPlay}
          >
            ✦ ENTER KV GOLD ✦
          </button>
        </div>
      )}
    </div>
  );
}
