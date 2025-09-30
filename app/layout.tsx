import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "./mobile.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import DecorativeBackground from "@/components/decorative-background"
import ScrollToTop from "@/components/scroll-to-top"
import { ThemeProvider } from "@/components/theme-provider"
import MobileInit from "@/components/mobile-init"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pool - Group Funds Made Simple",
  description:
    "Split payments for group activities effortlessly. No more IOUs, receipts, or complicated calculations. Just deposit, tap, and enjoy!",
  icons: {
    icon: "/images/pool-logo-new.png"
  },
  generator: 'v0.app',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#020817' }
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white min-h-screen relative overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <MobileInit />
          {/* Fixed white background layer */}
          <div className="fixed inset-0 bg-white" style={{ zIndex: -10 }} />
          <DecorativeBackground />
          <ScrollToTop />
          <div className="relative z-10 bg-white min-h-screen">
            <Header />
            <main className="bg-white">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
