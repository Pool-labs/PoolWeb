"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design-PWvrHDVJJVKCv2fq9OMAxrylkF7vbB.png"
              width={32}
              height={32}
              alt="Pool Logo"
            />
            <span className="text-2xl font-bold text-primary">Pool</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/#features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </Link>
            <Link href="/#how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
              How It Works
            </Link>
            <Link href="/faq" className="text-sm font-medium transition-colors hover:text-primary">
              FAQ
            </Link>
            <Link href="/privacy" className="text-sm font-medium transition-colors hover:text-primary">
              Privacy
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex items-center gap-4">
            <ModeToggle />
            <Button>Download App</Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden border-t bg-background/95 backdrop-blur">
          <div className="container flex flex-col space-y-4 py-4">
            <Link
              href="/#features"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={closeMenu}
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={closeMenu}
            >
              How It Works
            </Link>
            <Link href="/faq" className="text-sm font-medium transition-colors hover:text-primary" onClick={closeMenu}>
              FAQ
            </Link>
            <Link
              href="/privacy"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={closeMenu}
            >
              Privacy
            </Link>
            <div className="flex items-center gap-4 pt-2">
              <ModeToggle />
              <Button onClick={closeMenu}>Download App</Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
