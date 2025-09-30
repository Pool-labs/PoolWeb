"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Gift, Star, Sparkles, Bell } from "lucide-react"
import { preregisterUser } from "@/app/firebase/services"

export default function SurveyConfirmationPage() {
  const [showConfetti, setShowConfetti] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [isPreregistering, setIsPreregistering] = useState(false)
  const [preregisterStatus, setPreregisterStatus] = useState<"idle" | "success" | "error">("idle")

  useEffect(() => {
    // Check if the survey was completed (all questions answered)
    const searchParams = new URLSearchParams(window.location.search)
    setIsComplete(searchParams.get("complete") === "true")
    setIsUpdate(searchParams.get("updated") === "true")
    setFirstName(searchParams.get("firstName") || "")
    setLastName(searchParams.get("lastName") || "")
    setEmail(searchParams.get("email") || "")

    // Hide confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handlePreregister = async () => {
    if (!firstName || !lastName || !email) {
      setPreregisterStatus("error")
      return
    }

    setIsPreregistering(true)
    setPreregisterStatus("idle")

    try {
      await preregisterUser(firstName, lastName, email)
      setPreregisterStatus("success")
    } catch (error: any) {
      // Even if they already preregistered, we consider it a success
      if (error.message === "USER_ALREADY_EXISTS") {
        setPreregisterStatus("success")
      } else {
        setPreregisterStatus("error")
      }
    } finally {
      setIsPreregistering(false)
    }
  }


  return (
    <div className="min-h-screen py-20 relative overflow-hidden">
      {/* Animated confetti background - only show for complete submissions */}
      {showConfetti && isComplete && (
        <div className="absolute inset-0 z-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
              }}
            >
              <div
                className={`w-3 h-3 ${
                  i % 3 === 0
                    ? "bg-pool-pink"
                    : i % 3 === 1
                    ? "bg-pool-yellow"
                    : "bg-pool-blue"
                } rounded-full`}
              />
            </div>
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Success icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-pool-green to-pool-blue rounded-full flex items-center justify-center shadow-2xl animate-bounce-slow">
                <Gift className="w-16 h-16 text-white" />
              </div>
              <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-pool-yellow animate-pulse" />
              <Star className="absolute -bottom-4 -left-4 w-6 h-6 text-pool-pink animate-pulse" />
            </div>
          </div>

          {/* Combined Thank you & Pre-Register Section */}
          <div className="bg-gradient-to-r from-pool-pink/20 to-pool-yellow/20 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border-2 border-white/40 mb-8 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-pool-yellow/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-pool-pink/10 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              {/* Thank you message */}
              {isComplete ? (
                <>
                  <h1 className="text-5xl font-bold text-pool-navy mb-6 text-shadow flex items-center justify-center gap-3">
                    <Sparkles className="w-12 h-12 text-pool-yellow animate-pulse" />
                    {firstName ? `Thanks, ${firstName}!` : "You're in!"}
                    <Sparkles className="w-12 h-12 text-pool-pink animate-pulse" />
                  </h1>
                  <div className="space-y-4 mb-8">
                    <p className="text-2xl font-bold text-pool-navy text-shadow leading-relaxed">
                      You're officially on the VIP list for early access to our upcoming merch drop!
                    </p>
                    <p className="text-lg text-pool-navy/80 text-shadow">
                      Get ready to choose your favorite piece from our exclusive POOL collection.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-4xl font-bold text-pool-navy mb-6 text-shadow">
                    {firstName ? `Thanks for sharing, ${firstName}!` : "Thanks for Your Feedback!"}
                  </h1>
                  <p className="text-xl text-pool-navy text-shadow mb-8">
                    {isUpdate 
                      ? "Your responses have been updated. Complete all questions to join the VIP list for our exclusive merch drop!"
                      : "We appreciate you taking the time to share your thoughts with us."
                    }
                  </p>
                </>
              )}

              {/* Pre-Register Section */}
              <div className="mt-8 bg-gradient-to-r from-pool-blue/10 to-pool-green/10 rounded-2xl p-6 shadow-inner border border-white/20">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Bell className="w-8 h-8 text-pool-navy" />
              </div>
              
              {preregisterStatus === "success" ? (
                  <>
                    <h3 className="text-2xl font-bold text-pool-navy mb-4">
                      You're All Set!
                    </h3>
                    <p className="text-pool-navy/80 mb-6">
                      {firstName ? `Thanks ${firstName}! ` : ""}You're now on the VIP list for POOL launch notifications.
                    </p>
                    <div className="bg-green-100 border-2 border-green-300 rounded-2xl p-4 inline-block">
                      <p className="text-green-800 font-semibold">
                        Pre-Registration Complete!
                      </p>
                    </div>
                  </>
                ) : preregisterStatus === "error" ? (
                  <>
                    <h3 className="text-2xl font-bold text-pool-navy mb-4">
                      Oops! Something went wrong
                    </h3>
                    <p className="text-pool-navy/80 mb-6">
                      We couldn't automatically pre-register you. Please try the manual registration.
                    </p>
                    <Link href="/preregister">
                      <button className="bg-gradient-to-r from-pool-blue to-pool-green hover:from-pool-green hover:to-pool-blue text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto">
                        <Bell size={20} />
                        Go to Pre-Register Page
                      </button>
                    </Link>
                  </>
                ) : firstName && lastName && email ? (
                  <>
                    <h3 className="text-2xl font-bold text-pool-navy mb-4">
                      Want Early Access to POOL?
                    </h3>
                    <p className="text-pool-navy/80 mb-6">
                      {isComplete 
                        ? `Hi ${firstName}! As a VIP member, make sure you're first in line when we launch!`
                        : `Hi ${firstName}! Get notified when POOL launches and join thousands of others who are excited about group payments!`
                      }
                    </p>
                    <button 
                      onClick={handlePreregister}
                      disabled={isPreregistering}
                      className="bg-gradient-to-r from-pool-blue to-pool-green hover:from-pool-green hover:to-pool-blue text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Bell size={20} />
                      {isPreregistering ? "Pre-Registering..." : "Pre-Register for Launch"}
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-pool-navy mb-4">
                      Want Early Access to POOL?
                    </h3>
                    <p className="text-pool-navy/80 mb-6">
                      Get notified when POOL launches and join thousands of others who are excited about group payments!
                    </p>
                    <Link href="/preregister">
                      <button className="bg-gradient-to-r from-pool-blue to-pool-green hover:from-pool-green hover:to-pool-blue text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto">
                        <Bell size={20} />
                        Pre-Register for Launch
                      </button>
                    </Link>
                  </>
              )}
                </div>
              </div>
            </div>
          </div>


          {/* Feedback message for incomplete surveys */}
          {!isComplete && (
            <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
              <p className="text-pool-navy text-lg text-shadow text-center">
                Your feedback is incredibly valuable and will help shape the future of POOL. 
                Complete all questionnaire questions to secure your spot on the VIP list!
              </p>
            </div>
          )}

          {/* Call to action */}
          <div className="mt-12 text-center space-y-6">
            
            <div>
              <Link
                href="/"
                className="text-pool-navy hover:text-pool-pink font-bold text-lg transition-colors hover:scale-110 transform inline-flex items-center gap-2"
              >
                ← Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}