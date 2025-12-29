import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()
  const prevPathnameRef = useRef(pathname)

  useEffect(() => {
    // Only scroll if the pathname actually changed
    if (prevPathnameRef.current !== pathname) {
      // Scroll to top smoothly
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
      
      // Update the previous pathname
      prevPathnameRef.current = pathname
    }
  }, [pathname])

  return null
}

export default ScrollToTop
