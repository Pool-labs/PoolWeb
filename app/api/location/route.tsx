import { NextRequest, NextResponse } from "next/server"

// Try multiple methods to get the IP address
function getClientIp(request: NextRequest): string {
  // Check various headers in order of preference
  const headers = [
    'x-real-ip',
    'x-forwarded-for',
    'cf-connecting-ip', // Cloudflare
    'x-client-ip',
    'x-forwarded',
    'forwarded-for',
    'forwarded'
  ]

  for (const header of headers) {
    const value = request.headers.get(header)
    if (value) {
      // x-forwarded-for can contain multiple IPs, take the first one
      const ip = value.split(',')[0].trim()
      if (ip && ip !== 'unknown') {
        return ip
      }
    }
  }

  // Check Vercel-specific headers
  const vercelIp = request.headers.get('x-vercel-forwarded-for')
  if (vercelIp) {
    return vercelIp.split(',')[0].trim()
  }

  return "unknown"
}

// Try multiple geolocation services
async function getLocationFromIp(ip: string) {
  // List of geolocation services to try
  const services = []
  
  // Add premium services if API keys are available
  if (process.env.IPINFO_API_KEY) {
    services.push({
      name: 'ipinfo.io (premium)',
      url: `https://ipinfo.io/${ip}?token=${process.env.IPINFO_API_KEY}`,
      parser: (data: any) => ({
        country: data.country,
        countryCode: data.country,
        city: data.city,
        region: data.region,
        location: `${data.city || "Unknown"}, ${data.region || ""}, ${data.country || "Unknown"}`,
        coordinates: data.loc,
        postal: data.postal,
        org: data.org, // ISP/Organization
        asn: data.asn
      })
    })
  }
  
  if (process.env.IPGEOLOCATION_API_KEY) {
    services.push({
      name: 'ipgeolocation.io (premium)',
      url: `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.IPGEOLOCATION_API_KEY}&ip=${ip}`,
      parser: (data: any) => ({
        country: data.country_name,
        countryCode: data.country_code2,
        city: data.city,
        region: data.state_prov,
        location: `${data.city || "Unknown"}, ${data.state_prov || ""}, ${data.country_name || "Unknown"}`,
        coordinates: `${data.latitude},${data.longitude}`,
        postal: data.zipcode,
        isp: data.isp,
        timezone: data.time_zone?.name
      })
    })
  }

  // Free services as fallback
  services.push(...[
    {
      name: 'ipapi.co',
      url: `https://ipapi.co/${ip}/json/`,
      parser: (data: any) => ({
        country: data.country_name,
        countryCode: data.country_code,
        city: data.city,
        region: data.region,
        location: `${data.city || "Unknown"}, ${data.country_name || "Unknown"}`
      })
    },
    {
      name: 'ip-api.com',
      url: `http://ip-api.com/json/${ip}`,
      parser: (data: any) => ({
        country: data.country,
        countryCode: data.countryCode,
        city: data.city,
        region: data.regionName,
        location: `${data.city || "Unknown"}, ${data.country || "Unknown"}`
      })
    },
    {
      name: 'ipgeolocation.io',
      url: `https://api.ipgeolocation.io/ipgeo?apiKey=free&ip=${ip}`,
      parser: (data: any) => ({
        country: data.country_name,
        countryCode: data.country_code2,
        city: data.city,
        region: data.state_prov,
        location: `${data.city || "Unknown"}, ${data.country_name || "Unknown"}`
      })
    },
    {
      name: 'ipinfo.io',
      url: `https://ipinfo.io/${ip}/json`,
      parser: (data: any) => ({
        country: data.country,
        countryCode: data.country,
        city: data.city,
        region: data.region,
        location: data.loc ? `${data.city || "Unknown"}, ${data.region || ""}, ${data.country || "Unknown"}` : `${data.city || "Unknown"}, ${data.country || "Unknown"}`,
        coordinates: data.loc, // lat,lng format
        postal: data.postal
      })
    },
    {
      name: 'geoplugin.net',
      url: `http://www.geoplugin.net/json.gp?ip=${ip}`,
      parser: (data: any) => ({
        country: data.geoplugin_countryName,
        countryCode: data.geoplugin_countryCode,
        city: data.geoplugin_city,
        region: data.geoplugin_regionName,
        location: `${data.geoplugin_city || "Unknown"}, ${data.geoplugin_regionName || ""}, ${data.geoplugin_countryName || "Unknown"}`,
        coordinates: `${data.geoplugin_latitude},${data.geoplugin_longitude}`,
        timezone: data.geoplugin_timezone
      })
    }
  ])

  // Try each service until one works
  for (const service of services) {
    try {
      const response = await fetch(service.url, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0'
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        const parsed = service.parser(data)
        
        // Check if we got valid data
        if (parsed.country && parsed.country !== 'Unknown') {
          console.log(`Location detected using ${service.name}:`, parsed.location)
          return parsed
        }
      }
    } catch (error) {
      console.error(`Error with ${service.name}:`, error)
    }
  }

  throw new Error("All geolocation services failed")
}

export async function GET(request: NextRequest) {
  try {
    // Get IP address
    const ip = getClientIp(request)
    console.log("Detected IP:", ip)

    // In development or if IP is local, use a real IP for testing
    const ipToCheck = (ip === "::1" || ip === "127.0.0.1" || ip === "unknown") 
      ? "8.8.8.8" // Google DNS IP for testing
      : ip

    const locationData = await getLocationFromIp(ipToCheck)
    
    return NextResponse.json(locationData)
  } catch (error) {
    console.error("Error detecting location:", error)
    
    // Last resort: Try to get country from Accept-Language header
    const acceptLang = request.headers.get('accept-language')
    let country = "Unknown"
    
    if (acceptLang) {
      // Extract country from language header (e.g., "en-US" -> "United States")
      const langMatch = acceptLang.match(/[a-z]{2}-([A-Z]{2})/)
      if (langMatch) {
        const countryCode = langMatch[1]
        // Map common country codes
        const countryMap: Record<string, string> = {
          'US': 'United States',
          'GB': 'United Kingdom',
          'CA': 'Canada',
          'AU': 'Australia',
          'IN': 'India',
          'DE': 'Germany',
          'FR': 'France',
          'ES': 'Spain',
          'IT': 'Italy',
          'JP': 'Japan',
          'CN': 'China',
          'BR': 'Brazil',
          'MX': 'Mexico'
        }
        country = countryMap[countryCode] || country
      }
    }
    
    return NextResponse.json({
      country: country,
      countryCode: "XX",
      city: "Unknown",
      region: "Unknown",
      location: country !== "Unknown" ? country : "Unknown"
    })
  }
}
