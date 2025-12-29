import { useState } from 'react'
import './Clients.css'
import logoVideo from '../assets/card effect.mp4'
import fintechImage from '../assets/fintech.jpg'
import medtechImage from '../assets/medtech.jpg'
import edtechImage from '../assets/EdTech photo.jpg'
import enterpriseImage from '../assets/enterprise photo.webp'

function Clients() {
  const [hoveredCard, setHoveredCard] = useState(null)

  const clients = [
    {
      id: 1,
      title: 'FinTech',
      description: 'A secure AI-driven personal finance app for expense tracking, budget management, and smart investments.',
      image: fintechImage
    },
    {
      id: 2,
      title: 'MedTech',
      description: 'HIPAA-compliant telehealth platform enabling virtual consultations and remote patient monitoring.',
      image: medtechImage
    },
    {
      id: 3,
      title: 'EdTech',
      description: 'Interactive learning platform with AI-powered personalization and adaptive educational tools.',
      image: edtechImage
    },
    {
      id: 4,
      title: 'Enterprise',
      description: 'Custom enterprise solution automating HR, finance, and project management workflows.',
      image: enterpriseImage
    }
  ]

  return (
    <section className="clients-section" id="clients">
      <div className="clients-container">
        <h2 className="clients-title">Projects For Our Amazing Clients</h2>
        
        <div className="clients-grid">
          {clients.map((client) => (
            <div
              key={client.id}
              className={`client-card ${hoveredCard === client.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredCard(client.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="client-card-image-wrapper">
                <img 
                  src={client.image} 
                  alt={client.title}
                  className="client-card-image"
                />
                {hoveredCard === client.id && (
                  <div className="client-card-video-overlay">
                    <video
                      className="client-logo-video"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={logoVideo} type="video/mp4" />
                    </video>
                  </div>
                )}
              </div>
              
              <div className="client-card-content">
                <h3 className="client-card-title">{client.title}</h3>
                <p className="client-card-description">{client.description}</p>
                <button className="client-card-button">
                  View Project
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Clients

