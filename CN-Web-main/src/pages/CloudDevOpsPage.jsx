import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TiltedCard from '../components/TiltedCard'
import { getTechLogo } from '../utils/techLogos'
import './CloudDevOpsPage.css'
import heroImage from '../assets/WhatsApp Image 2025-12-03 at 17.57.58_ae78e781.jpg'
import devopsImage from '../assets/devops.jpg'

gsap.registerPlugin(ScrollTrigger)

function CloudDevOpsPage() {
  const [activeCategory, setActiveCategory] = useState('Cloud')
  const methodologyStepsRef = useRef([])

  const technologies = {
    Cloud: [
      { name: 'AWS', logo: getTechLogo('AWS') },
      { name: 'Azure', logo: getTechLogo('Azure') },
      { name: 'GCP', logo: getTechLogo('GCP') },
      { name: 'Docker', logo: getTechLogo('Docker') }
    ],
    DevOps: [
      { name: 'Kubernetes', logo: getTechLogo('Kubernetes') },
      { name: 'Jenkins', logo: getTechLogo('Jenkins') },
      { name: 'GitHub Actions', logo: getTechLogo('GitHub Actions') },
      { name: 'Terraform', logo: getTechLogo('Terraform') }
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
          <img src={heroImage} alt="Cloud & DevOps" />
          <div className="app-dev-hero-overlay"></div>
        </div>
        <div className="app-dev-hero-content">
          <h1 className="app-dev-hero-title">Cloud & DevOps</h1>
          <p className="app-dev-hero-tagline">Scalable cloud infrastructure and streamlined DevOps practices for modern businesses.</p>
        </div>
      </section>

      <section className="scalable-solutions">
        <div className="scalable-solutions-container">
          <h2 className="scalable-solutions-title">Scalable Solutions</h2>
          <p className="scalable-solutions-description">
            We provide comprehensive cloud solutions and DevOps services to help your business scale efficiently. From cloud migration to CI/CD pipeline setup, our expert team ensures your infrastructure is secure, scalable, and optimized for performance.
          </p>
        </div>
      </section>

      <section className="app-dev-services">
        <div className="app-dev-services-container">
          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={devopsImage}
              altText="Cloud Infrastructure"
              captionText="Cloud Infrastructure"
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
              <div className="ios-icon">Cloud</div>
            </div>
            <h3 className="service-card-title">Cloud Infrastructure</h3>
            <p className="service-card-description">
              We design and deploy scalable cloud infrastructure on AWS, Azure, and GCP. Our solutions ensure high availability, security, and cost optimization for your applications and services.
            </p>
                </div>
              }
            />
          </div>

          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={devopsImage}
              altText="DevOps Automation"
              captionText="DevOps Automation"
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
              <div className="android-icon">DevOps</div>
            </div>
            <h3 className="service-card-title">DevOps Automation</h3>
            <p className="service-card-description">
              We implement CI/CD pipelines, containerization, and infrastructure as code to automate your development workflow. Our DevOps practices accelerate deployment and improve reliability.
            </p>
                </div>
              }
            />
          </div>

          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={devopsImage}
              altText="Cloud Migration"
              captionText="Cloud Migration"
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
              <div className="react-icon">Migration</div>
            </div>
            <h3 className="service-card-title">Cloud Migration</h3>
            <p className="service-card-description">
              We help you migrate your applications and infrastructure to the cloud seamlessly. Our migration strategies minimize downtime and ensure a smooth transition to cloud-based solutions.
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
          <h2 className="methodology-title">Our DevOps Methodology</h2>
          
          <div className="methodology-header">
            <div className="methodology-header-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3 className="methodology-header-title">DevOps Process</h3>
          </div>

          <div className="methodology-steps">
            <div className="methodology-step" ref={el => methodologyStepsRef.current[0] = el}>
              <div className="step-number">1</div>
              <div className="step-content">
                <h4 className="step-title">Infrastructure as Code</h4>
                <p className="step-description">
                  Automated infrastructure provisioning and management using Terraform, AWS CloudFormation, and Ansible.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[1] = el}>
              <div className="step-number">2</div>
              <div className="step-content">
                <h4 className="step-title">CI/CD Pipeline</h4>
                <p className="step-description">
                  Automated build, test, and deployment pipelines using GitHub Actions, Jenkins, AWS CodePipeline, and GitLab CI/CD.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[2] = el}>
              <div className="step-number">3</div>
              <div className="step-content">
                <h4 className="step-title">Monitoring & Logging</h4>
                <p className="step-description">
                  Comprehensive system monitoring and log management using Prometheus, Grafana, ELK Stack, and AWS CloudWatch.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[3] = el}>
              <div className="step-number">4</div>
              <div className="step-content">
                <h4 className="step-title">Security & Compliance (DevSecOps)</h4>
                <p className="step-description">
                  Implementation of DevSecOps practices with Shift Left Security using tools like Snyk, Aqua Security, and HashiCorp Vault.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[4] = el}>
              <div className="step-number">5</div>
              <div className="step-content">
                <h4 className="step-title">Performance Optimization</h4>
                <p className="step-description">
                  Continuous system optimization and scaling using cloud-native approaches like microservices, containers, Kubernetes, and serverless computing with AWS Lambda or Azure Functions.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[5] = el}>
              <div className="step-number">6</div>
              <div className="step-content">
                <h4 className="step-title">Service Models (SaaS, PaaS, IaaS)</h4>
                <p className="step-description">
                  IaaS provides virtualized computing resources (e.g., AWS EC2, Azure VMs), PaaS offers managed development environments (e.g., Google App Engine, AWS Elastic Beanstalk), and SaaS delivers software applications over the internet (e.g., Google Workspace, Dropbox).
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[6] = el}>
              <div className="step-number">7</div>
              <div className="step-content">
                <h4 className="step-title">Deployment Models</h4>
                <p className="step-description">
                  Cloud computing models include Public Cloud (shared infrastructure managed by third parties), Private Cloud (dedicated infrastructure for single organizations), Hybrid Cloud (combining public and private clouds), and Multi-Cloud (utilizing multiple providers for flexibility and redundancy).
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[7] = el}>
              <div className="step-number">8</div>
              <div className="step-content">
                <h4 className="step-title">Configuration Management</h4>
                <p className="step-description">
                  Use tools like Chef, Puppet, and Ansible to standardize and automate system configurations.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[8] = el}>
              <div className="step-number">9</div>
              <div className="step-content">
                <h4 className="step-title">Agile & Collaboration</h4>
                <p className="step-description">
                  Use Agile project management methodologies like Scrum and Kanban, leveraging collaboration tools such as Jira, Slack, and Confluence.
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

export default CloudDevOpsPage

