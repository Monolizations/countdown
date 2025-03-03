"use client"

import { useEffect, useState } from "react"

interface CountdownTimerProps {
  targetDate: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference <= 0) {
        setIsExpired(true)
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, "0")
  }

  return (
    <div className={`w-full ${isExpired ? "doom-expired" : "doom-counting"}`}>
      {isExpired ? (
        <div className="flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-bold text-red-600 mb-4 animate-pulse">DOOM HAS ARRIVED</h2>
          <p className="text-2xl md:text-3xl text-red-400 text-center max-w-2xl doom-message">
            The end is here. There is no escape from what comes next.
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8">
            {[
              { label: "DAYS", value: timeLeft.days },
              { label: "HOURS", value: timeLeft.hours },
              { label: "MINUTES", value: timeLeft.minutes },
              { label: "SECONDS", value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <div className="text-4xl md:text-6xl font-mono font-bold text-yellow-300 countdown-digit">
                  {formatNumber(item.value)}
                </div>
                <div className="text-sm md:text-base text-yellow-500/80 mt-2">{item.label}</div>
              </div>
            ))}
          </div>
          <p className="text-xl md:text-2xl text-yellow-400/90 text-center max-w-2xl doom-warning">
            The clock ticks down to the inevitable. Prepare for what comes after.
          </p>
        </div>
      )}
    </div>
  )
}

