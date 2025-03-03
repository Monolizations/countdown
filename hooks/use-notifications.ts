"use client"

import { useState, useCallback } from "react"

interface DoomNotification {
  id: string
  title: string
  message: string
  type: "success" | "error" | "warning"
  timestamp: Date
}

let notificationCount = 0

export function useNotifications(limit = 3) {
  const [notifications, setNotifications] = useState<DoomNotification[]>([])

  const addNotification = useCallback(
    (notification: Omit<DoomNotification, "id" | "timestamp">) => {
      setNotifications((currentNotifications) => {
        const id = String(++notificationCount)
        const newNotification = {
          ...notification,
          id,
          timestamp: new Date(),
        }

        // Remove oldest notifications if we're at the limit
        const updatedNotifications = [newNotification, ...currentNotifications].slice(0, limit)

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
          dismissNotification(id)
        }, 5000)

        return updatedNotifications
      })
    },
    [limit],
  )

  const dismissNotification = useCallback((id: string) => {
    setNotifications((currentNotifications) => currentNotifications.filter((notification) => notification.id !== id))
  }, [])

  return {
    notifications,
    addNotification,
    dismissNotification,
  }
}

