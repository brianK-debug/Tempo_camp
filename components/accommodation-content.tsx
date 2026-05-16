'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export function AccommodationContent() {
  const residentCottageRates = [
    { plan: 'Bed Only', single: 'Ksh 2,500', double: 'Ksh 3,500' },
    { plan: 'Bed & Breakfast', single: 'Ksh 10,500', double: 'Ksh 14,500' },
    { plan: 'Half Board', single: 'Ksh 10,000', double: 'Ksh 15,500' },
    { plan: 'Full Board', single: 'Ksh 13,500', double: 'Ksh 19,500' },
  ]

  const residentTentRates = [
    { plan: 'Bed Only', single: 'Ksh 2,000', double: 'Ksh 2,500' },
    { plan: 'Bed & Breakfast', single: 'Ksh 7,500', double: 'Ksh 12,000' },
    { plan: 'Half Board', single: 'Ksh 7,000', double: 'Ksh 13,000' },
    { plan: 'Full Board', single: 'Ksh 10,500', double: 'Ksh 18,000' },
  ]

  const nonResidentCottageRates = [
    { plan: 'Bed Only', single: 'USD 75', double: 'USD 120' },
    { plan: 'Bed & Breakfast', single: 'USD 85', double: 'USD 140' },
    { plan: 'Half Board', single: 'USD 100', double: 'USD 170' },
    { plan: 'Full Board', single: 'USD 130', double: 'USD 200' },
  ]

  const nonResidentTentRates = [
    { plan: 'Bed Only', single: 'USD 60', double: 'USD 110' },
    { plan: 'Bed & Breakfast', single: 'USD 70', double: 'USD 120' },
    { plan: 'Half Board', single: 'USD 85', double: 'USD 150' },
    { plan: 'Full Board', single: 'USD 100', double: 'USD 180' },
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
          src="/tent-camping.jpg"
          alt="Accommodation"
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

      <section className="py-24 md:py-40 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Resident Rates (KSH)
            </h2>
            
            {/* Cottage Section */}
            <div className="mb-16">
              <h3 className="text-3xl font-serif font-bold text-foreground mb-6">Cottage</h3>
              <div className="relative h-64 rounded-lg overflow-hidden mb-8">
                <Image
                  src="/suite-luxury.jpg"
                  alt="Cottage Accommodation"
                  fill
                  className="object-cover"
                  quality={90}
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow border border-border">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="py-4 px-6 text-left">Plan</th>
                      <th className="py-4 px-6 text-center">Single</th>
                      <th className="py-4 px-6 text-center">Double</th>
                    </tr>
                  </thead>
                  <tbody>
                    {residentCottageRates.map((rate, i) => (
                      <tr key={rate.plan} className={i % 2 === 0 ? 'bg-white' : 'bg-muted/20'}>
                        <td className="py-4 px-6 font-semibold text-foreground">{rate.plan}</td>
                        <td className="py-4 px-6 text-center text-secondary font-bold">{rate.single}</td>
                        <td className="py-4 px-6 text-center text-secondary font-bold">{rate.double}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Standard Tent Section */}
            <div className="mb-16">
              <h3 className="text-3xl font-serif font-bold text-foreground mb-6">Standard Tent</h3>
              <div className="relative h-64 rounded-lg overflow-hidden mb-8">
                <Image
                  src="/tent-camping.jpg"
                  alt="Standard Tent"
                  fill
                  className="object-cover"
                  quality={90}
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow border border-border">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="py-4 px-6 text-left">Plan</th>
                      <th className="py-4 px-6 text-center">Single</th>
                      <th className="py-4 px-6 text-center">Double</th>
                    </tr>
                  </thead>
                  <tbody>
                    {residentTentRates.map((rate, i) => (
                      <tr key={rate.plan} className={i % 2 === 0 ? 'bg-white' : 'bg-muted/20'}>
                        <td className="py-4 px-6 font-semibold text-foreground">{rate.plan}</td>
                        <td className="py-4 px-6 text-center text-secondary font-bold">{rate.single}</td>
                        <td className="py-4 px-6 text-center text-secondary font-bold">{rate.double}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Non-Resident Rates (USD)
            </h2>
            
            {/* Cottage Section */}
            <div className="mb-16">
              <h3 className="text-3xl font-serif font-bold text-foreground mb-6">Cottage</h3>
              <div className="relative h-64 rounded-lg overflow-hidden mb-8">
                <Image
                  src="/suite-luxury.jpg"
                  alt="Cottage Accommodation"
                  fill
                  className="object-cover"
                  quality={90}
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow border border-border">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="py-4 px-6 text-left">Plan</th>
                      <th className="py-4 px-6 text-center">Single</th>
                      <th className="py-4 px-6 text-center">Double</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nonResidentCottageRates.map((rate, i) => (
                      <tr key={rate.plan} className={i % 2 === 0 ? 'bg-white' : 'bg-muted/20'}>
                        <td className="py-4 px-6 font-semibold text-foreground">{rate.plan}</td>
                        <td className="py-4 px-6 text-center text-secondary font-bold">{rate.single}</td>
                        <td className="py-4 px-6 text-center text-secondary font-bold">{rate.double}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Standard Tent Section */}
            <div className="mb-16">
              <h3 className="text-3xl font-serif font-bold text-foreground mb-6">Standard Tent</h3>
              <div className="relative h-64 rounded-lg overflow-hidden mb-8">
                <Image
                  src="/tent-camping.jpg"
                  alt="Standard Tent"
                  fill
                  className="object-cover"
                  quality={90}
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow border border-border">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="py-4 px-6 text-left">Plan</th>
                      <th className="py-4 px-6 text-center">Single</th>
                      <th className="py-4 px-6 text-center">Double</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nonResidentTentRates.map((rate, i) => (
                      <tr key={rate.plan} className={i % 2 === 0 ? 'bg-white' : 'bg-muted/20'}>
                        <td className="py-4 px-6 font-semibold text-foreground">{rate.plan}</td>
                        <td className="py-4 px-6 text-center text-secondary font-bold">{rate.single}</td>
                        <td className="py-4 px-6 text-center text-secondary font-bold">{rate.double}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Child Policy & Agent Commission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-12">
              Policies
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-lg border border-border">
                <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Child Policy</h3>
                <ul className="space-y-4">
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
              </div>

              <div className="bg-white p-8 rounded-lg border border-border">
                <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Agent Commission</h3>
                <p className="text-foreground/75 text-lg">
                  Agents contract commission: <strong>10%</strong>
                </p>
              </div>
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