'use client'

import { FaWhatsapp } from 'react-icons/fa'
import { motion } from 'framer-motion'

export function WhatsAppButton() {
  const phoneNumber = '+254712875127'
  const message = 'Hello Samburu Tempo Camp, I would like to inquire about booking a stay.'
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <motion.a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white px-5 py-4 rounded-full shadow-2xl transition-all duration-300">
        <FaWhatsapp className="w-6 h-6" />
        <span className="font-semibold text-sm hidden md:inline">Chat With Us</span>
      </div>
    </motion.a>
  )
}
