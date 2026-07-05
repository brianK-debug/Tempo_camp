'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Loader2, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { BookingCalendarModal } from '@/components/admin/booking-calendar-modal'
import { NoticesManager } from '@/components/admin/notices-manager'

type Booking = {
  id: string
  confirmationCode: string
  accommodation: string
  rateType: string
  ratePlan: string
  currency: string
  basePriceCents: number
  totalCents: number
  nights: number
  guests: number
  addOnsJson: unknown
  guestName: string | null
  email: string | null
  phone: string | null
  checkIn: string | null
  checkOut: string | null
  createdAt: string
  status: string
  specialRequests?: string | null
  paid: boolean
}

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterPaid, setFilterPaid] = useState<string>('all')
  const [filterAccommodation, setFilterAccommodation] = useState<string>('all')
  const [savingId, setSavingId] = useState<string | null>(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const [showNotices, setShowNotices] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const fetchBookings = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/bookings?id=' + Date.now(), { credentials: 'include' })
      if (res.ok) {
        const data = await res.json()
        setBookings(data.bookings ?? [])
      } else {
        const data = await res.json().catch(() => ({ error: 'Failed to load' }))
        setError(data.error || 'Failed to load bookings')
      }
    } catch (err) {
      console.error('Failed to load bookings', err)
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this booking?')) return
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE', credentials: 'include' })
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Failed' }))
        setError(data.error || 'Failed to delete booking')
        return
      }
      setBookings((prev) => prev.filter((b) => b.id !== id))
    } catch (err) {
      console.error('Delete failed', err)
      setError('Network error while deleting')
    }
  }

  const handleStatusToggle = async (id: string, status: string) => {
    try {
      setSavingId(id)
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status }),
      })
      const data = await res.json().catch(() => ({ error: 'Failed' }))
      if (!res.ok) {
        setError(data.error || 'Failed to update status')
        toast({
          title: 'Update failed',
          description: data.error || 'Failed to update booking status',
          variant: 'destructive',
        })
        return
      }
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)))
      const isPositive = status === 'new' || status === 'confirmed' || status === 'completed'
      const isNegative = status === 'rejected' || status === 'cancelled'
      toast({
        title: 'Status updated',
        description: data.emailSent ? 'Client notified by email.' : 'Client email could not be sent.',
        variant: data.emailError ? 'destructive' : isPositive ? 'success' : isNegative ? 'failure' : 'default',
      })
      if (data.emailError) {
        setError(`Status updated, but notification email failed: ${data.emailError}`)
      } else {
        setError(null)
      }
    } catch (err) {
      console.error('Status update failed', err)
      setError('Network error while updating status')
      toast({
        title: 'Error',
        description: 'Network error while updating status',
        variant: 'destructive',
      })
    } finally {
      setSavingId(null)
    }
  }

  const handlePaidToggle = async (id: string, paid: boolean) => {
    try {
      setSavingId(id)
      const res = await fetch(`/api/bookings/${id}/paid`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ paid }),
      })
      const data = await res.json().catch(() => ({ error: 'Failed' }))
      if (!res.ok) {
        setError(data.error || 'Failed to update paid status')
        toast({
          title: 'Update failed',
          description: data.error || 'Failed to update paid status',
          variant: 'destructive',
        })
        return
      }
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, paid } : b)))
      toast({
        title: 'Payment status updated',
        description: data.emailSent ? 'Client notified by email.' : 'Client email could not be sent.',
        variant: data.emailSent ? 'success' : 'destructive',
      })
      if (data.emailError) {
        setError(`Payment status updated, but notification email failed: ${data.emailError}`)
      } else {
        setError(null)
      }
    } catch (err) {
      console.error('Payment status update failed', err)
      setError('Network error while updating payment status')
      toast({
        title: 'Error',
        description: 'Network error while updating payment status',
        variant: 'destructive',
      })
    } finally {
      setSavingId(null)
    }
  }

  const filteredBookings = bookings.filter((b) => {
    if (filterStatus !== 'all' && b.status !== filterStatus) return false
    if (filterPaid === 'paid' && !b.paid) return false
    if (filterPaid === 'unpaid' && b.paid) return false
    if (filterAccommodation !== 'all' && b.accommodation !== filterAccommodation) return false
    return true
  })

  const handleLogout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' })
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full md:max-w-7xl md:mx-auto px-4 md:px-6 py-4 md:py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-serif font-bold text-foreground">Booking Management</h1>
            <p className="text-sm md:text-base text-foreground/70 mt-1">View and manage all bookings</p>
          </div>
          <button onClick={handleLogout} className="px-3 md:px-4 py-2 border-2 border-slate-300 rounded-lg text-xs md:text-sm font-semibold hover:bg-slate-50">
            Logout
          </button>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-3 mb-4 md:mb-6">
          <select
            value={filterAccommodation}
            onChange={(e) => setFilterAccommodation(e.target.value)}
            className="px-3 md:px-4 py-2 border-2 border-slate-200 rounded-lg text-xs md:text-sm focus:border-primary w-full sm:w-auto"
          >
            <option value="all">All Accommodations</option>
            <option value="Camping Ground">Camping Ground</option>
            <option value="Standard Tent">Standard Tent</option>
            <option value="Cottage">Cottage</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 md:px-4 py-2 border-2 border-slate-200 rounded-lg text-xs md:text-sm focus:border-primary w-full sm:w-auto"
          >
            <option value="all">All Bookings</option>
            <option value="new">New</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={filterPaid}
            onChange={(e) => setFilterPaid(e.target.value)}
            className="px-3 md:px-4 py-2 border-2 border-slate-200 rounded-lg text-xs md:text-sm focus:border-primary w-full sm:w-auto"
          >
            <option value="all">All Payments</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
          <button onClick={fetchBookings} className="px-3 md:px-4 py-2 bg-primary text-white rounded-lg text-xs md:text-sm font-semibold hover:bg-primary/90 w-full sm:w-auto">
            Refresh
          </button>
          <button onClick={() => setShowCalendar(true)} className="px-3 md:px-4 py-2 bg-primary text-white rounded-lg text-xs md:text-sm font-semibold hover:bg-primary/90 w-full sm:w-auto">
            Booking Calendar
          </button>
          <button onClick={() => setShowNotices(true)} className="px-3 md:px-4 py-2 bg-secondary text-foreground rounded-lg text-xs md:text-sm font-semibold hover:bg-secondary/90 w-full sm:w-auto">
            Notices
          </button>
        </div>

        {error && (
          <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs md:text-sm">
            {error}
            <button onClick={() => setError(null)} className="float-right font-bold">×</button>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12 md:py-20">
            <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3 md:mb-4" />
            <p className="text-sm md:text-base text-foreground/70">Loading bookings...</p>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-12 md:py-20 bg-white rounded-xl border border-border">
            <p className="text-sm md:text-lg text-foreground/70">No bookings found</p>
          </div>
        ) : (
          <>
            <div className="hidden md:block bg-white rounded-xl shadow-lg border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="py-4 px-6 text-left">Booking ID</th>
                    <th className="py-4 px-6 text-left">Guest</th>
                    <th className="py-4 px-6 text-left">Accommodation</th>
                    <th className="py-4 px-6 text-left">Dates</th>
                    <th className="py-4 px-6 text-left">Rate Type</th>
                    <th className="py-4 px-6 text-left">Plan</th>
                    <th className="py-4 px-6 text-center">Guests</th>
                    <th className="py-4 px-6 text-right">Total</th>
                    <th className="py-4 px-6 text-left">Status</th>
                    <th className="py-4 px-6 text-left">Paid ?</th>
                    <th className="py-4 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-border hover:bg-slate-50">
                      <td className="py-4 px-6 font-mono text-xs">{booking.id.slice(-8)}</td>
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-semibold">{booking.guestName || '—'}</p>
                          <p className="text-xs text-foreground/60">{booking.phone || booking.email || ''}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">{booking.accommodation}</td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="font-medium">{booking.checkIn ? new Date(booking.checkIn).toLocaleDateString() : '—'}</span>
                          <span className="text-xs text-foreground/60">{booking.checkOut ? new Date(booking.checkOut).toLocaleDateString() : '—'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${booking.rateType === 'non-resident-usd' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                          {booking.rateType === 'non-resident-usd' ? 'USD' : 'KSH'}
                        </span>
                      </td>
                      <td className="py-4 px-6">{booking.ratePlan}</td>
                      <td className="py-4 px-6 text-center">{booking.guests}</td>
                      <td className="py-4 px-6 text-right font-bold text-secondary">
                        {booking.currency} {booking.totalCents ? (booking.totalCents / 100).toLocaleString() : '—'}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <select
                            value={booking.status}
                            onChange={(e) => handleStatusToggle(booking.id, e.target.value)}
                            disabled={savingId === booking.id}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-0 cursor-pointer ${
                              booking.status === 'confirmed'
                                ? 'bg-green-100 text-green-700'
                                : booking.status === 'completed'
                                ? 'bg-slate-100 text-slate-700'
                                : booking.status === 'rejected'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                            } ${savingId === booking.id ? 'opacity-70 cursor-wait' : ''}`}
                          >
                            <option value="new">New</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="rejected">Rejected</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          {savingId === booking.id && (
                            <Loader2 className="w-4 h-4 animate-spin text-foreground/60" />
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <select
                          value={booking.paid ? 'yes' : 'no'}
                          onChange={(e) => handlePaidToggle(booking.id, e.target.value === 'yes')}
                          disabled={savingId === booking.id}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-0 cursor-pointer ${
                            booking.paid
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          <option value="no">No</option>
                          <option value="yes">Yes</option>
                        </select>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedBooking(booking)}
                            className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20"
                            aria-label="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(booking.id)}
                            className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                            aria-label="Delete booking"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-4">
              {filteredBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-lg border border-border p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-mono text-xs text-foreground/60">#{booking.id.slice(-8)}</p>
                      <h3 className="font-bold text-foreground">{booking.accommodation}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20"
                        aria-label="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(booking.id)}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                        aria-label="Delete booking"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-foreground/60">Guest</p>
                      <p className="font-semibold text-sm">{booking.guestName || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60">Rate Type</p>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${booking.rateType === 'non-resident-usd' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                        {booking.rateType === 'non-resident-usd' ? 'USD' : 'KSH'}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60">Check-in</p>
                      <p className="font-semibold text-sm">{booking.checkIn ? new Date(booking.checkIn).toLocaleDateString() : '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60">Check-out</p>
                      <p className="font-semibold text-sm">{booking.checkOut ? new Date(booking.checkOut).toLocaleDateString() : '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60">Guests</p>
                      <p className="font-semibold text-sm">{booking.guests}</p>
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60">Total</p>
                      <p className="font-bold text-secondary text-sm">
                        {booking.currency} {booking.totalCents ? (booking.totalCents / 100).toLocaleString() : '—'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-2">
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusToggle(booking.id, e.target.value)}
                        disabled={savingId === booking.id}
                        className={`px-2 py-1 rounded-lg text-xs font-semibold border-0 cursor-pointer ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : booking.status === 'completed'
                            ? 'bg-slate-100 text-slate-700'
                            : booking.status === 'rejected'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="rejected">Rejected</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <select
                        value={booking.paid ? 'yes' : 'no'}
                        onChange={(e) => handlePaidToggle(booking.id, e.target.value === 'yes')}
                        disabled={savingId === booking.id}
                        className={`px-2 py-1 rounded-lg text-xs font-semibold border-0 cursor-pointer ${
                          booking.paid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}
                      >
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                      </select>
                    </div>
                    {savingId === booking.id && (
                      <Loader2 className="w-4 h-4 animate-spin text-foreground/60" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        <AnimatePresence>
          {selectedBooking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedBooking(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-y-auto p-5 md:p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-5 md:mb-6">
                  <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">Booking Details</h2>
                  <button onClick={() => setSelectedBooking(null)} className="p-1.5 hover:bg-slate-100 rounded-lg">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground">{selectedBooking.accommodation}</h3>
                    <p className="text-xs md:text-sm text-foreground/60 mt-1">Booking ID: <span className="font-mono text-xs">{selectedBooking.id}</span></p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div className="bg-slate-50 p-3 md:p-4 rounded-lg">
                      <p className="text-xs text-foreground/60 mb-1">Guest Name</p>
                      <p className="font-semibold text-sm">{selectedBooking.guestName || '—'}</p>
                    </div>
                    <div className="bg-slate-50 p-3 md:p-4 rounded-lg">
                      <p className="text-xs text-foreground/60 mb-1">Contact</p>
                      <p className="font-semibold text-sm">{selectedBooking.phone || selectedBooking.email || '—'}</p>
                    </div>
                    <div className="bg-slate-50 p-3 md:p-4 rounded-lg">
                      <p className="text-xs text-foreground/60 mb-1">Check-in</p>
                      <p className="font-semibold text-sm">{selectedBooking.checkIn ? new Date(selectedBooking.checkIn).toLocaleDateString() : '—'}</p>
                    </div>
                    <div className="bg-slate-50 p-3 md:p-4 rounded-lg">
                      <p className="text-xs text-foreground/60 mb-1">Check-out</p>
                      <p className="font-semibold text-sm">{selectedBooking.checkOut ? new Date(selectedBooking.checkOut).toLocaleDateString() : '—'}</p>
                    </div>
                    <div className="bg-slate-50 p-3 md:p-4 rounded-lg">
                      <p className="text-xs text-foreground/60 mb-1">Rate Type</p>
                      <p className="font-semibold text-sm">{selectedBooking.rateType === 'non-resident-usd' ? 'Non-Resident (USD)' : 'Resident (KSH)'}</p>
                    </div>
                    <div className="bg-slate-50 p-3 md:p-4 rounded-lg">
                      <p className="text-xs text-foreground/60 mb-1">Rate Plan</p>
                      <p className="font-semibold text-sm">{selectedBooking.ratePlan}</p>
                    </div>
                    <div className="bg-slate-50 p-3 md:p-4 rounded-lg">
                      <p className="text-xs text-foreground/60 mb-1">Guests</p>
                      <p className="font-semibold text-sm">{selectedBooking.guests}</p>
                    </div>
                    <div className="bg-slate-50 p-3 md:p-4 rounded-lg">
                      <p className="text-xs text-foreground/60 mb-1">Total</p>
                      <p className="font-bold text-secondary text-base">
                        {selectedBooking.currency} {selectedBooking.totalCents ? (selectedBooking.totalCents / 100).toLocaleString() : '—'}
                      </p>
                    </div>
                  </div>
                  {selectedBooking.specialRequests && (
                    <div className="bg-slate-50 p-3 md:p-4 rounded-lg">
                      <p className="text-xs text-foreground/60 mb-1">Special Requests</p>
                      <p className="font-semibold text-sm">{selectedBooking.specialRequests}</p>
                    </div>
                  )}
                  <p className="text-xs text-foreground/50">Submitted: {new Date(selectedBooking.createdAt).toLocaleString()}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <BookingCalendarModal open={showCalendar} onOpenChange={setShowCalendar} bookings={bookings} />
        <NoticesManager open={showNotices} onOpenChange={setShowNotices} />
      </div>
    </div>
  )
}