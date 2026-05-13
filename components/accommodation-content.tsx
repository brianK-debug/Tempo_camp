'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export function AccommodationContent() {
  const tentOptions = [
    {
      name: 'Small Tent',
      price: 'Kshs 2,000',
      period: 'per night',
      description: 'Cozy safari tent, perfect for singles or couples seeking an authentic camping experience.',
      features: ['Comfortable sleeping area', 'Basic amenities', 'Outdoor shower option', 'Lantern lighting'],
      capacity: '1-2 persons',
    },
    {
      name: 'Large Tent',
      price: 'Kshs 5,000',
      period: 'per night',
      description: 'Spacious glamping tent with enhanced comfort and privacy in the heart of nature.',
      features: ['Large sleeping area', 'Full amenities', 'Private outdoor space', 'Upgraded furnishings'],
      capacity: '2-3 persons',
      featured: true,
    },
  ]

  const amenities = [
    { icon: '🍽️', title: 'Meals on Order', description: 'Chef-prepared cuisine tailored to your preferences' },
    { icon: '🥤', title: 'Soft Drinks', description: 'Refreshing beverages available throughout your stay' },
    { icon: '🏊', title: 'Swimming Pool Access', description: 'Residents: Kshs 500 | Non-residents: Kshs 1,000' },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden pt-32 md:pt-40">
        <Image
          src="/suite-luxury.jpg"
          alt="Luxury Accommodation"
          fill
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-center justify-center px-6">
          <div className="text-center text-white max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">
              Accommodation & Camping
            </h1>
            <p className="text-xl md:text-2xl font-light">Stay with Us in Comfort and Luxury</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 md:py-40 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Bed & Breakfast Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Bed & Breakfast
            </h2>
            <p className="text-lg text-foreground/75 max-w-2xl mb-12">
              Comfortable private rooms with premium amenities, en-suite bathrooms, and authentic safari hospitality. Single occupancy rooms designed for your comfort.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-72 rounded-lg overflow-hidden">
                <Image
                  src="/suite-luxury.jpg"
                  alt="Bed & Breakfast Room"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-bold text-foreground">
                  Single Occupancy Rooms
                </h3>
                <ul className="space-y-4">
                  {['Private room', 'En-suite bathroom', 'Bed & breakfast included', 'WiFi access', 'Room service'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span className="text-foreground/75">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Camping Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-12">
              Tent Camping Options
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {tentOptions.map((tent, idx) => (
                <motion.div
                  key={tent.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`rounded-lg p-8 border-2 transition-all ${
                    tent.featured
                      ? 'border-secondary bg-white shadow-xl scale-105'
                      : 'border-border bg-white'
                  }`}
                >
                  {tent.featured && (
                    <div className="inline-block px-4 py-1 bg-secondary text-foreground text-sm font-bold mb-4 rounded-full">
                      FEATURED
                    </div>
                  )}
                  <h3 className="text-3xl font-serif font-bold text-foreground mb-2">
                    {tent.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-secondary">{tent.price}</span>
                    <span className="text-foreground/60 ml-2">{tent.period}</span>
                  </div>
                  <p className="text-foreground/75 mb-6">{tent.description}</p>
                  <div className="mb-6 pb-6 border-b border-border">
                    <p className="text-sm font-semibold text-secondary mb-3">Capacity: {tent.capacity}</p>
                  </div>
                  <ul className="space-y-3">
                    {tent.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                        <span className="text-foreground/75 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Amenities Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-12 text-center">
              Amenities & Services
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {amenities.map((amenity, i) => (
                <motion.div
                  key={amenity.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-8 bg-white rounded-lg border border-border hover:shadow-lg transition-all"
                >
                  <div className="text-5xl mb-4">{amenity.icon}</div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-3">
                    {amenity.title}
                  </h3>
                  <p className="text-foreground/75">{amenity.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
