import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './ClientLogos.css'
import client1 from '../assets/blackknight.jpeg'
import client2 from '../assets/client bank of india.svg'
import client3 from '../assets/cilentyandl.webp'
import client4 from '../assets/cilentinfo tech.png'
import client5 from '../assets/cilenttd bank.png'
import client6 from '../assets/clientcvs.svg'

function ClientLogos() {
  const scrollContainerRef = useRef(null)

  const clientLogos = [
    { id: 1, image: client1, alt: 'Client 1' },
    { id: 2, image: client2, alt: 'Bank of India' },
    { id: 3, image: client3, alt: 'Y&L' },
    { id: 4, image: client4, alt: 'Info Tech' },
    { id: 5, image: client5, alt: 'TD Bank' },
    { id: 6, image: client6, alt: 'CVS' }
  ]

  // Duplicate logos for seamless infinite scroll (2 sets for seamless loop)
  const duplicatedLogos = [...clientLogos, ...clientLogos]

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Function to start animation
    const startAnimation = () => {
      // Calculate the width of one set (half of total since we duplicated)
      const totalWidth = container.scrollWidth
      const oneSetWidth = totalWidth / 2

      if (oneSetWidth > 0) {
        // Create GSAP animation for infinite scroll
        gsap.to(container, {
          x: `-${oneSetWidth}px`, // Move by exactly one set width
          duration: 30,
          ease: 'none',
          repeat: -1
        })
      }
    }

    // Wait a bit for layout to settle, then start animation
    const timeout = setTimeout(startAnimation, 100)

    // Also try when window loads
    window.addEventListener('load', startAnimation)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener('load', startAnimation)
      gsap.killTweensOf(container)
    }
  }, [])

  return (
    <section className="client-logos-section">
      <div className="client-logos-container">
        <h2 className="client-logos-title">Our Trusted Clients</h2>
        <div className="client-logos-wrapper">
          <div className="client-logos-scroll" ref={scrollContainerRef}>
            {duplicatedLogos.map((client, index) => (
              <div key={`${client.id}-${index}`} className="client-logo-item">
                <img 
                  src={client.image} 
                  alt={client.alt}
                  className="client-logo-image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ClientLogos
