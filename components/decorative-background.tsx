"use client"

import { useEffect, useState } from "react"

export default function DecorativeBackground() {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!mounted) return null

  // Always render full decorative background, including on mobile

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" style={{ backgroundColor: 'white' }}>
      {/* Large Corner Circles - Extended for full coverage */}

      {/* Pink Circle - Top Left */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[100px] opacity-70 animate-float"
        style={{
          background: "radial-gradient(circle, #FF1493 0%, #FF69B4 30%, #FFB6C1 60%, #FFC0CB 80%, transparent 100%)",
          left: "-25%",
          top: "-25%",
          animationDuration: "12s",
        }}
      />

      {/* Orange Circle - Top Right */}
      <div
        className="absolute w-[750px] h-[750px] rounded-full blur-[120px] opacity-75 animate-float"
        style={{
          background: "radial-gradient(circle, #FF4500 0%, #FF8C00 30%, #FFA500 60%, #FFD700 80%, transparent 100%)",
          right: "-30%",
          top: "-20%",
          animationDuration: "15s",
          animationDelay: "2s",
        }}
      />

      {/* Blue Circle - Bottom Right */}
      <div
        className="absolute w-[850px] h-[850px] rounded-full blur-[110px] opacity-65 animate-float"
        style={{
          background: "radial-gradient(circle, #0080FF 0%, #4FC3F7 30%, #87CEEB 60%, #B0E0E6 80%, transparent 100%)",
          right: "-35%",
          bottom: "-30%",
          animationDuration: "18s",
          animationDelay: "4s",
        }}
      />

      {/* Yellow Circle - Bottom Left */}
      <div
        className="absolute w-[780px] h-[780px] rounded-full blur-[90px] opacity-80 animate-float"
        style={{
          background: "radial-gradient(circle, #FFD700 0%, #FFFF00 30%, #FFFFE0 60%, #FFFACD 80%, transparent 100%)",
          left: "-20%",
          bottom: "-25%",
          animationDuration: "14s",
          animationDelay: "1s",
        }}
      />

      {/* Fill-in Circles for Complete Coverage */}

      {/* Top Center Fill */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[80px] opacity-60 animate-pulse"
        style={{
          background: "radial-gradient(circle, #FF69B4 0%, #FF8C00 40%, #FFD700 70%, transparent 100%)",
          left: "25%",
          top: "-15%",
          animationDuration: "8s",
        }}
      />

      {/* Right Center Fill */}
      <div
        className="absolute w-[550px] h-[550px] rounded-full blur-[95px] opacity-55 animate-pulse"
        style={{
          background: "radial-gradient(circle, #FF8C00 0%, #4FC3F7 40%, #FF69B4 70%, transparent 100%)",
          right: "-10%",
          top: "30%",
          animationDuration: "10s",
          animationDelay: "3s",
        }}
      />

      {/* Bottom Center Fill */}
      <div
        className="absolute w-[650px] h-[650px] rounded-full blur-[75px] opacity-65 animate-pulse"
        style={{
          background: "radial-gradient(circle, #4FC3F7 0%, #FFFF00 40%, #FF1493 70%, transparent 100%)",
          left: "30%",
          bottom: "-20%",
          animationDuration: "12s",
          animationDelay: "5s",
        }}
      />

      {/* Left Center Fill */}
      <div
        className="absolute w-[580px] h-[580px] rounded-full blur-[85px] opacity-70 animate-pulse"
        style={{
          background: "radial-gradient(circle, #FFFF00 0%, #FF1493 40%, #0080FF 70%, transparent 100%)",
          left: "-15%",
          top: "25%",
          animationDuration: "9s",
          animationDelay: "2s",
        }}
      />

      {/* Center Coverage Circles */}

      {/* Main Center Circle */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[70px] opacity-50 animate-float"
        style={{
          background: "radial-gradient(circle, #FF69B4 0%, #FF8C00 25%, #4FC3F7 50%, #FFFF00 75%, transparent 100%)",
          left: "35%",
          top: "30%",
          animationDuration: "16s",
          animationDelay: "1s",
        }}
      />

      {/* Upper Mid Fill */}
      <div
        className="absolute w-[450px] h-[450px] rounded-full blur-[60px] opacity-45 animate-pulse"
        style={{
          background: "radial-gradient(circle, #0080FF 0%, #FFD700 50%, transparent 100%)",
          left: "50%",
          top: "10%",
          animationDuration: "11s",
          animationDelay: "4s",
        }}
      />

      {/* Lower Mid Fill */}
      <div
        className="absolute w-[480px] h-[480px] rounded-full blur-[65px] opacity-55 animate-pulse"
        style={{
          background: "radial-gradient(circle, #FF8C00 0%, #FF1493 50%, transparent 100%)",
          left: "45%",
          bottom: "15%",
          animationDuration: "13s",
          animationDelay: "6s",
        }}
      />

      {/* Additional Gap Fillers */}

      {/* Top Left Mid */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[55px] opacity-40 animate-float"
        style={{
          background: "radial-gradient(circle, #FF69B4 0%, #FFFF00 60%, transparent 100%)",
          left: "10%",
          top: "5%",
          animationDuration: "14s",
          animationDelay: "3s",
        }}
      />

      {/* Top Right Mid */}
      <div
        className="absolute w-[420px] h-[420px] rounded-full blur-[58px] opacity-42 animate-float"
        style={{
          background: "radial-gradient(circle, #FF8C00 0%, #4FC3F7 60%, transparent 100%)",
          right: "15%",
          top: "8%",
          animationDuration: "15s",
          animationDelay: "7s",
        }}
      />

      {/* Bottom Left Mid */}
      <div
        className="absolute w-[460px] h-[460px] rounded-full blur-[62px] opacity-48 animate-float"
        style={{
          background: "radial-gradient(circle, #FFFF00 0%, #FF1493 60%, transparent 100%)",
          left: "8%",
          bottom: "10%",
          animationDuration: "17s",
          animationDelay: "2s",
        }}
      />

      {/* Bottom Right Mid */}
      <div
        className="absolute w-[440px] h-[440px] rounded-full blur-[60px] opacity-45 animate-float"
        style={{
          background: "radial-gradient(circle, #4FC3F7 0%, #FFD700 60%, transparent 100%)",
          right: "12%",
          bottom: "8%",
          animationDuration: "19s",
          animationDelay: "5s",
        }}
      />
    </div>
  )
}
