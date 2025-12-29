import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import './About.css'
import heroBackgroundImage from '../assets/vitaly-gariev-ZIKnl-xHhgE-unsplash.jpg'

function About() {
  const [hoveredStat, setHoveredStat] = useState(null)
  const statRefs = useRef([])

  const stats = [
    { id: 1, value: 120000, suffix: 'k', label: 'Satisfied Clients', isHighlight: false },
    { id: 2, value: 30000, suffix: 'K', label: 'Projects Completed', isHighlight: true },
    { id: 3, value: 500000, suffix: 'K', label: 'Five Star Review', isHighlight: false },
    { id: 4, value: 90, suffix: '+', label: 'Pro Team Member', isHighlight: false }
  ]

  const handleMouseEnter = (index, stat) => {
    setHoveredStat(index)
    const element = statRefs.current[index]
    if (element) {
      const obj = { value: 0 }
      
      // Animate from 0 to target value
      gsap.to(obj, {
        value: stat.value,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: function() {
          const currentValue = Math.floor(obj.value)
          let displayValue
          if (stat.suffix === 'k') {
            displayValue = (currentValue / 1000).toFixed(0) + 'k'
          } else if (stat.suffix === 'K') {
            displayValue = (currentValue / 1000).toFixed(0) + 'K'
          } else {
            displayValue = currentValue + stat.suffix
          }
          element.innerHTML = displayValue
        }
      })
    }
  }

  const handleMouseLeave = (index, stat) => {
    setHoveredStat(null)
    const element = statRefs.current[index]
    if (element) {
      // Reset to original value instantly
      const displayValue = stat.suffix === 'k' 
        ? (stat.value / 1000).toFixed(0) + 'k'
        : stat.suffix === 'K'
        ? (stat.value / 1000).toFixed(0) + 'K'
        : stat.value + stat.suffix
      element.innerHTML = displayValue
    }
  }

  useEffect(() => {
    // Initialize stat numbers
    stats.forEach((stat, index) => {
      const element = statRefs.current[index]
      if (element) {
        const displayValue = stat.suffix === 'k' 
          ? (stat.value / 1000).toFixed(0) + 'k'
          : stat.suffix === 'K'
          ? (stat.value / 1000).toFixed(0) + 'K'
          : stat.value + stat.suffix
        element.innerHTML = displayValue
      }
    })
  }, [])

  return (
    <section className="about-section" id="about">
      {/* Header Section */}
      <div className="about-header">
        <div 
          className="about-header-background" 
          style={{ backgroundImage: `url(${heroBackgroundImage})` }}
        ></div>
        <div className="about-header-overlay"></div>
        <h1 className="about-title">About Us</h1>
        {/* <p className="about-breadcrumb">HOME / ABOUT</p> */}
      </div>

      {/* Welcome Section */}
      <div className="about-welcome-section">
        <div className="about-welcome-container">
          <p className="about-welcome-text">Welcome To Cloud Nexus</p>
          <h2 className="about-welcome-headline">
            <span className="welcome-line-1">The Intense Flame of Passion</span>
            <span className="welcome-line-2">Helping you Meet your Needs</span>
          </h2>
          
          <div className="about-welcome-cards">
            {/* Our Passion Card */}
            <div className="welcome-card">
              <div className="welcome-card-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h3 className="welcome-card-title">Our Passion</h3>
              <p className="welcome-card-description">
                Cloud Nexus serve clients worldwide. Our passion resonates with the Blue Flame of fire that is the most intense, which enables us to help businesses transform through the implementation of the right technology.
              </p>
            </div>

            {/* Our Mission Card */}
            <div className="welcome-card">
              <div className="welcome-card-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
              </div>
              <h3 className="welcome-card-title">Our Mission</h3>
              <p className="welcome-card-description">
                Our mission is to put 'companion' back in the 'company' and create a team that you can trust to get your job done with a quality that's promised to you.
              </p>
            </div>

            {/* Our Vision Card */}
            <div className="welcome-card">
              <div className="welcome-card-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#000000" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.81 14.12L5.64 11.29L8.17 10.79C11.39 6.41 11.39 6.41 12.89 4.91C13.39 4.41 13.39 3.66 12.89 3.16C12.39 2.66 11.64 2.66 11.14 3.16C9.64 4.66 9.64 4.66 5.26 7.88L4.76 10.41L1.93 13.24C1.68 13.49 1.68 13.87 1.93 14.12L2.81 14.12ZM5.64 11.29L2.81 14.12C2.56 14.37 2.18 14.37 1.93 14.12L1.05 14.12C0.8 13.87 0.8 13.49 1.05 13.24L3.88 10.41L4.38 7.88C4.38 7.88 4.38 7.88 4.38 7.88L5.64 11.29Z"/>
                </svg>
              </div>
              <h3 className="welcome-card-title">Our Vision</h3>
              <p className="welcome-card-description">
                Our ultimate commitment is to serve the interests of all our stakeholders by changing the impact of the current state of technology and fueling business growth.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="about-stats">
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            className={`stat-item ${stat.isHighlight ? 'stat-item-highlight' : ''} ${hoveredStat === index ? 'hovered' : ''}`}
            onMouseEnter={() => handleMouseEnter(index, stat)}
            onMouseLeave={() => handleMouseLeave(index, stat)}
          >
            <div className="stat-icon">
              {index === 0 && (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="#1387f3" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              )}
              {index === 1 && (
                <svg width="40" height="40" viewBox="0 0 24 24" fill={stat.isHighlight ? "#FFFFFF" : "#1387f3"} xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              )}
              {index === 2 && (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="#1387f3" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.5 21H2v-6h5.5v6zm7.5 0h-5.5v-6H15v6zm7.5 0H17v-6h5.5v6zM7.5 3H2v6h5.5V3zm7.5 0h-5.5v6H15V3zm7.5 0H17v6h5.5V3z"/>
                </svg>
              )}
              {index === 3 && (
                <svg width="40" height="40" viewBox="0 0 24 24" fill="#1387f3" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                </svg>
              )}
            </div>
            <div 
              className="stat-number"
              ref={(el) => (statRefs.current[index] = el)}
            ></div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default About

