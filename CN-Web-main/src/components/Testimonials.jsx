import { useState } from 'react'
import './Testimonials.css'

function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: 'Ronald Richards',
      rating: 5
    },
    {
      id: 2,
      name: 'Leslie Alexander',
      rating: 5
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  return (
    <section className="testimonials-section">
      {/* Testimonials Cards */}
      <div className="testimonials-container">
        <div className="testimonials-cards">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className={`testimonial-card ${index === currentSlide ? 'active' : ''}`}
            >
              <div className="testimonial-stars">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#1387f3" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <h3 className="testimonial-name">{testimonial.name}</h3>
              <div className="testimonial-quote-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" fill="#1a1a1a" opacity="0.3"/>
                </svg>
              </div>
              <div className="testimonial-tail"></div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="testimonials-navigation">
          <button className="nav-arrow nav-arrow-left" onClick={prevSlide} aria-label="Previous">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <div className="nav-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`nav-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button className="nav-arrow nav-arrow-right" onClick={nextSlide} aria-label="Next">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Service Offerings */}
      {/* <div className="service-offerings">
        <div className="service-offering service-offering-left">
          <div className="service-icon-circle">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="service-content">
            <h3 className="service-title">INTERNET & CYBER<br />SECURITY SOLUTIONS</h3>
            <button className="service-button">Discover More</button>
          </div>
        </div>

        <div className="service-offering service-offering-right">
          <div className="service-icon-circle">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div className="service-content">
            <h3 className="service-title">EXPERT IT<br />SPECIALISTS AVAILABLE</h3>
            <button className="service-button">Discover More</button>
          </div>
        </div>
      </div> */}
    </section>
  )
}

export default Testimonials

