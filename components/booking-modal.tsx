'use client'

import { useState, useMemo, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { motion } from 'framer-motion'
import Image from 'next/image'

const nightsOptions = [
  { id: '1-night', label: '1 Night' },
  { id: '2-nights', label: '2 Nights' },
  { id: '3-nights', label: '3 Nights' },
  { id: '4-nights', label: '4 Nights' },
  { id: '5-nights', label: '5 Nights' },
  { id: '6-nights', label: '6 Nights' },
  { id: '7-nights', label: '7+ Nights' },
]

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
}

export function BookingModal({ open, onOpenChange, bookingData }: { open: boolean; onOpenChange: (open: boolean) => void; bookingData: BookingData | null }) {
  const initialRateType = bookingData?.rateType ?? 'resident-kes'
  const initialRatePlan = bookingData?.ratePlan ?? 'bed-only'

  const [selectedRateType, setSelectedRateType] = useState(initialRateType)
  const [selectedRatePlan, setSelectedRatePlan] = useState(initialRatePlan)
  const [selectedNights, setSelectedNights] = useState('2-nights')
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [numGuests, setNumGuests] = useState(2)
  const [guestName, setGuestName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    setSelectedRateType(bookingData?.rateType ?? 'resident-kes')
    setSelectedRatePlan(bookingData?.ratePlan ?? 'bed-only')
    setSelectedNights('2-nights')
    setSelectedAddOns([])
    setNumGuests(2)
    setGuestName('')
    setEmail('')
    setPhone('')
    setSpecialRequests('')
    setIsSubmitted(false)
  }, [bookingData?.rateType, bookingData?.ratePlan])

  const selectedRateTypeLabel = rateTypeOptions.find((o) => o.id === selectedRateType)?.label ?? ''
  const currency = rateTypeOptions.find((o) => o.id === selectedRateType)?.currency ?? 'KSH'

  const basePrice = useMemo(() => bookingData?.basePrice ?? 0, [bookingData])

  const nightsCount = useMemo(() => parseInt(selectedNights.split('-')[0]) || 2, [selectedNights])

  const addOnTotal = useMemo(() => {
    return selectedAddOns.reduce((total, addOnId) => {
      const addOn = addOns.find((a) => a.id === addOnId)
      if (!addOn) return total
      const price = currency === 'USD' ? addOn.priceUsd : addOn.priceKsh
      return total + price * numGuests
    }, 0)
  }, [selectedAddOns, currency, numGuests])

  const grandTotal = useMemo(() => {
    const multiplier = selectedNights === '7-nights' ? 7 : nightsCount
    return basePrice * multiplier + addOnTotal
  }, [basePrice, nightsCount, selectedNights, addOnTotal])

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns((prev) => (prev.includes(addOnId) ? prev.filter((id) => id !== addOnId) : [...prev, addOnId]))
  }

  const handleSubmit = async () => {
    const payload = {
      accommodation: accommodationName,
      rateType: selectedRateType,
      ratePlan: selectedRatePlan,
      basePrice,
      currency,
      selectedNights,
      numGuests,
      selectedAddOns,
      addOnTotal,
      grandTotal,
      guestName,
      email,
      phone,
      specialRequests,
    }
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        console.error('Booking submit failed', await res.json().catch(() => ({ error: 'Unknown error' })))
        return
      }
      setIsSubmitted(true)
    } catch (err) {
      console.error('Booking submit failed', err)
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
                <p className="text-4xl md:text-5xl font-bold text-primary mb-4">Booking Confirmed!</p>
                <p className="text-lg md:text-xl text-foreground/70">We will contact you shortly.</p>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-6 md:space-y-8">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl shadow-lg border border-border p-4 md:p-6">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-4">Selected Accommodation</h3>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-2xl md:text-3xl font-bold text-primary">{accommodationName}</p>
                      <p className="text-foreground/70 text-base md:text-lg mt-2">
                        Rate Type: <span className="font-bold text-secondary">{selectedRateTypeLabel}</span>
                      </p>
                    </div>
                    <div className="bg-primary/90 px-4 md:px-6 py-3 md:py-4 rounded-xl shadow-md">
                      <p className="text-xs md:text-sm text-white/90 font-medium">Base Price</p>
                      <p className="text-2xl md:text-3xl font-bold text-white mt-1">
                        {currency} {basePrice.toLocaleString()}
                      </p>
                    </div>
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
                      <div>
                        <Label className="text-xs md:text-sm font-semibold text-foreground/80 mb-2 block">Number of Nights</Label>
                        <RadioGroup value={selectedNights} onValueChange={setSelectedNights} className="grid grid-cols-2 gap-2">
                          {nightsOptions.map((night) => (
                            <div key={night.id} className="flex items-center space-x-2">
                              <RadioGroupItem value={night.id} id={night.id} className="text-primary border-2 border-slate-300 h-3.5 w-3.5" />
                              <Label htmlFor={night.id} className="text-xs md:text-sm font-medium text-foreground/80 cursor-pointer">{night.label}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
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
                      <Input value={guestName} onChange={(e) => setGuestName(e.target.value)} placeholder="Full Name" className="border-2 border-slate-200 focus:border-primary focus:ring-primary text-sm md:text-base h-10 md:h-11" />
                      <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" className="border-2 border-slate-200 focus:border-primary focus:ring-primary text-sm md:text-base h-10 md:h-11" />
                      <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="border-2 border-slate-200 focus:border-primary focus:ring-primary text-sm md:text-base h-10 md:h-11" />
                      <Textarea value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} placeholder="Special Requests or Notes" rows={3} className="border-2 border-slate-200 focus:border-primary focus:ring-primary text-sm md:text-base resize-none" />
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="bg-gradient-to-br from-primary to-primary/90 rounded-xl shadow-lg p-5 md:p-6 text-white flex flex-col">
                    <h3 className="text-lg md:text-xl font-serif font-bold mb-3 md:mb-4">Booking Summary</h3>
                    <div className="space-y-2 md:space-y-3 text-xs md:text-sm flex-1">
                      <div className="flex justify-between items-center">
                        <span className="text-white/90">Accommodation ({nightsCount} {nightsCount === 1 ? 'night' : 'nights'})</span>
                        <span className="font-bold text-white">{(basePrice * nightsCount).toLocaleString()}</span>
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

                <DialogFooter className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 bg-white rounded-xl shadow-lg border border-border p-4 md:p-6">
                  <div className="space-y-1 md:space-y-2">
                    <p className="text-xs md:text-sm font-semibold text-foreground/70">Total Amount</p>
                    <motion.p key={grandTotal} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-3xl md:text-5xl font-bold text-primary">
                      {currency} {grandTotal.toLocaleString()}
                    </motion.p>
                    <p className="text-xs md:text-sm text-foreground/60">
                      Base: {currency} {basePrice.toLocaleString()} x {selectedNights === '7-nights' ? 7 : nightsCount} nights
                      {addOnTotal > 0 && ` + Add-ons: ${currency} ${addOnTotal.toLocaleString()}`}
                    </p>
                  </div>
                  <Button onClick={handleSubmit} size="lg" className="bg-secondary text-white hover:bg-secondary/90 font-bold uppercase tracking-wide px-8 md:px-10 py-5 md:py-6 text-base md:text-lg shadow-lg hover:shadow-xl transition-all">
                    Confirm Booking
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
