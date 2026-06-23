'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export function ImageSlider({ images, alt, className = 'h-80 md:h-96' }: { images: string[], alt: string, className?: string }) {
  const offset = useRef(Math.floor(Math.random() * images.length)).current
  const [currentSlide, setCurrentSlide] = useState(offset)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    const baseDuration = 4000
    const jitter = Math.floor(Math.random() * 1500) - 750
    intervalRef.current = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, baseDuration + jitter)
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current)
    }
  }, [images.length])

  useEffect(() => {
    setCurrentSlide(offset)
  }, [offset])

  return (
    <div className={`relative ${className} overflow-hidden group`}>
      {images.map((src, idx) => (
        <motion.div
          key={src}
          animate={{ opacity: idx === currentSlide ? 1 : 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={src}
            alt={idx === currentSlide ? alt : `${alt} ${idx + 1}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            quality={85}
          />
        </motion.div>
      ))}
    </div>
  )
}

export function ExperiencesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const experiences = [
    {
      title: 'Safari Expeditions',
      description: 'Guided game drives through pristine wilderness with expert naturalists, tracking the Big Five and rare species.',
      images: ['/cheetah.jpeg', '/elephant-2.jpeg', '/gazelle.jpeg', '/jackal.jpeg'],
      highlights: ['Reticulated Giraffe', "Grevy's Zebra", 'Beisa Oryx', 'Gerenuk', 'Somali Ostrich'],
    },
    {
      title: 'Gourmet Dining',
      description: 'Farm-to-table cuisine celebrating local flavors under African stars with chef-led experiences.',
      images: ['/dining-experience.jpg', '/night-2.jpeg', '/bonfire-2.jpeg', '/group-retreat.jpg'],
      highlights: ['Bush dinners', 'Wine tastings', 'Chef collaborations'],
    },
    {
      title: 'Sunrise & Sunset Experiences',
      description: 'Witness breathtaking African sunrises and magical sunset moments around bonfires, creating unforgettable memories in the wild.',
      highlights: ['Golden sunrise views', 'Bonfire gatherings', 'Stargazing sessions'],
      images: ['/swimming.jpeg', '/swimmingpool-2.jpeg'],
    },
  ]

  return (
    <section id="experiences" ref={ref} className="py-8 md:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="text-secondary text-sm font-light tracking-widest uppercase mb-4">Premium Experiences</p>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground leading-tight">
            Curated For The <br /> Discerning Traveler
          </h2>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-20 md:space-y-32">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className={`grid lg:grid-cols-2 gap-8 md:gap-16 items-center ${
                idx % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Image */}
              {exp.images ? (
                <ImageSlider images={exp.images} alt={exp.title} />
              ) : (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  className="relative h-80 md:h-96 overflow-hidden group"
                >
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    quality={85}
                  />
                </motion.div>
              )}

              {/* Content */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                    {exp.title}
                  </h3>
                  <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-light">
                    {exp.description}
                  </p>
                </div>

                {/* Highlights */}
                <div className="space-y-4 pt-4">
                  {exp.highlights.map((highlight, h) => (
                    <motion.div
                      key={h}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.5, delay: 0.3 + h * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0" />
                      <span className="text-foreground/75 font-light">{highlight}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-2 text-secondary font-semibold text-sm uppercase tracking-widest pt-4 hover:text-secondary/80 transition-colors"
                >
                  Explore <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}