import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Footer.css'
import logoImage from '../assets/Untitled design.png'
import footerLogo from '../assets/logo white.png'

function Footer() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const buttonRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    let ticking = false
    let rafId = null

    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const progress = scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0
      
      setScrollProgress(progress)
      setIsVisible(scrollTop > 200)
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        rafId = requestAnimationFrame(updateScrollProgress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault()
    const currentPath = window.location.pathname
    
    // If we're on the home page, scroll to section
    if (currentPath === '/') {
      const element = document.getElementById(sectionId.replace('#', ''))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      // If we're on another page, navigate to home and then scroll
      navigate('/')
      setTimeout(() => {
        const element = document.getElementById(sectionId.replace('#', ''))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Left Section - Logo and Company Description */}
          <div className="footer-section footer-company">
            <Link to="/" className="footer-logo" onClick={scrollToTop}>
              <img
                src={footerLogo}
                alt="Cloud Nexus Logo"
                className="footer-logo-img"
              />
            </Link>
            <p className="footer-description">
              We provide innovative technology solutions, transforming digital infrastructure through advanced advancements, ensuring scalability, security, and seamless integration for sustainable growth.
            </p>
            <div className="footer-social">
              <a href="https://www.instagram.com/cloudnexus.in/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/cloudnexusorg/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Second Section - Where To Find Us */}
          <div className="footer-section footer-location">
            <h3 className="footer-column-title">Where To Find Us</h3>
            <div className="footer-address">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1387f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="address-icon">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <div className="address-text">
                <div className="address-line-1">2nd Stage BTM Layout</div>
                <div className="address-line-2">Bengaluru, Karnataka 560076, IN</div>
              </div>
            </div>
            <div className="footer-email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1387f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="email-icon">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <div className="email-text">
                <a href="mailto:work@cloudnexus.in" className="email-link">work@cloudnexus.in</a>
                <div className="email-support">24x7 online support</div>
              </div>
            </div>
          </div>

          {/* Third Section - Quick Links */}
          <div className="footer-section footer-links">
            <h3 className="footer-column-title">Quick Links</h3>
            <ul className="footer-link-list">
              <li><Link to="/" onClick={scrollToTop}>Home</Link></li>
              <li><Link to="/about" onClick={scrollToTop}>About us</Link></li>
              <li><a href="#service" onClick={(e) => handleSectionClick(e, '#service')}>Service</a></li>
              <li><a href="#contact" onClick={(e) => handleSectionClick(e, '#contact')}>Contact</a></li>
            </ul>
          </div>

          {/* Right Section - Call Details */}
          <div className="footer-section footer-right">
            <div className="footer-call-details">
              <h4 className="call-details-title">Call Details</h4>
              <a href="tel:+918793830447" className="call-details-phone">+91 8793830447</a>
              <p className="call-details-text">and get a tailored cloud solution</p>
            </div>
          </div>
        </div>

        {/* Footer Bottom - Legal Links and Copyright */}
        <div className="footer-bottom">
          <div className="footer-legal-links">
            <a href="#privacy" onClick={(e) => handleSectionClick(e, '#privacy')}>Privacy Policy</a>
            <span className="legal-separator">|</span>
            <a href="#terms" onClick={(e) => handleSectionClick(e, '#terms')}>Terms of Service</a>
          </div>
          <p className="footer-copyright">
            © 2025 CloudNexus Technologies. All rights reserved.
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button 
        ref={buttonRef}
        className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg className="scroll-progress-ring" width="56" height="56" viewBox="0 0 56 56">
          {/* Background circle */}
          <circle
            cx="28"
            cy="28"
            r="26"
            fill="none"
            stroke="rgba(19, 135, 243, 0.2)"
            strokeWidth="2"
          />
          {/* Progress circle */}
          <circle
            className="progress-circle"
            cx="28"
            cy="28"
            r="26"
            fill="none"
            stroke="#1387f3"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={163.36}
            strokeDashoffset={163.36 * (1 - scrollProgress)}
            transform="rotate(-90 28 28)"
            style={{
              transition: 'stroke-dashoffset 0.05s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
        </svg>
        <svg className="scroll-arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 14L12 9L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </footer>
  )
}

export default Footer

