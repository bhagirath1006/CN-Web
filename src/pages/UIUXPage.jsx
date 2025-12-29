import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TiltedCard from '../components/TiltedCard'
import { getTechLogo } from '../utils/techLogos'
import './UIUXPage.css'
import heroImage from '../assets/uiux1.jpg'
import uiuxImage from '../assets/uiux.jpg'

gsap.registerPlugin(ScrollTrigger)

function UIUXPage() {
  const [activeCategory, setActiveCategory] = useState('Design')
  const methodologyStepsRef = useRef([])

  const technologies = {
    Design: [
      { name: 'Figma', logo: getTechLogo('Figma') },
      { name: 'Adobe XD', logo: getTechLogo('Adobe XD') },
      { name: 'Sketch', logo: getTechLogo('Sketch') },
      { name: 'InVision', logo: getTechLogo('InVision') }
    ],
    Prototyping: [
      { name: 'Framer', logo: getTechLogo('Framer') },
      { name: 'Principle', logo: getTechLogo('Principle') },
      { name: 'ProtoPie', logo: getTechLogo('ProtoPie') },
      { name: 'Axure', logo: getTechLogo('Axure') }
    ]
  }

  useEffect(() => {
    const steps = methodologyStepsRef.current.filter(Boolean)
    
    if (!steps.length) return

    steps.forEach((step, index) => {
      const stepNumber = index + 1 // 1-based index (1, 2, 3, 4, 5, 6, 7, 8, 9)
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
          <img src={heroImage} alt="UI/UX" />
          <div className="app-dev-hero-overlay"></div>
        </div>
        <div className="app-dev-hero-content">
          <h1 className="app-dev-hero-title">UI/UX</h1>
          <p className="app-dev-hero-tagline">Creating intuitive, beautiful, and user-centered design experiences.</p>
        </div>
      </section>

      <section className="scalable-solutions">
        <div className="scalable-solutions-container">
          <h2 className="scalable-solutions-title">Scalable Solutions</h2>
          <p className="scalable-solutions-description">
            We create user-centered designs that are both beautiful and functional. Our UI/UX team focuses on understanding user needs, creating intuitive interfaces, and delivering exceptional user experiences that drive engagement and conversions.
          </p>
        </div>
      </section>

      <section className="app-dev-services">
        <div className="app-dev-services-container">
          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={uiuxImage}
              altText="User Interface Design"
              captionText="User Interface Design"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={15}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <div className="tilted-card-overlay-content">
                  <div className="service-card-icon">
                    <div className="ios-icon">UI Design</div>
                  </div>
                  <h3 className="service-card-title">User Interface Design</h3>
                  <p className="service-card-description">
                    We design visually appealing and intuitive user interfaces that enhance user experience. Our designs are modern, accessible, and optimized for all devices and screen sizes.
                  </p>
                </div>
              }
            />
          </div>

          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={uiuxImage}
              altText="User Experience Research"
              captionText="User Experience Research"
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
                    <div className="android-icon">UX Research</div>
                  </div>
                  <h3 className="service-card-title">User Experience Research</h3>
                  <p className="service-card-description">
                    We conduct user research to understand your audience's needs and behaviors. Our insights inform design decisions and ensure your products meet user expectations.
                  </p>
                </div>
              }
            />
          </div>

          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={uiuxImage}
              altText="Prototyping & Testing"
              captionText="Prototyping & Testing"
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
                    <div className="react-icon">Prototyping</div>
                  </div>
                  <h3 className="service-card-title">Prototyping & Testing</h3>
                  <p className="service-card-description">
                    We create interactive prototypes and conduct usability testing to validate design concepts. Our iterative approach ensures designs are refined before development.
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
          <h2 className="methodology-title">Our UI/UX Design Methodology</h2>
          
          <div className="methodology-header">
            <div className="methodology-header-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3 className="methodology-header-title">UI/UX Design Process</h3>
          </div>

          <div className="methodology-steps">
            <div className="methodology-step" ref={el => methodologyStepsRef.current[0] = el}>
              <div className="step-number">1</div>
              <div className="step-content">
                <h4 className="step-title">User Research</h4>
                <p className="step-description">
                  Conduct qualitative and quantitative research to understand user needs, behaviors, and pain points. Methods include user interviews, surveys, competitor analysis, and data analytics to create user personas and define problem statements.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[1] = el}>
              <div className="step-number">2</div>
              <div className="step-content">
                <h4 className="step-title">Information Architecture</h4>
                <p className="step-description">
                  Organize content and define the structure of the product, ensuring intuitive navigation. This includes sitemaps, content hierarchy, and user flows to enhance the overall usability and experience.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[2] = el}>
              <div className="step-number">3</div>
              <div className="step-content">
                <h4 className="step-title">Wireframing</h4>
                <p className="step-description">
                  Create low-fidelity design mockups to define layout, functionality, and structure. Tools like Figma, Sketch, or Adobe XD help in developing blueprints of the user interface before adding visual elements.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[3] = el}>
              <div className="step-number">4</div>
              <div className="step-content">
                <h4 className="step-title">Visual Design</h4>
                <p className="step-description">
                  Develop high-fidelity UI designs with typography, colors, icons, and design components. Ensuring consistency with design systems and accessibility guidelines such as WCAG for an inclusive user experience.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[4] = el}>
              <div className="step-number">5</div>
              <div className="step-content">
                <h4 className="step-title">Prototyping</h4>
                <p className="step-description">
                  Build interactive prototypes to simulate user interactions and validate design concepts. Tools like Figma, InVision, and Adobe XD help test the usability and functionality of designs before development.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[5] = el}>
              <div className="step-number">6</div>
              <div className="step-content">
                <h4 className="step-title">Usability Testing</h4>
                <p className="step-description">
                  Conduct usability tests with real users to gather feedback and identify design issues. Use A/B testing, heatmaps, and session recordings to refine the design and improve the overall user experience.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[6] = el}>
              <div className="step-number">7</div>
              <div className="step-content">
                <h4 className="step-title">Interaction Design</h4>
                <p className="step-description">
                  Enhance user experience through animations, micro-interactions, and transition effects. This step ensures that interactions are engaging, guiding users seamlessly through the product.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[7] = el}>
              <div className="step-number">8</div>
              <div className="step-content">
                <h4 className="step-title">Design Handoff & Implementation</h4>
                <p className="step-description">
                  Collaborate with developers using tools like Figma Dev Mode or Zeplin to ensure smooth design-to-development handoff. Provide style guides, design specifications, and assets for a pixel-perfect implementation.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[8] = el}>
              <div className="step-number">9</div>
              <div className="step-content">
                <h4 className="step-title">User Feedback & Iteration</h4>
                <p className="step-description">
                  Continuously improve the design based on user feedback, analytics, and usability insights. This iterative process ensures the product remains user-friendly and aligned with evolving user needs.
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

export default UIUXPage

