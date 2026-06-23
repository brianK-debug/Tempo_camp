import { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { CTASection } from '@/components/cta-section'
import Image from 'next/image'
import { Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cultural Visits | Samburu Tempo Camp',
  description: 'Immerse yourself in authentic Samburu traditions and culture.',
}

const activities = [
  {
    title: 'Cultural Village Visit',
    description: 'Ksh 2,000 per person',
    image: '/cultural-visit.jpg',
  },
  {
    title: 'Samburu Dance',
    description: 'Ksh 10,000 per dance',
    image: '/experiences.jpg',
  },
]

export default function CulturalPage() {
  return (
    <main className="bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="relative h-[60vh] md:h-screen overflow-hidden pt-28 md:pt-40">
        <Image
          src="/cultural-visit.jpg"
          alt="Cultural Visit"
          fill
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-center justify-center px-6">
          <div className="text-center text-white max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">Cultural Visits</h1>
            <p className="text-xl md:text-2xl font-light">Immerse yourself in authentic Samburu traditions</p>
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-24 md:py-40 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-16">
            Cultural Activities
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {activities.map((activity) => (
              <div
                key={activity.title}
                className="bg-white rounded-lg overflow-hidden border border-border"
              >
                <div className="relative h-64">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover"
                    quality={85}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-3">{activity.title}</h3>
                  <p className="text-secondary font-semibold text-lg">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mt. Ololokwe Hiking */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-12">
            Mt. Ololokwe Hiking
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src="/hero-samburu.jpg"
                alt="Mt Ololokwe"
                fill
                className="object-cover"
                quality={85}
              />
            </div>
            <div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <span className="text-foreground/75"><strong>Hiking Fee:</strong> Ksh 2,000 per person</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <span className="text-foreground/75"><strong>Conservation Fee:</strong> Ksh 3,000 per person per night</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <span className="text-foreground/75"><strong>Guide Fee:</strong> Ksh 3,000 per day</span>
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