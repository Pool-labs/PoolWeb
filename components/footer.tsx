import Image from "next/image"

export default function Footer() {
  return (
    <footer className="relative overflow-hidden py-12 border-t border-white/10">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Image src="/images/pool-logo-new.png" alt="POOL Logo" width={50} height={50} />
            <span className="text-4xl font-bold text-pool-navy">POOL</span>
          </div>
          <p className="text-pool-navy text-xl mb-6 max-w-2xl mx-auto">
            {"Payments between friends as simple as they should be. No more IOUs, just simple group spending."}
          </p>
          <p className="text-sm text-pool-navy/70">{"© 2025 POOL App. All rights reserved."}</p>
        </div>
      </div>
    </footer>
  )
}
