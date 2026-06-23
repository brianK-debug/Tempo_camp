'use client'

import { FaMessageCircle } from 'react-icons/fa'
import { motion } from 'framer-motion'
import Link from 'next/link'

export function WhatsAppButton() {
   return (
     <motion.div
       className="fixed bottom-8 right-8 z-50 flex items-center justify-center"
       initial={{ scale: 0, opacity: 0 }}
       animate={{ scale: 1, opacity: 1 }}
       transition={{ duration: 0.5, delay: 0.5 }}
       whileHover={{ scale: 1.15 }}
       whileTap={{ scale: 0.95 }}
     >
       <Link href="#contact">
         <div className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white px-5 py-4 rounded-full shadow-2xl transition-all duration-300">
           <FaMessageCircle className="w-6 h-6" />
           <span className="font-semibold text-sm hidden md:inline">Chat With Us</span>
         </div>
       </Link>
     </motion.div>
   )
 }
