import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Testimonials from './components/Testimonials';
import GoldTrustPillars from './components/GoldTrustPillars';
import KVGoldScrollExplore from './components/KVGoldScrollExplore';
import GoldBuyingService from './components/GoldBuyingService';
import GoldCollection from './components/GoldCollection';
import JourneyOfGold from './components/JourneyOfGold';
import VideoReveal from './components/VideoReveal';
import JourneyConclusion from './components/JourneyConclusion';
import GoldTreeExperience from './components/GoldTreeExperience';
import Founders from './components/Founders';
import WhyKVGoldVideo from './components/WhyKVGoldVideo';
import KVGoldQRExperience from './components/KVGoldQRExperience';
import KVGoldDigitalVisitingCard from './components/KVGoldDigitalVisitingCard';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import MouseGlow from './components/MouseGlow';
import KVGoldCinematicBackground from './components/KVGoldCinematicBackground';
import { Phone, MessageCircle } from 'lucide-react';
import './styles/index.css';

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [isVisitingCardRoute, setIsVisitingCardRoute] = useState(false);

  // Check for standalone /visiting-card or #visiting-card route on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isCardPath = window.location.pathname === '/visiting-card' || window.location.hash === '#visiting-card';
      if (isCardPath) {
        setIsVisitingCardRoute(true);
      }
    }
  }, []);

  // Enforce manual scroll restoration so page refresh ALWAYS opens at scrollY = 0 (Top of Page)
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Force immediate scroll to top on initial page load / refresh
    window.scrollTo(0, 0);

    // Smooth anchor navigation handling for #links using native browser scroll
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  const handleOpenModal = () => {
    window.open(
      'https://chat.whatsapp.com/LMO9P9TuHJxLToDEeX2YPH?s=cl&p=a&mlu=4&ilr=4',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="kv-gold-app">
      {/* Standalone Digital Visiting Card Page Route if URL matches /visiting-card */}
      {isVisitingCardRoute && (
        <KVGoldDigitalVisitingCard
          onClose={() => {
            setIsVisitingCardRoute(false);
            if (window.history.pushState) {
              window.history.pushState(null, '', '/');
            }
          }}
          onOpenSchemeModal={handleOpenModal}
        />
      )}

      {/* Cinematic Luxury Preloader Screen */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* ULTRA PREMIUM 3D GOLD UNIVERSE (3D MOLTEN GOLD RIVER + MULTI-RIBBONS + LIGHT TRAILS + SHIMMER + BURGUNDY VELVET CLOUDS) */}
      <KVGoldCinematicBackground />

      {/* Interactive Apple Vision Pro-Style Mouse Follow Glow */}
      <MouseGlow />

      {/* Top Navbar with live ticker */}
      <Navbar onOpenSchemeModal={handleOpenModal} />

      {/* Hero Section */}
      <main style={{ position: 'relative', zIndex: 2 }}>
        <Hero onOpenSchemeModal={handleOpenModal} />

        {/* Core Transparency & Trust Pillars */}
        <GoldTrustPillars />

        {/* Cinematic Gateway: SCROLL TO EXPLORE KV GOLD */}
        <KVGoldScrollExplore />

        {/* Unified Gold Collection: Row 1 (Chain Models) + Row 2 (Other Gold Ornaments) */}
        <GoldCollection onOpenSchemeModal={handleOpenModal} />

        {/* Gold Buying & Selling Service (Sell Your Gold With Confidence) */}
        <GoldBuyingService onOpenSchemeModal={handleOpenModal} />

        {/* Cinematic Journey of Gold Scroll-Driven Storytelling Section (2005 -> 2026) */}
        <JourneyOfGold onOpenSchemeModal={handleOpenModal} />

        {/* The Journey Continues / CTA Section */}
        <JourneyConclusion onOpenSchemeModal={handleOpenModal} />

        {/* THE GOLD TREE: Ultra-Premium Interactive Jewellery Experience */}
        <GoldTreeExperience onOpenSchemeModal={handleOpenModal} />

        {/* Cinematic Golden Double Door Opening & Autoplay Brand Film Reveal */}
        <VideoReveal />

        {/* NEW Founders & Leadership Storytelling Section */}
        <Founders onOpenSchemeModal={handleOpenModal} />

        {/* NEW "WHY KV GOLD?" Cinematic Video Section */}
        <WhyKVGoldVideo />

        {/* Customer Reviews & Testimonials Section (VengeanceUI Stacked Deck Interaction) */}
        <Testimonials />

        {/* ================================================================
            KV GOLD — CINEMATIC QR VISITING CARD EXPERIENCE
            Positioned in the empty wide space immediately ABOVE the footer
            ================================================================ */}
        <KVGoldQRExperience onOpenSchemeModal={handleOpenModal} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Quick Action Hotlines (Bottom Right) */}
      <div className="floating-quick-hotlines">
        <a
          href="https://chat.whatsapp.com/LMO9P9TuHJxLToDEeX2YPH?s=cl&p=a&mlu=4&ilr=4"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-hotline-btn whatsapp-btn"
          aria-label="Join KV GOLD on WhatsApp"
          title="Join KV GOLD on WhatsApp"
        >
          <MessageCircle size={22} />
        </a>

        <a
          href="tel:9894352616"
          className="floating-hotline-btn call-btn"
          aria-label="Call KV Gold Hotline"
          title="Call 98943 52616"
        >
          <Phone size={22} />
        </a>
      </div>

      <style>{`
        .floating-quick-hotlines {
          position: fixed;
          bottom: 25px;
          right: 25px;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          z-index: 999;
        }

        .floating-hotline-btn {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFF;
          text-decoration: none;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6), 0 0 15px rgba(212, 175, 55, 0.4);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .whatsapp-btn {
          background: #25D366;
          border: 1.5px solid rgba(255, 255, 255, 0.4);
        }

        .call-btn {
          background: linear-gradient(135deg, #7A0019 0%, #35000B 100%);
          border: 1.5px solid var(--color-gold);
          color: var(--color-gold-bright);
        }

        .floating-hotline-btn:hover {
          transform: scale(1.12) translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.8), 0 0 25px rgba(249, 231, 159, 0.7);
        }

        @media (max-width: 480px) {
          .floating-quick-hotlines {
            bottom: 18px;
            right: 18px;
          }
          .floating-hotline-btn {
            width: 46px;
            height: 46px;
          }
        }
      `}</style>
    </div>
  );
}
