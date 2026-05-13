'use client'

import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Discover: [
      { label: 'Our Story', href: '#about' },
      { label: 'Experiences', href: '#experiences' },
      { label: 'Accommodations', href: '#rooms' },
      { label: 'Gallery', href: '#gallery' },
    ],
    Support: [
      { label: 'Contact Us', href: '#contact' },
      { label: 'Booking FAQ', href: '#' },
      { label: 'Cancellation Policy', href: '#' },
      { label: 'Privacy Policy', href: '#' },
    ],
    Follow: [
      { label: 'Instagram', href: '#' },
      { label: 'Facebook', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'YouTube', href: '#' },
    ],
  }

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-20 md:py-28 grid md:grid-cols-5 gap-12 md:gap-16">
          {/* Brand section */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-secondary mb-2">
                Samburu Tempo
              </h3>
              <p className="text-lg font-light text-background/80 leading-relaxed">
                Luxury eco-tourism reimagined. Where sustainable hospitality meets untamed African wilderness.
              </p>
            </div>
            
            {/* Contact info */}
            <div className="space-y-4 pt-4">
              <a
                href="tel:+254123456789"
                className="flex items-center gap-3 text-background/80 hover:text-secondary transition-colors text-sm"
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+254 (0) 123 456 789</span>
              </a>
              <a
                href="mailto:reservations@samburutempo.com"
                className="flex items-center gap-3 text-background/80 hover:text-secondary transition-colors text-sm"
              >
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>reservations@samburutempo.com</span>
              </a>
              <div className="flex items-center gap-3 text-background/80 text-sm">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span>Samburu National Reserve, Kenya</span>
              </div>
            </div>
          </div>

          {/* Footer link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-serif font-semibold text-lg text-background mb-6">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-background/70 hover:text-secondary transition-colors text-sm font-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-background/20" />

        {/* Bottom section */}
        <div className="py-8 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm text-background/70 font-light">
          <p>
            &copy; {currentYear} Samburu Tempo Camp. All rights reserved.
          </p>
          <p>
            Committed to conservation and sustainable luxury in Africa
          </p>
        </div>
      </div>
    </footer>
  )
}
