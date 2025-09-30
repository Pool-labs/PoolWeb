import Image from "next/image"
import Link from "next/link"
import { Download, Plus, CreditCard, Smartphone, ClipboardList } from "lucide-react"
import FeaturesCarousel from "@/components/features-carousel"
import HowItWorksCarousel from "@/components/how-it-works-carousel"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center relative">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="mb-8">
            <Image src="/images/pool-logo-new.png" alt="POOL Logo" width={200} height={200} className="mx-auto" />
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-pool-navy mb-6">
            Pool. Tap. Done.
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-pool-navy mb-8 tracking-wide">Group Funds Made Simple</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/download"
              className="bg-gradient-to-r from-pool-pink via-pool-purple to-pool-blue hover:from-pool-blue hover:to-pool-pink text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full text-lg sm:text-xl transform hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Download size={24} />
              Download Now!
            </Link>
            <Link
              href="/survey"
              className="bg-gradient-to-r from-pool-green to-pool-blue hover:from-pool-blue hover:to-pool-green text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full text-lg sm:text-xl transform hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <ClipboardList size={24} />
              Take the Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 sm:mb-12 md:mb-16 text-pool-navy flex w-full items-baseline justify-center gap-1 sm:gap-2 tracking-tight">
            <span className="bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">WTF</span>
            <span className="text-pool-navy leading-none">Is Pool?!</span>
          </h2>

          <FeaturesCarousel />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-pool-navy mb-8 sm:mb-12 md:mb-16">{"How It Works"}</h2>

          <HowItWorksCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-white/20 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border border-white/30">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-pool-navy mb-4 sm:mb-6">{"Ready to Jump In?"}</h2>
            <p className="text-xl text-pool-navy mb-8">
              {"Stop worrying about receipts, notes, and calculations. Start enjoying your time with friends!"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/download"
                className="bg-gradient-to-r from-pool-pink to-pool-purple hover:from-pool-purple hover:to-pool-pink text-white font-bold py-4 px-8 sm:py-6 sm:px-12 rounded-full text-xl sm:text-2xl transform hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-3"
              >
                <Download size={28} />
                {"Get POOL Now!"}
              </Link>
              <Link
                href="/survey"
                className="bg-gradient-to-r from-pool-green to-pool-blue hover:from-pool-blue hover:to-pool-green text-white font-bold py-4 px-8 sm:py-6 sm:px-12 rounded-full text-xl sm:text-2xl transform hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-3"
              >
                <ClipboardList size={28} />
                {"Take The Quiz"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
