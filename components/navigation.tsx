'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { NoticeBar } from '@/components/notice-bar'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cancelOpen, setCancelOpen] = useState(false)
  const [bookingId, setBookingId] = useState('')
  const [cancelLoading, setCancelLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCancelBooking = async () => {
    if (!bookingId.trim()) return
    setCancelLoading(true)
    try {
      const res = await fetch('/api/bookings/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId: bookingId.trim() }),
      })
      const data = await res.json()
      if (data?.success) {
        toast({ title: 'Booking Cancelled', description: 'Your booking has been successfully cancelled.' })
        setBookingId('')
        setCancelOpen(false)
      } else {
        toast({ title: 'Cancellation Failed', description: data.error || 'Booking not found. Please check your Booking ID.', variant: 'destructive' })
      }
    } catch (e) {
      toast({ title: 'Error', description: 'Could not cancel booking. Please try again.', variant: 'destructive' })
    } finally {
      setCancelLoading(false)
    }
  }

  const mainLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Experiences', href: '/experiences' },
    { label: 'Contact', href: '/#contact' },
  ]

  return (
    <>
      <NoticeBar />
      <nav
        className={`fixed w-[90%] lg:w-[90%] mx-auto left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'top-8 bg-white shadow-lg border-b border-border'
            : 'top-8 bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <Image src="/logo.png" alt="Samburu Tempo" width={80} height={80} className="rounded-xl group-hover:scale-110 transition-transform" />
              <div className="hidden sm:block">
                <div className="font-serif font-bold text-base text-foreground">Samburu</div>
                <div className="text-xs text-secondary font-light">Tempo</div>
              </div>
            </Link>

            {/* Desktop Navigation - Clean and Minimal */}
            <div className="hidden lg:flex items-center gap-12">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    scrolled ? 'text-foreground/70 hover:text-secondary' : 'text-foreground/70 hover:text-secondary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

             {/* Right Side - CTA Buttons */}
             <div className="hidden lg:flex items-center gap-4">
                <button
                  onClick={() => setCancelOpen(true)}
                  className="px-4 py-2 border-2 border-red-500 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors"
                >
                  Cancel
                </button>
                <Link
                  href="/experiences/accommodation"
                  className="px-6 py-2.5 bg-secondary text-foreground text-sm font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Reserve
                </Link>
              </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Clean and Simple */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-border bg-white"
            >
              <div className="max-w-7xl mx-auto px-6 py-6 space-y-3">
                {mainLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-3 text-foreground/70 hover:text-secondary transition-colors text-sm font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                 <div className="h-px bg-border my-4" />
                  <button
                    onClick={() => {
                      setCancelOpen(true)
                      setIsOpen(false)
                    }}
                    className="block w-full py-3 border-2 border-red-500 text-red-600 text-center text-sm font-semibold hover:bg-red-50 transition-all"
                  >
                    Cancel Booking
                  </button>
                  <Link
                    href="/experiences/accommodation"
                    className="block w-full py-3 bg-secondary text-foreground text-center text-sm font-semibold hover:shadow-lg transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Reserve Now
                  </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Cancel Booking Dialog */}
      <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-foreground font-serif">Cancel Your Booking</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs font-semibold text-red-800 mb-1">Cancellation & Refund Policy</p>
              <p className="text-xs text-red-700">
                Cancellations made more than 7 days before check-in are fully refundable. Within 7 days, no refunds are issued.
                Please note that administrative fees may apply.
              </p>
            </div>
            <p className="text-sm text-foreground/70">
              Please enter your Booking ID (found in your confirmation email) to cancel your booking.
            </p>
            <div className="space-y-2">
              <Label htmlFor="booking-id" className="text-sm font-semibold">Booking ID</Label>
              <Input
                id="booking-id"
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                placeholder="Enter your booking ID..."
                className="border-2 border-slate-200 focus:border-secondary"
              />
            </div>
            <Button
              onClick={handleCancelBooking}
              disabled={cancelLoading || !bookingId.trim()}
              className="w-full bg-red-600 text-white hover:bg-red-700"
            >
              {cancelLoading ? 'Cancelling...' : 'Cancel Booking'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}