'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const galleryImages = [
  {
    src: '/nights-1.jpeg',
    alt: 'Samburu Camp at Night',
    title: 'Campfire Evenings',
    description: 'Experience peaceful nights under the African stars',
  },
  {
    src: '/night-3.jpeg',
    alt: 'Luxury Tent at Night',
    title: 'Nighttime Serenity',
    description: 'Enjoy a tranquil stay in our illuminated safari camp',
  },
  {
    src: '/tent-a.jpeg',
    alt: 'Luxury Safari Tent in Samburu',
    title: 'Luxury Accommodation',
    description: 'Comfortable safari tents surrounded by nature',
  },
  {
    src: '/hill.jpeg',
    alt: 'Scenic Samburu Hills',
    title: 'Breathtaking Landscapes',
    description: 'Discover stunning views of Samburu’s rugged terrain',
  },
  {
    src: '/swamp.jpeg',
    alt: 'Samburu Wetland and Wildlife Habitat',
    title: 'Natural Wetlands',
    description: 'Explore the rich biodiversity of Samburu wetlands',
  },
  {
    src: '/gazelle.jpeg',
    alt: 'Gazelle in Samburu National Reserve',
    title: 'Wildlife Encounters',
    description: 'Observe graceful gazelles in their natural habitat',
  },
  {
    src: '/elephant.jpeg',
    alt: 'African Elephant in Samburu',
    title: 'Majestic Elephants',
    description: 'Get close to Samburu’s iconic elephant herds',
  },
  {
    src: '/cheetah-1.jpeg',
    alt: 'Cheetah Resting in Samburu',
    title: 'Predators of Samburu',
    description: 'Witness the speed and beauty of the cheetah',
  },
  {
    src: '/girrafe-3.jpeg',
    alt: 'Reticulated Giraffe in Samburu',
    title: 'Unique Wildlife',
    description: 'Meet the famous reticulated giraffes of northern Kenya',
  },
  {
    src: '/cheetah.jpeg',
    alt: 'Cheetah on Safari in Samburu',
    title: 'Safari Adventures',
    description: 'Experience thrilling wildlife sightings during your safari',
  },
];

export function GallerySlider() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % galleryImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [autoplay])

  const goToNext = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % galleryImages.length)
    setAutoplay(false)
  }

  const goToPrev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
    setAutoplay(false)
  }

  const goToSlide = (index: number) => {
    setCurrent(index)
    setAutoplay(false)
  }

  return (
    <section className="w-full bg-foreground py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Gallery
          </h2>
          <p className="text-lg text-white/80 font-light">
            Explore the beauty of Samburu Tempo Camp
          </p>
        </div>

        {/* Main Slider */}
        <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl group">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ x: direction > 0 ? '100%' : '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? '-100%' : '100%', opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image
                src={galleryImages[current].src}
                alt={galleryImages[current].alt}
                fill
                className="object-cover"
                priority
                quality={90}
              />
            </motion.div>
          </AnimatePresence>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
            <motion.div
              key={`content-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-3xl md:text-4xl font-serif font-bold mb-2">
                {galleryImages[current].title}
              </h3>
              <p className="text-lg font-light opacity-90">
                {galleryImages[current].description}
              </p>
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 transition-all p-3 rounded-full text-white backdrop-blur-sm opacity-0 group-hover:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 transition-all p-3 rounded-full text-white backdrop-blur-sm opacity-0 group-hover:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Thumbnails */}
        <div className="mt-8 flex gap-3 overflow-x-auto pb-4 px-2 md:px-0 md:justify-center">
          {galleryImages.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative flex-shrink-0 h-20 w-28 rounded-lg overflow-hidden transition-all ${
                current === index ? 'ring-2 ring-secondary' : 'opacity-60 hover:opacity-100'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                quality={50}
              />
            </motion.button>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                current === index
                  ? 'w-8 bg-secondary'
                  : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
