'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const testimonials = [
    {
      name: 'Sarah & Michael Johnson',
      location: 'New York, USA',
      quote: 'Samburu Tempo exceeded every expectation. The guides are incredibly knowledgeable, and the commitment to sustainability is inspiring. A truly transformative experience.',
      rating: 5,
    },
    {
      name: 'Emma Laurent',
      location: 'London, UK',
      quote: 'The attention to detail is remarkable. From the gourmet meals to the wellness experiences, every moment was thoughtfully curated. We\'re already planning our return visit.',
      rating: 5,
    },
    {
      name: 'Dr. James Chen',
      location: 'Singapore',
      quote: 'As a frequent luxury traveler, I was impressed by the authentic approach to conservation. This isn\'t just a resort—it\'s a living model of responsible tourism.',
      rating: 5,
    },
    {
      name: 'Isabella Rodriguez',
      location: 'Barcelona, Spain',
      quote: 'The photography opportunities were phenomenal. Our guide helped us capture the most stunning moments. Worth every penny and more.',
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" ref={ref} className="py-24 md:py-40 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-secondary text-sm font-light tracking-widest uppercase mb-4">Guest Experiences</p>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground leading-tight">
            Voices From <br /> The Experience
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: idx * 0.12 }}
              className="bg-white p-8 md:p-10 border border-border"
            >
              {/* Stars */}
              <div className="flex gap-1.5 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-secondary text-secondary"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-lg text-foreground/85 mb-8 leading-relaxed font-light italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="border-t border-border pt-6">
                <div className="font-serif font-semibold text-foreground text-lg">
                  {testimonial.name}
                </div>
                <div className="text-sm text-secondary font-light">
                  {testimonial.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
