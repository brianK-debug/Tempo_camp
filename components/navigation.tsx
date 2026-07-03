'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { NoticeBar } from '@/components/notice-bar'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const mainLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Experiences', href: '/experiences' },
    { label: 'Contact', href: '/#contact' },
  ]

  return (
    <>
      <NoticeBar />
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'top-8 bg-white shadow-lg border-b border-border'
            : 'top-8 bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
              <Image src="/logo.png" alt="Samburu Tempo" width={80} height={80} className="rounded-xl group-hover:scale-110 transition-transform" />
              <div className="hidden sm:block">
                <div className="font-serif font-bold text-base text-foreground">Samburu</div>
                <div className="text-xs text-secondary font-light">Tempo</div>
              </div>
            </Link>

            {/* Desktop Navigation - Clean and Minimal */}
            <div className="hidden lg:flex items-center gap-12">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    scrolled ? 'text-foreground/70 hover:text-secondary' : 'text-foreground/70 hover:text-secondary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

             {/* Right Side - CTA Button */}
             <div className="hidden lg:flex items-center gap-6">
                <Link
                  href="/experiences/accommodation"
                  className="px-6 py-2.5 bg-secondary text-foreground text-sm font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Reserve
                </Link>
              </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Clean and Simple */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-border bg-white"
            >
              <div className="max-w-7xl mx-auto px-6 py-6 space-y-3">
                {mainLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block py-3 text-foreground/70 hover:text-secondary transition-colors text-sm font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                 <div className="h-px bg-border my-4" />
                  <Link
                    href="/experiences/accommodation"
                    className="block w-full py-3 bg-secondary text-foreground text-center text-sm font-semibold hover:shadow-lg transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Reserve Now
                  </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
