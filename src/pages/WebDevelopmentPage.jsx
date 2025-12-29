import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Boxes } from '../components/ui/background-boxes'
import TiltedCard from '../components/TiltedCard'
import heroBackgroundImage from '../assets/conny-schneider-xuTJZ7uD7PI-unsplash.jpg'
import webDevImage from '../assets/webdevelopmmentimg.jpg'
import backendDevImage from '../assets/How-to-become-a-Backend-Developer.jpg'
import frontendDevImage from '../assets/frontend.jpg'
import { getTechLogo } from '../utils/techLogos'
import './WebDevelopmentPage.css'

gsap.registerPlugin(ScrollTrigger)

function WebDevelopmentPage() {
  const [activeCategory, setActiveCategory] = useState('Web')
  const heroContentRef = useRef(null)
  const heroTitleRef = useRef(null)
  const heroTaglineRef = useRef(null)
  const methodologyStepsRef = useRef([])

  useEffect(() => {
    const heroContent = heroContentRef.current
    if (!heroContent) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    
    tl.from(heroTitleRef.current, {
      opacity: 0,
      y: 50,
      duration: 0.8
    })
    .from(heroTaglineRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.6
    }, '-=0.4')
  }, [])

  useEffect(() => {
    const steps = methodologyStepsRef.current.filter(Boolean)
    
    if (!steps.length) return

    steps.forEach((step, index) => {
      const stepNumber = index + 1 // 1-based index (1, 2, 3, 4, 5, 6)
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

  const technologies = {
    Web: [
      { name: 'React', logo: getTechLogo('React') },
      { name: 'Vue.js', logo: getTechLogo('Vue.js') },
      { name: 'Angular', logo: getTechLogo('Angular') },
      { name: 'Next.js', logo: getTechLogo('Next.js') }
    ],
    'Back-End': [
      { name: 'Node.js', logo: getTechLogo('Node.js') },
      { name: 'Django', logo: getTechLogo('Django') },
      { name: 'Firebase', logo: getTechLogo('Firebase') },
      { name: 'Express', logo: getTechLogo('Express') }
    ],
    Databases: [
      { name: 'MongoDB', logo: getTechLogo('MongoDB') },
      { name: 'PostgreSQL', logo: getTechLogo('PostgreSQL') },
      { name: 'MySQL', logo: getTechLogo('MySQL') },
      { name: 'Redis', logo: getTechLogo('Redis') }
    ],
    'Cloud Services': [
      { name: 'AWS', logo: getTechLogo('AWS') },
      { name: 'Azure', logo: getTechLogo('Azure') },
      { name: 'GCP', logo: getTechLogo('GCP') },
      { name: 'Docker', logo: getTechLogo('Docker') }
    ]
  }

  return (
    <>
      <Header />
      
      <section className="app-dev-hero web-dev-hero-enhanced">
        <div className="app-dev-hero-image">
          <img src={heroBackgroundImage} alt="Web Development Background" className="hero-background-img" />
          <div className="app-dev-hero-overlay"></div>
          <div className="hero-background-pattern"></div>
          <div className="hero-background-boxes">
            <Boxes />
          </div>
        </div>
        <div className="app-dev-hero-content" ref={heroContentRef}>
         
          <h1 className="app-dev-hero-title" ref={heroTitleRef}>
            Leading Website Development Company
          </h1>
          <p className="app-dev-hero-tagline" ref={heroTaglineRef}>
            Deploying customer-centric, client-focused, custom website solutions that help businesses to become brands in this ever-evolving digital landscape.
          </p>
        
        </div>
        <div className="hero-scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel"></div>
          </div>
        </div>
      </section>

      <section className="scalable-solutions">
        <div className="scalable-solutions-container">
          <h2 className="scalable-solutions-title">Our Custom Web Development Services and Solutions</h2>
          <p className="scalable-solutions-description">
            Our agile web developers are equipped with modern tools & technologies that can help you build innovative and powerful custom websites to lead your business stand out.
          </p>
        </div>
      </section>

      <section className="app-dev-services">
        <div className="app-dev-services-container">
          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={webDevImage}
              altText="Web App Development"
              captionText="Web App Development"
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
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                      <line x1="12" y1="18" x2="12" y2="18.01"/>
                      <path d="M8 7h8M8 11h8M8 15h6"/>
                      <path d="M6 5l-1 1 1 1M18 5l1 1-1 1"/>
                    </svg>
                  </div>
                  <h3 className="service-card-title">Web App Development</h3>
                  <p className="service-card-description">
                    Building powerful, scalable web applications tailored to your business needs with the latest technologies.
                  </p>
                </div>
              }
            />
          </div>

          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={webDevImage}
              altText="E-Commerce Website Development"
              captionText="E-Commerce Website Development"
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
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                      <line x1="3" y1="6" x2="21" y2="6"/>
                      <path d="M16 10a4 4 0 0 1-8 0"/>
                      <circle cx="9" cy="10" r="1"/>
                      <circle cx="15" cy="10" r="1"/>
                    </svg>
                  </div>
                  <h3 className="service-card-title">E-Commerce Website Development</h3>
                  <p className="service-card-description">
                    Building secure, user-friendly eCommerce websites designed to drive sales and enhance customer experience with seamless payment integration.
                  </p>
                </div>
              }
            />
          </div>

          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={webDevImage}
              altText="CMS Website Development"
              captionText="CMS Website Development"
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
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="M6 8h12M6 12h12M6 16h8"/>
                      <circle cx="18" cy="6" r="1.5"/>
                    </svg>
                  </div>
                  <h3 className="service-card-title">CMS Website Development</h3>
                  <p className="service-card-description">
                    Empowering businesses with flexible, scalable, and easy-to-manage CMS websites tailored to your needs.
                  </p>
                </div>
              }
            />
          </div>
        </div>
      </section>

      <section className="web-dev-proficiency">
        <div className="web-dev-proficiency-container">
          <h2 className="proficiency-title">Our Web Development Proficiency</h2>
          <p className="proficiency-subtitle">Users stop only at the best. Great interface experience becomes the Holy Grail. Cloud Nexus employs a behavior-driven design and development to deliver end-to-end web development services!</p>
          
          <div className="proficiency-cards"  >
            <div className="proficiency-card proficiency-card-frontend" style={{ backgroundImage: `url(${frontendDevImage})` }}>
              <div className="proficiency-card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                  <path d="M7 8h10M7 12h10M7 16h6"/>
                </svg>
              </div>
              <h3 className="proficiency-card-title">Front-End Web Development</h3>
              <p className="proficiency-card-description">
                Build rich client-side, easy-to-navigate web apps offering highly interactive & user-friendly environments to gain visitors & build a successful.
              </p>
              <button className="proficiency-card-button">View More</button>
            </div>

            <div className="proficiency-card proficiency-card-backend" style={{ backgroundImage: `url(${backendDevImage})` }}>
              <div className="proficiency-card-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <path d="M8 7h8M8 11h8M8 15h6"/>
                  <circle cx="18" cy="6" r="2"/>
                  <path d="M2 12h20"/>
                </svg>
              </div>
              <h3 className="proficiency-card-title">Back-End Web Development</h3>
              <p className="proficiency-card-description">
                We develop scalable & robust server-side web apps that support seamless performance & data management to meet evolving business needs.
              </p>
              <button className="proficiency-card-button">View More</button>
            </div>
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

      <section className="app-dev-methodology">
        <div className="app-dev-methodology-container">
          <h2 className="methodology-title">Our Web Development Methodology</h2>
          
          <div className="methodology-header">
            <div className="methodology-header-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <h3 className="methodology-header-title">Web Development Process</h3>
          </div>

          <div className="methodology-steps">
            <div className="methodology-step" ref={el => methodologyStepsRef.current[0] = el}>
              <div className="step-number">1</div>
              <div className="step-content">
                <h4 className="step-title">Planning & Research</h4>
                <p className="step-description">
                  Define the website's purpose, target audience, and business objectives. Conduct market research to analyze competitors and identify key features and functionalities.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[1] = el}>
              <div className="step-number">2</div>
              <div className="step-content">
                <h4 className="step-title">UI/UX Design</h4>
                <p className="step-description">
                  Create wireframes and prototypes using tools like Figma or Adobe XD. Focus on user experience (UX) and intuitive navigation. Develop a design system with colors, typography, and components.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[2] = el}>
              <div className="step-number">3</div>
              <div className="step-content">
                <h4 className="step-title">Development</h4>
                <p className="step-description">
                  Frontend Development (React, Vue.js, Angular, etc.), Backend Development (Node.js, Django, Firebase, etc.), Database Management (MongoDB, PostgreSQL, Firebase, etc.), and Implement APIs and third-party integrations.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[3] = el}>
              <div className="step-number">4</div>
              <div className="step-content">
                <h4 className="step-title">Testing</h4>
                <p className="step-description">
                  Unit testing, integration testing, and user acceptance testing. Automated testing with Jest, Cypress, or Selenium and also Performance and security testing.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[4] = el}>
              <div className="step-number">5</div>
              <div className="step-content">
                <h4 className="step-title">Deployment</h4>
                <p className="step-description">
                  Set up CI/CD pipelines (GitHub Actions, Jenkins, etc.) and Deploy on Web Servers (Netlify, Vercel, AWS, Azure).
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[5] = el}>
              <div className="step-number">6</div>
              <div className="step-content">
                <h4 className="step-title">Post-Launch Maintenance</h4>
                <p className="step-description">
                  Monitor performance and analytics. Gather user feedback for updates and improvements. Release bug fixes and new features.
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

export default WebDevelopmentPage

