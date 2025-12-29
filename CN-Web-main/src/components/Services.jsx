import PixelCard from './PixelCard'
import './Services.css'

function Services() {

  const services = [
    {
      id: 1,
      title: 'IT CONSULTING',
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M18 24L22 20L26 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M22 20V28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="16" cy="16" r="2" fill="currentColor"/>
          <circle cx="32" cy="16" r="2" fill="currentColor"/>
        </svg>
      ),
      items: ['Digital Transformation', 'IT Strategy & Roadmap', 'Process Automation']
    },
    {
      id: 2,
      title: 'AI & MACHINE LEARNING',
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2"/>
          <path d="M16 20H32M16 24H28M16 28H32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="36" cy="12" r="3" fill="currentColor"/>
        </svg>
      ),
      items: ['Generative AI', 'Deep Learning', 'NLP & LLMs']
    },
    {
      id: 3,
      title: 'CLOUD SOLUTIONS',
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M36 28C38.2091 28 40 26.2091 40 24C40 21.7909 38.2091 20 36 20C35.5 18 34.5 16 32 16C29.7909 16 28 17.7909 28 20C27.5 20 26.5 20 26 20C23.7909 20 22 21.7909 22 24C22 26.2091 23.7909 28 26 28H36Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 32C18.8954 32 18 31.1046 18 30C18 28.8954 18.8954 28 20 28C20.5 27 21.5 26 23 26C24.1046 26 25 26.8954 25 28C25.5 28 26.5 28 27 28C28.1046 28 29 28.8954 29 30C29 31.1046 28.1046 32 27 32H20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      items: ['Cloud Migration & Deployment', 'DevOps Services', 'Infrastructure Management']
    },
    {
      id: 4,
      title: 'SOFTWARE DEVELOPMENT',
      icon: (
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 16L20 20L16 24M32 16L28 20L32 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M24 12V36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2"/>
        </svg>
      ),
      items: ['Web & Mobile App Development', 'Custom Enterprise Solutions', 'API Development & Integration']
    },
    // {
    //   id: 5,
    //   title: 'CRM & ERP Solutions',
    //   icon: (
    //     <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    //       <circle cx="16" cy="20" r="4" stroke="currentColor" strokeWidth="2"/>
    //       <circle cx="32" cy="20" r="4" stroke="currentColor" strokeWidth="2"/>
    //       <circle cx="24" cy="32" r="4" stroke="currentColor" strokeWidth="2"/>
    //       <path d="M16 24C16 26.2091 17.7909 28 20 28H28C30.2091 28 32 26.2091 32 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    //     </svg>
    //   ),
    //   items: ['Tailored CRM & ERP Services', 'Consulting & Deployment', 'CRM & ERP Integration']
    // }
  ]

  return (
    <section className="services-section" id="services">
      <div className="services-container">
        <div className="services-header">
          <span className="services-subtitle">Our Services</span>
          <h2 className="services-title">
            Tailored <span className="highlight">solutions</span> to turn strategy into execution.
          </h2>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <PixelCard
              key={service.id}
              variant="blue"
              className="service-pixel-card"
            >
              <div className="service-card-content">
                <h3 className="service-title">
                  {service.id === 1 ? (
                    <>
                      IT<br />CONSULTING
                    </>
                  ) : (
                    service.title
                  )}
                </h3>
                <div className="service-card-hover">
                  <div className="service-icon">
                    {service.icon}
                  </div>
                  <ul className="service-list">
                    {service.items.map((item, index) => (
                      <li key={index} className="service-item">
                        <span className="bullet"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href="#" className="service-link">EXPLORE ALL</a>
                </div>
              </div>
            </PixelCard>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

