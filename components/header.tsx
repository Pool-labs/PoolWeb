"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 bg-white/30 backdrop-blur-xl border-b border-white/20 shadow-lg supports-[backdrop-filter]:bg-white/40">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center space-x-3 ">
            <Image
              src="/images/pool-logo-new.png"
              alt="POOL Logo"
              width={40}
              height={40}
              className="w-[32px] h-[32px] sm:w-[50px] sm:h-[50px]"
            />
            <span className="absolute left-1/2 -translate-x-1/2 md:static md:transform-none text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-600 via-orange-600 via-yellow-600 via-green-600 via-blue-600 to-purple-600 bg-[length:300%_100%] bg-clip-text text-transparent">
              POOL
            </span>
          </div>
          <button className="md:hidden text-pool-navy w-10 h-10 flex items-center justify-center" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:ml-auto space-x-8">
            <Link
              href="/"
              className="text-pool-navy hover:text-pool-pink font-bold text-lg transition-colors hover:scale-110 transform"
            >
              Home
            </Link>
            <Link
              href="/download"
              className="text-pool-navy hover:text-pool-pink font-bold text-lg transition-colors hover:scale-110 transform"
            >
              Download
            </Link>
            <Link
              href="/preregister"
              className="text-pool-navy hover:text-pool-pink font-bold text-lg transition-colors hover:scale-110 transform"
            >
              Pre-Register
            </Link>
            <Link
              href="/survey"
              className="text-pool-navy hover:text-pool-pink font-bold text-lg transition-colors hover:scale-110 transform"
            >
              Survey
            </Link>
            <Link
              href="/faq"
              className="text-pool-navy hover:text-pool-pink font-bold text-lg transition-colors hover:scale-110 transform"
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="text-pool-navy hover:text-pool-pink font-bold text-lg transition-colors hover:scale-110 transform"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <nav className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col space-y-3 py-4 border-t border-white/20">
              <Link href="/" className="text-pool-navy hover:text-pool-pink font-bold text-lg" onClick={closeMenu}>
                Home
              </Link>
              <Link
                href="/download"
                className="text-pool-navy hover:text-pool-pink font-bold text-lg"
                onClick={closeMenu}
              >
                Download
              </Link>
              <Link
                href="/preregister"
                className="text-pool-navy hover:text-pool-pink font-bold text-lg"
                onClick={closeMenu}
              >
                Pre-Register
              </Link>
              <Link href="/survey" className="text-pool-navy hover:text-pool-pink font-bold text-lg" onClick={closeMenu}>
                Survey
              </Link>
              <Link href="/faq" className="text-pool-navy hover:text-pool-pink font-bold text-lg" onClick={closeMenu}>
                FAQ
              </Link>
              <Link
                href="/contact"
                className="text-pool-navy hover:text-pool-pink font-bold text-lg"
                onClick={closeMenu}
              >
                Contact
              </Link>
            </div>
          </nav>
      </div>
    </header>
  )
}
