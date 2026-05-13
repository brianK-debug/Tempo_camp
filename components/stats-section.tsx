'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [counters, setCounters] = useState({
    guests: 0,
    experiences: 0,
    conservation: 0,
    staff: 0,
  })

  const stats = [
    { label: 'Happy Guests', value: 10000, icon: '👥' },
    { label: 'Unique Experiences', value: 150, icon: '🌍' },
    { label: 'Conservation Projects', value: 50, icon: '🌿' },
    { label: 'Expert Staff', value: 200, icon: '👨‍💼' },
  ]

  useEffect(() => {
    if (!isInView) return

    const targets = { guests: 10000, experiences: 150, conservation: 50, staff: 200 }
    const duration = 2000
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      setCounters({
        guests: Math.floor(targets.guests * progress),
        experiences: Math.floor(targets.experiences * progress),
        conservation: Math.floor(targets.conservation * progress),
        staff: Math.floor(targets.staff * progress),
      })

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [isInView])

  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="grid md:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl md:text-6xl font-serif font-bold mb-3">
                {idx === 0 && counters.guests.toLocaleString()}
                {idx === 1 && counters.experiences}
                {idx === 2 && counters.conservation}
                {idx === 3 && counters.staff}
              </div>
              <div className="text-lg text-primary-foreground/80">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
