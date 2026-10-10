import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, Phone, ShieldCheck, Scale, FileText, Sparkles, Gem, DollarSign, Palette, CheckCircle2 } from 'lucide-react';
import '../styles/gold-buying.css';

export default function GoldBuyingService({ onOpenSchemeModal }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);
  const [activeTab, setActiveTab] = useState('what-we-do');

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

  const valuationSteps = [
    { num: '01', title: 'BRING YOUR GOLD', titleTa: 'உங்கள் தங்கத்தை கொண்டு வாருங்கள்', desc: 'Visit our desk with your gold item.' },
    { num: '02', title: 'ASSESSMENT', titleTa: 'மதிப்பீடு', desc: 'Initial physical check & evaluation.' },
    { num: '03', title: 'PURITY & WEIGHT REVIEW', titleTa: 'தரம் மற்றும் எடை சரிபார்ப்பு', desc: 'Precision weight review & karat testing.' },
    { num: '04', title: 'RATE-BASED VALUATION', titleTa: 'சந்தை விலை மதிப்பீடு', desc: 'Valuation based on daily prevailing rates.' },
    { num: '05', title: 'CLEAR COMMUNICATION', titleTa: 'தெளிவான விளக்கம்', desc: 'Full breakdown of weight, purity & value.' },
    { num: '06', title: 'YOUR DECISION', titleTa: 'உங்கள் முடிவு', desc: 'No obligation to proceed.' },
  ];

  const customProcessSteps = [
    { label: 'YOUR IDEA', labelTa: 'உங்கள் எண்ணம்' },
    { label: 'DESIGN DISCUSSION', labelTa: 'வடிவமைப்பு ஆலோசனை' },
    { label: 'CUSTOMIZATION', labelTa: 'தனிப்பயனாக்கம்' },
    { label: 'CRAFTING', labelTa: 'உருவாக்கம்' },
    { label: 'QUALITY CHECK', labelTa: 'தரச் சரிபார்ப்பு' },
    { label: 'YOUR JEWELLERY', labelTa: 'உங்கள் நகை' },
  ];

  return (
    <section className="buying-section" id="buying-service" ref={sectionRef} aria-label="What We Do & Gold Buying Services">
      {/* Ambient Lighting */}
      <div className="buying-ambient-glow center-glow" aria-hidden="true" />

      <div className="buying-wrapper">
        <div className={`buying-card-container ${isVisible ? 'is-revealed' : ''}`}>
          
          {/* Main Section Header */}
          <div className="buying-header">
            <div className="buying-eyebrow">
              <span className="eyebrow-spark">✦</span>
              <span>TRUSTED SELLER • நாங்கள் வழங்கும் சேவைகள்</span>
              <span className="eyebrow-spark">✦</span>
            </div>

            <h2 className="buying-title">WHAT WE DO • நாங்கள் வழங்கும் சேவைகள்</h2>

            <p className="buying-subtitle">
              At KV GOLD, we make every gold decision simpler and more transparent — whether you're buying jewellery, selling your gold, or creating something uniquely yours.
            </p>
            <p className="buying-subtitle-tamil">
              தங்க நகை தேர்வு முதல் அதன் மதிப்பை புரிந்துகொள்வது வரை, உங்கள் பழைய தங்கத்தை விற்பது முதல் உங்கள் விருப்பத்திற்கேற்ற புதிய நகையை உருவாக்குவது வரை — உங்கள் தங்கத் தேவைகளுக்கான ஒரு நம்பிக்கையான இடம் KV GOLD.
            </p>
          </div>

          {/* 6 Elegant Service Blocks Grid */}
          <div className="what-we-do-grid">
            
            {/* SERVICE 01 */}
            <div className="service-block-card">
              <div className="service-block-num">SERVICE 01</div>
              <div className="service-block-icon">
                <Gem size={22} />
              </div>
              <h3 className="service-block-title">BUY GOLD JEWELLERY</h3>
              <p className="service-block-desc">
                Explore gold jewellery designed for everyday elegance, celebrations and meaningful occasions.
              </p>
              <p className="service-block-desc-ta">
                தினசரி அணிவதற்கும், சிறப்பு நிகழ்வுகளுக்கும், உங்கள் வாழ்க்கையின் முக்கிய தருணங்களுக்கும் ஏற்ற தங்க நகைகளை தேர்வு செய்யுங்கள்.
              </p>
              <button
                type="button"
                className="service-block-cta"
                onClick={() => {
                  const el = document.querySelector('#gold-collection');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>EXPLORE GOLD</span>
                <span className="cta-ta"> • தங்க நகைகளை பார்க்க</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* SERVICE 02 */}
            <div className="service-block-card">
              <div className="service-block-num">SERVICE 02</div>
              <div className="service-block-icon">
                <Scale size={22} />
              </div>
              <h3 className="service-block-title">SELL YOUR GOLD</h3>
              <p className="service-block-desc">
                Looking to sell your gold? KV GOLD provides a transparent valuation process based on the relevant gold purity, weight and applicable market rates.
              </p>
              <p className="service-block-desc-ta">
                உங்கள் தங்கத்தை விற்க விரும்புகிறீர்களா? தங்கத்தின் தரம், எடை மற்றும் பொருந்தக்கூடிய சந்தை விலையை அடிப்படையாகக் கொண்டு தெளிவான மதிப்பீட்டு முறையை வழங்குகிறோம்.
              </p>
              <button
                type="button"
                className="service-block-cta"
                onClick={() => onOpenSchemeModal && onOpenSchemeModal('தங்கம் மதிப்பீடு / விற்பனை')}
              >
                <span>GET A GOLD VALUATION</span>
                <span className="cta-ta"> • தங்க மதிப்பீடு பெற</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* SERVICE 03 */}
            <div className="service-block-card">
              <div className="service-block-num">SERVICE 03</div>
              <div className="service-block-icon">
                <Palette size={22} />
              </div>
              <h3 className="service-block-title">CUSTOM JEWELLERY</h3>
              <p className="service-block-desc">
                Have a design in mind? We can help turn your idea into a jewellery piece tailored to your preferred design, style and requirements, subject to feasibility.
              </p>
              <p className="service-block-desc-ta">
                உங்கள் மனதில் ஏற்கனவே ஒரு நகை வடிவமைப்பு இருக்கிறதா? உங்கள் விருப்பமான வடிவம், ஸ்டைல் மற்றும் தேவைகளுக்கு ஏற்றவாறு உங்கள் எண்ணத்தை தனிப்பயன் நகையாக உருவாக்க உதவுகிறோம்.
              </p>
              <button
                type="button"
                className="service-block-cta"
                onClick={() => onOpenSchemeModal && onOpenSchemeModal('தனிப்பயன் நகை வடிவமைப்பு')}
              >
                <span>CREATE YOUR DESIGN</span>
                <span className="cta-ta"> • உங்கள் வடிவமைப்பு</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* SERVICE 04 */}
            <div className="service-block-card">
              <div className="service-block-num">SERVICE 04</div>
              <div className="service-block-icon">
                <DollarSign size={22} />
              </div>
              <h3 className="service-block-title">FAIR & TRANSPARENT PRICING</h3>
              <p className="service-block-desc">
                We believe customers should understand what they are paying for. We aim to provide competitive, market-aligned pricing with clear communication around gold value, making charges and applicable taxes.
              </p>
              <p className="service-block-desc-ta">
                நீங்கள் செலுத்தும் தொகை எதற்காக என்பதை தெளிவாக புரிந்துகொள்ள வேண்டும் என்பதே எங்கள் நோக்கம். தங்கத்தின் மதிப்பு, making charges மற்றும் பொருந்தக்கூடிய வரிகள் குறித்து தெளிவான தகவல்களுடன், போட்டித்தன்மை கொண்ட சந்தை சார்ந்த விலையை வழங்க முயற்சிக்கிறோம்.
              </p>
            </div>

          </div>

          {/* ================================================================
              WE BUY GOLD — STRONG USP SECTION
              ================================================================ */}
          <div className="we-buy-gold-box">
            <div className="we-buy-header">
              <span className="we-buy-tag">WE BUY GOLD • உங்கள் தங்கத்தையும் நாங்கள் வாங்குகிறோம்</span>
              <h3 className="we-buy-title">YOUR GOLD HAS VALUE. WE HELP YOU UNDERSTAND IT CLEARLY.</h3>
              <h4 className="we-buy-title-ta">உங்கள் தங்கத்திற்கு நியாயமான மதிப்பு</h4>
              
              <p className="we-buy-desc">
                Whether you're looking to upgrade an old piece, sell unused jewellery, or simply understand its current value, KV GOLD offers a clear and customer-focused valuation process.
              </p>
              <p className="we-buy-desc-ta">
                பழைய நகையை மாற்ற விரும்பினாலும், பயன்படுத்தாத தங்கத்தை விற்க விரும்பினாலும், அல்லது அதன் தற்போதைய மதிப்பை தெரிந்துகொள்ள விரும்பினாலும், KV GOLD தெளிவான மற்றும் வாடிக்கையாளர் மையமான மதிப்பீட்டு சேவையை வழங்குகிறது.
              </p>
            </div>

            <div className="fair-rate-banner">
              <Sparkles size={16} className="fair-spark" />
              <div>
                <strong>FAIR VALUE FOR YOUR GOLD:</strong> We aim to offer competitive rates for eligible gold, based on applicable purity, weight, prevailing rates and the evaluation of the item.
                <div className="fair-rate-ta">
                  தங்கத்தின் தரம், எடை, அன்றைய பொருந்தக்கூடிய சந்தை விலை மற்றும் மதிப்பீட்டு முடிவுகளை அடிப்படையாகக் கொண்டு, தகுதியான தங்கத்திற்கு போட்டித்தன்மை கொண்ட விலையை வழங்க முயற்சிக்கிறோம்.
                </div>
              </div>
            </div>

            {/* 6-STEP VALUATION PROCESS */}
            <div className="valuation-process-section">
              <h4 className="process-title">KNOW THE VALUE OF YOUR GOLD • 6-STEP VALUATION</h4>
              <p className="process-sub-ta">உங்கள் தங்கத்தின் உண்மையான மதிப்பை அறியுங்கள்</p>

              <div className="valuation-steps-grid">
                {valuationSteps.map((step) => (
                  <div key={step.num} className="valuation-step-card">
                    <span className="step-num">{step.num}</span>
                    <h5 className="step-title">{step.title}</h5>
                    <span className="step-ta">{step.titleTa}</span>
                    <p className="step-desc">{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className="no-obligation-badge">
                <ShieldCheck size={16} />
                <span>NO OBLIGATION TO PROCEED • மதிப்பீட்டுக்குப் பிறகு விற்பனை செய்ய எந்த கட்டாயமும் இல்லை</span>
              </div>
            </div>
          </div>

          {/* ================================================================
              CUSTOMIZATION — MADE FOR YOU
              ================================================================ */}
          <div className="made-for-you-box">
            <div className="made-header">
              <span className="made-tag">MADE FOR YOU • உங்களுக்காக உருவாக்கப்படும் நகை</span>
              <h3 className="made-title">YOUR IDEA. YOUR STYLE. YOUR GOLD.</h3>
              <h4 className="made-title-ta">உங்கள் எண்ணம். உங்கள் ஸ்டைல். உங்கள் தங்க நகை.</h4>

              <p className="made-desc">
                Have a reference image? A design you've imagined? A traditional pattern you want to recreate? A modern style you want to personalize? Talk to KV GOLD about creating a jewellery piece around your preferences, subject to design and production feasibility.
              </p>
              <p className="made-desc-ta">
                உங்களிடம் ஒரு reference image இருக்கிறதா? நீங்கள் நினைத்த ஒரு design இருக்கிறதா? பாரம்பரிய வடிவத்தை புதிதாக உருவாக்க வேண்டுமா? அல்லது உங்களுக்கு மட்டும் பொருந்தும் modern design வேண்டுமா? உங்கள் விருப்பத்தை KV GOLD-உடன் பகிருங்கள்.
              </p>
            </div>

            {/* Process Flow Steps */}
            <div className="custom-flow-container">
              {customProcessSteps.map((step, idx) => (
                <React.Fragment key={step.label}>
                  <div className="custom-flow-step">
                    <span className="flow-label">{step.label}</span>
                    <span className="flow-label-ta">{step.labelTa}</span>
                  </div>
                  {idx < customProcessSteps.length - 1 && (
                    <span className="flow-arrow">↓</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <button
              type="button"
              className="btn-gold-primary made-cta-btn"
              onClick={() => onOpenSchemeModal && onOpenSchemeModal('தனிப்பயன் நகை வடிவமைப்பு')}
            >
              <Sparkles size={16} />
              <span>DISCUSS YOUR DESIGN</span>
              <span className="cta-ta"> • உங்கள் வடிவமைப்பைப் பற்றி பேசுங்கள்</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* ================================================================
              BUY WITH CONFIDENCE CHECKLIST
              ================================================================ */}
          <div className="buy-confidence-box">
            <h3 className="confidence-title">BUY WITH CONFIDENCE • நம்பிக்கையுடன் வாங்குங்கள்</h3>
            <p className="confidence-desc">
              From choosing a design to understanding its value, we want every part of your purchase to be clear.
            </p>

            <div className="confidence-grid">
              <div className="confidence-item">
                <CheckCircle2 size={18} className="check-gold" />
                <div>
                  <strong>Gold Purity Information</strong>
                  <span className="item-ta">தங்கத்தின் தரம் குறித்த தகவல்</span>
                </div>
              </div>

              <div className="confidence-item">
                <CheckCircle2 size={18} className="check-gold" />
                <div>
                  <strong>Hallmark Information Available Where Applicable</strong>
                  <span className="item-ta">பொருந்தும் இடங்களில் hallmark தகவல்</span>
                </div>
              </div>

              <div className="confidence-item">
                <CheckCircle2 size={18} className="check-gold" />
                <div>
                  <strong>Clear & Market-Aligned Pricing</strong>
                  <span className="item-ta">தெளிவான விலை</span>
                </div>
              </div>

              <div className="confidence-item">
                <CheckCircle2 size={18} className="check-gold" />
                <div>
                  <strong>Detailed Jewellery Specifications</strong>
                  <span className="item-ta">நகை விவரங்கள்</span>
                </div>
              </div>

              <div className="confidence-item">
                <CheckCircle2 size={18} className="check-gold" />
                <div>
                  <strong>Complete Transaction Documentation</strong>
                  <span className="item-ta">பரிவர்த்தனை ஆவணங்கள்</span>
                </div>
              </div>

              <div className="confidence-item">
                <CheckCircle2 size={18} className="check-gold" />
                <div>
                  <strong>Dedicated Customer Assistance</strong>
                  <span className="item-ta">வாடிக்கையாளர் உதவி</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="buying-actions-row">
            <button
              type="button"
              className="btn-gold-primary buying-cta-btn"
              onClick={() => onOpenSchemeModal && onOpenSchemeModal('தங்கம் விற்பனை / மதிப்பீடு')}
            >
              <Sparkles size={16} />
              <span>GET A GOLD VALUATION</span>
              <ArrowRight size={16} />
            </button>

            <a
              href="tel:9894352616"
              className="buying-phone-btn"
              aria-label="Call KV Gold Valuation Desk"
            >
              <Phone size={16} />
              <span>CALL 98943 52616 FOR VALUATION</span>
            </a>
          </div>

          {/* Bottom Hallmarked Seal Banner */}
          <div className="buying-seal-banner">
            <span className="seal-text">HALLMARKED • TESTED • TRUSTED</span>
            <span className="seal-sub">Every eligible gold product is presented with appropriate hallmark information and clear testing reports where applicable.</span>
          </div>

        </div>
      </div>
    </section>
  );
}

