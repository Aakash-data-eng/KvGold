import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  RotateCw,
  ZoomIn,
  ShieldCheck,
  Award,
  Sparkles,
  MessageCircle,
  Phone,
  Play,
  Pause,
  ArrowLeft
} from 'lucide-react';
import '../styles/jewellery-inspector.css';

/**
 * JewelleryInspectorModal — Ultra Luxury Non-Scrollable 360° Lightbox Inspector
 * 
 * Compact, viewport-fitted design without scrollbars.
 * Features:
 * 1. Rendered via React Portal directly into document.body (z-index: 999999).
 * 2. Viewport-Fitted Non-Scroll Layout (Fits 100% cleanly without vertical scrollbar).
 * 3. 360° Interactive Drag & RAF-throttled 2.2x Loupe Lens Magnifier.
 * 4. 916 BIS Hallmark Attributes & Germanometer XRF Purity.
 * 5. Direct WhatsApp Inquiry, 0% VA Savings Plan & Hotline CTAs.
 */
export default function JewelleryInspectorModal({ item, onClose, onOpenSchemeModal }) {
  // Mode states: 'spin' | 'macro' | 'hallmark'
  const [activeTab, setActiveTab] = useState('spin');
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  // Loupe Magnifier state
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0, show: false });

  const containerRef = useRef(null);
  const scrollBodyRef = useRef(null);
  const animFrameRef = useRef(null);
  const rafPosRef = useRef(null);
  const triggerElementRef = useRef(null);

  // Preserve active element for focus restoration on close
  useEffect(() => {
    triggerElementRef.current = document.activeElement;
  }, []);



  // Keyboard accessibility: ESC key closes modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Body Scroll Lock & Exact Position Restoration on Unmount
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollY = window.scrollY;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      window.scrollTo(0, scrollY);

      // Restore focus to opening element
      if (triggerElementRef.current && typeof triggerElementRef.current.focus === 'function') {
        try {
          triggerElementRef.current.focus();
        } catch (e) {
          // Ignore focus errors
        }
      }
    };
  }, []);

  // Clean Exit Handler
  const handleClose = () => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (rafPosRef.current) cancelAnimationFrame(rafPosRef.current);
    onClose();
  };

  // Smooth Auto-Rotate RAF loop
  useEffect(() => {
    if (isAutoRotating && activeTab === 'spin' && !isDragging) {
      let lastTime = performance.now();
      const rotateLoop = (time) => {
        const delta = time - lastTime;
        lastTime = time;
        setRotationAngle((prev) => (prev + delta * 0.04) % 360);
        animFrameRef.current = requestAnimationFrame(rotateLoop);
      };
      animFrameRef.current = requestAnimationFrame(rotateLoop);
    }

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isAutoRotating, activeTab, isDragging]);

  // Pointer / Touch Drag handlers for 360° spin & Loupe calculation
  const handlePointerDown = (e) => {
    if (activeTab !== 'spin') return;
    setIsDragging(true);
    setDragStartX(e.clientX || (e.touches && e.touches[0].clientX) || 0);
  };

  const handlePointerMove = (e) => {
    if (isDragging && activeTab === 'spin') {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const deltaX = clientX - dragStartX;
      setRotationAngle((prev) => (prev + deltaX * 0.8) % 360);
      setDragStartX(clientX);
    }

    // Bounded Loupe Lens Calculation with RAF throttling
    if (activeTab === 'macro' && containerRef.current) {
      if (rafPosRef.current) return;
      rafPosRef.current = requestAnimationFrame(() => {
        rafPosRef.current = null;
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

        const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
        const y = Math.max(0, Math.min(rect.height, clientY - rect.top));

        setMagnifierPos({ x, y, show: true });
      });
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // WhatsApp Inquiry Handler
  const handleWhatsAppInquiry = () => {
    const message = encodeURIComponent(
      `Hello KV GOLD team, I am inquiring about the ${item?.english || 'Jewellery'} (${item?.tamil || ''}). Please share current live rate and available designs.`
    );
    window.open(
      `https://chat.whatsapp.com/LMO9P9TuHJxLToDEeX2YPH?s=cl&p=a&mlu=4&ilr=4&text=${message}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  if (!item || typeof document === 'undefined') return null;

  const modalContent = (
    <div
      className="inspector-modal-backdrop"
      data-lenis-prevent
      onClick={(e) => {
        if (e.target.classList.contains('inspector-modal-backdrop')) {
          handleClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.english} Product Inspector`}
    >
      <div className="inspector-modal-dialog">
        {/* Sticky Top Toolbar with 44px Gold Close Target */}
        <header className="inspector-sticky-header">
          <div className="inspector-header-meta">
            <div className="inspector-badge">
              <Sparkles size={11} />
              <span>360° INSPECTOR</span>
            </div>
            <h3 className="inspector-title">{item.english}</h3>
            {item.tamil && <p className="inspector-title-tamil">{item.tamil}</p>}
          </div>

          <div className="inspector-top-actions">
            <button
              type="button"
              className="inspector-back-nav-btn"
              onClick={handleClose}
              title="Return to Gold Collection"
            >
              <ArrowLeft size={14} />
              <span>COLLECTION</span>
            </button>

            <button
              type="button"
              className="inspector-close-btn"
              onClick={handleClose}
              aria-label="Close product inspector"
              title="Back to collection"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* Independent Scrollable Body Container */}
        <div className="inspector-scroll-body" ref={scrollBodyRef} data-lenis-prevent>
          <div className="inspector-body-grid">
            {/* Left Column: Interactive 360° Stage & Controls */}
            <div className="inspector-stage-column">
              {/* View Mode Switcher Tabs */}
              <div className="inspector-mode-tabs" role="tablist" aria-label="Product view modes">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'spin'}
                  className={`mode-tab-btn ${activeTab === 'spin' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('spin');
                    setMagnifierPos((p) => ({ ...p, show: false }));
                  }}
                >
                  <RotateCw size={13} />
                  <span>360° SPIN</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'macro'}
                  className={`mode-tab-btn ${activeTab === 'macro' ? 'active' : ''}`}
                  onClick={() => setActiveTab('macro')}
                >
                  <ZoomIn size={13} />
                  <span>MACRO LENS</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'hallmark'}
                  className={`mode-tab-btn ${activeTab === 'hallmark' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('hallmark');
                    setMagnifierPos((p) => ({ ...p, show: false }));
                  }}
                >
                  <ShieldCheck size={13} />
                  <span>916 BIS STAMP</span>
                </button>
              </div>

              {/* Main Interactive Stage Canvas */}
              <div
                className={`inspector-view-stage mode-${activeTab} ${isDragging ? 'is-dragging' : ''}`}
                ref={containerRef}
                onMouseDown={handlePointerDown}
                onMouseMove={handlePointerMove}
                onMouseUp={handlePointerUp}
                onMouseLeave={() => {
                  handlePointerUp();
                  setMagnifierPos((p) => ({ ...p, show: false }));
                }}
                onTouchStart={handlePointerDown}
                onTouchMove={handlePointerMove}
                onTouchEnd={handlePointerUp}
              >
                {/* Stage Glow Atmosphere */}
                <div className="inspector-stage-glow" aria-hidden="true" />

                {/* 3D Rotatable Product Image Wrapper */}
                <div
                  className="inspector-image-wrapper"
                  style={{
                    transform:
                      activeTab === 'spin'
                        ? `rotateY(${rotationAngle}deg) rotateX(3deg) scale(1.04)`
                        : activeTab === 'hallmark'
                        ? 'scale(1.22) translateY(-6px)'
                        : 'scale(1)',
                    transition: isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.english}
                    className="inspector-product-image"
                    draggable={false}
                  />

                  {/* Metallic Sheen Overlay */}
                  <div
                    className="inspector-sheen-overlay"
                    style={{
                      transform: `translateX(${(rotationAngle % 180) - 90}%)`,
                    }}
                    aria-hidden="true"
                  />
                </div>

                {/* 2.2x Bounded Loupe Lens (Active in Macro Mode) */}
                {activeTab === 'macro' && magnifierPos.show && (
                  <div
                    className="inspector-loupe"
                    style={{
                      left: `${magnifierPos.x}px`,
                      top: `${magnifierPos.y}px`,
                      backgroundImage: `url(${item.image})`,
                      backgroundPosition: `-${magnifierPos.x * 1.8}px -${magnifierPos.y * 1.8}px`,
                      backgroundSize: `${(containerRef.current?.offsetWidth || 300) * 2.2}px ${
                        (containerRef.current?.offsetHeight || 300) * 2.2
                      }px`,
                    }}
                  >
                    <div className="loupe-crosshair" aria-hidden="true" />
                  </div>
                )}

                {/* Hallmark Badge Callout Overlay */}
                {activeTab === 'hallmark' && (
                  <div className="hallmark-stamp-callout">
                    <div className="hallmark-stamp-ring">
                      <Award size={15} />
                      <span>BIS 916 CERTIFIED</span>
                    </div>
                    <p>100% Karatmeter Purity Guarantee</p>
                  </div>
                )}

                {/* 360° Drag Helper Bar */}
                {activeTab === 'spin' && (
                  <div className="inspector-spin-controls">
                    <span className="spin-drag-hint">
                      <RotateCw size={11} className="spin-icon-anim" />
                      DRAG OR SWIPE TO SPIN 360°
                    </span>

                    <button
                      type="button"
                      className="spin-toggle-btn"
                      onClick={() => setIsAutoRotating(!isAutoRotating)}
                      title={isAutoRotating ? 'Pause auto spin' : 'Play auto spin'}
                    >
                      {isAutoRotating ? <Pause size={12} /> : <Play size={12} />}
                      <span>{isAutoRotating ? 'PAUSE SPIN' : 'AUTO SPIN'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Product Specifications & Direct Actions */}
            <div className="inspector-details-column">
              <div className="inspector-details-header">
                <h4 className="details-section-title">PRODUCT SPECIFICATIONS</h4>
              </div>

              {/* BIS Hallmark Certification Card */}
              <div className="inspector-purity-card">
                <div className="purity-header">
                  <ShieldCheck size={18} className="gold-shield" />
                  <div>
                    <h5 className="purity-title">916 BIS HALLMARKED GOLD</h5>
                    <p className="purity-subtitle">Certified by Bureau of Indian Standards</p>
                  </div>
                </div>
                <div className="purity-specs-grid">
                  <div className="spec-pill">
                    <span className="spec-label">Purity Grade</span>
                    <span className="spec-val">22K (91.6% Gold)</span>
                  </div>
                  <div className="spec-pill">
                    <span className="spec-label">VA / Making</span>
                    <span className="spec-val">0% VA on Scheme</span>
                  </div>
                  <div className="spec-pill">
                    <span className="spec-label">Testing Method</span>
                    <span className="spec-val">Germanometer XRF</span>
                  </div>
                </div>
              </div>

              {/* Inline Action Buttons */}
              <div className="inspector-actions-group">
                <button
                  type="button"
                  className="btn-gold-primary inspector-whatsapp-btn"
                  onClick={handleWhatsAppInquiry}
                >
                  <MessageCircle size={18} />
                  <span>INQUIRE PRICE VIA WHATSAPP</span>
                </button>

                <button
                  type="button"
                  className="btn-luxury-secondary inspector-scheme-btn"
                  onClick={() => {
                    handleClose();
                    if (onOpenSchemeModal) {
                      onOpenSchemeModal(`${item.english} Scheme`);
                    }
                  }}
                >
                  <Sparkles size={15} />
                  <span>JOIN 0% VA GOLD SAVINGS PLAN</span>
                </button>

                <a
                  href="tel:9894352616"
                  className="inspector-call-link"
                  title="Call 98943 52616"
                >
                  <Phone size={14} />
                  <span>CALL VIP HOTLINE (98943 52616)</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer with Return Link */}
        <footer className="inspector-modal-footer">
          <button
            type="button"
            className="inspector-footer-back-btn"
            onClick={handleClose}
          >
            <ArrowLeft size={14} />
            <span>RETURN TO GOLD COLLECTION</span>
          </button>
        </footer>
      </div>
    </div>
  );

  // Render directly at document.body level via React Portal
  return createPortal(modalContent, document.body);
}
