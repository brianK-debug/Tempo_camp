'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="relative py-20 md:py-32 bg-primary text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
            Ready to Experience <br /> Samburu Magic?
          </h2>

          <p className="text-lg md:text-xl text-white/85 font-light max-w-2xl mx-auto leading-relaxed">
            Book your luxury eco-tourism experience now and receive a complimentary guided wildlife tour and welcome massage.
          </p>

           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
             <motion.div
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
               <Link
                 href="#contact"
                 className="inline-block px-10 py-4 bg-secondary text-foreground font-semibold text-lg uppercase tracking-wide hover:bg-secondary/90 transition-colors"
               >
                 Reserve Your Stay
               </Link>
             </motion.div>

             <motion.div
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
               <Link
                 href="/experiences"
                 className="inline-block px-10 py-4 border-2 border-white text-white font-semibold text-lg uppercase tracking-wide hover:bg-white/10 transition-colors"
               >
                 Explore Experiences
               </Link>
             </motion.div>

             <motion.div
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
               <a
                 href="https://wa.me/254712875127?text=Hello%20Samburu%20Tempo%20Camp,%20I%20would%20like%20more%20information%20about%20your%20offerings."
                 target="_blank"
                 rel="noopener noreferrer"
                 className="inline-block px-10 py-4 border-2 border-white text-white font-semibold text-lg uppercase tracking-wide hover:bg-white/10 transition-colors"
               >
                 Chat With Us
               </a>
             </motion.div>
           </div>
        </motion.div>
      </div>
    </section>
  )
}
