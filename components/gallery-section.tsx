'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

export function GallerySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const galleryItems = [
    { id: 1, title: 'Elephant Herds', image: '/gallery-1.jpg', span: 'lg:col-span-2' },
    { id: 2, title: 'African Wildlife', image: '/gallery-2.jpg', span: '' },
    { id: 3, title: 'Samburu Landscape', image: '/gallery-3.jpg', span: '' },
  ]

  return (
    <section id="gallery" ref={ref} className="py-24 md:py-40 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-secondary text-sm font-light tracking-widest uppercase mb-4">Visual Journey</p>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground leading-tight">
            Extraordinary <br /> Moments Captured
          </h2>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid lg:grid-cols-4 gap-6 md:gap-8">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`relative h-80 md:h-96 overflow-hidden group cursor-pointer ${item.span}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                quality={85}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 transition-colors" />

              {/* Content */}
              <div className="absolute inset-0 flex items-end p-6 md:p-8">
                <div className="w-full">
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.6, delay: 0.2 + idx * 0.15 }}
                    className="text-2xl md:text-3xl font-serif font-bold text-white"
                  >
                    {item.title}
                  </motion.h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 md:mt-24"
        >
          <button className="text-secondary font-semibold text-lg uppercase tracking-widest hover:text-secondary/80 transition-colors">
            Browse Full Gallery →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
