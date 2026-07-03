'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { AccommodationContent } from '@/components/accommodation-content'
import { BookingModal } from '@/components/booking-modal'

type BookingInit = {
  accommodation: string
  rateType: string
  ratePlan: string
  singlePrice: string
  doublePrice?: string
  image?: string
  skipOccupancy?: boolean
}

export function AccommodationPageClient() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingData, setBookingData] = useState<{ accommodation: string; rateType: string; ratePlan: string; basePrice: number; currency: 'KSH' | 'USD' } | null>(null)
  const [pendingBooking, setPendingBooking] = useState<BookingInit | null>(null)

  const openBooking = (data: BookingInit) => {
    if (data.skipOccupancy) {
      const price = data.singlePrice
      const cleanPrice = parseInt(price.replace(/[^0-9]/g, '')) || 0
      const currency = data.rateType.includes('usd') ? 'USD' : 'KSH'
      setBookingData({
        accommodation: data.accommodation,
        rateType: data.rateType,
        ratePlan: data.ratePlan,
        basePrice: cleanPrice,
        currency: currency as 'KSH' | 'USD',
        image: data.image,
      })
      setBookingOpen(true)
    } else {
      setPendingBooking(data)
    }
  }

  const confirmBooking = (occupancy: 'single' | 'double') => {
    if (!pendingBooking) return
    const price = occupancy === 'single' ? pendingBooking.singlePrice : pendingBooking.doublePrice || pendingBooking.singlePrice
    const cleanPrice = parseInt(price.replace(/[^0-9]/g, '')) || 0
    const currency = pendingBooking.rateType.includes('usd') ? 'USD' : 'KSH'
    setBookingData({
      accommodation: pendingBooking.accommodation,
      rateType: pendingBooking.rateType,
      ratePlan: pendingBooking.ratePlan,
      basePrice: cleanPrice,
      currency: currency as 'KSH' | 'USD',
      image: pendingBooking.image,
    })
    setPendingBooking(null)
    setBookingOpen(true)
  }

  return (
    <>
      <AccommodationContent onBookNow={openBooking} />
      {/* Main booking modal */}
      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} bookingData={bookingData} />

      {/* Single / Double confirmation */}
      <Dialog open={!!pendingBooking} onOpenChange={(open) => { if (!open) setPendingBooking(null) }}>
        <DialogContent onWheel={(e) => e.stopPropagation()} className="!max-w-none !w-auto sm:max-w-md max-h-[60vh] md:max-h-[70vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="text-foreground font-serif">Select Occupancy</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground mb-4">
            You selected <strong>{pendingBooking?.accommodation}</strong> — <em>{pendingBooking?.ratePlan}</em>.
            Please choose the occupancy type to determine your base rate.
          </p>
          <div className="flex gap-4">
            <Button
              className="flex-1 bg-secondary text-foreground hover:bg-secondary/90"
              onClick={() => confirmBooking('single')}
            >
              Single
            </Button>
            <Button
              className="flex-1 bg-secondary text-foreground hover:bg-secondary/90"
              onClick={() => confirmBooking('double')}
            >
              Double
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
