import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TiltedCard from '../components/TiltedCard'
import { getTechLogo } from '../utils/techLogos'
import './DataSciencePage.css'
import heroImage from '../assets/WhatsApp Image 2025-12-03 at 17.57.58_ae78e781.jpg'
import dataScienceImage from '../assets/WhatsApp Image 2025-12-03 at 17.57.58_ae78e781.jpg'

gsap.registerPlugin(ScrollTrigger)

function DataSciencePage() {
  const [activeCategory, setActiveCategory] = useState('Analytics')
  const methodologyStepsRef = useRef([])

  const technologies = {
    Analytics: [
      { name: 'Python', logo: getTechLogo('Python') },
      { name: 'R', logo: getTechLogo('R') },
      { name: 'SQL', logo: getTechLogo('SQL') },
      { name: 'Tableau', logo: getTechLogo('Tableau') }
    ],
    'Machine Learning': [
      { name: 'TensorFlow', logo: getTechLogo('TensorFlow') },
      { name: 'PyTorch', logo: getTechLogo('PyTorch') },
      { name: 'Scikit-learn', logo: getTechLogo('Scikit-learn') },
      { name: 'Pandas', logo: getTechLogo('Pandas') }
    ],
    'Big Data': [
      { name: 'Hadoop', logo: getTechLogo('Hadoop') },
      { name: 'Spark', logo: getTechLogo('Spark') },
      { name: 'Kafka', logo: getTechLogo('Kafka') },
      { name: 'Elasticsearch', logo: getTechLogo('Elasticsearch') }
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
          <img src={heroImage} alt="Data Science" />
          <div className="app-dev-hero-overlay"></div>
        </div>
        <div className="app-dev-hero-content">
          <h1 className="app-dev-hero-title">Data Science</h1>
          <p className="app-dev-hero-tagline">Transforming data into actionable insights and intelligent solutions for your business.</p>
        </div>
      </section>

      <section className="scalable-solutions">
        <div className="scalable-solutions-container">
          <h2 className="scalable-solutions-title">Scalable Solutions</h2>
          <p className="scalable-solutions-description">
            We leverage advanced analytics, machine learning, and artificial intelligence to transform your data into actionable insights. From predictive modeling to data visualization, our expert data scientists help you make informed decisions, optimize operations, and drive innovation through data-driven strategies.
          </p>
        </div>
      </section>

      <section className="app-dev-services">
        <div className="app-dev-services-container">
          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={dataScienceImage}
              altText="Data Analytics"
              captionText="Data Analytics"
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
              <div className="ios-icon">Analytics</div>
            </div>
            <h3 className="service-card-title">Data Analytics</h3>
            <p className="service-card-description">
              We analyze complex datasets to uncover patterns, trends, and insights that drive business decisions. Our expert analysts use advanced statistical methods and visualization tools to transform raw data into meaningful information.
            </p>
                </div>
              }
            />
          </div>

          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={dataScienceImage}
              altText="Machine Learning & AI"
              captionText="Machine Learning & AI"
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
              <div className="android-icon">ML/AI</div>
            </div>
            <h3 className="service-card-title">Machine Learning & AI</h3>
            <p className="service-card-description">
              We build intelligent systems that learn from data and make predictions. Our machine learning solutions help automate processes, improve accuracy, and enable predictive analytics for your business.
            </p>
                </div>
              }
            />
          </div>

          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={dataScienceImage}
              altText="Data Visualization"
              captionText="Data Visualization"
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
              <div className="react-icon">Visualization</div>
            </div>
            <h3 className="service-card-title">Data Visualization</h3>
            <p className="service-card-description">
              We create interactive dashboards and visualizations that make complex data easy to understand. Our solutions help stakeholders quickly grasp insights and make data-driven decisions.
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
          <h2 className="methodology-title">Our Data Science Methodology</h2>
          
          <div className="methodology-header">
            <div className="methodology-header-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3 className="methodology-header-title">Data Science Process</h3>
          </div>

          <div className="methodology-steps">
            <div className="methodology-step" ref={el => methodologyStepsRef.current[0] = el}>
              <div className="step-number">1</div>
              <div className="step-content">
                <h4 className="step-title">Problem Definition</h4>
                <p className="step-description">
                  Identify the business or research problem. Define the objectives and scope of the analysis. Understand stakeholders' requirements.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[1] = el}>
              <div className="step-number">2</div>
              <div className="step-content">
                <h4 className="step-title">Data Collection</h4>
                <p className="step-description">
                  Gather relevant data from various sources (databases, APIs, web scraping, sensors, etc.) and Ensure data quality and completeness.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[2] = el}>
              <div className="step-number">3</div>
              <div className="step-content">
                <h4 className="step-title">Data Cleaning & Preprocessing</h4>
                <p className="step-description">
                  Handle missing values, outliers, and inconsistencies. Convert data into a usable format. Normalize or standardize numerical features and Encode categorical variables.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[3] = el}>
              <div className="step-number">4</div>
              <div className="step-content">
                <h4 className="step-title">Exploratory Data Analysis (EDA)</h4>
                <p className="step-description">
                  Use statistical techniques and visualization tools (histograms, scatter plots, correlation matrices, etc.). Identify patterns, trends, and relationships and Check for anomalies or biases in data.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[4] = el}>
              <div className="step-number">5</div>
              <div className="step-content">
                <h4 className="step-title">Feature Engineering</h4>
                <p className="step-description">
                  Select relevant features to improve model performance. Create new features from existing data and Reduce dimensionality if needed (e.g., PCA, feature selection techniques).
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[5] = el}>
              <div className="step-number">6</div>
              <div className="step-content">
                <h4 className="step-title">Model Selection & Training</h4>
                <p className="step-description">
                  Choose appropriate machine learning models (supervised, unsupervised, reinforcement learning). Train the model using training data and Tune hyperparameters for optimization.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[6] = el}>
              <div className="step-number">7</div>
              <div className="step-content">
                <h4 className="step-title">Model Deployment</h4>
                <p className="step-description">
                  Deploy the model into production (using APIs, cloud services, or embedded systems) and Ensure scalability and efficiency in a real-world environment.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[7] = el}>
              <div className="step-number">8</div>
              <div className="step-content">
                <h4 className="step-title">Monitoring & Maintenance</h4>
                <p className="step-description">
                  Continuously monitor model performance. Retrain the model with new data if needed and Handle concept drift and adapt to changes in data patterns.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[8] = el}>
              <div className="step-number">9</div>
              <div className="step-content">
                <h4 className="step-title">Communicating Results & Decision Making</h4>
                <p className="step-description">
                  Present findings using visualizations, dashboards, and reports. Provide actionable insights to stakeholders and Make data-driven decisions.
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

export default DataSciencePage

