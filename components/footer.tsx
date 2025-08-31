import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-pool-navy/80 backdrop-blur-sm text-white py-12 relative overflow-hidden border-t border-white/20">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Image src="/images/pool-logo-new.png" alt="POOL Logo" width={50} height={50} />
            <span className="text-4xl font-bold">POOL</span>
          </div>
          <p className="text-pool-blue text-xl mb-6 max-w-2xl mx-auto">
            {"Payments between friends as simple as they should be. No more IOUs, just simple group spending."}
          </p>
          <p className="text-sm text-pool-blue">{"© 2025 POOL App. All rights reserved."}</p>
        </div>
      </div>
    </footer>
  )
}
