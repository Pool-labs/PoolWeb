"use client"

import { useEffect } from 'react'

export default function MobileInit() {
  useEffect(() => {
    // Set viewport height for all mobile devices consistently
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    
    // Initial set
    setViewportHeight()
    
    // Update on resize for all devices
    let resizeTimer: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(setViewportHeight, 100)
    }
    
    window.addEventListener('resize', handleResize)
    
    // Add mobile class for styling
    if (window.innerWidth <= 768) {
      document.documentElement.classList.add('is-mobile')
    }
    
    // Consistent touch handling across all devices
    document.addEventListener('touchstart', () => {
      document.documentElement.classList.add('touch-device')
    }, { once: true, passive: true })
    
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimer)
    }
  }, [])
  
  return null
}
