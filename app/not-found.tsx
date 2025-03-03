"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Skull } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DoomNotifications } from "../components/doom-notification"

export default function NotFound() {
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    // Show the notification after a short delay
    const timer = setTimeout(() => {
      setShowNotification(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-yellow-900/20" />

      {/* Glitch effect overlay */}
      <div className="absolute inset-0 opacity-50 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-yellow-500/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: 0,
              animation: `glitch-line ${Math.random() * 3 + 2}s infinite ${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 p-4">
        <Skull className="w-24 h-24 text-yellow-500 animate-pulse" />

        <h1 className="text-6xl md:text-8xl font-bold text-yellow-500 glitch-text">404</h1>

        <p className="text-xl md:text-2xl text-yellow-400/80 text-center max-w-md doom-text">
          THIS REALM HAS BEEN CONSUMED BY THE VOID
        </p>

        <Button
          asChild
          className="mt-4 bg-yellow-900/80 hover:bg-yellow-800 text-yellow-100 border border-yellow-700/50"
        >
          <Link href="/">RETURN TO SAFETY</Link>
        </Button>
      </div>

      {/* Custom Doom Notification */}
      <DoomNotifications
  notifications={
    showNotification
      ? [{ id: "1", title: "Warning", message: "LOCATION NOT FOUND IN THIS DIMENSION", type: "warning", timestamp: new Date() }]
      : []
  }
  onDismiss={() => setShowNotification(false)}
/>

    </div>
  )
}

