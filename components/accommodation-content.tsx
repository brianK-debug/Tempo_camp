'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

type OnBookNow = (data: { accommodation: string; rateType: string; ratePlan: string; singlePrice: string; doublePrice?: string; image?: string; skipOccupancy?: boolean }) => void

export function AccommodationContent({ onBookNow }: { onBookNow?: OnBookNow } = {}) {
  const residentCottageRates = [
    { plan: 'Bed Only', single: 'Ksh 3,000', double: 'Ksh 4,000' },
    { plan: 'Bed & Breakfast', single: 'Ksh 4,000', double: 'Ksh 5,500' },
    { plan: 'Half Board', single: 'Ksh 5,500', double: 'Ksh 7,500' },
    { plan: 'Full Board', single: 'Ksh 7,000', double: 'Ksh 9,500' },
  ]

  const residentTentRates = [
    { plan: 'Bed Only', single: 'Ksh 2,000', double: 'Ksh 3,500' },
    { plan: 'Bed & Breakfast', single: 'Ksh 3,000', double: 'Ksh 5,000' },
    { plan: 'Half Board', single: 'Ksh 4,500', double: 'Ksh 7,000' },
    { plan: 'Full Board', single: 'Ksh 6,000', double: 'Ksh 9,000' },
  ]

  const nonResidentCottageRates = [
    { plan: 'Bed Only', single: 'USD 35', double: 'USD 65' },
    { plan: 'Bed & Breakfast', single: 'USD 50', double: 'USD 90' },
    { plan: 'Half Board', single: 'USD 75', double: 'USD 130' },
    { plan: 'Full Board', single: 'USD 105', double: 'USD 160' },
  ]

  const nonResidentTentRates = [
    { plan: 'Bed Only', single: 'USD 30', double: 'USD 55' },
    { plan: 'Bed & Breakfast', single: 'USD 45', double: 'USD 80' },
    { plan: 'Half Board', single: 'USD 70', double: 'USD 120' },
    { plan: 'Full Board', single: 'USD 100', double: 'USD 150' },
  ]

  const amenities = [
    { title: 'Meals on Order', description: 'Chef-prepared cuisine tailored to your preferences' },
    { title: 'Soft Drinks', description: 'Refreshing beverages available throughout your stay' },
    { title: 'Swimming Pool Access', description: 'Residents: Kshs 500 | Non-residents: Kshs 1,000' },
  ]

  const rows = [
    {
      title: 'A Cottage',
      residentRates: residentCottageRates,
      nonResidentRates: nonResidentCottageRates,
      src: '/cottage.png',
      alt: 'Cottage Accommodation',
    },
    {
      title: 'Standard Tent',
      residentRates: residentTentRates,
      nonResidentRates: nonResidentTentRates,
      src: '/accomodation.jpeg',
      alt: 'Standard Tent',
    },
{
      title: 'Camping Ground',
      residentRates: [{ plan: 'Day Use', single: 'Ksh 1,000', double: 'Ksh 1,000' }],
      nonResidentRates: [{ plan: 'Day Use', single: 'USD 20', double: 'USD 20' }],
      src: '/tent-2.jpeg',
      alt: 'Camping Ground',
      skipOccupancy: true,
    },
  ]

  return (
    <>
      <section className="relative h-[60vh] md:h-screen overflow-hidden pt-28 md:pt-40">
        <Image
          src="/cottage.png"
          alt="Accommodation"
          fill
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-center justify-center px-6">
          <div className="text-center text-white max-w-3xl">
            <h1 className="text-4xl md:text-7xl font-serif font-bold mb-4">
              Safari Accommodation & Camping in Samburu
            </h1>
            <p className="text-lg md:text-2xl font-light">Discover Comfort and Nature at Samburu Tempo Camp</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 lg:py-40 bg-background">
        <div className="max-w-[95%] mx-auto px-3 md:px-8 lg:px-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-8 md:mb-12 text-center">
            Our Accommodation Rates
          </h2>

          <div className="space-y-6 md:space-y-4">
            {rows.map((item, idx) => (
              <div key={item.title} className={idx > 0 ? 'mt-10 md:mt-16' : ''}>
                {idx > 0 && <hr className="mb-6 md:mb-10 border-border" />}
                <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-4 md:mb-6 text-center">
                  {item.title}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                  <div className="flex flex-col">
                    <h4 className="text-lg md:text-xl font-serif font-bold text-foreground mb-2 md:mb-3 text-center md:text-left">
                      Resident Rates (KSH)
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[320px] bg-white rounded-lg shadow border border-border">
                        <thead>
                          <tr className="bg-primary text-white">
                            <th className="py-2 md:py-3 px-3 md:px-4 text-left text-xs md:text-sm">Plan</th>
                            <th className="py-2 md:py-3 px-3 md:px-4 text-center text-xs md:text-sm">Single</th>
                            <th className="py-2 md:py-3 px-3 md:px-4 text-center text-xs md:text-sm">Double</th>
                            <th className="py-2 md:py-3 px-3 md:px-4 text-center text-xs md:text-sm">Book</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.residentRates.map((rate, i) => (
                            <tr key={rate.plan} className={i % 2 === 0 ? 'bg-white' : 'bg-muted/20'}>
                              <td className="py-2 md:py-3 px-3 md:px-4 font-semibold text-foreground text-xs md:text-sm">{rate.plan}</td>
                              <td className="py-2 md:py-3 px-3 md:px-4 text-center text-secondary font-bold text-xs md:text-sm">{rate.single}</td>
                              <td className="py-2 md:py-3 px-3 md:px-4 text-center text-secondary font-bold text-xs md:text-sm">{rate.double}</td>
                              <td className="py-2 md:py-3 px-3 md:px-4 text-center">
<button
                                   onClick={() => onBookNow?.({ accommodation: `${item.title} — Resident`, rateType: 'resident-kes', ratePlan: rate.plan, singlePrice: rate.single, doublePrice: rate.double, image: item.src, skipOccupancy: item.skipOccupancy })}
                                   className="bg-secondary text-foreground px-2 md:px-3 py-1 rounded text-xs font-semibold uppercase tracking-wide hover:bg-secondary/90 transition-colors"
                                 >
                                   Book Now
                                 </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="relative h-48 md:h-64 lg:h-[320px] rounded-lg overflow-hidden">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover"
                      quality={90}
                    />
                  </div>

                  <div className="flex flex-col">
                    <h4 className="text-lg md:text-xl font-serif font-bold text-foreground mb-2 md:mb-3 text-center md:text-left">
                      Non resident rates (USD)
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[320px] bg-white rounded-lg shadow border border-border">
                        <thead>
                          <tr className="bg-primary text-white">
                            <th className="py-2 md:py-3 px-3 md:px-4 text-left text-xs md:text-sm">Plan</th>
                            <th className="py-2 md:py-3 px-3 md:px-4 text-center text-xs md:text-sm">Single</th>
                            <th className="py-2 md:py-3 px-3 md:px-4 text-center text-xs md:text-sm">Double</th>
                            <th className="py-2 md:py-3 px-3 md:px-4 text-center text-xs md:text-sm">Book</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.nonResidentRates.map((rate, i) => (
                            <tr key={rate.plan} className={i % 2 === 0 ? 'bg-white' : 'bg-muted/20'}>
                              <td className="py-2 md:py-3 px-3 md:px-4 font-semibold text-foreground text-xs md:text-sm">{rate.plan}</td>
                              <td className="py-2 md:py-3 px-3 md:px-4 text-center text-secondary font-bold text-xs md:text-sm">{rate.single}</td>
                              <td className="py-2 md:py-3 px-3 md:px-4 text-center text-secondary font-bold text-xs md:text-sm">{rate.double}</td>
                              <td className="py-2 md:py-3 px-3 md:px-4 text-center">
<button
                                   onClick={() => onBookNow?.({ accommodation: `${item.title} — Non-Resident`, rateType: 'non-resident-usd', ratePlan: rate.plan, singlePrice: rate.single, doublePrice: rate.double, image: item.src, skipOccupancy: item.skipOccupancy })}
                                   className="bg-secondary text-foreground px-2 md:px-3 py-1 rounded text-xs font-semibold uppercase tracking-wide hover:bg-secondary/90 transition-colors"
                                 >
                                   Book Now
                                 </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mt-12 md:mt-24">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-8 md:mb-12">
              Policies
            </h2>

            <div className="grid md:grid-cols-2 gap-6 md:gap-12">
              <div className="bg-white p-6 md:p-8 rounded-lg border border-border">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-4 md:mb-6">Child Policy</h3>
                <ul className="space-y-3 md:space-y-4">
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-secondary flex-shrink-0 mt-1" />
                    <span className="text-foreground/75 text-sm md:text-base">Up to 3 years sharing with adults: <strong>Free</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-secondary flex-shrink-0 mt-1" />
                    <span className="text-foreground/75 text-sm md:text-base">4–12 years sharing with adults: <strong>50% off adult rate</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-secondary flex-shrink-0 mt-1" />
                    <span className="text-foreground/75 text-sm md:text-base">4–12 years in own room: <strong>25% off adult rate</strong></span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-lg border border-border">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-4 md:mb-6">Agent Commission</h3>
                <p className="text-foreground/75 text-base md:text-lg">
                  Agents contract commission: <strong>10%</strong>
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mt-10 md:mt-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-8 md:mb-12 text-center">
              Amenities & Services
            </h2>
            <div className="grid md:grid-cols-3 gap-4 md:gap-8">
              {amenities.map((amenity, i) => (
                <motion.div
                  key={amenity.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 md:p-8 bg-white rounded-lg border border-border hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-2 md:mb-3">
                    {amenity.title}
                  </h3>
                  <p className="text-foreground/75 text-sm md:text-base">{amenity.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
