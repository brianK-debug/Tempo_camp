'use client'

import { useState, useCallback } from 'react'

type BookingInit = {
  accommodation: string
  rateType: string
  ratePlan: string
  singlePrice: string
  doublePrice: string
  image?: string
  skipOccupancy?: boolean
}

export function useBooking() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingData, setBookingData] = useState<{ accommodation: string; rateType: string; ratePlan: string; basePrice: number; currency: 'KSH' | 'USD'; image?: string; skipOccupancy?: boolean } | null>(null)
  const [pendingBooking, setPendingBooking] = useState<BookingInit | null>(null)

  const openBooking = useCallback((data: BookingInit) => setPendingBooking(data), [])
  const closePending = useCallback(() => setPendingBooking(null), [])

  const confirmBooking = useCallback((occupancy: 'single' | 'double') => {
    if (!pendingBooking) return
    const price = occupancy === 'single' ? pendingBooking.singlePrice : pendingBooking.doublePrice
    const cleanPrice = parseInt(price.replace(/[^0-9]/g, '')) || 0
    const currency = pendingBooking.rateType.includes('usd') ? 'USD' : 'KSH'
    setBookingData({
      accommodation: pendingBooking.accommodation,
      rateType: pendingBooking.rateType,
      ratePlan: pendingBooking.ratePlan,
      basePrice: cleanPrice,
      currency: currency as 'KSH' | 'USD',
      image: pendingBooking.image,
      skipOccupancy: pendingBooking.skipOccupancy,
    })
    setPendingBooking(null)
    setBookingOpen(true)
  }, [pendingBooking])

  const closeBooking = useCallback(() => {
    setBookingOpen(false)
    setBookingData(null)
    setPendingBooking(null)
  }, [])

  return { bookingOpen, setBookingOpen, bookingData, pendingBooking, openBooking, closePending, confirmBooking, closeBooking }
}
