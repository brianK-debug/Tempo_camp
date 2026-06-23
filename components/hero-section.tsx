'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const heroSlides = [
  { src: '/hero-samburu.jpg', alt: 'Samburu Tempo Camp luxury safari' },
  { src: '/hill.jpeg', alt: 'Samburu hills landscape' },
  { src: '/elephant-1.jpeg', alt: 'African elephant in the wild' },
  { src: '/jackal.jpeg', alt: 'Jackal in Samburu wilderness' },
  { src: '/gazelle.jpeg', alt: 'Gazelle on the savanna' },
  { src: '/cheetah.jpeg', alt: 'Cheetah resting on a rock' },
]

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return

    gsap.to(imageRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      y: 100,
    })
  }, [])

  const goToNext = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % heroSlides.length)
  }

  const goToPrev = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const goToSlide = (index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden pt-20">
      {heroSlides.map((slide, index) => (
        <motion.div
          key={slide.src}
          initial={false}
          animate={{
            x: current === index ? 0 : direction > 0 ? '100%' : '-100%',
            opacity: current === index ? 1 : 0,
            zIndex: current === index ? 1 : 0,
          }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute inset-0"
          ref={current === index ? imageRef : undefined}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            className="object-cover"
            quality={90}
          />
        </motion.div>
      ))}

      <div className="absolute inset-0 bg-black/35 z-10" />

      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 z-20">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p className="text-secondary text-xs md:text-sm font-light tracking-[0.2em] uppercase mb-8">
              Luxury Safari Experience
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 drop-shadow-2xl"
          >
            Samburu Tempo
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-2xl text-white/85 mb-12 font-light leading-relaxed max-w-3xl mx-auto"
          >
            Experience unparalleled luxury in Africa&apos;s most pristine wilderness
          </motion.p>

           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.5 }}
             className="flex flex-col sm:flex-row gap-5 justify-center items-center"
           >
             <Link
               href="/experiences"
               className="motion-button"
             >
               <motion.button
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 className="px-10 py-4 bg-secondary text-foreground font-semibold text-sm md:text-base tracking-wider hover:bg-secondary/90 transition-colors"
               >
                 EXPLORE
               </motion.button>
             </Link>

              <Link
                href="/experiences/accommodation"
                className="motion-button"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 border-2 border-white text-white font-semibold text-sm md:text-base tracking-wider hover:bg-white/10 transition-colors"
                >
                  BOOK NOW
                </motion.button>
              </Link>
           </motion.div>
        </div>
      </div>

      <button
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 transition-all p-3 rounded-full text-white backdrop-blur-sm opacity-0 hover:opacity-100 group-hover:opacity-100"
        aria-label="Previous image"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 transition-all p-3 rounded-full text-white backdrop-blur-sm opacity-0 hover:opacity-100 group-hover:opacity-100"
        aria-label="Next image"
      >
        <ChevronRight size={28} />
      </button>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                current === index ? 'w-8 bg-secondary' : 'w-2 bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          <p className="text-white/60 text-xs uppercase tracking-widest font-light">Scroll</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-8 border border-white/50 rounded-full flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
