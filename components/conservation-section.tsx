'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { Leaf, Trees, Users, Heart } from 'lucide-react'

export function ConservationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const impacts = [
    {
      icon: Trees,
      metric: '50,000+',
      label: 'Trees Conserved',
      description: 'Active habitat restoration and reforestation initiatives',
    },
    {
      icon: Users,
      metric: '200+',
      label: 'Local Employment',
      description: 'Direct jobs supporting local communities',
    },
    {
      icon: Heart,
      metric: '30%',
      label: 'Community Profit Share',
      description: 'Revenue invested in local development',
    },
    {
      icon: Leaf,
      metric: '100%',
      label: 'Carbon Neutral',
      description: 'Renewable energy & offset programs',
    },
  ]

  return (
    <section id="conservation" ref={ref} className="py-24 md:py-40 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-secondary text-sm font-light tracking-widest uppercase mb-4">Giving Back</p>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground leading-tight mb-6">
            A Stay That Gives Back
          </h2>
          <p className="text-lg md:text-xl text-foreground/75 max-w-3xl mx-auto font-light">
            Luxury and responsibility are inseparable at Samburu Tempo. Every guest contributes to conservation, community empowerment, and environmental stewardship.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center mb-16 md:mb-24">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8 }}
            className="relative h-80 md:h-96"
          >
            <Image
              src="/conservation-impact.jpg"
              alt="Community impact and conservation initiatives"
              fill
              className="object-cover"
              quality={85}
            />
          </motion.div>

          {/* Impact Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                Impact By The Numbers
              </h3>
              <p className="text-lg text-foreground/75 font-light leading-relaxed">
                Our commitment to conservation and community development creates measurable positive change in Samburu and beyond.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {impacts.map((impact, idx) => {
                const Icon = impact.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                    className="bg-white p-6 border border-border"
                  >
                    <Icon className="w-6 h-6 text-secondary mb-3" />
                    <div className="text-3xl font-serif font-bold text-foreground mb-1">
                      {impact.metric}
                    </div>
                    <div className="text-sm font-semibold text-foreground mb-2">
                      {impact.label}
                    </div>
                    <p className="text-xs text-foreground/60 leading-relaxed">
                      {impact.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Three Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              title: 'Environmental Stewardship',
              description: 'Carbon-neutral operations, renewable energy, water conservation, and active habitat restoration protecting the Samburu ecosystem for future generations.',
            },
            {
              title: 'Youth Empowerment',
              description: 'Educational programs through Tembo Kids Initiative, providing mentorship, leadership development, and conservation careers to local youth.',
            },
            {
              title: 'Cultural Preservation',
              description: 'Supporting Samburu communities in maintaining cultural traditions while creating sustainable economic opportunities through authentic cultural experiences.',
            },
          ].map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
              className="bg-white p-8 border border-border"
            >
              <h4 className="text-xl font-serif font-bold text-foreground mb-4">{pillar.title}</h4>
              <p className="text-foreground/75 leading-relaxed font-light">{pillar.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
