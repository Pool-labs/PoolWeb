"use client"

import { useEffect } from 'react'
import { setMobileViewportHeight, addTouchClass, debounce, optimizeForSafari, reduceMotionForLowPower } from '@/lib/mobile-utils'

export default function MobileInit() {
  useEffect(() => {
    // Set initial viewport height
    setMobileViewportHeight()
    
    // Add touch class
    addTouchClass()
    
    // Apply Safari optimizations
    optimizeForSafari()
    
    // Reduce motion for performance
    reduceMotionForLowPower()
    
    // Handle viewport height changes
    const handleResize = debounce(() => {
      setMobileViewportHeight()
    }, 150)
    
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
