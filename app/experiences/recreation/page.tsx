import { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { CTASection } from '@/components/cta-section'
import Image from 'next/image'
import { Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Swimming & Recreation | Samburu Tempo Camp',
  description: 'Relax and rejuvenate with our world-class wellness facilities.',
}

const activities = [
  {
    title: 'Swimming Pool Access',
    resident: 'Kshs 500',
    nonResident: 'Kshs 1,000',
    image: '/swimming-pool.jpg',
  },
  {
    title: 'Reteti Elephant Sanctuary',
    resident: 'USD 3 per person',
    nonResident: 'USD 35 per person',
    image: '/conservation-impact.jpg',
  },
  {
    title: 'Camping',
    description: 'USD 10 per person',
    image: '/tent-camping.jpg',
  },
  {
    title: 'Vehicle Hire (Safari Land Cruiser)',
    description: 'USD 200 full day',
    image: '/safari-jeep.jpg',
  },
]

export default function RecreationPage() {
  return (
    <main className="bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="relative h-[60vh] md:h-screen overflow-hidden pt-28 md:pt-40">
        <Image
          src="/pool-recreation.jpg"
          alt="Swimming & Recreation"
          fill
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-center justify-center px-6">
          <div className="text-center text-white max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">Swimming & Recreation</h1>
            <p className="text-xl md:text-2xl font-light">Relax and rejuvenate in the heart of nature</p>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-24 md:py-40 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-16">
            Recreation Activities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity) => (
              <div
                key={activity.title}
                className="bg-white rounded-lg overflow-hidden border border-border"
              >
                <div className="relative h-48">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover"
                    quality={85}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-foreground mb-3">{activity.title}</h3>
                  {activity.description && (
                    <p className="text-secondary font-semibold">{activity.description}</p>
                  )}
                  {activity.resident && (
                    <>
                      <p className="text-foreground/75"><span className="font-semibold">Resident:</span> {activity.resident}</p>
                      <p className="text-foreground/75"><span className="font-semibold">Non-Resident:</span> {activity.nonResident}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </main>
  )
}