'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { motion } from 'framer-motion'

type Booking = {
  id: string
  guestName: string | null
  accommodation: string
  checkIn: string | null
  checkOut: string | null
  guests: number
  status: string
}

type BookingCalendarModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  bookings: Booking[]
}

export function BookingCalendarModal({ open, onOpenChange, bookings }: BookingCalendarModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const bookingsOnDate = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    return bookings.filter((b) => {
      const checkIn = b.checkIn ? new Date(b.checkIn) : null
      const checkOut = b.checkOut ? new Date(b.checkOut) : null
      if (!checkIn || !checkOut) return false
      const checkInStr = format(checkIn, 'yyyy-MM-dd')
      const checkOutStr = format(checkOut, 'yyyy-MM-dd')
      return dateStr >= checkInStr && dateStr <= checkOutStr
    })
  }

  const selectedBookings = selectedDate ? bookingsOnDate(selectedDate) : []

  const modifiers = {
    booked: bookings.flatMap((b) => {
      const checkIn = b.checkIn ? new Date(b.checkIn) : null
      const checkOut = b.checkOut ? new Date(b.checkOut) : null
      if (!checkIn || !checkOut) return []
      const dates = []
      const current = new Date(checkIn)
      while (current <= checkOut) {
        dates.push(new Date(current))
        current.setDate(current.getDate() + 1)
      }
      return dates
    }),
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-none w-[95vw] md:w-[900px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif font-bold text-foreground">Booking Calendar</DialogTitle>
        </DialogHeader>
        <div className="grid md:grid-cols-2 gap-6 p-4">
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={modifiers}
              modifiersClassNames={{
                booked: 'bg-secondary/20 text-secondary font-bold rounded-md',
              }}
              className="rounded-md border"
            />
          </div>
          <div>
            <h3 className="text-lg font-serif font-bold text-foreground mb-4">
              {selectedDate ? `Bookings on ${format(selectedDate, 'MMM d, yyyy')}` : 'Select a date to view bookings'}
            </h3>
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {selectedBookings.length === 0 ? (
                <p className="text-foreground/60 text-sm">No bookings on this date.</p>
              ) : (
                selectedBookings.map((booking) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg border border-border bg-slate-50"
                  >
                    <p className="font-semibold text-foreground">{booking.guestName || 'Guest'}</p>
                    <p className="text-sm text-foreground/70">{booking.accommodation}</p>
                    <p className="text-xs text-foreground/60 mt-1">
                      {booking.checkIn ? format(new Date(booking.checkIn), 'MMM d, yyyy') : 'N/A'} —{' '}
                      {booking.checkOut ? format(new Date(booking.checkOut), 'MMM d, yyyy') : 'N/A'}
                    </p>
                    <p className="text-xs text-foreground/60">Guests: {booking.guests}</p>
                    <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-semibold ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      booking.status === 'completed' ? 'bg-slate-100 text-slate-700' :
                      booking.status === 'rejected' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {booking.status}
                    </span>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
