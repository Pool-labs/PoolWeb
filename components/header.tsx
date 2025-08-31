"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-14 sm:h-16 flex items-center">
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/pool-logo-new.png"
              alt="POOL Logo"
              width={36}
              height={36}
              className="sm:w-[44px] sm:h-[44px]"
            />
            <span className="text-2xl sm:text-3xl font-bold text-pool-purple">
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
          <button 
            className="md:hidden p-2 -mr-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} color="#1f2937" /> : <Menu size={24} color="#1f2937" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Outside container for full width */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
          <div className="py-2">
            <Link 
              href="/" 
              className="block px-4 py-3 text-gray-900 font-medium text-base active:bg-gray-100" 
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              href="/download"
              className="block px-4 py-3 text-gray-900 font-medium text-base active:bg-gray-100"
              onClick={closeMenu}
            >
              Download
            </Link>
            <Link 
              href="/faq" 
              className="block px-4 py-3 text-gray-900 font-medium text-base active:bg-gray-100" 
              onClick={closeMenu}
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-3 text-gray-900 font-medium text-base active:bg-gray-100"
              onClick={closeMenu}
            >
              Contact
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
