import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
  Building2,
  Maximize2,
  Minimize2,
  ExternalLink
} from 'lucide-react';
import '../styles/store-locator.css';

// Authoritative KV GOLD Single Branch Location — Coimbatore
const COIMBATORE_BRANCH = {
  name: 'KV GOLD — Coimbatore Branch',
  city: 'Coimbatore',
  address: 'Ramanathapuram, Coimbatore, Tamil Nadu – 641045',
  phone: '98943 52616',
  hours: '9:00 AM - 9:00 PM',
  lat: 10.998906,
  lng: 76.9961401,
  embedUrl: 'https://maps.google.com/maps?q=10.998906,76.9961401&z=16&output=embed',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=10.998906%2C76.9961401',
  gmapsRefUrl: 'https://www.google.com/maps/@10.998906,76.9961401,15z',
};

export default function StoreLocatorDoorstep() {
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [mapError, setMapError] = useState(false);

  return (
    <section
      className="store-locator-section"
      id="store-locator"
      aria-label="KV Gold Coimbatore Branch Location"
    >
      <div className="container">
        {/* Section Header */}
        <div className="store-section-header">
          <div className="section-badge-wrapper">
            <span className="section-badge-dot" />
            <span className="section-badge-text">OUR COIMBATORE BRANCH</span>
          </div>

          <h2 className="section-title">
            OUR COIMBATORE BRANCH
          </h2>

          <p className="section-subtitle">
            Visit KV GOLD in Ramanathapuram, Coimbatore for 100% transparent gold buying and selling.
          </p>

          <p className="store-subtitle-tamil">
            கோவை இராமநாதபுரத்தில் அமைந்துள்ள KV GOLD கிளைக்கு வருகை தாருங்கள்.
          </p>
        </div>

        {/* SINGLE COIMBATORE BRANCH & INTERACTIVE REAL GOOGLE MAP */}
        <div className={`store-locator-content ${isMapExpanded ? 'map-is-expanded' : ''}`}>
          {/* Left Box: Single Branch Information Card */}
          <div className="single-branch-info-card">
            <div className="branch-info-header">
              <div className="branch-badge">
                <MapPin size={14} className="gold-pin-icon" />
                <span>HEADQUARTERS & BRANCH</span>
              </div>
              <h3 className="branch-title">{COIMBATORE_BRANCH.name}</h3>
              <p className="branch-full-address">{COIMBATORE_BRANCH.address}</p>
            </div>

            <div className="branch-meta-specs">
              <div className="branch-meta-row">
                <Phone size={14} className="gold-icon" />
                <span>Hotline: {COIMBATORE_BRANCH.phone}</span>
              </div>
              <div className="branch-meta-row">
                <ShieldCheck size={14} className="gold-icon" />
                <span>Purity Testing: Germanometer XRF Certified</span>
              </div>
            </div>

            {/* Branch Action Buttons */}
            <div className="branch-ctas-wrap">
              <a
                href={COIMBATORE_BRANCH.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-primary branch-btn-action"
              >
                <Navigation size={15} />
                <span>GET DIRECTIONS</span>
              </a>

              <a
                href={COIMBATORE_BRANCH.gmapsRefUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-luxury-secondary branch-btn-action"
              >
                <ExternalLink size={14} />
                <span>OPEN IN GOOGLE MAPS</span>
              </a>

              <button
                type="button"
                className="btn-luxury-secondary expand-map-toggle-btn"
                onClick={() => setIsMapExpanded(!isMapExpanded)}
              >
                {isMapExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                <span>{isMapExpanded ? 'COLLAPSE MAP' : 'EXPAND MAP'}</span>
              </button>
            </div>
          </div>

          {/* Right Box: Real Interactive Google Maps Embed Container */}
          <div className={`store-map-preview-card ${isMapExpanded ? 'expanded-card' : ''}`}>
            <div className="map-card-header">
              <div className="map-header-title">
                <Building2 size={18} className="map-pin-gold" />
                <div>
                  <h4>{COIMBATORE_BRANCH.name}</h4>
                  <p>{COIMBATORE_BRANCH.address}</p>
                </div>
              </div>

              <div className="map-header-actions">
                <button
                  type="button"
                  className="expand-badge-btn"
                  onClick={() => setIsMapExpanded(!isMapExpanded)}
                  title={isMapExpanded ? 'Collapse Map' : 'Expand Map'}
                >
                  {isMapExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                  <span>{isMapExpanded ? 'COLLAPSE' : 'EXPAND'}</span>
                </button>

                <a
                  href={COIMBATORE_BRANCH.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-primary map-directions-btn"
                >
                  <Navigation size={13} />
                  <span>DIRECTIONS</span>
                </a>
              </div>
            </div>

            {/* Interactive Real Google Maps iFrame */}
            <div className={`styled-map-canvas ${isMapExpanded ? 'canvas-expanded' : ''}`}>
              {!mapError ? (
                <iframe
                  title="KV GOLD Coimbatore branch location"
                  src={COIMBATORE_BRANCH.embedUrl}
                  className="real-google-map-iframe"
                  loading="lazy"
                  allowFullScreen
                  onError={() => setMapError(true)}
                />
              ) : (
                <div className="map-fallback-card">
                  <MapPin size={36} className="map-fallback-icon" />
                  <h4>KV GOLD — Coimbatore Branch</h4>
                  <p>{COIMBATORE_BRANCH.address}</p>
                  <a
                    href={COIMBATORE_BRANCH.gmapsRefUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold-primary"
                  >
                    <ExternalLink size={14} />
                    <span>OPEN IN GOOGLE MAPS</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
