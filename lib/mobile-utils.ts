// Mobile detection utilities
export const isMobile = () => {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth <= 768
}

export const isIOS = () => {
  if (typeof window === 'undefined') return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
}

export const isAndroid = () => {
  if (typeof window === 'undefined') return false
  return /Android/.test(navigator.userAgent)
}

// Performance utilities
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Viewport utilities
export const getViewportHeight = () => {
  if (typeof window === 'undefined') return 0
  return window.innerHeight || document.documentElement.clientHeight
}

export const setMobileViewportHeight = () => {
  if (typeof window === 'undefined') return
  const vh = getViewportHeight() * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

// Touch utilities
export const addTouchClass = () => {
  if (typeof window === 'undefined') return
  if ('ontouchstart' in window) {
    document.documentElement.classList.add('touch-device')
  } else {
    document.documentElement.classList.add('no-touch-device')
  }
}

