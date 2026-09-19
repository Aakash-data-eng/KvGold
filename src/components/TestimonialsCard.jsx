import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Star, Quote, Sparkles, ShieldCheck } from 'lucide-react';
import '../styles/testimonials.css';

const defaultTestimonials = [
  {
    id: 1,
    name: 'S. Meenakshi & Sundar',
    location: 'R.S. Puram, Coimbatore',
    badge: 'VERIFIED CUSTOMER',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    quote:
      'We enrolled in KV Gold’s 11-month plan for our daughter’s upcoming wedding. The 12th-month bonus was credited without any hidden conditions, and when we selected her bridal necklace, there was truly 0% wastage.',
  },
  {
    id: 2,
    name: 'Priya Ramanathan',
    location: 'Anna Nagar, Chennai',
    badge: 'VERIFIED CUSTOMER',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    quote:
      'As a working woman investor, I wanted physical gold backing rather than just paper chits. KV Gold locked in my grams at daily rates every month. The passbook on WhatsApp and prompt customer desk gave me complete peace of mind.',
  },
  {
    id: 3,
    name: 'Dr. K. Natarajan',
    location: 'KK Nagar, Madurai',
    badge: 'VERIFIED CUSTOMER',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    quote:
      'Traditional jewellers always take high making charges during exchange. With KV Gold, the purity is certified 24K Swiss grade, and the transparency is unmatched. I have recommended it to all my colleagues.',
  },
  {
    id: 4,
    name: 'Anandhi Swaminathan',
    location: 'Fairlands, Salem',
    badge: 'VERIFIED CUSTOMER',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    quote:
      'This is my third consecutive year saving with KV Gold. For Akshaya Tritiya, I redeemed two sovereign antique bangles with zero hassle. The staff treated my family with the utmost royal courtesy.',
  },
  {
    id: 5,
    name: 'K. Rajesh & Family',
    location: 'Gandhipuram, Coimbatore',
    badge: 'KV GOLD CUSTOMER',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    quote:
      'KV Gold has restored complete trust in jewellery investment. The monthly gold plan transparency and courteous service make them our family’s primary gold brand for every celebration.',
  },
  {
    id: 6,
    name: 'Deepa Subramanian',
    location: 'Saibaba Colony, Coimbatore',
    badge: 'KV GOLD CUSTOMER',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
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
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef(null);
  const timerRef = useRef(null);

  const activeItem = items[activeIndex];

  // IntersectionObserver for scroll reveal
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Reset autoplay timer helper
  const resetAutoplayTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (autoPlay && !isPaused && items.length > 1) {
      timerRef.current = setInterval(() => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % items.length);
      }, autoPlayInterval);
    }
  };

  // Autoplay Effect
  useEffect(() => {
    resetAutoplayTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, autoPlayInterval, isPaused, items.length]);

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
            <span>CUSTOMER STORIES</span>
            <span className="eyebrow-spark">✦</span>
          </div>

          <h2 className="testimonials-title">WHAT OUR CUSTOMERS SAY</h2>

          <p className="testimonials-subtitle">
            Real experiences from customers who trust KV GOLD with their gold journey.
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
                      <img
                        src={item.image}
                        alt={item.name}
                        className="testimonial-card-img"
                        draggable={false}
                      />
                      <div className="testimonial-card-vignette" aria-hidden="true" />
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
