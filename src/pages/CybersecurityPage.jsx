import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TiltedCard from '../components/TiltedCard'
import { getTechLogo } from '../utils/techLogos'
import './CybersecurityPage.css'
import heroImage from '../assets/WhatsApp Image 2025-12-03 at 17.57.58_ae78e781.jpg'
import cyberImage from '../assets/WhatsApp Image 2025-12-03 at 17.57.58_ae78e781.jpg'

gsap.registerPlugin(ScrollTrigger)

function CybersecurityPage() {
  const [activeCategory, setActiveCategory] = useState('Security')
  const methodologyStepsRef = useRef([])

  const technologies = {
    Security: [
      { name: 'Firewall', logo: getTechLogo('Firewall') },
      { name: 'SSL/TLS', logo: getTechLogo('SSL/TLS') },
      { name: 'VPN', logo: getTechLogo('VPN') },
      { name: 'Encryption', logo: getTechLogo('Encryption') }
    ],
    Monitoring: [
      { name: 'SIEM', logo: getTechLogo('SIEM') },
      { name: 'IDS/IPS', logo: getTechLogo('IDS/IPS') },
      { name: 'Penetration Testing', logo: getTechLogo('Penetration Testing') },
      { name: 'Vulnerability Scanning', logo: getTechLogo('Vulnerability Scanning') }
    ]
  }

  useEffect(() => {
    const steps = methodologyStepsRef.current.filter(Boolean)
    
    if (!steps.length) return

    steps.forEach((step, index) => {
      const stepNumber = index + 1 // 1-based index (1, 2, 3, 4, 5)
      const isOdd = stepNumber % 2 === 1
      
      // Set initial state - off screen
      gsap.set(step, {
        opacity: 0,
        x: isOdd ? -150 : 150 // Odd from left, even from right
      })

      // Create timeline for animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: 'top 85%',
          end: 'top 50%',
          scrub: 1,
          toggleActions: 'play none none reverse'
        }
      })

      // Animate in
      tl.to(step, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out'
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger && 
            steps.some(step => step && trigger.vars.trigger === step)) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <>
      <Header />
      
      <section className="app-dev-hero">
        <div className="app-dev-hero-image">
          <img src={heroImage} alt="Cybersecurity" />
          <div className="app-dev-hero-overlay"></div>
        </div>
        <div className="app-dev-hero-content">
          <h1 className="app-dev-hero-title">Cybersecurity</h1>
          <p className="app-dev-hero-tagline">Protecting your digital assets with comprehensive security solutions and best practices.</p>
        </div>
      </section>

      <section className="scalable-solutions">
        <div className="scalable-solutions-container">
          <h2 className="scalable-solutions-title">Scalable Solutions</h2>
          <p className="scalable-solutions-description">
            We provide comprehensive cybersecurity services to protect your business from threats and vulnerabilities. From security audits to incident response, our expert team ensures your systems, data, and applications are secure and compliant with industry standards.
          </p>
        </div>
      </section>

      <section className="app-dev-services">
        <div className="app-dev-services-container">
          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={cyberImage}
              altText="Security Assessment"
              captionText="Security Assessment"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <div className="tilted-card-overlay-content">
            <div className="service-card-icon">
              <div className="ios-icon">Security</div>
            </div>
            <h3 className="service-card-title">Security Assessment</h3>
            <p className="service-card-description">
              We conduct comprehensive security assessments to identify vulnerabilities and risks in your systems. Our assessments help you understand your security posture and prioritize improvements.
            </p>
                </div>
              }
            />
          </div>

          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={cyberImage}
              altText="Threat Protection"
              captionText="Threat Protection"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <div className="tilted-card-overlay-content">
            <div className="service-card-icon">
              <div className="android-icon">Protection</div>
            </div>
            <h3 className="service-card-title">Threat Protection</h3>
            <p className="service-card-description">
              We implement security measures to protect your systems from cyber threats. Our solutions include firewalls, intrusion detection, and advanced threat protection.
            </p>
                </div>
              }
            />
          </div>

          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={cyberImage}
              altText="Compliance & Auditing"
              captionText="Compliance & Auditing"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <div className="tilted-card-overlay-content">
            <div className="service-card-icon">
              <div className="react-icon">Compliance</div>
            </div>
            <h3 className="service-card-title">Compliance & Auditing</h3>
            <p className="service-card-description">
              We help you achieve and maintain compliance with security standards and regulations. Our auditing services ensure your security practices meet industry requirements.
            </p>
                </div>
              }
            />
          </div>
        </div>
      </section>

      <section className="app-dev-technologies">
        <div className="app-dev-technologies-container">
          <h2 className="technologies-title">Innovative Technologies We Use</h2>
          <p className="technologies-subtitle">Explore the Technologies Powering Our Solutions</p>
          
          <div className="technologies-categories">
            {Object.keys(technologies).map((category) => (
              <button
                key={category}
                className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="technologies-grid">
            {technologies[activeCategory].map((tech, index) => (
              <div key={index} className="technology-item">
                <div className="technology-icon">
                  <img src={tech.logo} alt={tech.name} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
                </div>
                <div className="technology-name">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="app-dev-methodology">
        <div className="app-dev-methodology-container">
          <h2 className="methodology-title">Our Cyber Security Methodology</h2>
          
          <div className="methodology-header">
            <div className="methodology-header-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3 className="methodology-header-title">Cyber Security Process (5-Step Model)</h3>
          </div>

          <div className="methodology-steps">
            <div className="methodology-step" ref={el => methodologyStepsRef.current[0] = el}>
              <div className="step-number">1</div>
              <div className="step-content">
                <h4 className="step-title">Security Assessment & Risk Analysis</h4>
                <p className="step-description">
                  Perform comprehensive security evaluations including risk assessment, vulnerability scanning, penetration testing, and compliance checks to identify system weaknesses, threats, and security gaps.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[1] = el}>
              <div className="step-number">2</div>
              <div className="step-content">
                <h4 className="step-title">Threat Detection & Continuous Monitoring</h4>
                <p className="step-description">
                  Implement advanced monitoring systems such as IDS, IPS, SIEM, and AI-based anomaly detection for real-time visibility of network traffic, system logs, application behavior, and endpoint activities to detect and neutralize cyber threats proactively.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[2] = el}>
              <div className="step-number">3</div>
              <div className="step-content">
                <h4 className="step-title">Prevention Strategy & Security Controls</h4>
                <p className="step-description">
                  Develop and enforce robust security policies, access control mechanisms, endpoint protection, firewall configurations, data encryption, and secure coding practices to prevent unauthorized access, insider threats, and cyberattacks.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[3] = el}>
              <div className="step-number">4</div>
              <div className="step-content">
                <h4 className="step-title">Incident Response & Threat Intelligence</h4>
                <p className="step-description">
                  Execute a well-defined Incident Response Plan (IRP) including threat containment, forensic investigation, root cause analysis, mitigation, recovery planning, and communication protocols. Leverage global threat intelligence and proactive threat-hunting techniques to stop emerging threats early.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[4] = el}>
              <div className="step-number">5</div>
              <div className="step-content">
                <h4 className="step-title">Compliance, Training & Security Optimization</h4>
                <p className="step-description">
                  Ensure compliance with industry standards and regulations such as GDPR, NIST, ISO 27001, HIPAA, SOC 2, and PCI-DSS through regular audits and governance practices. Conduct continuous security awareness training for employees and optimize the security posture through red teaming and ethical hacking exercises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default CybersecurityPage

