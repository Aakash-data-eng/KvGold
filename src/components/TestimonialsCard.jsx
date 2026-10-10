import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star, Quote, Sparkles, ShieldCheck, User } from 'lucide-react';
import '../styles/testimonials.css';

const defaultTestimonials = [
  {
    id: 1,
    name: 'S. Meenakshi & Sundar',
    initials: 'SM',
    location: 'R.S. Puram, Coimbatore',
    badge: 'VERIFIED CUSTOMER',
    rating: 5,
    quote:
      'We enrolled in KV Gold’s 11-month plan for our daughter’s upcoming wedding. The 12th-month bonus was credited without any hidden conditions, and when we selected her bridal necklace, there was truly 0% wastage.',
  },
  {
    id: 2,
    name: 'Priya Ramanathan',
    initials: 'PR',
    location: 'Anna Nagar, Chennai',
    badge: 'VERIFIED CUSTOMER',
    rating: 5,
    quote:
      'As a working woman investor, I wanted physical gold backing rather than just paper chits. KV Gold locked in my grams at daily rates every month. The passbook on WhatsApp and prompt customer desk gave me complete peace of mind.',
  },
  {
    id: 3,
    name: 'Dr. K. Natarajan',
    initials: 'KN',
    location: 'KK Nagar, Madurai',
    badge: 'VERIFIED CUSTOMER',
    rating: 5,
    quote:
      'Traditional jewellers always take high making charges during exchange. With KV Gold, the purity is certified 24K Swiss grade, and the transparency is unmatched. I have recommended it to all my colleagues.',
  },
  {
    id: 4,
    name: 'Anandhi Swaminathan',
    initials: 'AS',
    location: 'Fairlands, Salem',
    badge: 'VERIFIED CUSTOMER',
    rating: 5,
    quote:
      'This is my third consecutive year saving with KV Gold. For Akshaya Tritiya, I redeemed two sovereign antique bangles with zero hassle. The staff treated my family with the utmost royal courtesy.',
  },
  {
    id: 5,
    name: 'K. Rajesh & Family',
    initials: 'KR',
    location: 'Gandhipuram, Coimbatore',
    badge: 'KV GOLD CUSTOMER',
    rating: 5,
    quote:
      'KV Gold has restored complete trust in jewellery investment. The monthly gold plan transparency and courteous service make them our family’s primary gold brand for every celebration.',
  },
  {
    id: 6,
    name: 'Deepa Subramanian',
    initials: 'DS',
    location: 'Saibaba Colony, Coimbatore',
    badge: 'KV GOLD CUSTOMER',
    rating: 5,
    quote:
      'The craftsmanship of the jewellery and clear digital tracking gave us absolute confidence. A truly prestigious experience from start to finish.',
  },
];

export default function TestimonialsCard({
  items = defaultTestimonials,
  className = '',
  autoPlay = true,
  autoPlayInterval = 4500,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);

  const sectionRef = useRef(null);
  const timerRef = useRef(null);

  const activeItem = items[activeIndex];

  // IntersectionObserver for scroll visibility
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.innerWidth <= 768) {
      setIsVisible(true);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.01, rootMargin: '100px 0px 100px 0px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Reset autoplay timer helper (Only runs when section is visible)
  const resetAutoplayTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (autoPlay && isVisible && !isPaused && items.length > 1 && !document.hidden) {
      timerRef.current = setInterval(() => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % items.length);
      }, autoPlayInterval);
    }
  };

  // Autoplay Effect
  useEffect(() => {
    resetAutoplayTimer();

    const handleVisibilityChange = () => {
      resetAutoplayTimer();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [autoPlay, autoPlayInterval, isPaused, isVisible, items.length]);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % items.length);
    resetAutoplayTimer();
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    resetAutoplayTimer();
  };

  // Pre-calculate rotations for visual variety
  const rotations = useMemo(() => [4, -3, -8, 6, -4, 5], []);

  if (!items || items.length === 0) {
    return null;
  }

  const formatCounter = (num) => String(num).padStart(2, '0');

  return (
    <section
      className={`testimonials-section ${className}`}
      id="testimonials"
      ref={sectionRef}
      aria-label="Customer Stories and Reviews"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Floating Gold Particles */}
      <div className="testimonials-particles-layer" aria-hidden="true">
        <span className="t-particle tp1" />
        <span className="t-particle tp2" />
        <span className="t-particle tp3" />
        <span className="t-particle tp4" />
        <span className="t-particle tp5" />
      </div>

      {/* Ambient Radial Glows */}
      <div className="testimonials-ambient-glow center-glow" aria-hidden="true" />
      <div className="testimonials-ambient-glow left-glow" aria-hidden="true" />

      <div className="testimonials-container">
        {/* Header Hierarchy */}
        <div className={`testimonials-header ${isVisible ? 'is-revealed' : ''}`}>
          <div className="testimonials-eyebrow">
            <span className="eyebrow-spark">✦</span>
            <span>CUSTOMER STORIES • வாடிக்கையாளர் அனுபவங்கள்</span>
            <span className="eyebrow-spark">✦</span>
          </div>

          <h2 className="testimonials-title">TRUST IS BUILT ONE CUSTOMER AT A TIME.</h2>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--color-gold-bright, #F9E79F)', margin: '0.2rem 0 0.6rem', fontFamily: 'var(--font-sans, sans-serif)', fontWeight: 600 }}>
            நம்பிக்கை ஒவ்வொரு வாடிக்கையாளருடனும் உருவாகிறது.
          </h3>

          <p className="testimonials-subtitle">
            Real experiences from customers who have chosen KV GOLD for their gold journey.
          </p>
          <p style={{ fontSize: '0.86rem', color: 'rgba(247, 231, 206, 0.75)', margin: '0.3rem 0 0' }}>
            தங்கள் தங்கப் பயணத்திற்காக KV GOLD-ஐ தேர்வு செய்த வாடிக்கையாளர்களின் உண்மையான அனுபவங்கள்.
          </p>
        </div>

        {/* VengeanceUI Testimonials Card Interactive Layout */}
        <div className={`testimonials-card-wrapper ${isVisible ? 'is-revealed' : ''}`}>
          
          {/* LEFT: Stacked 3D Image Card Deck */}
          <div className="testimonials-deck-col">
            <div className="testimonials-stack-container" style={{ perspective: '1400px' }}>
              <AnimatePresence custom={direction} mode="popLayout">
                {items.map((item, index) => {
                  const isActive = index === activeIndex;
                  const offset = index - activeIndex;

                  // Render top active card and 2 stack preview cards
                  if (Math.abs(offset) > 3 && !isActive) return null;

                  return (
                    <motion.div
                      key={item.id}
                      className={`testimonial-stack-card ${isActive ? 'is-active-card' : ''}`}
                      initial={{
                        x: offset * 18,
                        y: Math.abs(offset) * 8,
                        z: -160 * Math.abs(offset),
                        scale: 0.86 - Math.abs(offset) * 0.04,
                        rotateZ: rotations[index % rotations.length],
                        opacity: isActive ? 1 : 0.55,
                        zIndex: 10 - Math.abs(offset),
                      }}
                      animate={
                        isActive
                          ? {
                              x: [offset * 18, direction === 1 ? -180 : 180, 0],
                              y: [Math.abs(offset) * 8, 0, 0],
                              z: [-200, 140, 240],
                              scale: [0.86, 1.04, 1],
                              rotateZ: [rotations[index % rotations.length], -4, 0],
                              opacity: 1,
                              zIndex: 100,
                            }
                          : {
                              x: offset * 18,
                              y: Math.abs(offset) * 8,
                              z: -160 * Math.abs(offset),
                              rotateZ: rotations[index % rotations.length],
                              scale: 0.86 - Math.abs(offset) * 0.04,
                              opacity: 0.55,
                              zIndex: 10 - Math.abs(offset),
                            }
                      }
                      exit={{
                        x: direction === 1 ? -240 : 240,
                        z: -260,
                        scale: 0.75,
                        rotateZ: direction === 1 ? -10 : 10,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.7,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <div className="testimonial-unprofile-card">
                        <div className="unprofile-ambient-bg" />
                        <div className="unprofile-pattern" />
                        
                        <div className="unprofile-avatar-box">
                          <div className="unprofile-avatar-ring">
                            <User size={48} className="unprofile-avatar-icon" />
                          </div>
                          <div className="unprofile-avatar-badge">{item.initials || 'KV'}</div>
                        </div>

                        <div className="unprofile-meta-content">
                          <span className="unprofile-brand-eyebrow">KV GOLD • VERIFIED STORY</span>
                          <h4 className="unprofile-name">{item.name}</h4>
                          <span className="unprofile-location">{item.location}</span>
                        </div>

                        <div className="unprofile-trust-tag">
                          <ShieldCheck size={14} />
                          <span>24K CERTIFIED REVIEWS</span>
                        </div>
                      </div>
                      <div className="testimonial-card-rim" aria-hidden="true" />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: Active Testimonial Content & Controls */}
          <div className="testimonials-content-col">
            
            {/* 5-Star Rating Row */}
            <div className="testimonials-stars-row">
              {[...Array(activeItem.rating || 5)].map((_, i) => (
                <Star key={i} size={18} className="gold-star-icon" fill="#F9E79F" />
              ))}
            </div>

            {/* Animated Testimonial Text & Author Meta */}
            <div className="testimonials-quote-box">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -22 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="testimonial-quote-text">
                    "{activeItem.quote}"
                  </p>

                  <div className="testimonial-author-meta">
                    <h3 className="testimonial-author-name">{activeItem.name}</h3>
                    <div className="testimonial-author-sub">
                      <span className="testimonial-location">{activeItem.location}</span>
                      {activeItem.badge && (
                        <span className="testimonial-badge-pill">
                          <ShieldCheck size={13} />
                          <span>{activeItem.badge}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Counter & Navigation Controls */}
            <div className="testimonials-footer-row">
              {/* Counter */}
              <div className="testimonials-counter">
                <span className="counter-current">{formatCounter(activeIndex + 1)}</span>
                <span className="counter-sep">/</span>
                <span className="counter-total">{formatCounter(items.length)}</span>
              </div>

              {/* Prev / Next Circular Navigation Buttons */}
              <div className="testimonials-nav-buttons">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="nav-btn prev-btn"
                  aria-label="Previous Testimonial"
                >
                  <ArrowLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="nav-btn next-btn"
                  aria-label="Next Testimonial"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Trust Banner */}
        <div className="testimonials-trust-banner">
          <div className="trust-banner-line" aria-hidden="true" />
          <p className="trust-banner-text">
            <span>TRUSTED BY CUSTOMERS</span>
            <span className="trust-dot">•</span>
            <span>BUILT ON TRUST & CRAFTSMANSHIP</span>
          </p>
          <div className="trust-banner-line" aria-hidden="true" />
        </div>

      </div>
    </section>
  );
}
