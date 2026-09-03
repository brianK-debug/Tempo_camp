'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export function WhyStaySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [currentSlide, setCurrentSlide] = useState(0)

  const reasons = [
    {
      title: 'Tents and Campings',
      description: 'Experience luxurious safari camping under African skies with premium accommodations and stunning wilderness views.',
    },
    {
      title: 'Guided nature tours',
      description: 'Expert-led wildlife excursions through pristine Samburu landscapes with opportunities to spot the Big Five.',
    },
    {
      title: 'Swimming and relaxation',
      description: 'Unwind at our infinity pool overlooking the savanna or enjoy rejuvenating spa treatments in a serene natural setting.',
    },
    {
      title: 'Sunsets, Bonfires, and Sunrise',
      description: 'Magical evening gatherings around bonfires followed by breathtaking sunrise wildlife viewing experiences.',
    },
  ]

  const sliderImages = [
    '/bonfire-1.jpeg',
    '/night-3.jpeg',
    '/tent-a.jpeg',
    '/accommodation-1.jpeg',
    '/swimmingpool-2.jpeg',
    '/breakfast.jpeg'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [sliderImages.length])

  return (
    <section id="why-stay" ref={ref} className="py-8 md:py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="text-secondary text-sm font-light tracking-widest uppercase mb-4">Why Choose Us</p>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground leading-tight">
            Experience the Beauty of the Wild
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Reasons */}
          <div className="flex flex-col justify-between h-[500px] md:h-[600px]">
            {reasons.map((reason, idx) => {
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className="bg-white p-5 border border-border hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-serif font-bold text-foreground mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-foreground/75 leading-relaxed font-light">
                    {reason.description}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Right: Image Slider */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[500px] md:h-[600px] overflow-hidden rounded-lg shadow-2xl"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={sliderImages[currentSlide]}
                  alt={`Experience image ${currentSlide + 1}`}
                  fill
                  className="object-cover"
                  quality={85}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}