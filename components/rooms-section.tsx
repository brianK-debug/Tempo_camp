'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Check } from 'lucide-react'

export function RoomsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const rooms = [
    {
      name: 'Deluxe Tent',
      price: '$450',
      description: 'Spacious canvas accommodations with private verandas, en-suite baths, and open-air showers overlooking pristine wilderness.',
      features: ['King bed or twin', 'En-suite bathroom', 'Open-air shower', 'Private veranda', 'WiFi & charging'],
      image: '/suite-luxury.jpg',
    },
    {
      name: 'Luxury Suite',
      price: '$750',
      description: 'Premium stone-built suites with heated floors, private plunge pools, and curated sustainable luxury amenities.',
      features: ['King or twin beds', 'Private pool', 'Heated stone floor', 'Luxury toiletries', 'Concierge service'],
      featured: true,
      image: '/luxury-bedroom.jpg',
    },
    {
      name: 'Presidential Villa',
      price: '$1,200',
      description: 'Ultimate privacy and exclusivity with full-service amenities, personal attention, and bespoke experiences.',
      features: ['All inclusions', 'Personal guide', 'Private chef', 'Butler service', 'Infinity pool'],
      image: '/suite-luxury.jpg',
    },
  ]

  return (
    <section id="rooms" ref={ref} className="py-24 md:py-40 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-secondary text-sm font-light tracking-widest uppercase mb-4">Private Retreats</p>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground leading-tight">
            Sanctuaries Of <br /> Uncompromising Comfort
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {rooms.map((room, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className={`overflow-hidden transition-all duration-300 group ${
                room.featured
                  ? 'lg:col-span-1 lg:row-span-2 ring-2 ring-secondary shadow-2xl'
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

              {/* Content */}
              <div className={`p-8 md:p-10 ${room.featured ? 'bg-primary text-white' : 'bg-white'}`}>
                {room.featured && (
                  <span className="inline-block bg-secondary text-foreground px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-6">
                    Most Requested
                  </span>
                )}

                <div className="mb-6">
                  <h3 className={`text-3xl md:text-4xl font-serif font-bold mb-3 ${
                    room.featured ? 'text-white' : 'text-foreground'
                  }`}>
                    {room.name}
                  </h3>
                  <div className={`text-2xl font-semibold ${
                    room.featured ? 'text-secondary' : 'text-secondary'
                  }`}>
                    {room.price}
                    <span className="text-sm font-light">/night</span>
                  </div>
                </div>

                <p className={`mb-8 leading-relaxed text-lg font-light ${
                  room.featured ? 'text-white/90' : 'text-foreground/80'
                }`}>
                  {room.description}
                </p>

                <div className="space-y-4 mb-8">
                  {room.features.map((feature, fidx) => (
                    <motion.div
                      key={fidx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.5, delay: 0.3 + fidx * 0.1 }}
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

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 font-semibold uppercase tracking-wide transition-all ${
                    room.featured
                      ? 'bg-secondary text-foreground hover:bg-secondary/90'
                      : 'border-2 border-secondary text-secondary hover:bg-secondary hover:text-white'
                  }`}
                >
                  Reserve Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
