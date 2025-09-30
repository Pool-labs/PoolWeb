import { NextRequest, NextResponse } from "next/server"
import { addPreregisterUser } from "@/app/firebase/services"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { firstName, lastName, email } = data

    // Get location data
    let location = "Unknown"
    try {
      const locationResponse = await fetch(`${request.nextUrl.origin}/api/location`, {
        headers: {
          'x-forwarded-for': request.headers.get('x-forwarded-for') || '',
          'x-real-ip': request.headers.get('x-real-ip') || ''
        }
      })
      if (locationResponse.ok) {
        const locationData = await locationResponse.json()
        location = locationData.location || "Unknown"
      }
    } catch (error) {
      console.error("Error fetching location:", error)
    }

    // Submit to Firebase with location
    const docId = await addPreregisterUser({
      firstName,
      lastName,
      email,
      location,
      submittedAt: new Date().toISOString()
    })

    return NextResponse.json(
      { 
        message: "Successfully preregistered!",
        docId 
      },
      { status: 200 }
    )
  } catch (error: any) {
    if (error.message === "USER_ALREADY_EXISTS") {
      return NextResponse.json(
        { 
          error: "This email is already registered.",
          code: "USER_ALREADY_EXISTS" 
        },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: "Failed to preregister" },
      { status: 500 }
    )
  }
}
