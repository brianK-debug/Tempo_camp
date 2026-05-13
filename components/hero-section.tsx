'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

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

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden pt-20">
      {/* Background Image with Parallax */}
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src="/hero-samburu.jpg"
          alt="Samburu Tempo Camp luxury safari"
          fill
          priority
          className="object-cover"
          quality={90}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
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
            Experience unparalleled luxury in Africa's most pristine wilderness
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
               href="#contact"
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

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <p className="text-white/60 text-xs uppercase tracking-widest font-light">Scroll</p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-8 border border-white/50 rounded-full flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 bg-white/50 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
