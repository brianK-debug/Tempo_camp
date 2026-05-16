'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function WildlifeContent() {
  const safariTypes = [
    {
      name: 'Morning Safari',
      duration: '5:00 AM - 9:00 AM',
      description: 'Experience the golden sunrise and spot animals at their most active.',
      includes: ['Expert guide', 'Vehicle with open roof', 'Binoculars', 'Safari breakfast'],
    },
    {
      name: 'Afternoon Safari',
      duration: '3:00 PM - 6:00 PM',
      description: 'Perfect for photography with different lighting and afternoon wildlife behavior.',
      includes: ['Expert guide', 'Vehicle with open roof', 'Binoculars', 'Refreshments'],
    },
    {
      name: 'Full Day Safari',
      duration: '5:00 AM - 5:00 PM',
      description: 'Comprehensive experience with lunch at scenic viewpoint and maximum wildlife exposure.',
      includes: ['Expert guide', 'Premium vehicle', 'Binoculars', 'Full meals'],
      featured: true,
    },
    {
      name: 'Night Safari',
      duration: '7:00 PM - 9:00 PM',
      description: 'Discover nocturnal wildlife rarely seen during the day with night vision spotlights.',
      includes: ['Expert guide', 'Night vision equipment', 'Binoculars', 'Light refreshments'],
    },
  ]

  const activities = [
    {
      title: 'Game Drive',
      description: 'Samburu, Buffalo Springs & Shaba National Reserve',
    },
    {
      title: 'Park Entry Fees',
      resident: 'Ksh 1,600 per person',
      nonResident: 'USD 85 per person',
    },
    {
      title: 'Nature Walk',
      description: 'Free',
    },
    {
      title: 'Cultural Village Visit',
      description: 'Ksh 2,000 per person',
    },
    {
      title: 'Samburu Dance',
      description: 'Ksh 10,000 per dance',
    },
    {
      title: 'Mt. Ololokwe Hiking',
      items: [
        'Hiking Fee: Ksh 2,000 per person',
        'Conservation Fee: Ksh 3,000 per person per night',
        'Guide Fee: Ksh 3,000 per day',
      ],
    },
    {
      title: 'Reteti Elephant Sanctuary',
      resident: 'USD 3 per person',
      nonResident: 'USD 35 per person',
    },
    {
      title: 'Camping',
      description: 'USD 10 per person',
    },
    {
      title: 'Vehicle Hire (Safari Land Cruiser)',
      description: 'USD 200 full day',
    },
  ]

  return (
    <>
      {/* Hero */}
      <section className="relative h-96 md:h-[500px] overflow-hidden pt-32 md:pt-40">
        <Image
          src="/safari-jeep.jpg"
          alt="Safari Experience"
          fill
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-center justify-center px-6">
          <div className="text-center text-white max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">Wildlife & Nature</h1>
            <p className="text-xl md:text-2xl font-light">Epic Safari Adventures with Expert Guides</p>
          </div>
        </div>
      </section>

      {/* Safari Types */}
      <section className="py-24 md:py-40 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-16">
            Safari Experiences
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {safariTypes.map((safari, i) => (
              <motion.div
                key={safari.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-lg p-8 border-2 ${
                  safari.featured
                    ? 'border-secondary bg-white shadow-xl'
                    : 'border-border bg-white'
                }`}
              >
                {safari.featured && (
                  <div className="inline-block px-4 py-1 bg-secondary text-foreground text-sm font-bold mb-4 rounded-full">
                    FEATURED
                  </div>
                )}
                <h3 className="text-3xl font-serif font-bold text-foreground mb-2">{safari.name}</h3>
                <p className="text-secondary font-semibold mb-4">{safari.duration}</p>
                <p className="text-foreground/75 mb-6">{safari.description}</p>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-3">Includes:</p>
                  <ul className="space-y-2">
                    {safari.includes.map((item) => (
                      <li key={item} className="text-sm text-foreground/75 flex items-center gap-2">
                        <span className="text-secondary">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities & Rates */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-16">
            Other Activities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity, i) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-background p-6 rounded-lg border border-border"
              >
                <h3 className="text-xl font-serif font-bold text-foreground mb-3">{activity.title}</h3>
                {activity.description && (
                  <p className="text-foreground/75">{activity.description}</p>
                )}
                {activity.resident && (
                  <div className="mt-2">
                    <p className="text-foreground/75"><span className="font-semibold">Resident:</span> {activity.resident}</p>
                    <p className="text-foreground/75"><span className="font-semibold">Non-Resident:</span> {activity.nonResident}</p>
                  </div>
                )}
                {activity.items && (
                  <ul className="mt-2 space-y-1">
                    {activity.items.map((item, idx) => (
                      <li key={idx} className="text-sm text-foreground/75">• {item}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-16">
            Why Our Safaris Are Special
          </h2>
          <div className="grid md:grid-cols-2 gap-12 text-left">
            {[
              {
                title: 'Expert Guides',
                desc: 'Experienced naturalists with deep knowledge of Samburu ecosystem and animal behavior',
              },
              {
                title: 'Flexible Timing',
                desc: 'Multiple safari options throughout the day to suit your preferences and schedule',
              },
              {
                title: 'Small Groups',
                desc: 'Intimate group sizes ensuring personal attention and better wildlife encounters',
              },
              {
                title: 'Premium Locations',
                desc: 'Access to prime wildlife viewing areas with high concentration of animals',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="text-2xl font-serif font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-foreground/75">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}