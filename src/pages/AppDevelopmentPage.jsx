import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TiltedCard from '../components/TiltedCard'
import { getTechLogo } from '../utils/techLogos'
import './AppDevelopmentPage.css'
import heroBackgroundImage from '../assets/The_Future_of_Work_is_AI-Driven__7_New_Careers_That_Will_Emerge_and_Thrive[1].jpg'
import appDevImage from '../assets/app development.jpg'

gsap.registerPlugin(ScrollTrigger)

function AppDevelopmentPage() {
  const [activeCategory, setActiveCategory] = useState('Mobile')
  const methodologyStepsRef = useRef([])

  const technologies = {
    Mobile: [
      { name: 'Swift', logo: getTechLogo('Swift') },
      { name: 'Kotlin', logo: getTechLogo('Kotlin') },
      { name: 'React Native', logo: getTechLogo('React Native') },
      { name: 'Flutter', logo: getTechLogo('Flutter') }
    ],
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

  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <section className="app-dev-hero">
        <div className="app-dev-hero-image">
          <div 
            className="app-dev-hero-background" 
            style={{ backgroundImage: `url(${heroBackgroundImage})` }}
          ></div>
          <div className="app-dev-hero-overlay"></div>
        </div>
        <div className="app-dev-hero-content">
          <h1 className="app-dev-hero-title">App Development</h1>
          <p className="app-dev-hero-tagline">Building innovative, scalable, and user-friendly apps for businesses.</p>
        </div>
      </section>

      {/* Scalable Solutions Section */}
      <section className="scalable-solutions">
        <div className="scalable-solutions-container">
          <h2 className="scalable-solutions-title">Scalable Solutions</h2>
          <p className="scalable-solutions-description">
            We craft high-performance, scalable, user-friendly mobile and web applications tailored to your business needs. From startups to enterprises, we deliver innovative solutions that enhance user experience and drive growth. Our team of expert developers, designers, and strategists work collaboratively to create cutting-edge applications that are secure, reliable, and future-proof.
          </p>
        </div>
      </section>

      {/* Service Cards Section */}
      <section className="app-dev-services">
        <div className="app-dev-services-container">
          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={appDevImage}
              altText="iOS App Development"
              captionText="iOS App Development App"
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
              
                    {/* <img src={require('../assets/apple.png')} alt="iOS App Icon" style={{ width: '40px', height: '40px' }} /> */}
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> 
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-.97.49-2.02.67-3.08.4-1.78-.4-3.05-1.4-4.22-2.8-2.83-3.5-3.5-7.3-1.54-10.5 1.1-1.8 2.7-2.9 4.4-3.2 1.35-.2 2.65.1 3.85.8.75.5 1.6.9 2.55.9.9 0 1.65-.4 2.4-.8.85-.5 1.7-1 2.9-1 1.2 0 2.05.4 2.9.9.75.4 1.5.8 2.4.8.95 0 1.8-.4 2.55-.9 1.1-.7 2.35-1 3.7-.8 1.7.3 3.3 1.4 4.4 3.2 2.96 3.2 2.29 7-1.54 10.5-1.17 1.4-2.44 2.4-4.22 2.8z"/>
                    </svg> 
            </div>
            <h3 className="service-card-title">iOS App Development App</h3>
            <p className="service-card-description">
                    We build high-performance, scalable mobile and web applications tailored to your business needs, delivering innovative, user-friendly solutions that enhance experience, ensure security, reliability, and help startups and enterprises drive sustainable growth for long-term digital success
            </p>
                </div>
              }
            />
          </div>

          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={appDevImage}
              altText="Android App Development"
              captionText="Android App Development"
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
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993 0 .5511-.4483.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1349 1.1057L4.8429 5.4534a.4161.4161 0 00-.5676-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1868 1 13.7344 1 16.7714c0 .5531.4479 1.0001 1 1.0001h22c.5521 0 1-.447 1-1.0001 0-3.037-1.6889-5.5846-4.1225-7.45"/>
                      <path d="M6.477 15.3414c.5511 0 .9993-.4486.9993-.9997s-.4482-.9993-.9993-.9993c-.551 0-.9993.4482-.9993.9993 0 .5511.4483.9997.9993.9997m11.046 0c.5511 0 .9993-.4486.9993-.9997s-.4482-.9993-.9993-.9993c-.5511 0-.9993.4482-.9993.9993-.0001.5511.4482.9997.9993.9997"/>
                    </svg>
            </div>
            <h3 className="service-card-title">Android App Development</h3>
            <p className="service-card-description">
                    We specialize in custom Android app development, delivering high-performance, scalable, and user-friendly applications for startups and enterprises, with expert-built, feature-rich apps tailored to your business needs for seamless functionality and superior user experience
            </p>
                </div>
              }
            />
          </div>

          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={appDevImage}
              altText="React Native App Development"
              captionText="React Native App Development"
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
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="2" fill="currentColor"/>
                      <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                      <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 12 12)"/>
                      <ellipse cx="12" cy="12" rx="11" ry="4.2" fill="none" stroke="currentColor" strokeWidth="1.5" transform="rotate(-60 12 12)"/>
                      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
            </div>
            <h3 className="service-card-title">React Native App Development</h3>
            <p className="service-card-description">
              We build high-performance, cross-platform mobile apps using React Native to deliver a seamless user experience on both iOS and Android. Our expert developers create scalable, fast, and cost-effective mobile solutions tailored to your business needs.
            </p>
                </div>
              }
            />
          </div>
        </div>
      </section>

      {/* Technologies Section */}
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
          <h2 className="methodology-title">Our App Development Methodology</h2>
          
          <div className="methodology-header">
            <div className="methodology-header-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12" y2="18"/>
              </svg>
            </div>
            <h3 className="methodology-header-title">App Development Process</h3>
          </div>

          <div className="methodology-steps">
            <div className="methodology-step" ref={el => methodologyStepsRef.current[0] = el}>
              <div className="step-number">1</div>
              <div className="step-content">
                <h4 className="step-title">Planning & Research</h4>
                <p className="step-description">
                  Define the app's purpose, target audience, and business objectives. Conduct market research to analyze competitors and Identify key features and functionalities.
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
                  Frontend Development (React, Vue.js, Swift, Kotlin, etc.), Backend Development (Node.js, Django, Firebase, etc.), Database Management (MongoDB, PostgreSQL, Firebase, etc.), and Implement APIs and third-party integrations
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[3] = el}>
              <div className="step-number">4</div>
              <div className="step-content">
                <h4 className="step-title">Testing</h4>
                <p className="step-description">
                  Unit testing, integration testing, and user acceptance testing. Automated testing with Jest, Cypress, or Selenium and also Performance and security testing
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[4] = el}>
              <div className="step-number">5</div>
              <div className="step-content">
                <h4 className="step-title">Deployment</h4>
                <p className="step-description">
                  Set up CI/CD pipelines (GitHub Actions, Jenkins, etc.) and Deploy on App Stores, Play Store, or Web Servers (Netlify, Vercel, AWS).
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[5] = el}>
              <div className="step-number">6</div>
              <div className="step-content">
                <h4 className="step-title">Post-Launch Maintenance</h4>
                <p className="step-description">
                  Monitor performance and analytic also Gather user feedback for updates and improvements. Release bug fixes and new features.
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

export default AppDevelopmentPage

