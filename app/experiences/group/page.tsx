import { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { CTASection } from '@/components/cta-section'
import Image from 'next/image'
import { motion } from 'framer-motion'

export const metadata: Metadata = {
  title: 'Group Retreats | Samburu Tempo Camp',
  description: 'Transform your team with corporate retreats and group adventures.',
}

const packages = [
  {
    name: 'Essential Package',
    duration: '2-3 days',
    features: ['Accommodation', 'Basic meals', 'Guided walks', 'Cultural visit'],
  },
  {
    name: 'Premium Package',
    duration: '4-5 days',
    features: ['Accommodation', 'Full board meals', 'Daily safaris', 'Cultural visit', 'Reteti sanctuary'],
    featured: true,
  },
  {
    name: 'Exclusive Package',
    duration: '6-7 days',
    features: ['Premium accommodation', 'All meals & drinks', 'Private safaris', 'Cultural experiences', 'Mt. Ololokwe hike'],
  },
]

export default function GroupPage() {
  return (
    <main className="bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="relative h-96 md:h-[500px] overflow-hidden pt-32 md:pt-40">
        <Image
          src="/group-retreat.jpg"
          alt="Group Retreat"
          fill
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-center justify-center px-6">
          <div className="text-center text-white max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">Group Retreats</h1>
            <p className="text-xl md:text-2xl font-light">Transform your team in the wilderness</p>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24 md:py-40 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-16">
            Group Packages
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-lg p-8 border-2 ${
                  pkg.featured
                    ? 'border-secondary bg-white shadow-xl'
                    : 'border-border bg-white'
                }`}
              >
                {pkg.featured && (
                  <div className="inline-block px-4 py-1 bg-secondary text-foreground text-sm font-bold mb-4 rounded-full">
                    POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">{pkg.name}</h3>
                <p className="text-secondary font-semibold mb-4">{pkg.duration}</p>
                <ul className="space-y-2">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="text-sm text-foreground/75 flex items-center gap-2">
                      <span className="text-secondary">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}