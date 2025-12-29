import { useState } from 'react'
import './Contact.css'
import contactVideo from '../assets/cloud nexuscontact.mp4'

function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  return (
    <section className="contact-section" id="contact">
      {/* Video Background */}
      <div className="contact-video-background">
        <video
          className="contact-background-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={contactVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="contact-video-overlay"></div>
      </div>
      
      <div className="contact-container">
        <div className="contact-form-card">
          <h2 className="form-title">Get in Touch</h2>
          <p className="form-description">
            Let's chat about your business challenges and how we can help accelerate growth with our AI tailored technology solutions.
          </p>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name*"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name*"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company*"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group email-group">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email*"
                  required
                />
              </div>
              <div className="form-group phone-group">
                <div className="phone-input-wrapper">
                  <div className="flag-icon"></div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                  />
                </div>
              </div>
            </div>

            <div className="form-row-message">
              <div className="form-group message-group">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                  rows="5"
                ></textarea>
              </div>
            </div>

            <div className="form-footer">
              <button type="submit" className="submit-button">
                Submit
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact

