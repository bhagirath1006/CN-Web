import './WhyChooseUs.css'
import whyChooseUsImage from '../assets/business-man-holding-clipboard-with-why-choose-us-question_23-2148932313.jpg'

function WhyChooseUs() {
  return (
    <section className="why-choose-us-section">
      {/* Top Section - Dark Gray */}
      <div className="why-choose-us-top">
        <div className="why-choose-us-container">
          <div className="why-choose-us-content">
            <div className="why-choose-us-left">
              <div className="section-label">
                <div className="label-line"></div>
                <span>WHY CHOOSE US</span>
              </div>
              <h2 className="why-choose-us-heading">
                Why Our Technology Solutions Company Stands Out?
              </h2>
              <p className="why-choose-us-description">
                There are many variations of passages of lorem ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.
              </p>

              <div className="feature-blocks">
                <div className="feature-block">
                  <div className="feature-icon-box">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="#1387f3" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="4" width="20" height="14" rx="2" fill="#1387f3"/>
                      <rect x="4" y="6" width="16" height="10" fill="#1a1a1a"/>
                      <circle cx="8" cy="10" r="1.5" fill="#1387f3"/>
                      <circle cx="12" cy="10" r="1.5" fill="#1387f3"/>
                      <circle cx="16" cy="10" r="1.5" fill="#1387f3"/>
                      <path d="M6 14h12v2H6z" fill="#1387f3"/>
                      <circle cx="18" cy="8" r="2" fill="#1387f3"/>
                      <path d="M17 8h2M18 7v2" stroke="#1a1a1a" strokeWidth="1"/>
                    </svg>
                  </div>
                  <div className="feature-text">
                    <h3>We're Navigating IT Solutions with Precision and best Excellence</h3>
                  </div>
                  <button className="feature-arrow-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>

                <div className="feature-block">
                  <div className="feature-icon-box">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="#1387f3" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z" fill="#1387f3"/>
                      <circle cx="12" cy="9" r="2" fill="#1a1a1a"/>
                      <path d="M12 11v3M10 13h4" stroke="#1a1a1a" strokeWidth="1.5"/>
                      <path d="M8 5l2 2M16 5l-2 2M6 12l2-2M18 12l-2-2" stroke="#1387f3" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="feature-text">
                    <h3>We're Resolving Your Technology Woes with Expert Care</h3>
                  </div>
                  <button className="feature-arrow-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="why-choose-us-right">
              <div className="why-choose-us-image-wrapper">
                <img 
                  src={whyChooseUsImage} 
                  alt="Why Choose Us" 
                  className="why-choose-us-image"
                />
              </div>
              <div className="why-choose-us-gradient"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section - Cyan CTA */}
      <div className="why-choose-us-cta">
        <div className="why-choose-us-container">
          <div className="cta-content">
            <h3 className="cta-heading">Get The Best Source For IT Solutions and Service</h3>
            <button className="cta-button">Get In Touch</button>
          </div>
        </div>
      </div>

      {/* Bottom Section - Testimonials Header */}
      <div className="testimonials-header">
        <div className="why-choose-us-container">
          <div className="section-label">
            <div className="label-line"></div>
            <span>TESTIMONIAL</span>
          </div>
          <h2 className="testimonials-heading">What Customers Are Saying?</h2>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs

