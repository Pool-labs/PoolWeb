import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import DecorativeBackground from "@/components/decorative-background"
import ScrollToTop from "@/components/scroll-to-top"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pool - Group Funds Made Simple",
  description:
    "Split payments for group activities effortlessly. No more IOUs, receipts, or complicated calculations. Just deposit, tap, and enjoy!",
  icons: {
    icon: "/images/pool-logo-new.png"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white min-h-screen relative`}>
        <DecorativeBackground />
        <ScrollToTop />
        <div className="relative z-10">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
