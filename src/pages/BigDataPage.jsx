import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from '../components/Header'
import Footer from '../components/Footer'
import TiltedCard from '../components/TiltedCard'
import { getTechLogo } from '../utils/techLogos'
import './BigDataPage.css'
import heroImage from '../assets/WhatsApp Image 2025-12-03 at 17.57.58_ae78e781.jpg'
import bigDataImage from '../assets/WhatsApp Image 2025-12-03 at 17.57.58_ae78e781.jpg'

gsap.registerPlugin(ScrollTrigger)

function BigDataPage() {
  const [activeCategory, setActiveCategory] = useState('Processing')
  const methodologyStepsRef = useRef([])

  const technologies = {
    Processing: [
      { name: 'Hadoop', logo: getTechLogo('Hadoop') },
      { name: 'Spark', logo: getTechLogo('Spark') },
      { name: 'Kafka', logo: getTechLogo('Kafka') },
      { name: 'Flink', logo: getTechLogo('Flink') }
    ],
    Storage: [
      { name: 'HDFS', logo: getTechLogo('HDFS') },
      { name: 'Cassandra', logo: getTechLogo('Cassandra') },
      { name: 'MongoDB', logo: getTechLogo('MongoDB') },
      { name: 'Elasticsearch', logo: getTechLogo('Elasticsearch') }
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
          <img src={heroImage} alt="Big Data" />
          <div className="app-dev-hero-overlay"></div>
        </div>
        <div className="app-dev-hero-content">
          <h1 className="app-dev-hero-title">Big Data</h1>
          <p className="app-dev-hero-tagline">Processing and analyzing massive datasets to unlock valuable business insights.</p>
        </div>
      </section>

      <section className="scalable-solutions">
        <div className="scalable-solutions-container">
          <h2 className="scalable-solutions-title">Scalable Solutions</h2>
          <p className="scalable-solutions-description">
            We help you manage, process, and analyze large volumes of data efficiently. Our big data solutions enable you to extract valuable insights from complex datasets, make data-driven decisions, and gain a competitive advantage in your industry.
          </p>
        </div>
      </section>

      <section className="app-dev-services">
        <div className="app-dev-services-container">
          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={bigDataImage}
              altText="Data Processing"
              captionText="Data Processing"
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
              <div className="ios-icon">Processing</div>
            </div>
            <h3 className="service-card-title">Data Processing</h3>
            <p className="service-card-description">
              We build systems to process and analyze massive datasets efficiently. Our solutions handle batch and real-time processing, enabling you to extract insights from large volumes of data.
            </p>
                </div>
              }
            />
          </div>

          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={bigDataImage}
              altText="Data Storage"
              captionText="Data Storage"
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
              <div className="android-icon">Storage</div>
            </div>
            <h3 className="service-card-title">Data Storage</h3>
            <p className="service-card-description">
              We design scalable data storage solutions that can handle petabytes of information. Our systems ensure data availability, reliability, and fast access for analytics and reporting.
            </p>
                </div>
              }
            />
          </div>

          <div className="app-dev-service-card">
            <TiltedCard
              imageSrc={bigDataImage}
              altText="Big Data Analytics"
              captionText="Big Data Analytics"
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
              <div className="react-icon">Analytics</div>
            </div>
            <h3 className="service-card-title">Big Data Analytics</h3>
            <p className="service-card-description">
              We provide advanced analytics solutions for big data. Our platforms enable you to perform complex queries, generate reports, and discover patterns in large datasets.
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
          <h2 className="methodology-title">Our Big Data Methodology</h2>
          
          <div className="methodology-header">
            <div className="methodology-header-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h3 className="methodology-header-title">Big Data Process (5-Step Model)</h3>
          </div>

          <div className="methodology-steps">
            <div className="methodology-step" ref={el => methodologyStepsRef.current[0] = el}>
              <div className="step-number">1</div>
              <div className="step-content">
                <h4 className="step-title">Data Acquisition & Storage</h4>
                <p className="step-description">
                  Collect structured, semi-structured, and unstructured data from multiple sources such as databases, IoT devices, social media, web logs, APIs, streaming platforms, and batch systems. Store data in scalable storage solutions like cloud storage, data lakes, HDFS, Apache Hadoop, and AWS S3 while ensuring data integrity and accessibility.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[1] = el}>
              <div className="step-number">2</div>
              <div className="step-content">
                <h4 className="step-title">Data Processing, ETL & Preprocessing</h4>
                <p className="step-description">
                  Transform raw data into usable formats using ETL or ELT processes with tools like Apache Spark, Apache Kafka, and Talend. Perform data cleaning by removing duplicates, handling missing values, standardizing formats, and detecting anomalies to ensure high-quality data.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[2] = el}>
              <div className="step-number">3</div>
              <div className="step-content">
                <h4 className="step-title">Data Analysis & Machine Learning</h4>
                <p className="step-description">
                  Apply statistical analysis, AI algorithms, and machine learning models to identify patterns, trends, and predictions using tools such as TensorFlow, PyTorch, and Scikit-learn for intelligent, data-driven insights.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[3] = el}>
              <div className="step-number">4</div>
              <div className="step-content">
                <h4 className="step-title">Data Visualization, Security & Governance</h4>
                <p className="step-description">
                  Visualize insights through dashboards and reports using Tableau, Power BI, and Matplotlib. Implement data encryption, access control, and compliance with regulations like GDPR, HIPAA, and CCPA to ensure secure and ethical data usage.
                </p>
              </div>
            </div>

            <div className="methodology-step" ref={el => methodologyStepsRef.current[4] = el}>
              <div className="step-number">5</div>
              <div className="step-content">
                <h4 className="step-title">Scalability, Monitoring & Optimization</h4>
                <p className="step-description">
                  Optimize performance using distributed computing, caching mechanisms, and cloud-based infrastructure to handle growing data volumes. Continuously monitor system performance, data accuracy, and model efficiency to improve overall big data operations.
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

export default BigDataPage

