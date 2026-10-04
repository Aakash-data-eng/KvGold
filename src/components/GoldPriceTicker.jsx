import React, { useState, useEffect } from 'react';
import { fetchGoldRates } from '../services/goldPriceService';

/**
 * GoldPriceTicker — Real Dynamic Precious Metals Market Ticker
 * Renders live market data (24K, 22K 916, 18K 750, Silver 999)
 * Features:
 * - Continuous Right -> Left GPU-accelerated marquee
 * - Seamless Track A & Track B infinite looping without jumping
 * - Real API integration with automatic polling (5 mins) & tab-focus refresh
 * - Data-driven status indicator (LIVE RATE vs LATEST RATE)
 * - Accessibility (aria-hidden duplicate track, prefers-reduced-motion)
 */
export default function GoldPriceTicker() {
  const [rateData, setRateData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch rates on mount & set polling interval
  useEffect(() => {
    let isMounted = true;

    async function loadRates() {
      try {
        const data = await fetchGoldRates();
        if (isMounted) {
          setRateData(data);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching market rates:', err);
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadRates();

    // 5-minute polling interval
    const intervalId = setInterval(loadRates, 5 * 60 * 1000);

    // Refresh when tab becomes active after being hidden
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadRates();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Format currency value with Indian comma formatting
  const formatPrice = (val) => {
    if (!val || isNaN(val)) return '—';
    return val.toLocaleString('en-IN');
  };

  // Determine status dot class and label
  const getStatusBadge = () => {
    if (loading) {
      return {
        dotClass: 'status-dot-loading',
        label: 'FETCHING RATES...',
      };
    }
    if (!rateData || rateData.status === 'live') {
      return {
        dotClass: 'status-dot-live',
        label: 'LIVE RATE',
      };
    }
    return {
      dotClass: 'status-dot-latest',
      label: 'LATEST RATE',
    };
  };

  const statusInfo = getStatusBadge();

  // Ticker Item Group (Track Content)
  const renderTickerContent = (isDuplicate = false) => {
    if (loading) {
      return (
        <div className="ticker-track-group">
          <span className="ticker-status-badge">
            <span className={`ticker-dot ${statusInfo.dotClass}`} />
            {statusInfo.label}
          </span>
          <span className="ticker-separator">|</span>
          <span className="ticker-item-loading">Connecting to Precious Metals Market Feed...</span>
        </div>
      );
    }

    if (!rateData) {
      return (
        <div className="ticker-track-group">
          <span className="ticker-status-badge">
            <span className="ticker-dot status-dot-latest" />
            MARKET RATE TEMPORARILY UNAVAILABLE
          </span>
        </div>
      );
    }

    return (
      <div className="ticker-track-group">
        {/* Status Dot + Mode */}
        <span className="ticker-status-badge">
          <span className={`ticker-dot ${statusInfo.dotClass}`} />
          <span className="ticker-status-label">{statusInfo.label}</span>
        </span>

        <span className="ticker-separator">|</span>

        {/* 24K Pure Gold Rate */}
        <span className="ticker-rate-item">
          <span className="rate-purity">24K:</span>
          <span className="rate-value">₹{formatPrice(rateData.gold24k)}/g</span>
        </span>

        <span className="ticker-separator">|</span>

        {/* 22K Sovereign Hallmark Rate (916) */}
        <span className="ticker-rate-item">
          <span className="rate-purity">22K (916):</span>
          <span className="rate-value">₹{formatPrice(rateData.gold22k)}/g</span>
        </span>

        <span className="ticker-separator">|</span>

        {/* 18K Luxury Gold Rate (750) */}
        <span className="ticker-rate-item">
          <span className="rate-purity">18K:</span>
          <span className="rate-value">₹{formatPrice(rateData.gold18k)}/g</span>
        </span>

        <span className="ticker-separator">|</span>

        {/* Silver Pure Rate (999) */}
        <span className="ticker-rate-item">
          <span className="rate-purity">Silver:</span>
          <span className="rate-value">₹{rateData.silver}/g</span>
        </span>

        {/* Optional Change Indicator */}
        {rateData.changePct ? (
          <>
            <span className="ticker-separator">|</span>
            <span className={`rate-change-tag ${rateData.changePct >= 0 ? 'up' : 'down'}`}>
              {rateData.changePct >= 0 ? '↑' : '↓'} {Math.abs(rateData.changePct)}%
            </span>
          </>
        ) : null}

        <span className="ticker-separator">|</span>

        {/* Timestamp */}
        <span className="ticker-timestamp">Updated {rateData.updatedAt}</span>

        <span className="ticker-separator">|</span>
      </div>
    );
  };

  return (
    <div
      className="kv-gold-ticker-wrapper"
      role="region"
      aria-label="Current gold and silver market rates"
    >
      <div className="ticker-viewport">
        {/* Animated Marquee Container (Track A + Track B Duplicated) */}
        <div className="ticker-marquee-container">
          <div className="ticker-track-primary">{renderTickerContent(false)}</div>
          <div className="ticker-track-secondary" aria-hidden="true">
            {renderTickerContent(true)}
          </div>
        </div>
      </div>

      <style>{`
        .kv-gold-ticker-wrapper {
          width: 100%;
          background: rgba(8, 2, 5, 0.95);
          border-bottom: 1px solid rgba(212, 175, 55, 0.28);
          position: relative;
          z-index: 1001;
          height: 36px;
          display: flex;
          align-items: center;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
        }

        .ticker-viewport {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          mask-image: linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 3%, black 97%, transparent 100%);
        }

        .ticker-marquee-container {
          display: flex;
          align-items: center;
          white-space: nowrap;
          width: max-content;
          will-change: transform;
          animation: marqueeRightToLeft 42s linear infinite;
        }

        .kv-gold-ticker-wrapper:hover .ticker-marquee-container {
          animation-play-state: paused;
        }

        @keyframes marqueeRightToLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .ticker-track-primary,
        .ticker-track-secondary {
          display: inline-flex;
          align-items: center;
        }

        .ticker-track-group {
          display: inline-flex;
          align-items: center;
          gap: 1rem;
          padding: 0 1rem;
        }

        /* Status Badge & Indicator Dots */
        .ticker-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-sans, sans-serif);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-gold-bright, #FFF2B2);
          background: rgba(122, 0, 25, 0.45);
          padding: 0.2rem 0.65rem;
          border-radius: 999px;
          border: 1px solid rgba(212, 175, 55, 0.35);
        }

        .ticker-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          display: inline-block;
          flex-shrink: 0;
        }

        .status-dot-live {
          background-color: #2ECC71;
          box-shadow: 0 0 10px #2ECC71;
          animation: liveDotPulse 2s infinite ease-in-out;
        }

        .status-dot-latest {
          background-color: #F39C12;
          box-shadow: 0 0 8px #F39C12;
        }

        .status-dot-loading {
          background-color: #3498DB;
          animation: liveDotPulse 1.2s infinite ease-in-out;
        }

        @keyframes liveDotPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.35);
            opacity: 0.5;
          }
        }

        /* Rate Items */
        .ticker-rate-item {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-sans, sans-serif);
          font-size: 0.78rem;
        }

        .rate-purity {
          color: rgba(247, 231, 206, 0.82);
          font-weight: 600;
          letter-spacing: 0.04em;
        }

        .rate-value {
          color: var(--color-gold-bright, #F9E79F);
          font-weight: 800;
          letter-spacing: 0.02em;
          font-family: var(--font-serif, serif);
          font-size: 0.86rem;
          text-shadow: 0 1px 6px rgba(212, 175, 55, 0.3);
        }

        .rate-change-tag {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
        }

        .rate-change-tag.up {
          color: #2ECC71;
          background: rgba(46, 204, 113, 0.12);
        }

        .rate-change-tag.down {
          color: #E74C3C;
          background: rgba(231, 76, 60, 0.12);
        }

        .ticker-separator {
          color: rgba(212, 175, 55, 0.35);
          font-size: 0.8rem;
        }

        .ticker-timestamp {
          font-size: 0.68rem;
          color: rgba(247, 231, 206, 0.6);
          letter-spacing: 0.04em;
          font-weight: 500;
        }

        .ticker-item-loading {
          font-size: 0.74rem;
          color: rgba(249, 231, 159, 0.75);
          font-style: italic;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .kv-gold-ticker-wrapper {
            height: 32px;
          }
          .ticker-track-group {
            gap: 0.75rem;
            padding: 0 0.5rem;
          }
          .ticker-status-badge {
            font-size: 0.65rem;
            padding: 0.15rem 0.45rem;
          }
          .ticker-rate-item {
            font-size: 0.72rem;
          }
          .rate-value {
            font-size: 0.78rem;
          }
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .ticker-marquee-container {
            animation: none !important;
            overflow-x: auto;
            width: 100%;
          }
          .ticker-track-secondary {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
