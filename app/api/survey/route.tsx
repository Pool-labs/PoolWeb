import { NextResponse } from "next/server"
import { submitSurvey } from "@/app/firebase/services"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Extract user info and survey data
    const { firstName, lastName, email, ...surveyData } = data

    // Submit to Firebase
    const result = await submitSurvey(firstName, lastName, email, surveyData)

    return NextResponse.json(
      { 
        message: result.isUpdate ? "Survey updated successfully" : "Survey submitted successfully",
        docId: result.id,
        isUpdate: result.isUpdate 
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
