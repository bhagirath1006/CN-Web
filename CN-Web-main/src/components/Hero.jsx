import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Hero.css'

function Hero() {
  const heroHeadlineRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line1MobileRef = useRef(null)
  const line2MobileRef = useRef(null)
  const line3MobileRef = useRef(null)

  useEffect(() => {
    const animateLine = (lineElement) => {
      if (!lineElement) return []

      const lineText = lineElement.textContent || ''
      const lineChars = lineText.split('').map((char, index) => {
        const span = document.createElement('span')
        span.textContent = char === ' ' ? '\u00A0' : char
        span.style.display = 'inline-block'
        return span
      })

      lineElement.textContent = ''
      lineChars.forEach(char => lineElement.appendChild(char))

      return lineChars
    }

    const line1 = line1Ref.current
    const line2 = line2Ref.current
    const line1Mobile = line1MobileRef.current
    const line2Mobile = line2MobileRef.current
    const line3Mobile = line3MobileRef.current

    // Animate desktop version
    const line1Chars = animateLine(line1)
    const line2Chars = animateLine(line2)

    // Animate mobile version
    const line1MobileChars = animateLine(line1Mobile)
    const line2MobileChars = animateLine(line2Mobile)
    const line3MobileChars = animateLine(line3Mobile)

    const allChars = [...line1Chars, ...line2Chars, ...line1MobileChars, ...line2MobileChars, ...line3MobileChars]
    
    if (allChars.length === 0) return

    // Set initial state for all characters
    gsap.set(allChars, {
      opacity: 0,
      y: 50
    })

    // Create animation timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Animate desktop line 1 characters
    if (line1Chars.length > 0) {
      tl.to(line1Chars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: {
          amount: 0.6,
          from: 'start'
        }
      })
    }

    // Animate desktop line 2 characters with delay
    if (line2Chars.length > 0) {
      tl.to(line2Chars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: {
          amount: 0.6,
          from: 'start'
        }
      }, '-=0.3')
    }

    // Animate mobile line 1 characters
    if (line1MobileChars.length > 0) {
      tl.to(line1MobileChars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: {
          amount: 0.6,
          from: 'start'
        }
      }, '-=0.3')
    }

    // Animate mobile line 2 characters
    if (line2MobileChars.length > 0) {
      tl.to(line2MobileChars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: {
          amount: 0.6,
          from: 'start'
        }
      }, '-=0.3')
    }

    // Animate mobile line 3 characters
    if (line3MobileChars.length > 0) {
      tl.to(line3MobileChars, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: {
          amount: 0.6,
          from: 'start'
        }
      }, '-=0.3')
    }

    return () => {
      // Cleanup
      tl.kill()
    }
  }, [])

  return (
    <main className="hero-section">
      <div className="hero-container">
        <h1 className="hero-headline" ref={heroHeadlineRef}>
          {/* Desktop version */}
          <span className="hero-line-1 hero-desktop" ref={line1Ref}>Pioneering</span>
          <span className="hero-line-2 hero-desktop" ref={line2Ref}>Innovation with Smart Solutions</span>
          
          {/* Mobile version - 3 lines */}
          <span className="hero-line-1 hero-mobile" ref={line1MobileRef}>Pioneering</span>
          <span className="hero-line-2 hero-mobile" ref={line2MobileRef}>Innovation with</span>
          <span className="hero-line-3 hero-mobile" ref={line3MobileRef}>Smart Solutions</span>
        </h1>
      </div>
    </main>
  )
}

export default Hero

