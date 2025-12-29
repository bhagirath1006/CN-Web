import './WhoWeAre.css'
import sphereVideo from '../assets/2nd-fold-Sphere-Sparkles.webm'

function WhoWeAre() {
  return (
    <section className="who-we-are-section">
      <div className="who-we-are-container">
        <div className="who-we-are-content">
          <div className="key-information">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <span>KEY INFORMATION</span>
          </div>
          
          <h2 className="who-we-are-title">Who We Are ?</h2>
          
          <p className="who-we-are-description">
            At CloudNexus, we offer a diverse range of IT solutions and digital services designed to empower businesses with progressive technology. From custom software development to cloud solutions and digital transformation, our expertise helps organizations optimize efficiency, enhance scalability, and drive innovation.
          </p>
          
          <div className="why-cloud-nexus">
            <h3 className="why-cloud-nexus-title">Why Cloud Nexus</h3>
            <ul className="why-cloud-nexus-list">
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12l5 5l10-10"/>
                </svg>
                <span>End-to-End Support</span>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12l5 5l10-10"/>
                </svg>
                <span>Expert Team & Global Experience</span>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12l5 5l10-10"/>
                </svg>
                <span>Security & Reliability</span>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12l5 5l10-10"/>
                </svg>
                <span>Business-Centric Results</span>
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12l5 5l10-10"/>
                </svg>
                <span>Product-Driven Innovation</span>
              </li>
            </ul>
          </div>
          
          <div className="who-we-are-metrics">
            <div className="metric-item">
              <div className="metric-value">240+</div>
              <div className="metric-label">Team Size</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">100%</div>
              <div className="metric-label">Customer Satisfaction</div>
            </div>
          </div>
        </div>
        
        <div className="who-we-are-video">
          <video
            className="sphere-video"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={sphereVideo} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  )
}

export default WhoWeAre

