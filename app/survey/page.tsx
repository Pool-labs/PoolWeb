"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Gift, ChevronRight, CheckSquare, Square, AlertCircle } from "lucide-react"

type FormData = {
  hangoutFrequency: string
  avgSpend: string
  splitWith: string
  splitWithOther: string
  splitTypes: string[]
  splitTypesOther: string
  splitFrequency: string
  iouFrequency: string
  causesTension: string
  currentTool: string
  toolLikes: string
  toolChanges: string
  tryNewApp: string
  prefunding: string
  prefundingWhy: string
  valuableFeatures: string[]
  concerns: string
  firstName: string
  lastName: string
  email: string
}

const initialFormData: FormData = {
  hangoutFrequency: "",
  avgSpend: "",
  splitWith: "",
  splitWithOther: "",
  splitTypes: [],
  splitTypesOther: "",
  splitFrequency: "",
  iouFrequency: "",
  causesTension: "",
  currentTool: "",
  toolLikes: "",
  toolChanges: "",
  tryNewApp: "",
  prefunding: "",
  prefundingWhy: "",
  valuableFeatures: [],
  concerns: "",
  firstName: "",
  lastName: "",
  email: "",
}

const STORAGE_KEY = "survey_progress"

// Helper function to check if form data is complete
function checkIfFormDataComplete(data: FormData): boolean {
  const requiredFields = [
    'hangoutFrequency',
    'avgSpend',
    'splitWith',
    'splitTypes',
    'splitFrequency',
    'iouFrequency',
    'causesTension',
    'currentTool',
    'tryNewApp',
    'valuableFeatures',
    'concerns'
  ];

  for (const field of requiredFields) {
    const value = data[field as keyof FormData];
    if (!value || (Array.isArray(value) && value.length === 0)) {
      // Check for "Other" fields that might need to be filled
      if (field === 'splitWith' && value === 'Other' && !data.splitWithOther) {
        return false;
      }
      if (field === 'splitTypes' && Array.isArray(value) && value.includes('Other') && !data.splitTypesOther) {
        return false;
      }
      return false;
    }
  }
  
  return true;
}

export default function SurveyPage() {
  const router = useRouter()
  // Initialize form data from localStorage if available
  const [formData, setFormData] = useState<FormData>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedProgress = localStorage.getItem(STORAGE_KEY)
        if (savedProgress) {
          const parsedData = JSON.parse(savedProgress)
          // Check if this is a complete survey
          const isComplete = checkIfFormDataComplete(parsedData)
          if (isComplete) {
            // If survey was already 100% complete, clear it from storage
            localStorage.removeItem(STORAGE_KEY)
            return initialFormData
          }
          return parsedData
        }
      } catch (error) {
        // Error loading initial progress
      }
    }
    return initialFormData
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactErrors, setContactErrors] = useState<Partial<FormData>>({})
  const [questionsAnswered, setQuestionsAnswered] = useState(0)
  const [showWarning, setShowWarning] = useState(false)
  const [isPartialSubmission, setIsPartialSubmission] = useState(false)
  const [showProgress, setShowProgress] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [showDuplicateMessage, setShowDuplicateMessage] = useState(false)

  const totalSteps = 5
  const totalQuestions = 11

  // Handle navigation and visibility changes
  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true)
      return
    }

    const loadSavedProgress = () => {
      try {
        // Loading saved progress
        const savedProgress = localStorage.getItem(STORAGE_KEY)
        if (savedProgress) {
          // Found saved progress
          const parsedProgress = JSON.parse(savedProgress)
          // Only update if there's actual data
          if (Object.values(parsedProgress).some(value => 
            value !== "" && 
            (Array.isArray(value) ? value.length > 0 : true)
          )) {
            setFormData(parsedProgress)
            // Progress loaded successfully
          } else {
            // Saved progress was empty, keeping current state
          }
        } else {
          // No saved progress found
        }
      } catch (error) {
        // Error loading saved progress
        localStorage.removeItem(STORAGE_KEY)
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Page became visible, reloading progress
        loadSavedProgress()
      }
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        // Storage changed, reloading progress
        loadSavedProgress()
      }
    }

    const handleRouteChange = () => {
      // Route changed, reloading progress
      loadSavedProgress()
    }

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('focus', loadSavedProgress)
    window.addEventListener('pageshow', loadSavedProgress)
    window.addEventListener('popstate', handleRouteChange)
    // Cleanup event listeners
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('focus', loadSavedProgress)
      window.removeEventListener('pageshow', loadSavedProgress)
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [isInitialized])

  // Save progress whenever form data changes
  useEffect(() => {
    try {
      // Saving progress
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    } catch (error) {
      // Error saving progress
    }
  }, [formData])

  // Calculate questions answered whenever form data changes
  useEffect(() => {
    let answered = 0;

    // Question 1: Hangout frequency
    if (formData.hangoutFrequency) answered++

    // Question 2: Average spend
    if (formData.avgSpend && !isNaN(Number(formData.avgSpend))) answered++

    // Question 3: Split with whom
    if (formData.splitWith) {
      if (formData.splitWith !== "Other") {
        answered++
      } else if (formData.splitWithOther.trim()) {
        answered++
      }
    }

    // Question 4: Split types (checkbox)
    if (formData.splitTypes.length > 0) {
      if (!formData.splitTypes.includes("Other")) {
        answered++
      } else if (formData.splitTypesOther.trim()) {
        answered++
      }
    }

    // Question 5: Split frequency
    if (formData.splitFrequency) answered++

    // Question 6: IOU frequency
    if (formData.iouFrequency) answered++

    // Question 7: Tension
    if (formData.causesTension) answered++

    // Question 8: Current tool
    if (formData.currentTool.trim()) answered++

    // Question 9: Tool feedback (3 parts count as 1)
    if (formData.toolLikes.trim() && formData.toolChanges.trim() && formData.tryNewApp.trim()) answered++

    // Question 10: Prefunding
    if (formData.prefunding) {
      if (formData.prefunding === "No") {
        answered++
      } else if (formData.prefundingWhy.trim()) {
        answered++
      }
    }

    // Question 11: Features and concerns (counts as 1)
    if (formData.valuableFeatures.length > 0 && formData.concerns.trim()) answered++
    
    // Questions answered: answered
    setQuestionsAnswered(answered)
  }, [formData])

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleCheckboxChange = (field: "splitTypes" | "valuableFeatures", value: string) => {
    const currentValues = formData[field] as string[]
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value]
    handleInputChange(field, newValues)
  }

  const isAllQuestionsAnswered = (): boolean => {
    return (
      formData.hangoutFrequency !== "" &&
      formData.avgSpend !== "" &&
      formData.splitWith !== "" &&
      (formData.splitWith !== "Other" || formData.splitWithOther !== "") &&
      formData.splitTypes.length > 0 &&
      (!formData.splitTypes.includes("Other") || formData.splitTypesOther !== "") &&
      formData.splitFrequency !== "" &&
      formData.iouFrequency !== "" &&
      formData.causesTension !== "" &&
      formData.currentTool !== "" &&
      formData.toolLikes !== "" &&
      formData.toolChanges !== "" &&
      formData.tryNewApp !== "" &&
      formData.prefunding !== "" &&
      (formData.prefunding === "No" || formData.prefundingWhy !== "") &&
      formData.valuableFeatures.length > 0 &&
      formData.concerns !== ""
    )
  }

  const validateContactInfo = (): boolean => {
    const errors: Partial<FormData> = {}
    if (!formData.firstName.trim()) errors.firstName = "Please enter your first name"
    if (!formData.lastName.trim()) errors.lastName = "Please enter your last name"
    if (!formData.email.trim()) errors.email = "Please enter your email"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Please enter a valid email"
    
    setContactErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isQuestionAnswered = (questionNumber: number): boolean => {
    switch (questionNumber) {
      case 1: return Boolean(formData.hangoutFrequency)
      case 2: return Boolean(formData.avgSpend && !isNaN(Number(formData.avgSpend)))
      case 3: return Boolean(formData.splitWith && (formData.splitWith !== "Other" || formData.splitWithOther.trim()))
      case 4: return Boolean(formData.splitTypes.length > 0 && (!formData.splitTypes.includes("Other") || formData.splitTypesOther.trim()))
      case 5: return Boolean(formData.splitFrequency)
      case 6: return Boolean(formData.iouFrequency)
      case 7: return Boolean(formData.causesTension)
      case 8: return Boolean(formData.currentTool.trim())
      case 9: return Boolean(formData.toolLikes.trim() && formData.toolChanges.trim() && formData.tryNewApp.trim())
      case 10: return Boolean(formData.prefunding && (formData.prefunding === "No" || formData.prefundingWhy.trim()))
      case 11: return Boolean(formData.valuableFeatures.length > 0 && formData.concerns.trim())
      default: return false
    }
  }

  const getQuestionStep = (questionNumber: number): number => {
    if (questionNumber <= 3) return 1
    if (questionNumber <= 6) return 2
    if (questionNumber <= 8) return 3
    if (questionNumber <= 10) return 4
    return 5
  }

  const findFirstUnansweredQuestion = (): number => {
    for (let i = 1; i <= totalQuestions; i++) {
      if (!isQuestionAnswered(i)) {
        return i
      }
    }
    return 1
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleQuestionClick = (questionNumber: number) => {
    setCurrentStep(getQuestionStep(questionNumber))
  }

  const handleSurveySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const isComplete = isAllQuestionsAnswered()
    setIsPartialSubmission(!isComplete)
    if (!isComplete) {
      setShowWarning(true)
      // Scroll to the warning message smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    setShowContactForm(true)
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateContactInfo()) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (errorData.code === "SURVEY_ALREADY_COMPLETED") {
          setShowDuplicateMessage(true)
          setShowContactForm(false)
          return
        }
        throw new Error("Failed to submit survey")
      }

      const result = await response.json()
      
      // Clear saved progress if survey is now 100% complete
      if (isAllQuestionsAnswered()) {
        // All questions answered, clearing saved progress
        localStorage.removeItem(STORAGE_KEY)
      } else {
        // Partial submission, keeping saved progress for future completion
      }
      
      // Redirect to confirmation page with completion status and update flag
      const params = new URLSearchParams({
        complete: String(!isPartialSubmission),
        updated: String(result.isUpdate || false),
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
        email: formData.email || ''
      })
      router.push(`/survey/confirmation?${params}`)
    } catch (error) {
      // Survey submission error
      alert("An error occurred while submitting the survey. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showDuplicateMessage) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-pool-navy mb-8 text-center text-shadow">
              Survey Already Completed
            </h2>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
              <div className="mb-8 p-6 bg-yellow-100 border-2 border-yellow-400 rounded-2xl flex items-center gap-3">
                <AlertCircle className="w-8 h-8 text-yellow-600 flex-shrink-0" />
                <div>
                  <p className="text-lg font-bold text-yellow-800">
                    You have already completed the survey.
                  </p>
                  <p className="text-yellow-700 mt-1">
                    Thank you for your previous submission! We appreciate your feedback.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={() => router.push("/")}
                  className="bg-pool-orange text-white font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform shadow-lg"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showContactForm) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold text-pool-navy mb-8 text-center text-shadow">
              Almost Done!
            </h2>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
              <div className="mb-8">
                {isPartialSubmission ? (
                  <>
                    <div className="mb-8 bg-yellow-100 border-2 border-yellow-400 rounded-2xl p-6">
                      <p className="text-lg font-bold text-yellow-800 flex items-center justify-center gap-2">
                        To unlock VIP access to our exclusive merch drop, please complete the remaining questions.
                      </p>
                      <p className="text-yellow-800 text-center mt-2">
                        {questionsAnswered} of {totalQuestions} questions answered
                      </p>
                    </div>
                    <div className="mb-8">
                      <p className="text-lg text-pool-navy mb-4 text-center text-shadow">
                        Thank you for taking the time to share your feedback!
                      </p>
                      <p className="text-sm text-pool-navy/80 mb-4 text-center">
                        You can still submit your responses now, or go back to complete all questions and unlock VIP access to our exclusive merch drop.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="mb-8">
                    <p className="text-lg text-pool-navy mb-4 text-center text-shadow">
                      Just need your contact info to secure your VIP access to our exclusive merch collection!
                    </p>
                    <p className="text-sm text-pool-navy/80 text-center">
                      You've completed all questions and unlocked VIP access to our exclusive merch drop!
                    </p>
                  </div>
                )}
              </div>

              <form onSubmit={handleFinalSubmit} className="space-y-6">
                <div>
                  <label className="block text-pool-navy font-bold mb-2 text-shadow">First Name</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => {
                      handleInputChange("firstName", e.target.value)
                      setContactErrors({ ...contactErrors, firstName: "" })
                    }}
                    className="w-full px-4 py-3 rounded-full border-2 border-pool-blue focus:border-pool-pink outline-none transition-colors"
                    placeholder="Enter your first name"
                  />
                  {contactErrors.firstName && (
                    <p className="text-red-500 text-sm mt-2">{contactErrors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-pool-navy font-bold mb-2 text-shadow">Last Name</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => {
                      handleInputChange("lastName", e.target.value)
                      setContactErrors({ ...contactErrors, lastName: "" })
                    }}
                    className="w-full px-4 py-3 rounded-full border-2 border-pool-blue focus:border-pool-pink outline-none transition-colors"
                    placeholder="Enter your last name"
                  />
                  {contactErrors.lastName && (
                    <p className="text-red-500 text-sm mt-2">{contactErrors.lastName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-pool-navy font-bold mb-2 text-shadow">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      handleInputChange("email", e.target.value)
                      setContactErrors({ ...contactErrors, email: "" })
                    }}
                    className="w-full px-4 py-3 rounded-full border-2 border-pool-blue focus:border-pool-pink outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                  {contactErrors.email && (
                    <p className="text-red-500 text-sm mt-2">{contactErrors.email}</p>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowContactForm(false)
                      setShowWarning(false)
                      if (isPartialSubmission) {
                        const firstUnanswered = findFirstUnansweredQuestion()
                        setCurrentStep(getQuestionStep(firstUnanswered))
                      } else {
                        setCurrentStep(1)
                      }
                    }}
                    className="w-full bg-pool-blue hover:bg-pool-blue/80 text-white font-bold py-3 px-6 rounded-full transition-all flex items-center justify-center gap-2"
                  >
                    <span>←</span>
                    {isPartialSubmission ? "Back to Unanswered Questions" : "Review My Answers"}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-pool-pink to-pool-purple hover:from-pool-purple hover:to-pool-pink text-white font-bold py-4 px-8 rounded-full text-lg transform hover:scale-105 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Submitting...
                      </div>
                    ) : (
                      isPartialSubmission ? "Submit Survey" : "Submit & Get My Offer"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-pool-navy font-bold mb-4 text-shadow text-lg">
                How often do you hang out with friends?
              </label>
              <div className="space-y-3">
                {["Daily", "A few times a week", "Once a week", "A few times a month", "Rarely"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center p-4 bg-white/30 rounded-2xl border-2 border-transparent hover:border-pool-blue cursor-pointer transition-all"
                  >
                    <input
                      type="radio"
                      name="hangoutFrequency"
                      value={option}
                      checked={formData.hangoutFrequency === option}
                      onChange={(e) => handleInputChange("hangoutFrequency", e.target.value)}
                      className="mr-3 w-5 h-5 text-pool-pink focus:ring-pool-pink"
                    />
                    <span className="text-pool-navy font-medium">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-pool-navy font-bold mb-4 text-shadow text-lg">
                On average, how much do you spend when you hang out?
              </label>
              <input
                type="number"
                value={formData.avgSpend}
                onChange={(e) => handleInputChange("avgSpend", e.target.value)}
                className="w-full px-4 py-3 rounded-full border-2 border-pool-blue focus:border-pool-pink outline-none transition-colors"
                placeholder="Enter amount in dollars"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-pool-navy font-bold mb-4 text-shadow text-lg">
                When you split expenses, who's it usually with?
              </label>
              <div className="space-y-3">
                {["Friends", "Family", "Coworkers", "Other"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center p-4 bg-white/30 rounded-2xl border-2 border-transparent hover:border-pool-blue cursor-pointer transition-all"
                  >
                    <input
                      type="radio"
                      name="splitWith"
                      value={option}
                      checked={formData.splitWith === option}
                      onChange={(e) => handleInputChange("splitWith", e.target.value)}
                      className="mr-3 w-5 h-5 text-pool-pink focus:ring-pool-pink"
                    />
                    <span className="text-pool-navy font-medium">{option}</span>
                  </label>
                ))}
              </div>
              {formData.splitWith === "Other" && (
                <input
                  type="text"
                  value={formData.splitWithOther}
                  onChange={(e) => handleInputChange("splitWithOther", e.target.value)}
                  className="w-full mt-3 px-4 py-3 rounded-full border-2 border-pool-blue focus:border-pool-pink outline-none transition-colors"
                  placeholder="Please specify..."
                />
              )}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-pool-navy font-bold mb-4 text-shadow text-lg">
                What kinds of things do you usually split? (check all that apply)
              </label>
              <div className="space-y-3">
                {[
                  "Food & drinks",
                  "Rent/bills",
                  "Entertainment (movies, concerts, games, etc.)",
                  "Vacations/trips",
                  "Other",
                ].map((option) => (
                  <label
                    key={option}
                    className="flex items-center p-4 bg-white/30 rounded-2xl border-2 border-transparent hover:border-pool-blue cursor-pointer transition-all"
                  >
                    <div className="mr-3">
                      {formData.splitTypes.includes(option) ? (
                        <CheckSquare className="w-5 h-5 text-pool-pink" />
                      ) : (
                        <Square className="w-5 h-5 text-pool-navy" />
                      )}
                    </div>
                    <input
                      type="checkbox"
                      value={option}
                      checked={formData.splitTypes.includes(option)}
                      onChange={() => handleCheckboxChange("splitTypes", option)}
                      className="sr-only"
                    />
                    <span className="text-pool-navy font-medium">{option}</span>
                  </label>
                ))}
              </div>
              {formData.splitTypes.includes("Other") && (
                <input
                  type="text"
                  value={formData.splitTypesOther}
                  onChange={(e) => handleInputChange("splitTypesOther", e.target.value)}
                  className="w-full mt-3 px-4 py-3 rounded-full border-2 border-pool-blue focus:border-pool-pink outline-none transition-colors"
                  placeholder="Please specify..."
                />
              )}
            </div>

            <div>
              <label className="block text-pool-navy font-bold mb-4 text-shadow text-lg">
                How often do you split payments with others?
              </label>
              <div className="space-y-3">
                {["Daily", "A few times a week", "Once a week", "A few times a month", "Rarely"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center p-4 bg-white/30 rounded-2xl border-2 border-transparent hover:border-pool-blue cursor-pointer transition-all"
                  >
                    <input
                      type="radio"
                      name="splitFrequency"
                      value={option}
                      checked={formData.splitFrequency === option}
                      onChange={(e) => handleInputChange("splitFrequency", e.target.value)}
                      className="mr-3 w-5 h-5 text-pool-pink focus:ring-pool-pink"
                    />
                    <span className="text-pool-navy font-medium">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-pool-navy font-bold mb-4 text-shadow text-lg">
                How often do you end up with IOUs (someone owes you / you owe someone)?
              </label>
              <div className="space-y-3">
                {["All the time", "Occasionally", "Rarely", "Never"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center p-4 bg-white/30 rounded-2xl border-2 border-transparent hover:border-pool-blue cursor-pointer transition-all"
                  >
                    <input
                      type="radio"
                      name="iouFrequency"
                      value={option}
                      checked={formData.iouFrequency === option}
                      onChange={(e) => handleInputChange("iouFrequency", e.target.value)}
                      className="mr-3 w-5 h-5 text-pool-pink focus:ring-pool-pink"
                    />
                    <span className="text-pool-navy font-medium">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-pool-navy font-bold mb-4 text-shadow text-lg">
                Do group expenses ever cause tension or awkwardness?
              </label>
              <div className="space-y-3">
                {["Yes, a lot", "Sometimes", "Rarely", "Never"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center p-4 bg-white/30 rounded-2xl border-2 border-transparent hover:border-pool-blue cursor-pointer transition-all"
                  >
                    <input
                      type="radio"
                      name="causesTension"
                      value={option}
                      checked={formData.causesTension === option}
                      onChange={(e) => handleInputChange("causesTension", e.target.value)}
                      className="mr-3 w-5 h-5 text-pool-pink focus:ring-pool-pink"
                    />
                    <span className="text-pool-navy font-medium">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-pool-navy font-bold mb-4 text-shadow text-lg">
                What do you currently use to manage group expenses?
              </label>
              <textarea
                value={formData.currentTool}
                onChange={(e) => handleInputChange("currentTool", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-2xl border-2 border-pool-blue focus:border-pool-pink outline-none transition-colors resize-none"
                placeholder="e.g., Venmo, cash, spreadsheets, nothing specific..."
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-pool-navy font-bold mb-4 text-shadow text-lg">
                What do you like/dislike about your current method?
              </label>
              <textarea
                value={formData.toolLikes}
                onChange={(e) => handleInputChange("toolLikes", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-2xl border-2 border-pool-blue focus:border-pool-pink outline-none transition-colors resize-none"
                placeholder="Tell us what works and what doesn't..."
              />
            </div>

            <div>
              <label className="block text-pool-navy font-bold mb-4 text-shadow text-lg">
                What would you change (add/remove features)?
              </label>
              <textarea
                value={formData.toolChanges}
                onChange={(e) => handleInputChange("toolChanges", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-2xl border-2 border-pool-blue focus:border-pool-pink outline-none transition-colors resize-none"
                placeholder="Your ideal features..."
              />
            </div>

            <div>
              <label className="block text-pool-navy font-bold mb-4 text-shadow text-lg">
                Would you try a new app that fixes those issues? Why or why not?
              </label>
              <textarea
                value={formData.tryNewApp}
                onChange={(e) => handleInputChange("tryNewApp", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-2xl border-2 border-pool-blue focus:border-pool-pink outline-none transition-colors resize-none"
                placeholder="Share your thoughts..."
              />
            </div>

            <div>
              <label className="block text-pool-navy font-bold mb-4 text-shadow text-lg">
                Would prefunding with your group before an event make the experience better?
              </label>
              <div className="space-y-3">
                {["Yes", "No"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center p-4 bg-white/30 rounded-2xl border-2 border-transparent hover:border-pool-blue cursor-pointer transition-all"
                  >
                    <input
                      type="radio"
                      name="prefunding"
                      value={option}
                      checked={formData.prefunding === option}
                      onChange={(e) => handleInputChange("prefunding", e.target.value)}
                      className="mr-3 w-5 h-5 text-pool-pink focus:ring-pool-pink"
                    />
                    <span className="text-pool-navy font-medium">{option}</span>
                  </label>
                ))}
              </div>
              {formData.prefunding && (
                <input
                  type="text"
                  value={formData.prefundingWhy}
                  onChange={(e) => handleInputChange("prefundingWhy", e.target.value)}
                  className="w-full mt-3 px-4 py-3 rounded-full border-2 border-pool-blue focus:border-pool-pink outline-none transition-colors"
                  placeholder="Why?"
                />
              )}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-pool-navy font-bold mb-4 text-shadow text-lg">
                Are any of these features valuable? (check all that apply)
              </label>
              <div className="space-y-3">
                {[
                  "Auto-tracking expenses",
                  "Instant pay/settle up",
                  "Virtual cards for each group member",
                  "Reminders",
                  "Eliminating Calculations",
                  "None of the above",
                ].map((option) => (
                  <label
                    key={option}
                    className="flex items-center p-4 bg-white/30 rounded-2xl border-2 border-transparent hover:border-pool-blue cursor-pointer transition-all"
                  >
                    <div className="mr-3">
                      {formData.valuableFeatures.includes(option) ? (
                        <CheckSquare className="w-5 h-5 text-pool-pink" />
                      ) : (
                        <Square className="w-5 h-5 text-pool-navy" />
                      )}
                    </div>
                    <input
                      type="checkbox"
                      value={option}
                      checked={formData.valuableFeatures.includes(option)}
                      onChange={() => handleCheckboxChange("valuableFeatures", option)}
                      className="sr-only"
                    />
                    <span className="text-pool-navy font-medium">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-pool-navy font-bold mb-4 text-shadow text-lg">
                If a new app existed for this, what would your concerns be?
              </label>
              <textarea
                value={formData.concerns}
                onChange={(e) => handleInputChange("concerns", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-2xl border-2 border-pool-blue focus:border-pool-pink outline-none transition-colors resize-none"
                placeholder="Share your concerns..."
              />
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-pool-navy mb-8 text-center text-shadow">
            Survey
          </h1>

          {/* VIP access banner */}
          <div className="bg-gradient-to-r from-pool-pink to-pool-purple rounded-3xl p-6 mb-8 text-white shadow-xl">
            <div className="flex items-center justify-center space-x-3">
              <Gift className="w-8 h-8 animate-bounce" />
              <p className="text-lg font-bold text-center text-shadow">
                Complete this survey and unlock VIP access to our exclusive merch collection once you submit!
              </p>
              <Gift className="w-8 h-8 animate-bounce" />
            </div>
          </div>

          {/* Warning message for partial submission */}
          {showWarning && (
            <div className="mb-8 bg-yellow-100 border-2 border-yellow-400 rounded-3xl p-6">
              <p className="text-lg font-bold text-yellow-800 flex items-center justify-center gap-2">
                To unlock VIP access to our exclusive merch drop, please complete the remaining questions.
              </p>
              <p className="text-yellow-800 text-center mt-2">
                {questionsAnswered} of {totalQuestions} questions answered
              </p>
            </div>
          )}

          {/* Progress indicator */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="text-pool-navy font-bold text-lg">
                  {questionsAnswered} of {totalQuestions} questions answered
                </span>
                <span className="text-pool-navy font-bold text-lg">
                  {Math.round((questionsAnswered / totalQuestions) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-pool-blue to-pool-pink h-full rounded-full transition-all duration-300"
                  style={{ width: `${(questionsAnswered / totalQuestions) * 100}%` }}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowProgress(!showProgress)}
              className="ml-4 p-2 rounded-full bg-white/30 hover:bg-white/40 transition-all"
              title="Show/Hide Progress Details"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-pool-navy"
              >
                <path d="M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h7.5"/>
                <path d="M16 2v4"/>
                <path d="M8 2v4"/>
                <path d="M3 10h18"/>
                <path d="M18 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                <path d="m22 22-1.5-1.5"/>
              </svg>
            </button>
          </div>

          {/* Progress Details Popup */}
          {showProgress && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
              <div className="bg-white rounded-3xl p-6 shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-pool-navy">Question Progress</h3>
                  <button
                    onClick={() => setShowProgress(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-pool-navy"
                    >
                      <path d="M18 6 6 18"/>
                      <path d="m6 6 12 12"/>
                    </svg>
                  </button>
                </div>
                <div className="grid gap-3">
                  {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((questionNumber) => {
                    const isAnswered = isQuestionAnswered(questionNumber)
                    return (
                      <button
                        key={questionNumber}
                        onClick={() => {
                          setCurrentStep(getQuestionStep(questionNumber))
                          setShowProgress(false)
                        }}
                        className={`p-3 rounded-xl text-left flex items-center gap-2 transition-all ${
                          isAnswered
                            ? "bg-pool-blue/10 text-pool-blue hover:bg-pool-blue/20"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        }`}
                      >
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                          isAnswered ? "bg-pool-blue text-white" : "bg-yellow-400 text-yellow-900"
                        }`}>
                          {questionNumber}
                        </span>
                        <span className="text-sm font-medium truncate">
                          {isAnswered ? "Completed" : "Not Answered"}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {isAllQuestionsAnswered() && currentStep < totalSteps && (
            <div className="mb-8 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setShowContactForm(true)
                  setIsPartialSubmission(false)
                }}
                className="bg-gradient-to-r from-pool-green to-pool-blue text-white font-bold py-3 px-8 rounded-full text-lg transform hover:scale-105 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Gift className="w-5 h-5" />
                Submit Now & Get VIP Access
              </button>
            </div>
          )}

          {/* Form content */}
          <form onSubmit={handleSurveySubmit} className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30">
            {renderStep()}

            {/* Navigation buttons */}
            <div className="mt-8 flex justify-between">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="bg-gray-300 hover:bg-gray-400 text-pool-navy font-bold py-3 px-6 rounded-full transition-all"
                >
                  Previous
                </button>
              )}
              
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto bg-gradient-to-r from-pool-blue to-pool-pink hover:from-pool-pink hover:to-pool-blue text-white font-bold py-3 px-8 rounded-full flex items-center gap-2 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
                >
                  Next
                  <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="ml-auto bg-gradient-to-r from-pool-pink to-pool-purple hover:from-pool-purple hover:to-pool-pink text-white font-bold py-3 px-8 rounded-full transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
                >
                  Submit Survey
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}