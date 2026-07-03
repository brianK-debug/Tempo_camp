'use client'

import { useState, useMemo, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { format } from 'date-fns'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const rateTypeOptions = [
  { id: 'resident-kes', label: 'Resident (KSH)', currency: 'KSH' },
  { id: 'non-resident-usd', label: 'Non-Resident (USD)', currency: 'USD' },
]

const addOns = [
  { id: 'swimming', label: 'Swimming Pool Access', priceKsh: 500, priceUsd: 4, per: 'per person' },
  { id: 'reteti', label: 'Reteti Elephant Sanctuary', priceKsh: 3000, priceUsd: 23, per: 'per person' },
  { id: 'camping', label: 'Camping Gear Rental', priceKsh: 5000, priceUsd: 39, per: 'per person' },
  { id: 'vehicle', label: 'Vehicle Hire (Safari Land Cruiser)', priceKsh: 160000, priceUsd: 1231, per: 'full day' },
  { id: 'village', label: 'Cultural Village Visit', priceKsh: 2000, priceUsd: 15, per: 'per person' },
  { id: 'samburu-dance', label: 'Samburu Dance Performance', priceKsh: 10000, priceUsd: 77, per: 'per session' },
  { id: 'hiking', label: 'Mt. Ololokwe Hiking', priceKsh: 4000, priceUsd: 31, per: 'per person' },
  { id: 'soft-drinks', label: 'Soft Drinks Package', priceKsh: 1500, priceUsd: 12, per: 'per day' },
]

type BookingData = {
  accommodation: string
  rateType: string
  ratePlan: string
  basePrice: number
  currency: string
  image?: string
}

export function BookingModal({ open, onOpenChange, bookingData }: { open: boolean; onOpenChange: (open: boolean) => void; bookingData: BookingData | null }) {
  const initialRateType = bookingData?.rateType ?? 'resident-kes'
  const initialRatePlan = bookingData?.ratePlan ?? 'bed-only'

  const [selectedRateType, setSelectedRateType] = useState(initialRateType)
  const [selectedRatePlan, setSelectedRatePlan] = useState(initialRatePlan)
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [numGuests, setNumGuests] = useState(2)
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined)
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined)
  const [guestName, setGuestName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    setSelectedRateType(bookingData?.rateType ?? 'resident-kes')
    setSelectedRatePlan(bookingData?.ratePlan ?? 'bed-only')
    setSelectedAddOns([])
    setNumGuests(2)
    setCheckIn(undefined)
    setCheckOut(undefined)
    setGuestName('')
    setEmail('')
    setPhone('')
    setSpecialRequests('')
    setIsSubmitted(false)
    setErrors({})
    setSubmitting(false)
    setSubmitError('')
  }, [bookingData?.rateType, bookingData?.ratePlan])

  const selectedRateTypeLabel = rateTypeOptions.find((o) => o.id === selectedRateType)?.label ?? ''
  const currency = rateTypeOptions.find((o) => o.id === selectedRateType)?.currency ?? 'KSH'

  const basePrice = useMemo(() => bookingData?.basePrice ?? 0, [bookingData])

  const nightsCount = useMemo(() => {
    if (!checkIn || !checkOut) return 2
    const diff = Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    return Math.max(1, diff)
  }, [checkIn, checkOut])

  const addOnTotal = useMemo(() => {
    return selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId)
      if (!addOn) return total
      const price = currency === 'USD' ? addOn.priceUsd : addOn.priceKsh
      return total + price * numGuests
    }, 0)
  }, [selectedAddOns, currency, numGuests])

  const grandTotal = useMemo(() => {
    return (basePrice * nightsCount * numGuests) + addOnTotal
  }, [basePrice, nightsCount, numGuests, addOnTotal])

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns((prev) => (prev.includes(addOnId) ? prev.filter((id) => id !== addOnId) : [...prev, addOnId]))
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!guestName.trim()) newErrors.guestName = 'Full name is required'
    if (!email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email address'
    if (!phone.trim()) newErrors.phone = 'Phone number is required'
    if (!checkIn) newErrors.checkIn = 'Check-in date is required'
    if (!checkOut) newErrors.checkOut = 'Check-out date is required'
    else if (checkIn && checkOut && checkOut <= checkIn) newErrors.checkOut = 'Check-out must be after check-in'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setSubmitting(true)
    setSubmitError('')
    const payload = {
      accommodation: accommodationName,
      rateType: selectedRateType,
      ratePlan: selectedRatePlan,
      basePrice,
      currency,
      nights: nightsCount,
      numGuests,
      selectedAddOns,
      addOnTotal,
      grandTotal,
      guestName,
      email,
      phone,
      specialRequests,
      checkIn: checkIn?.toISOString(),
      checkOut: checkOut?.toISOString(),
    }
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Unknown error' }))
        setSubmitError(data.error || 'Failed to submit booking')
        setSubmitting(false)
        toast({
          title: 'Booking failed',
          description: data.error || 'Please try again later.',
          variant: 'destructive',
        })
        return
      }
      setSubmitting(false)
      setIsSubmitted(true)
    } catch (err) {
      console.error('Booking submit failed', err)
      setSubmitting(false)
      setSubmitError('Connection error')
    }
  }

  useEffect(() => {
    if (isSubmitted && open) {
      const timer = setTimeout(() => {
        setIsSubmitted(false)
        onOpenChange(false)
      }, 1800)
      return () => clearTimeout(timer)
    }
  }, [isSubmitted, open, onOpenChange])

  const accommodationName = bookingData?.accommodation ?? 'Selected accommodation'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onWheel={(e) => e.stopPropagation()} className="!max-w-none w-[94vw] md:w-[70vw] max-h-[82vh] overflow-y-auto p-0 border-0 bg-transparent scroll-smooth">
        <div className="relative rounded-xl overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image src="/cheetah.jpeg" alt="Cheetah" fill className="object-cover" quality={85} />
            <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-primary/90 backdrop-blur-sm" />
          </div>

          <div className="relative z-10 p-4 md:p-10 text-foreground">
            <DialogHeader className="mb-6 md:mb-10 pt-2 md:pt-4">
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <DialogTitle className="text-2xl md:text-5xl font-serif font-bold text-primary mb-2 md:mb-3">
                  Complete Your Booking
                </DialogTitle>
                <div className="h-1 w-20 md:w-24 bg-secondary rounded-full" />
                <p className="text-sm md:text-lg text-foreground/70 mt-3 md:mt-4 font-medium">
                  <span className="font-bold text-primary">{accommodationName}</span> has been pre-selected and cannot be changed
                </p>
              </motion.div>
            </DialogHeader>

            {isSubmitted ? (
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }} className="py-20 text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }} className="inline-block p-6 bg-green-100 rounded-full mb-6">
                  <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <p className="text-4xl md:text-5xl font-bold text-primary mb-4">Booking Received!</p>
                <p className="text-lg md:text-xl text-foreground/70">Please wait for a booking confirmation email.</p>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-6 md:space-y-8">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl shadow-lg border border-border p-4 md:p-6">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start">
                    <div className="flex-1 text-left">
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-3">Selected Accommodation</h3>
                      <p className="text-2xl md:text-3xl font-bold text-primary">{accommodationName}</p>
                      <p className="text-foreground/70 text-base md:text-lg mt-2">
                        {checkIn && checkOut ? (
                          <span>{format(checkIn, 'MMM d, yyyy')} → {format(checkOut, 'MMM d, yyyy')} ({nightsCount} {nightsCount === 1 ? 'night' : 'nights'})</span>
                        ) : (
                          <span>Rate Type: <span className="font-bold text-secondary">{selectedRateTypeLabel}</span></span>
                        )}
                      </p>
                      <div className="mt-4 inline-block bg-primary/90 px-4 md:px-6 py-3 md:py-4 rounded-xl shadow-md">
                        <p className="text-xs md:text-sm text-white/90 font-medium">Base Price</p>
                        <p className="text-2xl md:text-3xl font-bold text-white mt-1">
                          {currency} {basePrice.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    {bookingData?.image && (
                      <div className="relative w-full md:w-64 h-48 md:h-48 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={bookingData.image} alt={accommodationName} fill className="object-cover" />
                      </div>
                    )}
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="bg-white rounded-xl shadow-lg border border-border p-4 md:p-6">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-4">Enhance Your Stay</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {addOns.map((addOn, index) => (
                      <motion.div
                        key={addOn.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                        whileHover={{ scale: 1.01, y: -1 }}
                        className={`flex items-start gap-3 p-3 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                          selectedAddOns.includes(addOn.id)
                            ? 'bg-primary/5 border-primary shadow-md'
                            : 'bg-slate-50 border-slate-200 hover:border-primary/50 hover:shadow-sm'
                        }`}
                        onClick={() => handleAddOnToggle(addOn.id)}
                      >
                        <Checkbox
                          checked={selectedAddOns.includes(addOn.id)}
                          onCheckedChange={() => handleAddOnToggle(addOn.id)}
                          className="mt-0.5 h-4 w-4 border-2 border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <div className="flex-1">
                          <Label className={`text-sm md:text-base cursor-pointer block font-semibold ${selectedAddOns.includes(addOn.id) ? 'text-primary' : 'text-foreground'}`}>
                            {addOn.label}
                          </Label>
                          <p className="text-xs md:text-sm text-foreground/60 mt-1 font-medium">
                            {currency} {(currency === 'USD' ? addOn.priceUsd : addOn.priceKsh).toLocaleString()} — {addOn.per}
                          </p>
                        </div>
                        {selectedAddOns.includes(addOn.id) && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-primary">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="bg-white rounded-xl shadow-lg border border-border p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-serif font-bold text-foreground mb-3">Stay Details</h3>
                    <div className="space-y-3">
                      <Label className="text-xs md:text-sm font-semibold text-foreground/80 mb-2 block">Check-in Date <span className="text-red-500">*</span></Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className={`w-full justify-start text-left font-normal h-10 md:h-11 border-2 ${errors.checkIn ? 'border-red-400' : 'border-slate-200'}`}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkIn ? format(checkIn, 'PPP') : <span>Pick check-in date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))} initialFocus />
                        </PopoverContent>
                      </Popover>
                      {errors.checkIn && <p className="text-red-500 text-xs">{errors.checkIn}</p>}

                      <Label className="text-xs md:text-sm font-semibold text-foreground/80 mb-2 block">Check-out Date <span className="text-red-500">*</span></Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className={`w-full justify-start text-left font-normal h-10 md:h-11 border-2 ${errors.checkOut ? 'border-red-400' : 'border-slate-200'}`}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkOut ? format(checkOut, 'PPP') : <span>Pick check-out date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} disabled={(date) => !checkIn || date <= checkIn} initialFocus />
                        </PopoverContent>
                      </Popover>
                      {errors.checkOut && <p className="text-red-500 text-xs">{errors.checkOut}</p>}

                    <div>
                      <Label className="text-xs md:text-sm font-semibold text-foreground/80 mb-2 block">Number of Guests</Label>
                      <div className="flex items-center gap-2 md:gap-3">
                        <Button type="button" variant="outline" size="icon" onClick={() => setNumGuests((g) => Math.max(1, g - 1))} className="h-8 w-8 md:h-10 md:w-10 border-2 border-slate-300 hover:bg-primary hover:text-white hover:border-primary text-base md:text-lg font-bold">-</Button>
                        <span className="text-lg md:text-2xl font-bold text-primary w-8 md:w-10 text-center">{numGuests}</span>
                        <Button type="button" variant="outline" size="icon" onClick={() => setNumGuests((g) => Math.min(20, g + 1))} className="h-8 w-8 md:h-10 md:w-10 border-2 border-slate-300 hover:bg-primary hover:text-white hover:border-primary text-base md:text-lg font-bold">+</Button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-white rounded-xl shadow-lg border border-border p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-serif font-bold text-foreground mb-4">Guest Information</h3>
                    <div className="space-y-2 md:space-y-3">
                      <div>
                        <Input value={guestName} onChange={(e) => setGuestName(e.target.value)} placeholder="Full Name *" className={`border-2 ${errors.guestName ? 'border-red-400' : 'border-slate-200 focus:border-primary focus:ring-primary text-sm md:text-base h-10 md:h-11'}`} />
                        {errors.guestName && <p className="text-red-500 text-xs">{errors.guestName}</p>}
                      </div>
                      <div>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address *" type="email" className={`border-2 ${errors.email ? 'border-red-400' : 'border-slate-200 focus:border-primary focus:ring-primary text-sm md:text-base h-10 md:h-11'}`} />
                        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                      </div>
                      <div>
                        <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number *" className={`border-2 ${errors.phone ? 'border-red-400' : 'border-slate-200 focus:border-primary focus:ring-primary text-sm md:text-base h-10 md:h-11'}`} />
                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                      </div>
                      <Textarea value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} placeholder="Special Requests or Notes" rows={3} className="border-2 border-slate-200 focus:border-primary focus:ring-primary text-sm md:text-base resize-none" />
                    </div>
                  </motion.div>

                   <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="bg-gradient-to-br from-primary to-primary/90 rounded-xl shadow-lg p-5 md:p-6 text-white flex flex-col">
                     <h3 className="text-lg md:text-xl font-serif font-bold mb-3 md:mb-4">Booking Summary</h3>
                     <div className="space-y-2 md:space-y-3 text-xs md:text-sm flex-1">
                       <div className="flex justify-between items-center">
                         <span className="text-white/90">Accommodation ({nightsCount} {nightsCount === 1 ? 'night' : 'nights'} × {numGuests} {numGuests === 1 ? 'guest' : 'guests'})</span>
                         <span className="font-bold text-white">{(basePrice * nightsCount * numGuests).toLocaleString()}</span>
                       </div>
                       <div className="flex justify-between items-center">
                         <span className="text-white/90">Add-ons</span>
                         <span className="font-bold text-white">{addOnTotal.toLocaleString()}</span>
                       </div>
                       <div className="border-t border-white/30 my-2 md:my-3"></div>
                       <div className="flex justify-between items-center text-base md:text-lg">
                         <span className="font-bold">Total</span>
                         <span className="font-bold text-secondary">{currency} {grandTotal.toLocaleString()}</span>
                       </div>
                     </div>
                   </motion.div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-border p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-serif font-bold text-foreground mb-3 text-center">Payment Methods</h3>
                  <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                    <div className="flex flex-col items-center gap-2">
                      <Image src="/airtel.png" alt="Airtel Money" width={64} height={64} className="object-contain h-12 md:h-16" />
                      <span className="text-xs font-medium text-foreground/70">Airtel Money</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Image src="/mpesa.png" alt="M-Pesa" width={64} height={64} className="object-contain h-12 md:h-16" />
                      <span className="text-xs font-medium text-foreground/70">M-Pesa</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Image src="/bank.png" alt="Bank Transfer" width={64} height={64} className="object-contain h-12 md:h-16" />
                      <span className="text-xs font-medium text-foreground/70">Bank Transfer</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Image src="/visa.png" alt="Card Payments" width={64} height={64} className="object-contain h-12 md:h-16" />
                      <span className="text-xs font-medium text-foreground/70">Card Payments</span>
                    </div>
                  </div>
                </div>

                <DialogFooter className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 bg-white rounded-xl shadow-lg border border-border p-4 md:p-6">
                  <div className="space-y-1 md:space-y-2">
                    <p className="text-xs md:text-sm font-semibold text-foreground/70">Total Amount</p>
                    <motion.p key={grandTotal} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-3xl md:text-5xl font-bold text-primary">
                      {currency} {grandTotal.toLocaleString()}
                    </motion.p>
                     <p className="text-xs md:text-sm text-foreground/60">
                       Base: {currency} {basePrice.toLocaleString()} x {nightsCount} nights x {numGuests} {numGuests === 1 ? 'guest' : 'guests'}
                       {addOnTotal > 0 && ` + Add-ons: ${currency} ${addOnTotal.toLocaleString()}`}
                     </p>
                  </div>
                  <Button onClick={handleSubmit} size="lg" disabled={submitting} className="bg-secondary text-white hover:bg-secondary/90 font-bold uppercase tracking-wide px-8 md:px-10 py-5 md:py-6 text-base md:text-lg shadow-lg hover:shadow-xl transition-all">
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Confirm Booking'
                    )}
                  </Button>
                </DialogFooter>
              </motion.div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
