import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import './Header.css'
// Import logos - replace these paths with your actual logo file paths
import logoDarkBg from '../assets/logo white.png' // Logo for black background (white text)
import logoLightBg from '../assets/image_2-removebg-preview.png' // Logo for white background (black text)

function Header() {
  const headerRef = useRef(null)
  const dropdownRef = useRef(null)
  const hoverTimeoutRef = useRef(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesHovered, setIsServicesHovered] = useState(false)
  const [isServiceExpanded, setIsServiceExpanded] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleContactClick = (e) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    
    const currentPath = location.pathname
    
    // If we're on the home page, scroll to contact section
    if (currentPath === '/') {
      const contactElement = document.getElementById('contact')
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      // If we're on another page, navigate to home and then scroll
      navigate('/')
      setTimeout(() => {
        const contactElement = document.getElementById('contact')
        if (contactElement) {
          contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }

  const services = [
    {
      name: 'App Development',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
          <line x1="12" y1="18" x2="12" y2="18"/>
        </svg>
      )
    },
    {
      name: 'Web Development',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      )
    },
    {
      name: 'Data Science',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
          <ellipse cx="12" cy="12" rx="9" ry="3"/>
          <ellipse cx="12" cy="19" rx="9" ry="3"/>
        </svg>
      )
    },
    {
      name: 'Cloud & DevOps',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
        </svg>
      )
    },
    {
      name: 'IoT & Automation',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
        </svg>
      )
    },
    {
      name: 'System Design',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <line x1="9" y1="3" x2="9" y2="21"/>
          <line x1="15" y1="3" x2="15" y2="21"/>
          <line x1="3" y1="9" x2="21" y2="9"/>
          <line x1="3" y1="15" x2="21" y2="15"/>
        </svg>
      )
    },
    {
      name: 'Big Data',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="M2 17l10 5 10-5"/>
          <path d="M2 12l10 5 10-5"/>
        </svg>
      )
    },
    {
      name: 'UI/UX',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <path d="M21 15l-5-5L5 21"/>
        </svg>
      )
    },
    {
      name: 'Cybersecurity',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      )
    }
  ]

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const scrollThreshold = 100

      if (scrollY > scrollThreshold && !isScrolled) {
        setIsScrolled(true)
        // Scrolled down - change to white background
        gsap.to(header, {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          duration: 0.3,
          ease: 'power2.out'
        })

        gsap.to('.nav-link', {
          color: '#000000',
          duration: 0.3,
          ease: 'power2.out'
        })

        gsap.to('.signup-btn', {
          backgroundColor: '#000000',
          color: '#FFFFFF',
          borderColor: 'rgba(0, 0, 0, 0.2)',
          duration: 0.3,
          ease: 'power2.out'
        })
      } else if (scrollY <= scrollThreshold && isScrolled) {
        setIsScrolled(false)
        // At top - change back to dark background
        gsap.to(header, {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          duration: 0.3,
          ease: 'power2.out'
        })

        gsap.to('.nav-link', {
          color: '#FFFFFF',
          duration: 0.3,
          ease: 'power2.out'
        })

        gsap.to('.signup-btn', {
          backgroundColor: '#FFFFFF',
          color: '#000000',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          duration: 0.3,
          ease: 'power2.out'
        })
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    // Initial check
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isScrolled])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    setIsServiceExpanded(false) // Reset service expansion when menu closes
    setIsServicesOpen(false) // Reset services accordion when menu closes
  }

  // Reset services accordion when mobile menu closes
  useEffect(() => {
    if (!isMobileMenuOpen) {
      setIsServicesOpen(false)
    }
  }, [isMobileMenuOpen])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  const toggleServiceExpansion = (e) => {
    e.preventDefault()
    setIsServiceExpanded(!isServiceExpanded)
  }

  const toggleServices = () => {
    setIsServicesOpen(prev => !prev)
  }

  useEffect(() => {
    // Close mobile menu when clicking outside
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.nav-menu') && !event.target.closest('.mobile-menu-btn')) {
        setIsMobileMenuOpen(false)
      }
    }

    // Close mobile menu on escape key
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  // GSAP Animation for Services Dropdown
  useEffect(() => {
    const dropdown = dropdownRef.current
    if (!dropdown) return

    // Only run on desktop (screen width > 768px)
    if (window.innerWidth <= 768) return

    if (isServicesHovered) {
      // Enable pointer events immediately
      dropdown.style.pointerEvents = 'auto'
      dropdown.style.visibility = 'visible'
      
      // Set initial state
      gsap.set(dropdown, {
        opacity: 0,
        scale: 0.95,
        y: -10,
        xPercent: -50
      })

      // Animate dropdown container
      gsap.to(dropdown, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      })

      // Animate dropdown items with stagger (grid layout)
      const items = dropdown.querySelectorAll('.dropdown-item')
      gsap.fromTo(items, 
        {
          opacity: 0,
          y: -10,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          stagger: {
            amount: 0.3,
            grid: [2, 5] // 2 columns, 5 rows (9 items)
          },
          ease: 'power2.out',
          delay: 0.1
        }
      )
    } else {
      // Animate out first, then disable pointer events
      const items = dropdown.querySelectorAll('.dropdown-item')
      gsap.to(items, {
        opacity: 0,
        y: -5,
        scale: 0.95,
        duration: 0.15,
        stagger: {
          amount: 0.2,
          grid: [2, 5] // 2 columns, 5 rows (9 items)
        },
        ease: 'power2.in'
      })

      gsap.to(dropdown, {
        opacity: 0,
        scale: 0.95,
        y: -10,
        duration: 0.2,
        ease: 'power2.in',
        delay: 0.1,
        onComplete: () => {
          // Only disable pointer events after animation completes
          dropdown.style.pointerEvents = 'none'
          dropdown.style.visibility = 'hidden'
        }
      })
    }
  }, [isServicesHovered])

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`} ref={headerRef}>
        <div className="header-container">
          <Link to="/" className="logo-section">
            <img 
              src={isScrolled ? logoLightBg : logoDarkBg} 
              alt="Cloud Nexus Logo" 
              className="logo-img"
            />
          </Link>
          
          <nav className={`nav-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <div 
              className="nav-link-dropdown"
              onMouseEnter={() => {
                // Only handle hover on desktop
                if (window.innerWidth > 768) {
                  // Clear any pending close timeout
                  if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current)
                    hoverTimeoutRef.current = null
                  }
                  setIsServicesHovered(true)
                }
              }}
              onMouseLeave={() => {
                // Only handle hover on desktop
                if (window.innerWidth > 768) {
                  // Add delay before closing to allow smooth mouse movement
                  hoverTimeoutRef.current = setTimeout(() => {
                    setIsServicesHovered(false)
                    hoverTimeoutRef.current = null
                  }, 200) // 200ms delay for smoother transition
                }
              }}
            >
              <a 
                href="#service" 
                className="nav-link nav-link-with-dropdown" 
                onClick={(e) => {
                  // On mobile, toggle accordion; on desktop, navigate normally
                  const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
                  if (isMobile) {
                    e.preventDefault()
                    e.stopPropagation()
                    toggleServices()
                  }
                }}
                onTouchStart={(e) => {
                  // Handle touch events on mobile
                  if (window.innerWidth <= 768) {
                    e.stopPropagation()
                  }
                }}
                aria-expanded={isServicesOpen}
              >
                Service
                <span className={`arrow ${isServicesOpen ? "rotate" : ""}`}>▼</span>
              </a>
              <ul 
                className={`services-submenu ${isServicesOpen ? "open" : ""}`}
              >
                {services.map((service, index) => {
                  const serviceRoutes = {
                    'App Development': '/services/app-development',
                    'Web Development': '/services/web-development',
                    'Data Science': '/services/data-science',
                    'Cloud & DevOps': '/services/cloud-devops',
                    'IoT & Automation': '/services/iot-automation',
                    'System Design': '/services/system-design',
                    'Big Data': '/services/big-data',
                    'UI/UX': '/services/ui-ux',
                    'Cybersecurity': '/services/cybersecurity'
                  }
                  
                  const route = serviceRoutes[service.name]
                  
                  return route ? (
                    <li key={index}>
                      <Link
                        to={route}
                        className="dropdown-item"
                        onClick={() => {
                          setIsServicesHovered(false)
                          setIsServiceExpanded(false)
                          setIsServicesOpen(false)
                          setIsMobileMenuOpen(false)
                        }}
                      >
                        <span className="dropdown-icon">{service.icon}</span>
                        <span className="dropdown-text">{service.name}</span>
                      </Link>
                    </li>
                  ) : (
                    <li key={index}>
                      <a 
                        href={`#${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="dropdown-item"
                        onClick={() => {
                          setIsServiceExpanded(false)
                          setIsServicesOpen(false)
                          setIsMobileMenuOpen(false)
                        }}
                      >
                        <span className="dropdown-icon">{service.icon}</span>
                        <span className="dropdown-text">{service.name}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
              <div 
                className={`services-dropdown ${isServiceExpanded ? 'mobile-expanded' : ''}`}
                ref={dropdownRef}
                onMouseEnter={() => {
                  // Clear any pending close timeout
                  if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current)
                    hoverTimeoutRef.current = null
                  }
                  setIsServicesHovered(true)
                }}
                onMouseLeave={() => {
                  // Add delay before closing to allow smooth mouse movement
                  hoverTimeoutRef.current = setTimeout(() => {
                    setIsServicesHovered(false)
                    hoverTimeoutRef.current = null
                  }, 150) // 150ms delay
                }}
              >
                {services.map((service, index) => {
                  const serviceRoutes = {
                    'App Development': '/services/app-development',
                    'Web Development': '/services/web-development',
                    'Data Science': '/services/data-science',
                    'Cloud & DevOps': '/services/cloud-devops',
                    'IoT & Automation': '/services/iot-automation',
                    'System Design': '/services/system-design',
                    'Big Data': '/services/big-data',
                    'UI/UX': '/services/ui-ux',
                    'Cybersecurity': '/services/cybersecurity'
                  }
                  
                  const route = serviceRoutes[service.name]
                  
                  return route ? (
                    <Link
                      key={index}
                      to={route}
                      className="dropdown-item"
                      onClick={() => {
                        setIsServicesHovered(false)
                        setIsServiceExpanded(false)
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      <span className="dropdown-icon">{service.icon}</span>
                      <span className="dropdown-text">{service.name}</span>
                    </Link>
                  ) : (
                    <a 
                      key={index}
                      href={`#${service.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="dropdown-item"
                      onClick={() => {
                        setIsServiceExpanded(false)
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      <span className="dropdown-icon">{service.icon}</span>
                      <span className="dropdown-text">{service.name}</span>
                    </a>
                  )
                })}
              </div>
            </div>
            <Link to="/blog" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
            <a href="#contact" className="nav-link" onClick={handleContactClick}>Contact Us</a>
          </nav>
          
          <div className="header-actions">
            <button className="signup-btn">
              Sign up
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle menu">
              <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </header>
      
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
    </>
  )
}

export default Header

