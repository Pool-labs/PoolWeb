import Image from "next/image"
import { Apple, Play } from "lucide-react"

export default function DownloadPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Image src="/images/pool-logo-new.png" alt="POOL Logo" width={150} height={150} className="mx-auto" />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-pool-navy mb-6 font-doodle">{"Download POOL!"}</h1>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12">
            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all border border-white/30">
              <Apple size={60} className="text-pool-navy mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-pool-navy mb-4 font-doodle">iOS App Store</h3>
              <button className="bg-pool-blue hover:bg-pool-navy text-white font-bold py-4 px-8 rounded-full text-lg w-full transition-all">
                {"Coming Soon!"}
              </button>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-xl transform hover:scale-105 transition-all border border-white/30">
              <Play size={60} className="text-pool-green mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-pool-navy mb-4 font-doodle">Google Play Store</h3>
              <button className="bg-pool-green hover:bg-pool-navy text-white font-bold py-4 px-8 rounded-full text-lg w-full transition-all">
                {"Coming Soon!"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
