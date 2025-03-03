"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { AlertTriangle, CheckCircle2, XCircle, X } from "lucide-react"

interface DoomNotification {
  id: string
  title: string
  message: string
  type: "success" | "error" | "warning"
}

interface DoomNotificationsProps {
  notifications: DoomNotification[]
  onDismiss: (id: string) => void
}

export function DoomNotifications({ notifications, onDismiss }: DoomNotificationsProps) {
  return (
    <div className="fixed top-0 z-[100] flex w-full flex-col items-end p-4 gap-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.9 }}
            className="w-full max-w-md"
          >
            <div
              className={cn("relative rounded-lg border px-4 py-3 pr-12 shadow-lg backdrop-blur-sm", {
                "bg-black/90 text-yellow-400 border-yellow-900/50": notification.type === "success",
                "bg-black/90 text-red-400 border-red-900/50": notification.type === "error",
                "bg-black/90 text-yellow-500 border-yellow-900/50": notification.type === "warning",
              })}
            >
              <div className="flex items-start gap-3">
                {notification.type === "success" && <CheckCircle2 className="h-5 w-5" />}
                {notification.type === "error" && <XCircle className="h-5 w-5" />}
                {notification.type === "warning" && <AlertTriangle className="h-5 w-5" />}
                <div className="flex-1">
                  <div className="font-bold mb-1">{notification.title}</div>
                  <div className="text-sm opacity-90">{notification.message}</div>
                </div>
              </div>
              <button
                onClick={() => onDismiss(notification.id)}
                className={cn("absolute right-2 top-2 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100", {
                  "text-yellow-400 hover:text-yellow-300": notification.type === "success",
                  "text-red-400 hover:text-red-300": notification.type === "error",
                  "text-yellow-500 hover:text-yellow-400": notification.type === "warning",
                })}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

