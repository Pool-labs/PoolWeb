"use client"

import { useEffect } from 'react'
import { setMobileViewportHeight, addTouchClass, debounce } from '@/lib/mobile-utils'

export default function MobileInit() {
  useEffect(() => {
    // Set initial viewport height
    setMobileViewportHeight()
    
    // Add touch class
    addTouchClass()
    
    // Handle viewport height changes
    const handleResize = debounce(() => {
      setMobileViewportHeight()
    }, 100)
    
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    
    // Prevent pinch zoom on iOS
    document.addEventListener('gesturestart', (e) => {
      e.preventDefault()
    })
    
    // Optimize scrolling
    document.addEventListener('touchmove', () => {}, { passive: true })
    
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])
  
  return null
}
