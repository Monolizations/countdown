"use client"

import { useEffect, useState } from "react"
import CountdownTimer from "@/components/countdown-timer"
import AudioPlayer from "@/components/audio-player"
import LastMessageForm from "@/components/last-message-form"
import LastMessages from "@/components/last-messages"
import { DoomNotifications } from "@/components/ui/doom-notification"
import { useNotifications } from "@/hooks/use-notifications"

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const [refreshMessages, setRefreshMessages] = useState(0)
  const { notifications, addNotification, dismissNotification } = useNotifications()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleMessageSaved = () => {
    setRefreshMessages((prev) => prev + 1)
  }

  if (!isClient) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="animate-pulse text-yellow-500 text-xl mb-4">INITIALIZING DOOM SEQUENCE...</div>
        <div className="w-24 h-1 bg-yellow-900/50 rounded">
          <div className="w-1/2 h-full bg-yellow-500 rounded animate-[loading_1s_ease-in-out_infinite]"></div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-black overflow-hidden py-8 px-4">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-yellow-900/20"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-500 mb-8 text-center glitch-text">
          COUNTDOWN TO DOOM
        </h1>

        <CountdownTimer targetDate="March 17, 2025 00:00:00" />

        <AudioPlayer />

        <div className="w-full mt-12 grid gap-8 md:grid-cols-2">
          <LastMessageForm onMessageSaved={handleMessageSaved} addNotification={addNotification} />
          <LastMessages refreshTrigger={refreshMessages} />
        </div>
      </div>

      <DoomNotifications notifications={notifications} onDismiss={dismissNotification} />
    </main>
  )
}

