import { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { CTASection } from '@/components/cta-section'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Family Getaways | Samburu Tempo Camp',
  description: 'Create lasting memories with family-friendly safari experiences.',
}

const activities = [
  {
    title: 'Child Policy',
    items: [
      'Up to 3 years sharing with adults: Free',
      '4–12 years sharing with adults: 50% off adult rate',
      '4–12 years in own room: 25% off adult rate',
    ],
    image: '/family-safari.jpg',
  },
]

export default function FamilyPage() {
  return (
    <main className="bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="relative h-96 md:h-[500px] overflow-hidden pt-32 md:pt-40">
        <Image
          src="/family-safari.jpg"
          alt="Family Safari"
          fill
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-center justify-center px-6">
          <div className="text-center text-white max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">Family Getaways</h1>
            <p className="text-xl md:text-2xl font-light">Create lasting memories with your loved ones</p>
          </div>
        </div>
      </section>

      {/* Child Policy */}
      <section className="py-24 md:py-40 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-16">
            Family Friendly Rates
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/family-safari.jpg"
                alt="Family Safari"
                fill
                className="object-cover"
                quality={85}
              />
            </div>
            <div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <span className="text-foreground/75">Up to 3 years sharing with adults: <strong>Free</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <span className="text-foreground/75">4–12 years sharing with adults: <strong>50% off adult rate</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <span className="text-foreground/75">4–12 years in own room: <strong>25% off adult rate</strong></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}