'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin, Phone, Instagram, Facebook, X } from 'lucide-react'

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
      { label: 'Instagram', href: 'https://www.instagram.com/samburutempocamp?igsh=d3N3bXl6cG42YWo1' },
      { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61573340544810&mibextid=ZbWKwL' },
      { label: 'X', href: 'https://www.youtube.com' },
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
              <Image src="/logo.png" alt="Samburu Tempo" width={160} height={160} className="mb-4" />
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
                <span>+254 712 875 127</span>
              </a>
              <a
                href="mailto:info@samburutempocamp.co.ke"
                className="flex items-center gap-3 text-background/80 hover:text-secondary transition-colors text-sm"
              >
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>info@samburutempocamp.co.ke</span>
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
                {title === 'Follow' ? (
                  <div className="flex space-x-4">
                    {links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="text-background/70 hover:text-secondary transition-colors"
                      >
{link.label === 'Instagram' && <Instagram className="w-6 h-6" />}
{link.label === 'Facebook' && <Facebook className="w-6 h-6" />}
{link.label === 'X' && <X className="w-6 h-6" />}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={`${title}-${link.label}`}>
                        <Link
                          href={link.href}
                          className="text-background/70 hover:text-secondary transition-colors text-sm font-light"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
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
