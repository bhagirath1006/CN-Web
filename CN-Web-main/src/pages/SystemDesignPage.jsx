import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TiltedCard from '../components/TiltedCard'
import { getTechLogo } from '../utils/techLogos'
import './SystemDesignPage.css'
import heroImage from '../assets/WhatsApp Image 2025-12-03 at 17.57.58_ae78e781.jpg'
import systemDesignImage from '../assets/WhatsApp Image 2025-12-03 at 17.57.58_ae78e781.jpg'

gsap.registerPlugin(ScrollTrigger)

function SystemDesignPage() {
  const [activeCategory, setActiveCategory] = useState('Architecture')
  const methodologyStepsRef = useRef([])

  const technologies = {
    Architecture: [
      { name: 'Microservices', logo: getTechLogo('Microservices') },
      { name: 'API Gateway', logo: getTechLogo('API Gateway') },
      { name: 'Load Balancer', logo: getTechLogo('Load Balancer') },
      { name: 'CDN', logo: getTechLogo('CDN') }
    ],
    'Design Patterns': [
      { name: 'MVC', logo: getTechLogo('MVC') },
      { name: 'REST', logo: getTechLogo('REST') },
      { name: 'GraphQL', logo: getTechLogo('GraphQL') },
      { name: 'Event-Driven', logo: getTechLogo('Event-Driven') }
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
          <img src={heroImage} alt="System Design" />
          <div className="app-dev-hero-overlay"></div>
        </div>
        <div className="app-dev-hero-content">
          <h1 className="app-dev-hero-title">System Design</h1>
          <p className="app-dev-hero-tagline">Designing scalable, reliable, and efficient system architectures for your business needs.</p>
        </div>
      </section>

      <section className="scalable-solutions">
        <div className="scalable-solutions-container">
          <h2 className="scalable-solutions-title">Scalable Solutions</h2>
          <p className="scalable-solutions-description">
            We design robust system architectures that can scale with your business. Our expert architects create solutions that are reliable, efficient, and maintainable, ensuring your systems can handle growth and adapt to changing requirements.
          </p>
        </div>
      </section>

      <section className="app-dev-services">
        <div className="app-dev-services-container">
          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={systemDesignImage}
              altText="System Architecture"
              captionText="System Architecture"
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
              <div className="ios-icon">Architecture</div>
            </div>
            <h3 className="service-card-title">System Architecture</h3>
            <p className="service-card-description">
              We design scalable system architectures that meet your performance, reliability, and scalability requirements. Our solutions ensure your systems can grow with your business.
            </p>
                </div>
              }
            />
          </div>

          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={systemDesignImage}
              altText="Scalability Solutions"
              captionText="Scalability Solutions"
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
              <div className="android-icon">Scalability</div>
            </div>
            <h3 className="service-card-title">Scalability Solutions</h3>
            <p className="service-card-description">
              We design systems that can handle increasing loads and users. Our scalability solutions ensure your applications perform optimally under any conditions.
            </p>
                </div>
              }
            />
          </div>

          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={systemDesignImage}
              altText="Performance Optimization"
              captionText="Performance Optimization"
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
              <div className="react-icon">Performance</div>
            </div>
            <h3 className="service-card-title">Performance Optimization</h3>
            <p className="service-card-description">
              We optimize system performance through efficient design patterns, caching strategies, and resource management. Our solutions ensure fast response times and optimal resource utilization.
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
          <h2 className="methodology-title">Our System Design Methodology</h2>
          
          <div className="methodology-header">
            <div className="methodology-header-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3 className="methodology-header-title">System Design Process (5-Step Model)</h3>
          </div>

          <div className="methodology-steps">
            <div className="methodology-step" ref={el => methodologyStepsRef.current[0] = el}>
              <div className="step-number">1</div>
              <div className="step-content">
                <h4 className="step-title">Requirements Analysis & Use Case Definition</h4>
                <p className="step-description">
                  Gather functional and non-functional requirements by identifying stakeholders, understanding business needs, defining use cases, user stories, constraints, and performance expectations.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[1] = el}>
              <div className="step-number">2</div>
              <div className="step-content">
                <h4 className="step-title">Architecture & Detailed Design (HLD + LLD)</h4>
                <p className="step-description">
                  Define overall system architecture (monolithic, microservices, etc.), select suitable technologies and frameworks, design APIs, database schemas, module specifications, class diagrams, sequence diagrams, data flow diagrams, and communication protocols with proper error handling.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[2] = el}>
              <div className="step-number">3</div>
              <div className="step-content">
                <h4 className="step-title">Component & Data Design</h4>
                <p className="step-description">
                  Select appropriate database types (SQL/NoSQL), design normalized or denormalized schemas, define indexing strategies, caching mechanisms, and optimize data access for performance and reliability.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[3] = el}>
              <div className="step-number">4</div>
              <div className="step-content">
                <h4 className="step-title">Scalability, Performance & Security Design</h4>
                <p className="step-description">
                  Implement load balancing strategies (round-robin, least connections), caching using Redis or Memcached, database replication and sharding for scalability, authentication and authorization using OAuth/JWT, data encryption, secure APIs with rate limiting, input validation, and compliance with standards like GDPR and HIPAA.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[4] = el}>
              <div className="step-number">5</div>
              <div className="step-content">
                <h4 className="step-title">Deployment, Monitoring & Maintenance</h4>
                <p className="step-description">
                  Set up CI/CD pipelines, implement containerization using Docker and Kubernetes, define deployment strategies such as blue-green and rollback, configure monitoring with Prometheus and Grafana, enable logging and alerts using ELK stack or CloudWatch, and plan for continuous system updates and maintenance.
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

export default SystemDesignPage

