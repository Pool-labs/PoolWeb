import Image from "next/image"
import Link from "next/link"
import { Apple, Play, Bell } from "lucide-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAppStoreIos, faGooglePlay} from '@fortawesome/free-brands-svg-icons'

export default function DownloadPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Image src="/images/pool-logo-new.png" alt="POOL Logo" width={150} height={150} className="mx-auto" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-pool-navy mb-6">{"Download POOL!"}</h1>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">

            {/* Pre-Register Section */}
            <div >
              <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all border border-white/30 h-[400px]">
                <div className="flex items-center justify-center mb-4">
                  <Bell className="w-8 h-8 text-pool-navy" />
                </div>
                <h2 className="text-2xl font-bold text-pool-navy mb-4">Get Notified When We Launch!</h2>
                <p className="text-pool-navy/80 mb-6">
                  Be the first to know when POOL is available for download. Join our pre-registeration list for exclusive early access.
                </p>
                <Link href="/preregister">
                  <button className="bg-gradient-to-r from-pool-pink to-pool-yellow hover:from-pool-yellow hover:to-pool-pink text-white font-bold py-4 px-8 rounded-full text-lg w-full transition-all transform hover:scale-105 shadow-lg">
                    Pre-Register Now
                  </button>
                </Link>
              </div>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all border border-white/30 h-[400px]">
              <div className="flex justify-center gap-4 mb-4">
                <FontAwesomeIcon icon={faAppStoreIos} className="h-12" />
                <FontAwesomeIcon icon={faGooglePlay} className="h-12" />
              </div>
              <h3 className="text-2xl font-bold text-pool-navy mb-4">Coming Soon!</h3>
              <p className="text-lg text-pool-navy mb-4">Our app will be available on both the iOS App Store and Google Play Store soon. Stay tuned!</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
