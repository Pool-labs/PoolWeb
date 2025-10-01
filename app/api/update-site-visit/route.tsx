import { NextRequest, NextResponse } from "next/server"
import { updateUserVisitedSite } from "@/app/firebase/services"

export async function POST(request: NextRequest) {
  try {
    const { email, hasVisitedSite } = await request.json()

    if (!email || typeof hasVisitedSite !== 'boolean') {
      return NextResponse.json(
        { error: "Email and hasVisitedSite (boolean) are required" },
        { status: 400 }
      )
    }

    const success = await updateUserVisitedSite(email, hasVisitedSite)

    if (success) {
      return NextResponse.json(
        { message: "Site visit status updated successfully" },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }
  } catch (error: any) {
    console.error("Error updating site visit status:", error)
    return NextResponse.json(
      { error: "Failed to update site visit status" },
      { status: 500 }
    )
  }
}
