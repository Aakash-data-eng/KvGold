import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Coins, FileCheck2, Scale, Check } from 'lucide-react';
import '../styles/trust-pillars.css';

const trustPillars = [
  {
    icon: Coins,
    title: 'COMPETITIVE GOLD RATES',
    description: 'Clear and transparent pricing when buying and selling gold based on daily market conditions.',
    badge: 'Transparent Rates',
  },
  {
    icon: ShieldCheck,
    title: 'HALLMARKED GOLD',
    description: 'Gold jewellery featuring proper hallmark certification and seals for verified authenticity.',
    badge: 'Hallmark Certified',
  },
  {
    icon: FileCheck2,
    title: 'TESTED & VERIFIED',
    description: 'Quality assurance and gold testing reports available where applicable for complete peace of mind.',
    badge: 'Quality Documentation',
  },
  {
    icon: Scale,
    title: 'TRUSTED BUYING & SELLING',
    description: 'A reliable, straightforward experience whether purchasing new jewellery or selling pre-owned gold.',
    badge: 'Transparent Evaluation',
  },
];

export default function GoldTrustPillars() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="pillars-section" id="pillars" ref={sectionRef} aria-label="Gold Transparency Pillars">
      {/* Ambient Radial Glows */}
      <div className="pillars-ambient-glow center-glow" aria-hidden="true" />

      <div className="pillars-wrapper">
        {/* Section Header */}
        <div className={`pillars-header ${isVisible ? 'is-revealed' : ''}`}>
          <div className="pillars-eyebrow">
            <span className="eyebrow-spark">✦</span>
            <span>TRANSPARENCY & ASSURANCE</span>
            <span className="eyebrow-spark">✦</span>
          </div>

          <h2 className="pillars-main-title">OUR COMMITMENT TO GOLD TRANSPARENCY</h2>
          <p className="pillars-subtitle">
            At KV GOLD, every gold transaction is anchored in verified hallmarking, transparent pricing, and trusted documentation.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className={`pillars-grid ${isVisible ? 'is-revealed' : ''}`}>
          {trustPillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div key={pillar.title} className="pillar-card" style={{ transitionDelay: `${index * 0.12}s` }}>
                <div className="pillar-icon-ring">
                  <IconComponent size={24} strokeWidth={1.8} />
                </div>

                <h3 className="pillar-card-title">{pillar.title}</h3>
                <p className="pillar-card-desc">{pillar.description}</p>

                <div className="pillar-card-badge">
                  <Check size={14} className="pillar-check-icon" />
                  <span>{pillar.badge}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
