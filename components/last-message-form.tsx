"use client"

import type React from "react"
import { useState } from "react"
import { saveLastMessage } from "@/lib/supabase"
import { Loader2 } from "lucide-react"

interface LastMessageFormProps {
  onMessageSaved?: () => void
  addNotification: (notification: {
    title: string
    message: string
    type: "success" | "error" | "warning"
  }) => void
}

export default function LastMessageForm({ onMessageSaved, addNotification }: LastMessageFormProps) {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !message.trim()) {
      addNotification({
        title: "ERROR",
        message: "NAME AND MESSAGE ARE REQUIRED FOR THE ARCHIVES",
        type: "error",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await saveLastMessage(name.trim(), message.trim())

      addNotification({
        title: "MESSAGE RECORDED",
        message: "YOUR FINAL WORDS HAVE BEEN ETCHED INTO THE VOID",
        type: "success",
      })

      // Reset form
      setName("")
      setMessage("")

      // Notify parent component
      if (onMessageSaved) {
        onMessageSaved()
      }
    } catch (error) {
      console.error("Error saving message:", error)
      addNotification({
        title: "TRANSMISSION FAILED",
        message: "THE VOID REJECTS YOUR MESSAGE. TRY AGAIN.",
        type: "error",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-6 bg-black/70 border border-yellow-900/50 rounded-lg">
      <h2 className="text-2xl font-bold text-yellow-500 mb-4">LEAVE YOUR FINAL MESSAGE</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-yellow-400 mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            className="w-full px-3 py-2 bg-black/80 border border-yellow-900/50 text-yellow-100 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter your name"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-yellow-400 mb-1">
            Final Words
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={280}
            rows={4}
            className="w-full px-3 py-2 bg-black/80 border border-yellow-900/50 text-yellow-100 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
            placeholder="What are your final words before the end?"
            disabled={isSubmitting}
          />
          <div className="text-right text-xs text-yellow-700 mt-1">{message.length}/280</div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-yellow-900/80 hover:bg-yellow-800 text-yellow-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center border border-yellow-700/50"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              TRANSMITTING TO THE VOID...
            </>
          ) : (
            "RECORD YOUR FINAL MESSAGE"
          )}
        </button>
      </form>
    </div>
  )
}

