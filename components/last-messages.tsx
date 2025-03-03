"use client"

import { useEffect, useState } from "react"
import { getLastMessages, type LastMessage } from "@/lib/supabase"
import { MessageSquare } from "lucide-react"

export default function LastMessages({ refreshTrigger = 0 }: { refreshTrigger?: number }) {
  const [messages, setMessages] = useState<LastMessage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true)
      try {
        const data = await getLastMessages(10)
        setMessages(data)
      } catch (error) {
        console.error("Error fetching messages:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto mt-8">
        <h2 className="text-2xl font-bold text-yellow-500 mb-4">RETRIEVING MESSAGES FROM THE VOID</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 border border-yellow-900/30 rounded-md bg-black/60 animate-pulse">
              <div className="h-4 w-24 bg-yellow-900/30 mb-2 rounded"></div>
              <div className="h-4 w-full bg-yellow-900/20 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (messages.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto mt-8 text-center p-6 border border-yellow-900/30 rounded-md bg-black/60">
        <MessageSquare className="mx-auto h-12 w-12 text-yellow-700 mb-2" />
        <h2 className="text-xl font-bold text-yellow-500">THE VOID IS EMPTY</h2>
        <p className="text-yellow-600 mt-2">BE THE FIRST TO LEAVE YOUR MARK BEFORE THE END COMES.</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold text-yellow-500 mb-4">FINAL MESSAGES</h2>
      <div className="space-y-4 max-h-80 overflow-y-auto pr-2 doom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className="p-4 border border-yellow-900/50 rounded-md bg-black/60">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-yellow-400">{msg.name}</h3>
              <span className="text-xs text-yellow-700">{new Date(msg.created_at).toLocaleDateString()}</span>
            </div>
            <p className="mt-2 text-yellow-200">{msg.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

