import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TiltedCard from '../components/TiltedCard'
import { getTechLogo } from '../utils/techLogos'
import './IoTAutomationPage.css'
import heroImage from '../assets/iot.jpg'
import iotImage from '../assets/iot.jpg'

gsap.registerPlugin(ScrollTrigger)

function IoTAutomationPage() {
  const [activeCategory, setActiveCategory] = useState('IoT')
  const methodologyStepsRef = useRef([])

  const technologies = {
    IoT: [
      { name: 'Arduino', logo: getTechLogo('Arduino') },
      { name: 'Raspberry Pi', logo: getTechLogo('Raspberry Pi') },
      { name: 'MQTT', logo: getTechLogo('MQTT') },
      { name: 'Node-RED', logo: getTechLogo('Node-RED') }
    ],
    Automation: [
      { name: 'Python', logo: getTechLogo('Python') },
      { name: 'Home Assistant', logo: getTechLogo('Home Assistant') },
      { name: 'Zigbee', logo: getTechLogo('Zigbee') },
      { name: 'Z-Wave', logo: getTechLogo('Z-Wave') }
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
          <img src={heroImage} alt="IoT & Automation" />
          <div className="app-dev-hero-overlay"></div>
        </div>
        <div className="app-dev-hero-content">
          <h1 className="app-dev-hero-title">IoT & Automation</h1>
          <p className="app-dev-hero-tagline">Connecting devices and automating processes for smarter, more efficient operations.</p>
        </div>
      </section>

      <section className="scalable-solutions">
        <div className="scalable-solutions-container">
          <h2 className="scalable-solutions-title">Scalable Solutions</h2>
          <p className="scalable-solutions-description">
            We design and implement IoT solutions and automation systems that connect devices, collect data, and automate processes. From smart homes to industrial automation, our expert team creates intelligent systems that improve efficiency and reduce operational costs.
          </p>
        </div>
      </section>

      <section className="app-dev-services">
        <div className="app-dev-services-container">
          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={iotImage}
              altText="IoT Development"
              captionText="IoT Development"
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
              <div className="ios-icon">IoT</div>
            </div>
            <h3 className="service-card-title">IoT Development</h3>
            <p className="service-card-description">
              We develop IoT solutions that connect devices and enable real-time data collection and monitoring. Our solutions help you leverage the power of connected devices to improve operations and decision-making.
            </p>
                </div>
              }
            />
          </div>

          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={iotImage}
              altText="Process Automation"
              captionText="Process Automation"
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
              <div className="android-icon">Automation</div>
            </div>
            <h3 className="service-card-title">Process Automation</h3>
            <p className="service-card-description">
              We automate repetitive tasks and workflows to increase efficiency and reduce human error. Our automation solutions streamline operations and free up resources for more strategic work.
            </p>
                </div>
              }
            />
          </div>

          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={iotImage}
              altText="System Integration"
              captionText="System Integration"
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
              <div className="react-icon">Integration</div>
            </div>
            <h3 className="service-card-title">System Integration</h3>
            <p className="service-card-description">
              We integrate IoT devices and automation systems with your existing infrastructure. Our solutions ensure seamless communication between devices and systems for optimal performance.
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
          <h2 className="methodology-title">Our IoT & Automation Methodology</h2>
          
          <div className="methodology-header">
            <div className="methodology-header-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3 className="methodology-header-title">IoT & Automation Process (5-Step Model)</h3>
          </div>

          <div className="methodology-steps">
            <div className="methodology-step" ref={el => methodologyStepsRef.current[0] = el}>
              <div className="step-number">1</div>
              <div className="step-content">
                <h4 className="step-title">Planning & System Design</h4>
                <p className="step-description">
                  Identify the problem, define system requirements, objectives, constraints, perform feasibility studies, risk assessment, and design the complete IoT architecture including Perception, Network, Edge, Cloud, and Application layers.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[1] = el}>
              <div className="step-number">2</div>
              <div className="step-content">
                <h4 className="step-title">Hardware & Communication Setup</h4>
                <p className="step-description">
                  Select appropriate sensors, microcontrollers/microprocessors, power management strategies, and establish secure wired or wireless communication protocols.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[2] = el}>
              <div className="step-number">3</div>
              <div className="step-content">
                <h4 className="step-title">Data Processing & Cloud Integration</h4>
                <p className="step-description">
                  Implement edge/fog computing for real-time processing, integrate cloud platforms for data storage, visualization, big data analytics, and apply AI/ML models for intelligent automation.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[3] = el}>
              <div className="step-number">4</div>
              <div className="step-content">
                <h4 className="step-title">Automation, Control & Security</h4>
                <p className="step-description">
                  Develop automation logic, integrate actuators and control mechanisms, implement feedback loops, ensure secure communication, firmware updates, and compliance with data protection regulations.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[4] = el}>
              <div className="step-number">5</div>
              <div className="step-content">
                <h4 className="step-title">Testing, Deployment & Maintenance</h4>
                <p className="step-description">
                  Perform functional, integration, and stress testing, deploy the system in the target environment, enable remote monitoring, and plan for scalability and long-term maintenance.
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

export default IoTAutomationPage

