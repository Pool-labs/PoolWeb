"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="bg-white/95 backdrop-blur-md border-b-4 border-pool-navy shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 hover:scale-105 transition-transform">
            <Image
              src="/images/pool-logo-new.png"
              alt="POOL Logo"
              width={40}
              height={40}
              className="sm:w-[50px] sm:h-[50px]"
            />
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-600 via-orange-600 via-yellow-600 via-green-600 via-blue-600 to-purple-600 bg-[length:300%_100%] bg-clip-text text-transparent sm:animate-gradient-x">
              POOL
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
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

          {/* Mobile Menu Button */}
          <button className="md:hidden text-pool-navy" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-pool-blue">
            <div className="flex flex-col space-y-4 pt-4">
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
        )}
      </div>
    </header>
  )
}
