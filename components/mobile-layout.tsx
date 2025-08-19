"use client"

import type React from "react"

import Link from "next/link"
import { Home, Wallet, Plus, Send } from "lucide-react"
import { usePathname } from "next/navigation"

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="mobile-container">
      {children}

      <nav className="bottom-nav">
        <Link href="/" className={`bottom-nav-item ${pathname === "/" ? "active" : ""}`}>
          <Home className="bottom-nav-item-icon" />
          <span className="bottom-nav-item-text">Pools</span>
        </Link>
        <Link href="/create" className={`bottom-nav-item ${pathname === "/create" ? "active" : ""}`}>
          <Plus className="bottom-nav-item-icon" />
          <span className="bottom-nav-item-text">Create</span>
        </Link>
        <Link href="/wallet" className={`bottom-nav-item ${pathname === "/wallet" ? "active" : ""}`}>
          <Wallet className="bottom-nav-item-icon" />
          <span className="bottom-nav-item-text">Wallet</span>
        </Link>
        <Link href="/pay" className={`bottom-nav-item ${pathname === "/pay" ? "active" : ""}`}>
          <Send className="bottom-nav-item-icon" />
          <span className="bottom-nav-item-text">Pay</span>
        </Link>
      </nav>
    </div>
  )
}
