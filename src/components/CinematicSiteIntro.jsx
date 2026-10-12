import React, { useState, useEffect, useRef } from 'react';
import '../styles/cinematic-intro.css';

/**
 * KVGoldCinematicIntro — Official Full-Screen Brand Entry & Cinematic Audio Experience
 * 
 * Synchronized H.264 Portrait Video (720x1280, 9:16) + AAC Stereo Sound Track.
 * - Edge-to-edge mobile presentation with zero horizontal/vertical crop.
 * - Full visibility of KV pentagon emblem, KV GOLD wordmark, tagline, jewellery, and progress indicator.
 * - Attempts unmuted audio-visual playback first; falls back gracefully to muted playback if browser policy restricts unmuted autoplay.
 * - Seamless atmospheric burgundy/gold backdrop extension for ultrawide, desktop, tablet and tall phone viewports.
 */
const MOBILE_VIDEO_SRC = '/videos/kv-gold-intro-final.mp4';
const DESKTOP_VIDEO_SRC = '/videos/kv-gold-intro-desktop.mp4';
const MOBILE_POSTER_SRC = '/videos/kv-gold-intro-poster.jpg';
const DESKTOP_POSTER_SRC = '/videos/kv-gold-intro-poster-desktop.jpg';

// Breakpoint: Desktop & Wide screens (landscape with min-width 900px, or any screen min-width 1024px)
const DESKTOP_MEDIA_QUERY = '(min-width: 1024px), ((min-width: 900px) and (orientation: landscape))';

function getIsDesktop() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
}

export default function CinematicSiteIntro({ onComplete }) {
  const videoRef = useRef(null);
  
  // State Machine: LOADING | PLAYING | BLOCKED | ENDING | COMPLETE
  const [phase, setPhase] = useState('LOADING');

  // Responsive video variant: mobile (portrait) vs desktop (landscape)
  const [isDesktop, setIsDesktop] = useState(getIsDesktop);
  const isDesktopRef = useRef(isDesktop);
  isDesktopRef.current = isDesktop;

  const transitionStartedRef = useRef(false);
  const exitTimeoutRef = useRef(null);

  // 1. Mount Lifecycle: Body Scroll Lock, Viewport Listener & Playback Attempt
  useEffect(() => {
    // Enforce body scroll lock during intro
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    console.log(`[KV INTRO] KV GOLD cinematic intro mounted (${isDesktopRef.current ? '16:9 Landscape Desktop' : '9:16 Portrait Mobile'}).`);

    // Responsive media-query listener for dynamic viewport adaptation
    const mql = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const handleMediaChange = (e) => {
      const nextIsDesktop = e.matches;
      if (isDesktopRef.current !== nextIsDesktop) {
        isDesktopRef.current = nextIsDesktop;
        const videoEl = videoRef.current;
        if (videoEl) {
          const currentTime = videoEl.currentTime || 0;
          const wasPaused = videoEl.paused;
          const nextSrc = nextIsDesktop ? DESKTOP_VIDEO_SRC : MOBILE_VIDEO_SRC;
          const nextPoster = nextIsDesktop ? DESKTOP_POSTER_SRC : MOBILE_POSTER_SRC;

          videoEl.poster = nextPoster;
          videoEl.src = nextSrc;
          videoEl.currentTime = currentTime;
          if (!wasPaused) {
            videoEl.play().catch(() => {});
          }
        }
        setIsDesktop(nextIsDesktop);
      }
    };

    if (mql.addEventListener) {
      mql.addEventListener('change', handleMediaChange);
    } else {
      mql.addListener(handleMediaChange);
    }

    // Reduced Motion Accessibility Check
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      console.log('[KV INTRO] Reduced motion preference detected. Exiting.');
      startExitTransition();
    }

    // Defensive Safety Timeout (15s) in case media pipeline hangs
    const safetyTimer = setTimeout(() => {
      if (!transitionStartedRef.current) {
        console.warn('[KV INTRO] Defensive safety timer fired. Completing intro.');
        startExitTransition();
      }
    }, 15000);

    // Trigger playback on mount
    attemptPlay();

    return () => {
      document.body.style.overflow = originalOverflow;
      if (mql.removeEventListener) {
        mql.removeEventListener('change', handleMediaChange);
      } else {
        mql.removeListener(handleMediaChange);
      }
      clearTimeout(safetyTimer);
      if (exitTimeoutRef.current) clearTimeout(exitTimeoutRef.current);
    };
  }, []);

  // 2. Programmatic Cinematic Audio-Visual Playback Function
  const attemptPlay = async () => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    try {
      // Priority 1: Attempt unmuted playback for full cinematic sound experience
      videoEl.muted = false;
      videoEl.volume = 1.0;
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        await playPromise;
        console.log('[KV INTRO] Unmuted video + audio playback started successfully.');
        setPhase('PLAYING');
      }
    } catch (unmutedErr) {
      console.warn('[KV INTRO] Unmuted autoplay restricted by browser policy; falling back to muted autoplay:', unmutedErr);
      try {
        // Priority 2: Fallback automatically to muted autoplay so intro plays immediately on arrival
        videoEl.muted = true;
        await videoEl.play();
        setPhase('PLAYING');
        console.log('[KV INTRO] Muted video intro playback started automatically.');
      } catch (mutedErr) {
        console.error('[KV INTRO] Playback blocked by strict browser policy:', mutedErr);
        setPhase('BLOCKED');
      }
    }
  };

  // 3. Driven Exit Transition Sequence (Triggered by video end or error)
  const startExitTransition = () => {
    if (transitionStartedRef.current) return;
    transitionStartedRef.current = true;
    console.log('[KV INTRO] Video completed. Starting gold bloom transition into website.');

    setPhase('ENDING');

    if (videoRef.current) {
      try {
        videoRef.current.pause();
      } catch (e) {
        // Ignore play/pause abort errors during teardown
      }
    }

    // Expand gold bloom for 800ms, then cleanly release overlay and unfreeze Lenis scroll
    exitTimeoutRef.current = setTimeout(() => {
      console.log('[KV INTRO] Transition finished. Revealing main KV GOLD website.');
      setPhase('COMPLETE');
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
      if (onComplete) {
        onComplete();
      }
    }, 1000);
  };

  // 4. HTML5 Video Media Event Handlers
  const handleLoadedMetadata = () => {
    console.log('[KV INTRO] Video metadata loaded. Duration:', videoRef.current?.duration, 'Dimensions:', videoRef.current?.videoWidth, 'x', videoRef.current?.videoHeight);
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

  const handleWaiting = () => {
    console.log('[KV INTRO] Video waiting/buffering.');
  };

  const handleStalled = () => {
    console.log('[KV INTRO] Video stream stalled.');
  };

  const handleVideoEnded = () => {
    console.log('[KV INTRO] Video onended fired naturally. Initiating exit transition.');
    startExitTransition();
  };

  const handleVideoError = (e) => {
    console.error('[KV INTRO] Video media error encountered:', e);
    startExitTransition();
  };

  if (phase === 'COMPLETE') {
    return null;
  }

  return (
    <div
      className={`cinematic-intro-root ${phase === 'ENDING' ? 'is-finishing' : ''} ${isDesktop ? 'variant-desktop' : 'variant-mobile'}`}
      aria-label="KV GOLD Opening Brand Film"
    >
      {/* Seamless Ambient Backdrop Extension derived from the video frame */}
      <div
        className={`cinematic-intro-ambient-backdrop ${isDesktop ? 'is-desktop-backdrop' : 'is-mobile-backdrop'}`}
        aria-hidden="true"
      />

      {/* Atmospheric Burgundy & Gold Lighting Gradients */}
      <div className="cinematic-intro-bg" aria-hidden="true" />
      <div className="cinematic-intro-radial-glow" aria-hidden="true" />

      {/* Gold Light Bloom Wave for Exit Transition */}
      <div className={`cinematic-intro-gold-bloom ${phase === 'ENDING' ? 'bloom-active' : ''}`} aria-hidden="true" />

      {/* Responsive Viewport Video Framing Wrapper */}
      <div className={`cinematic-intro-video-wrap ${isDesktop ? 'is-desktop-wrap' : 'is-mobile-wrap'}`}>
        <video
          ref={videoRef}
          src={isDesktop ? DESKTOP_VIDEO_SRC : MOBILE_VIDEO_SRC}
          poster={isDesktop ? DESKTOP_POSTER_SRC : MOBILE_POSTER_SRC}
          className={`cinematic-intro-video ${isDesktop ? 'is-desktop-video' : 'is-mobile-video'}`}
          playsInline
          autoPlay
          preload="auto"
          disablePictureInPicture
          onLoadedMetadata={handleLoadedMetadata}
          onLoadedData={handleLoadedData}
          onCanPlay={handleCanPlay}
          onPlaying={handlePlaying}
          onWaiting={handleWaiting}
          onStalled={handleStalled}
          onEnded={handleVideoEnded}
          onError={handleVideoError}
        />
      </div>

      {/* Autoplay Blocked Fallback Action Button */}
      {phase === 'BLOCKED' && (
        <div className="cinematic-intro-blocked-fallback">
          <button
            type="button"
            className="cinematic-intro-play-btn"
            onClick={(e) => {
              e.stopPropagation();
              attemptPlay();
            }}
          >
            ✦ ENTER KV GOLD ✦
          </button>
        </div>
      )}
    </div>
  );
}
