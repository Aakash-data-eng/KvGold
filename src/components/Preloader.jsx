import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/preloader.css';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const duration = 1600; // 1.6s
    const intervalTime = 20;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 600);
          }, 200);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="preloader-ambient-glow" />

          <div className="preloader-content">
            {/* Royal Gold Crest Emblem */}
            <svg
              className="preloader-crest"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#goldStroke)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <path
                d="M28 38 L50 22 L72 38 L65 72 L35 72 Z"
                stroke="url(#goldStroke)"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <circle cx="28" cy="38" r="3" fill="#FFE89F" />
              <circle cx="50" cy="22" r="3.5" fill="#FFE89F" />
              <circle cx="72" cy="38" r="3" fill="#FFE89F" />
              <text
                x="50"
                y="60"
                fontFamily="'Cinzel', serif"
                fontSize="20"
                fontWeight="bold"
                fill="url(#goldStroke)"
                textAnchor="middle"
                letterSpacing="1"
              >
                KV
              </text>
              <defs>
                <linearGradient id="goldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2B2" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#8C6A18" />
                </linearGradient>
              </defs>
            </svg>

            <h1 className="preloader-brand-title">KV GOLD</h1>
            <p className="preloader-tagline">Sovereign Wealth • Tamil Nadu</p>

            <div className="preloader-progress-wrap">
              <div className="preloader-bar-bg">
                <div
                  className="preloader-bar-fill"
                  style={{ width: `${Math.min(100, Math.round(progress))}%` }}
                />
              </div>
              <div className="preloader-counter">{Math.min(100, Math.round(progress))}%</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
