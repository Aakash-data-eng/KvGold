import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import '../styles/footer.css';

// Inline SVG components for social brand icons
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" />
  </svg>
);

export const defaultSocialItems = [
  {
    letter: 'K',
    icon: <InstagramIcon />,
    label: 'Instagram',
    href: '#',
  },
  {
    letter: 'V',
    icon: <FacebookIcon />,
    label: 'Facebook',
    href: '#',
  },
  {
    letter: 'G',
    icon: <YoutubeIcon />,
    label: 'YouTube',
    href: '#',
  },
  {
    letter: 'C',
    icon: <MessageCircle size={18} />,
    label: 'WhatsApp Community',
    href: 'https://chat.whatsapp.com/LMO9P9TuHJxLToDEeX2YPH?s=cl&p=a&mlu=4&ilr=4',
  },
];

const SocialFlipNode = ({
  item,
  index,
  isHovered,
  setTooltipIndex,
  tooltipIndex,
}) => {
  return (
    <div
      className="social-flip-node"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setTooltipIndex(index)}
      onMouseLeave={() => setTooltipIndex(null)}
    >
      {/* Floating Tooltip */}
      <AnimatePresence>
        {isHovered && tooltipIndex === index && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.85, x: '-50%' }}
            animate={{ opacity: 1, y: -44, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: 8, scale: 0.85, x: '-50%' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="social-flip-tooltip"
          >
            <span>{item.label}</span>
            <div className="social-flip-tooltip-arrow" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={item.href || '#'}
        target={item.href && item.href !== '#' ? '_blank' : '_self'}
        rel="noopener noreferrer"
        aria-label={item.label}
        className="social-flip-link"
        onClick={(e) => {
          if (item.href === '#') {
            e.preventDefault();
          }
        }}
      >
        <motion.div
          className="social-flip-card-inner"
          initial={false}
          animate={{ rotateY: isHovered ? 180 : 0 }}
          transition={{
            duration: 0.75,
            type: 'spring',
            stiffness: 110,
            damping: 14,
            delay: index * 0.08,
          }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front Side: Metallic Gold Monogram Letter */}
          <div className="social-flip-face social-flip-front">
            <span>{item.letter}</span>
          </div>

          {/* Back Side: Luxury Gold/Burgundy Social Icon */}
          <div className="social-flip-face social-flip-back">
            {item.icon}
          </div>
        </motion.div>
      </a>
    </div>
  );
};

export default function SocialFlipButton({ items = defaultSocialItems, className = '' }) {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipIndex, setTooltipIndex] = useState(null);

  return (
    <div className={`social-flip-container ${className}`}>
      <div
        className="social-flip-bar"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setTooltipIndex(null);
        }}
      >
        {/* Animated Border Lines */}
        <div className="social-border-lines" aria-hidden="true">
          <motion.div
            className="border-line-top"
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
          <motion.div
            className="border-line-bottom"
            animate={{ x: ['100%', '-100%'] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        {items.map((item, index) => (
          <SocialFlipNode
            key={index}
            item={item}
            index={index}
            isHovered={isHovered}
            setTooltipIndex={setTooltipIndex}
            tooltipIndex={tooltipIndex}
          />
        ))}
      </div>
    </div>
  );
}
