import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // Get IP address from request headers
    const forwardedFor = request.headers.get("x-forwarded-for")
    const realIp = request.headers.get("x-real-ip")
    const ip = forwardedFor?.split(",")[0] || realIp || "unknown"

    // In development, use a fallback IP
    const ipToCheck = ip === "::1" || ip === "127.0.0.1" ? "8.8.8.8" : ip

    // Use a free IP geolocation service
    const geoResponse = await fetch(`https://ipapi.co/${ipToCheck}/json/`)
    
    if (!geoResponse.ok) {
      throw new Error("Failed to fetch location data")
    }

    const geoData = await geoResponse.json()
    
    // Return country and city information
    return NextResponse.json({
      country: geoData.country_name || "Unknown",
      countryCode: geoData.country_code || "XX",
      city: geoData.city || "Unknown",
      region: geoData.region || "Unknown",
      location: `${geoData.city || "Unknown"}, ${geoData.country_name || "Unknown"}`
    })
  } catch (error) {
    console.error("Error detecting location:", error)
    return NextResponse.json({
      country: "Unknown",
      countryCode: "XX",
      city: "Unknown", 
      region: "Unknown",
      location: "Unknown"
    })
  }
}
