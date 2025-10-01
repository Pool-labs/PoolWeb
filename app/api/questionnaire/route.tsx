import { NextRequest, NextResponse } from "next/server"
import { submitSurvey } from "@/app/firebase/services"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

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

    // Extract user info and survey data
    const { firstName, lastName, email, clientLocation, hasVisitedSite, ...surveyData } = data

    // Use server-detected location if available, otherwise use client location
    const finalLocation = location !== "Unknown" ? location : (clientLocation || "Unknown")

    // Submit to Firebase with location and hasVisitedSite
    const result = await submitSurvey(firstName, lastName, email, surveyData, finalLocation, hasVisitedSite)

    // Get the updated user data to return in response
    const { getPreregisterUserByEmail } = await import("@/app/firebase/services")
    const updatedUser = await getPreregisterUserByEmail(email)

    return NextResponse.json(
      { 
        message: result.isUpdate ? "Survey updated successfully" : "Survey submitted successfully",
        docId: result.id,
        isUpdate: result.isUpdate,
        hasVisitedSite: updatedUser?.hasVisitedSite
      },
      { status: 200 }
    )
  } catch (error: any) {
    if (error.message === "SURVEY_ALREADY_COMPLETED") {
      return NextResponse.json(
        { 
          error: "Survey already completed",
          code: "SURVEY_ALREADY_COMPLETED" 
        },
        { status: 409 } // Conflict status
      )
    }
    
    return NextResponse.json(
      { error: "Failed to submit survey" },
      { status: 500 }
    )
  }
}
