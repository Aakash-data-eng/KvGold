import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Download, MessageCircle, Gem, Scale, Palette, ArrowRight, X } from 'lucide-react';
import { KV_GOLD_CONTACT, downloadVCardFile } from '../config/vcardConfig';
import '../styles/visiting-card.css';

export default function KVGoldDigitalVisitingCard({ onClose, onOpenSchemeModal }) {
  return (
    <div className="vcard-modal-backdrop" role="dialog" aria-modal="true" aria-label="KV Gold Digital Visiting Card">
      <div className="vcard-card-frame">
        {/* Close Button */}
        {onClose && (
          <button type="button" className="vcard-close-btn" onClick={onClose} aria-label="Close digital visiting card">
            <X size={20} />
          </button>
        )}

        {/* Ambient Radial Lighting */}
        <div className="vcard-glow-bg" aria-hidden="true" />

        {/* Header Branding */}
        <div className="vcard-header">
          <div className="vcard-crest-emblem">
            <div className="vcard-crest-ring">
              <span className="vcard-monogram">KV</span>
            </div>
            <span className="vcard-spark" aria-hidden="true">✦</span>
          </div>

          <h1 className="vcard-brand-name">KV GOLD</h1>
          <div className="vcard-tagline">{KV_GOLD_CONTACT.tagline}</div>

          <div className="vcard-trust-pill">
            <ShieldCheck size={14} />
            <span>916 BIS HALLMARK CERTIFIED • TRUSTED SELLER</span>
          </div>
        </div>

        {/* Tagline Statements */}
        <div className="vcard-quotes-block">
          <p className="vcard-quote-en">"{KV_GOLD_CONTACT.subTagline}"</p>
          <p className="vcard-quote-ta">"{KV_GOLD_CONTACT.subTaglineTamil}"</p>
        </div>

        {/* Primary Action Buttons */}
        <div className="vcard-primary-actions">
          <button
            type="button"
            className="vcard-action-btn btn-save"
            onClick={downloadVCardFile}
          >
            <Download size={18} />
            <span>SAVE CONTACT (.VCF)</span>
          </button>

          <a href={`tel:${KV_GOLD_CONTACT.phoneRaw}`} className="vcard-action-btn btn-call">
            <Phone size={18} />
            <span>CALL 98943 52616</span>
          </a>

          <a
            href={KV_GOLD_CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="vcard-action-btn btn-whatsapp"
          >
            <MessageCircle size={18} />
            <span>WHATSAPP US</span>
          </a>
        </div>

        {/* Services Overview */}
        <div className="vcard-services-section">
          <h2 className="vcard-section-title">OUR SERVICES • எங்கள் சேவைகள்</h2>
          
          <div className="vcard-services-grid">
            <div className="vcard-service-item">
              <Gem size={18} className="service-icon" />
              <div>
                <strong className="service-title">BUY GOLD JEWELLERY</strong>
                <span className="service-ta">தங்க நகைகள் வாங்குதல்</span>
              </div>
            </div>

            <div className="vcard-service-item">
              <Scale size={18} className="service-icon" />
              <div>
                <strong className="service-title">SELL YOUR GOLD</strong>
                <span className="service-ta">உங்கள் தங்கத்தை விற்க</span>
              </div>
            </div>

            <div className="vcard-service-item">
              <ShieldCheck size={18} className="service-icon" />
              <div>
                <strong className="service-title">GOLD VALUATION</strong>
                <span className="service-ta">தங்க மதிப்பீடு (No Obligation)</span>
              </div>
            </div>

            <div className="vcard-service-item">
              <Palette size={18} className="service-icon" />
              <div>
                <strong className="service-title">CUSTOM JEWELLERY</strong>
                <span className="service-ta">தனிப்பயன் நகை வடிவமைப்பு</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Details List */}
        <div className="vcard-contact-list">
          <div className="contact-row">
            <Phone size={16} className="row-icon" />
            <div>
              <span className="row-label">PHONE / TELEPHONE</span>
              <a href={`tel:${KV_GOLD_CONTACT.phoneRaw}`} className="row-val">{KV_GOLD_CONTACT.phone}</a>
            </div>
          </div>

          <div className="contact-row">
            <Mail size={16} className="row-icon" />
            <div>
              <span className="row-label">EMAIL ADDRESS</span>
              <a href={`mailto:${KV_GOLD_CONTACT.email}`} className="row-val">{KV_GOLD_CONTACT.email}</a>
            </div>
          </div>

          <div className="contact-row">
            <MapPin size={16} className="row-icon" />
            <div>
              <span className="row-label">SHOWROOM LOCATIONS</span>
              <span className="row-val">{KV_GOLD_CONTACT.locations}</span>
              <span className="row-sub">{KV_GOLD_CONTACT.deliveryNotice}</span>
            </div>
          </div>
        </div>

        {/* Bottom Explore Button */}
        <div className="vcard-footer">
          <button
            type="button"
            className="vcard-explore-btn"
            onClick={() => {
              if (onClose) onClose();
              const collectionEl = document.querySelector('#gold-collection');
              if (collectionEl) collectionEl.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>EXPLORE KV GOLD COLLECTION</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
