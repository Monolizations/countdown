"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Audio URLs - you can replace these with your preferred tracks
const AUDIO_URLS = {
  countdown: "https://cdn.pixabay.com/audio/2022/03/09/audio_69cb14863d.mp3", // Replace with your URL
  doom: "https://cdn.pixabay.com/audio/2024/05/31/audio_ab9337a0f2.mp3", // Replace with your URL
}

export default function AudioPlayer() {
  const [isMuted, setIsMuted] = useState(false)
  const [isExpired, setIsExpired] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const countdownAudioRef = useRef<HTMLAudioElement | null>(null)
  const doomAudioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Check if the target date has passed
    const targetDate = new Date("March 17, 2025 00:00:00").getTime()
    const now = new Date().getTime()
    const isDateExpired = now >= targetDate

    setIsExpired(isDateExpired)

    // Initialize audio elements
    if (typeof Audio !== "undefined") {
      try {
        countdownAudioRef.current = new Audio(AUDIO_URLS.countdown)
        doomAudioRef.current = new Audio(AUDIO_URLS.doom)

        const audioToUse = isDateExpired ? doomAudioRef.current : countdownAudioRef.current

        if (audioToUse) {
          audioToUse.loop = true
          audioToUse.volume = 0.3

          // Handle autoplay
          const playAudio = async () => {
            try {
              await audioToUse.play()
              setIsPlaying(true)
              setError(null)
            } catch (err) {
              console.log("Autoplay prevented:", err)
              setError("Click to enable audio")
            }
          }

          // Try to play automatically
          playAudio()

          // Also try to play on first interaction
          const handleFirstInteraction = () => {
            if (!isPlaying) {
              playAudio()
            }
            document.removeEventListener("click", handleFirstInteraction)
          }
          document.addEventListener("click", handleFirstInteraction)
        }
      } catch (err) {
        console.error("Error initializing audio:", err)
        setError("Failed to load audio")
      }
    }

    return () => {
      if (countdownAudioRef.current) {
        countdownAudioRef.current.pause()
      }
      if (doomAudioRef.current) {
        doomAudioRef.current.pause()
      }
      document.removeEventListener("click", () => {})
    }
  }, [isPlaying])

  const toggleMute = () => {
    const audioToUse = isExpired ? doomAudioRef.current : countdownAudioRef.current

    if (audioToUse) {
      audioToUse.muted = !isMuted
      if (!isMuted && !isPlaying) {
        audioToUse
          .play()
          .then(() => {
            setIsPlaying(true)
            setError(null)
          })
          .catch((err) => {
            console.error("Error playing audio:", err)
            setError("Failed to play audio")
          })
      }
    }

    setIsMuted(!isMuted)
  }

  return (
    <div className="flex flex-col items-center gap-2 mt-4">
      {error && (
        <Alert variant="warning" className="mb-2">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleMute}
          className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 bg-black/50 px-4 py-2 rounded-md"
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          <span>{isMuted ? "UNMUTE SOUNDS OF DOOM" : "MUTE SOUNDS OF DOOM"}</span>
        </button>
        <a
          href={isExpired ? AUDIO_URLS.doom : AUDIO_URLS.countdown}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-yellow-500/70 hover:text-yellow-500 underline underline-offset-2"
        >
          Download Audio
        </a>
      </div>
    </div>
  )
}

