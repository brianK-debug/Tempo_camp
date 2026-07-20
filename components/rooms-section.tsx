'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Check } from 'lucide-react'
import Link from 'next/link'

export function RoomsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const rooms = [
    {
      name: 'Cottage',
      description: 'Comfortable rooms with premium amenities, en-suite bathrooms, and authentic safari hospitality.',
      features: ['Private room', 'En-suite bathroom', 'WiFi access', 'Room service', 'Veranda'],
      residentRates: [
        { plan: 'Bed Only', single: 'Ksh 3,000', double: 'Ksh 4,000' },
        { plan: 'Bed & Breakfast', single: 'Ksh 4,000', double: 'Ksh 5,500' },
        { plan: 'Half Board', single: 'Ksh 5,500', double: 'Ksh 7,500' },
        { plan: 'Full Board', single: 'Ksh 7,000', double: 'Ksh 9,500' },
      ],
      nonResidentRates: [
        { plan: 'Bed Only', single: 'USD 35', double: 'USD 65' },
        { plan: 'Bed & Breakfast', single: 'USD 50', double: 'USD 90' },
        { plan: 'Half Board', single: 'USD 75', double: 'USD 130' },
        { plan: 'Full Board', single: 'USD 105', double: 'USD 160' },
      ],
      image: '/tent-b.jpeg',
      featured: true,
    },
    {
      name: 'Standard Tent',
      description: 'Spacious safari tents with comfortable furnishings and private facilities.',
      features: ['Comfortable sleeping area', 'Full amenities', 'Private outdoor space', 'Upgraded furnishings'],
      residentRates: [
        { plan: 'Bed Only', single: 'Ksh 2,000', double: 'Ksh 3,500' },
        { plan: 'Bed & Breakfast', single: 'Ksh 3,000', double: 'Ksh 5,000' },
        { plan: 'Half Board', single: 'Ksh 4,500', double: 'Ksh 7,000' },
        { plan: 'Full Board', single: 'Ksh 6,000', double: 'Ksh 9,000' },
      ],
      nonResidentRates: [
        { plan: 'Bed Only', single: 'USD 30', double: 'USD 55' },
        { plan: 'Bed & Breakfast', single: 'USD 45', double: 'USD 80' },
        { plan: 'Half Board', single: 'USD 70', double: 'USD 120' },
        { plan: 'Full Board', single: 'USD 100', double: 'USD 150' },
      ],
      image: '/accomodation.jpeg',
    },
    {
      name: 'Camping Ground',
      description: 'Open-air camping experience under the vast African sky, perfect for adventurers.',
      features: ['Open campsite', 'Fire pit', 'Shared amenities', 'Nature immersion', 'Day use available'],
      residentRates: [
        { plan: 'Day Use', price: 'Ksh 1,000' },
      ],
      nonResidentRates: [
        { plan: 'Day Use', price: 'USD 20' },
      ],
      image: '/tent-2.jpeg',
    },
  ]

  return (
    <section id="rooms" ref={ref} className="py-8 md:py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="text-secondary text-sm font-light tracking-widest uppercase mb-4">Accommodation</p>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground leading-tight">
            Stay With Us In <br /> Comfort And Luxury
          </h2>
        </motion.div>

<div className="grid lg:grid-cols-3 gap-8 items-stretch">
           {rooms.map((room, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, y: 40 }}
               animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
               transition={{ duration: 0.8, delay: idx * 0.15 }}
               className={`overflow-hidden transition-all duration-300 group flex flex-col h-full ${
                 room.featured
                   ? 'ring-2 ring-secondary shadow-2xl'
                   : ''
               }`}
             >
              {/* Image */}
              {room.image && (
                <div className="relative h-64 lg:h-80 overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
              )}

              {/* Content - use flex-1 to fill available space and flex-col to arrange items */}
              <div className={`p-8 md:p-10 ${room.featured ? 'bg-primary text-white' : 'bg-white'} flex flex-col flex-1`}>
                {room.featured && (
                  <span className="inline-block bg-secondary text-foreground px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-6">
                    Featured
                  </span>
                )}

                <div className="mb-6">
                  <h3 className={`text-3xl md:text-4xl font-serif font-bold mb-3 ${
                    room.featured ? 'text-white' : 'text-foreground'
                  }`}>
                    {room.name}
                  </h3>
                </div>

                <p className={`mb-8 leading-relaxed text-lg font-light ${
                  room.featured ? 'text-white/90' : 'text-foreground/80'
                }`}>
                  {room.description}
                </p>

                {/* Rates Table */}
                <div className="mb-8 overflow-x-auto">
                   <p className={`text-sm font-semibold mb-3 ${room.featured ? 'text-white' : 'text-foreground'}`}>Resident Rates (KSH):</p>
                    <table className="w-full text-sm mb-4">
                      <thead>
                        <tr className={`border-b ${room.featured ? 'border-white/20' : 'border-border'}`}>
                          <th className="text-left py-1">Plan</th>
                          {room.name === 'Camping Ground' ? (
                            <th colSpan={2} className="text-center py-1">Price</th>
                          ) : (
                            <>
                              <th className="text-center py-1">Single</th>
                              <th className="text-center py-1">Double</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {room.residentRates.map((rate) => (
                          <tr key={rate.plan} className={`border-b ${room.featured ? 'border-white/10' : 'border-border'}`}>
                            <td className="py-1">{rate.plan}</td>
                            {room.name === 'Camping Ground' ? (
                              <td colSpan={2} className="text-center py-1 text-secondary font-bold">{rate.price}</td>
                            ) : (
                              <>
                                <td className="text-center py-1 text-secondary font-bold">{rate.single}</td>
                                <td className="text-center py-1 text-secondary font-bold">{rate.double}</td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  
                   <p className={`text-sm font-semibold mb-3 ${room.featured ? 'text-white' : 'text-foreground'}`}>Non-Resident Rates (USD):</p>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className={`border-b ${room.featured ? 'border-white/20' : 'border-border'}`}>
                          <th className="text-left py-1">Plan</th>
                          {room.name === 'Camping Ground' ? (
                            <th colSpan={2} className="text-center py-1">Price</th>
                          ) : (
                            <>
                              <th className="text-center py-1">Single</th>
                              <th className="text-center py-1">Double</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {room.nonResidentRates.map((rate) => (
                          <tr key={rate.plan} className={`border-b ${room.featured ? 'border-white/10' : 'border-border'}`}>
                            <td className="py-1">{rate.plan}</td>
                            {room.name === 'Camping Ground' ? (
                              <td colSpan={2} className="text-center py-1 text-secondary font-bold">{rate.price}</td>
                            ) : (
                              <>
                                <td className="text-center py-1 text-secondary font-bold">{rate.single}</td>
                                <td className="text-center py-1 text-secondary font-bold">{rate.double}</td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                </div>

                <div className="space-y-4 mb-8">
                  {room.features.map((feature) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.5, delay: 0.3 + feature * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <Check className={`w-5 h-5 flex-shrink-0 ${
                        room.featured ? 'text-secondary' : 'text-secondary'
                      }`} />
                      <span className={room.featured ? 'text-white/90' : 'text-foreground/80'}>
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <Link href="/experiences/accommodation">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 font-semibold uppercase tracking-wide transition-all mt-auto ${
                      room.featured
                        ? 'bg-secondary text-foreground hover:bg-secondary/90'
                        : 'border-2 border-secondary text-secondary hover:bg-secondary hover:text-white'
                    }`}
                  >
                    Book Now
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Child Policy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 bg-white p-8 rounded-lg border border-border"
        >
          <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Child Policy</h3>
          <ul className="grid md:grid-cols-3 gap-4">
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
              <span className="text-foreground/75">Up to 3 years sharing with adults: <strong>Free</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
              <span className="text-foreground/75">4–12 years sharing with adults: <strong>50% off adult rate</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
              <span className="text-foreground/75">4–12 years in own room: <strong>25% off adult rate</strong></span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}