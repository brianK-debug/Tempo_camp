'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Leaf, Users, Compass, Award } from 'lucide-react'

export function WhyStaySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const reasons = [
    {
      icon: Award,
      title: 'Eco-Lodge Excellence',
      description: 'World-class amenities built with sustainable materials, solar power, and water conservation systems without compromising luxury.',
    },
    {
      icon: Users,
      title: 'Authentic Cultural Experiences',
      description: 'Immersive encounters with Samburu communities, traditional ceremonies, and genuine human connection beyond tourism.',
    },
    {
      icon: Compass,
      title: 'Adventure & Exploration',
      description: 'Expert-guided safaris, nature walks, stargazing expeditions, and immersive wildlife encounters in pristine wilderness.',
    },
    {
      icon: Leaf,
      title: 'Community & Impact',
      description: 'Every stay directly supports conservation, youth education, and local economic development across the region.',
    },
  ]

  return (
    <section id="why-stay" ref={ref} className="py-24 md:py-40 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-secondary text-sm font-light tracking-widest uppercase mb-4">Why Choose Us</p>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground leading-tight">
            Why Stay With Us
          </h2>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {reasons.map((reason, idx) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: idx * 0.12 }}
                className="group bg-white p-8 md:p-10 border border-border hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-white transition-all">
                  <Icon className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                  {reason.title}
                </h3>
                <p className="text-lg text-foreground/75 leading-relaxed font-light">
                  {reason.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
