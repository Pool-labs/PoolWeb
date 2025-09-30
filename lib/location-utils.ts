// Client-side location detection utilities

export function getTimezoneLocation(): string {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    
    // Map common timezones to locations
    const timezoneMap: Record<string, string> = {
      'America/New_York': 'New York, United States',
      'America/Chicago': 'Chicago, United States',
      'America/Denver': 'Denver, United States',
      'America/Los_Angeles': 'Los Angeles, United States',
      'America/Phoenix': 'Phoenix, United States',
      'America/Toronto': 'Toronto, Canada',
      'America/Vancouver': 'Vancouver, Canada',
      'America/Mexico_City': 'Mexico City, Mexico',
      'America/Sao_Paulo': 'São Paulo, Brazil',
      'America/Buenos_Aires': 'Buenos Aires, Argentina',
      'Europe/London': 'London, United Kingdom',
      'Europe/Paris': 'Paris, France',
      'Europe/Berlin': 'Berlin, Germany',
      'Europe/Madrid': 'Madrid, Spain',
      'Europe/Rome': 'Rome, Italy',
      'Europe/Amsterdam': 'Amsterdam, Netherlands',
      'Europe/Stockholm': 'Stockholm, Sweden',
      'Europe/Moscow': 'Moscow, Russia',
      'Asia/Dubai': 'Dubai, United Arab Emirates',
      'Asia/Mumbai': 'Mumbai, India',
      'Asia/Kolkata': 'Kolkata, India',
      'Asia/Bangkok': 'Bangkok, Thailand',
      'Asia/Singapore': 'Singapore',
      'Asia/Hong_Kong': 'Hong Kong',
      'Asia/Shanghai': 'Shanghai, China',
      'Asia/Tokyo': 'Tokyo, Japan',
      'Asia/Seoul': 'Seoul, South Korea',
      'Australia/Sydney': 'Sydney, Australia',
      'Australia/Melbourne': 'Melbourne, Australia',
      'Australia/Brisbane': 'Brisbane, Australia',
      'Australia/Perth': 'Perth, Australia',
      'Pacific/Auckland': 'Auckland, New Zealand',
      'Africa/Johannesburg': 'Johannesburg, South Africa',
      'Africa/Cairo': 'Cairo, Egypt',
      'Africa/Lagos': 'Lagos, Nigeria',
      'Africa/Nairobi': 'Nairobi, Kenya'
    }

    if (timezoneMap[timezone]) {
      return timezoneMap[timezone]
    }

    // Try to extract country from timezone
    const parts = timezone.split('/')
    if (parts.length >= 2) {
      const continent = parts[0]
      const city = parts[parts.length - 1].replace(/_/g, ' ')
      
      // Map continent to likely countries
      const continentMap: Record<string, string> = {
        'America': 'Americas',
        'Europe': 'Europe',
        'Asia': 'Asia',
        'Africa': 'Africa',
        'Australia': 'Australia',
        'Pacific': 'Pacific'
      }
      
      return `${city}, ${continentMap[continent] || continent}`
    }

    return 'Unknown'
  } catch (error) {
    console.error('Error getting timezone location:', error)
    return 'Unknown'
  }
}

// Get browser language location
export function getBrowserLanguageLocation(): string {
  try {
    const lang = navigator.language || (navigator as any).userLanguage
    
    if (lang) {
      const langMap: Record<string, string> = {
        'en-US': 'United States',
        'en-GB': 'United Kingdom',
        'en-CA': 'Canada',
        'en-AU': 'Australia',
        'en-IN': 'India',
        'fr-FR': 'France',
        'fr-CA': 'Canada',
        'es-ES': 'Spain',
        'es-MX': 'Mexico',
        'es-AR': 'Argentina',
        'de-DE': 'Germany',
        'de-AT': 'Austria',
        'de-CH': 'Switzerland',
        'it-IT': 'Italy',
        'pt-BR': 'Brazil',
        'pt-PT': 'Portugal',
        'zh-CN': 'China',
        'zh-TW': 'Taiwan',
        'ja-JP': 'Japan',
        'ko-KR': 'South Korea',
        'ru-RU': 'Russia',
        'ar-SA': 'Saudi Arabia',
        'ar-EG': 'Egypt',
        'hi-IN': 'India',
        'nl-NL': 'Netherlands',
        'sv-SE': 'Sweden',
        'no-NO': 'Norway',
        'da-DK': 'Denmark',
        'fi-FI': 'Finland',
        'pl-PL': 'Poland',
        'tr-TR': 'Turkey',
        'th-TH': 'Thailand',
        'id-ID': 'Indonesia',
        'vi-VN': 'Vietnam'
      }

      if (langMap[lang]) {
        return langMap[lang]
      }

      // Try to extract country code
      const match = lang.match(/-([A-Z]{2})$/)
      if (match) {
        return match[1]
      }
    }
  } catch (error) {
    console.error('Error getting browser language location:', error)
  }
  
  return 'Unknown'
}

// Get more precise location using multiple signals
export function getPreciseClientLocation(): {
  location: string;
  confidence: 'high' | 'medium' | 'low';
  details: {
    timezone?: string;
    language?: string;
    locale?: string;
    dateFormat?: string;
  }
} {
  const details: any = {}
  
  // Get timezone
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    details.timezone = timezone
  } catch (e) {}

  // Get language and locale
  try {
    const lang = navigator.language || (navigator as any).userLanguage
    details.language = lang
    details.locale = new Intl.Locale(lang).region
  } catch (e) {}

  // Get date/time format preferences (can indicate region)
  try {
    const dateTimeFormat = new Intl.DateTimeFormat().resolvedOptions()
    details.dateFormat = `${dateTimeFormat.month}/${dateTimeFormat.day}`
  } catch (e) {}

  // Try to determine location
  const timezoneLocation = getTimezoneLocation()
  const langLocation = getBrowserLanguageLocation()
  
  if (timezoneLocation !== 'Unknown' && langLocation !== 'Unknown' && 
      timezoneLocation.includes(langLocation)) {
    // High confidence if both match
    return {
      location: timezoneLocation,
      confidence: 'high',
      details
    }
  } else if (timezoneLocation !== 'Unknown') {
    // Medium confidence with just timezone
    return {
      location: timezoneLocation,
      confidence: 'medium',
      details
    }
  } else if (langLocation !== 'Unknown') {
    // Low confidence with just language
    return {
      location: langLocation,
      confidence: 'low',
      details
    }
  }

  return {
    location: 'Unknown',
    confidence: 'low',
    details
  }
}

// Combined client-side location detection
export function detectClientLocation(): string {
  const preciseLocation = getPreciseClientLocation()
  return preciseLocation.location
}

// Use Web APIs for more precise location (requires HTTPS)
export async function getNavigatorLocation(): Promise<{
  latitude?: number;
  longitude?: number;
  accuracy?: number;
  error?: string;
}> {
  // This would require user permission, so we'll only use it if already granted
  try {
    const permissions = await navigator.permissions.query({ name: 'geolocation' })
    if (permissions.state === 'granted') {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy
            })
          },
          (error) => {
            resolve({ error: error.message })
          },
          { 
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 300000 // 5 minutes cache
          }
        )
      })
    }
  } catch (e) {
    // Permissions API not supported
  }
  
  return { error: 'Permission not granted' }
}
