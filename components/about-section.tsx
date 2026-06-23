'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const values = [
  { title: 'Luxury', description: 'World-class amenities and uncompromising comfort' },
  { title: 'Sustainability', description: 'Carbon-neutral operations and conservation-focused practices' },
  { title: 'Authenticity', description: 'Genuine African experiences and cultural immersion' },
  { title: 'Excellence', description: 'Impeccable service standards and attention to detail' },
]

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="py-8 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="text-secondary text-sm font-light tracking-widest uppercase mb-4">Our Philosophy</p>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground leading-tight">
            Luxury Meets <br /> Sustainability
          </h2>
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center mb-8 md:mb-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8 }}
            className="relative h-96 md:h-[500px]"
          >
            <div className="relative h-full overflow-hidden rounded-lg">
              <Image
                src="/accomodation.jpeg"
                alt="Accommodation"
                fill
                className="object-cover"
                quality={85}
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <p className="text-lg md:text-xl text-foreground/85 leading-relaxed mb-6 font-light">
                At Samburu Tempo, we believe the future of travel lies in harmonizing world-class luxury with environmental stewardship. Our camps are designed as living laboratories of sustainable hospitality.
              </p>
              <p className="text-lg md:text-xl text-foreground/75 leading-relaxed font-light">
                Every experience is carefully curated to minimize impact while maximizing wonder—from solar-powered suites to chef-led conservation dining experiences.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              {values.map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="space-y-2"
                >
                  <h3 className="font-serif text-lg font-semibold text-foreground">{value.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
