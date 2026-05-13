import { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { CTASection } from '@/components/cta-section'

export const metadata: Metadata = {
  title: 'Cultural Visits | Samburu Tempo Camp',
  description: 'Immerse yourself in authentic Samburu traditions and culture.',
}

export default function CulturalPage() {
  return (
    <main className="bg-background">
      <Navigation />
      <section className="py-24 md:py-40 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6">
            Cultural Visits
          </h1>
          <p className="text-xl text-foreground/75 mb-12">Immerse yourself in authentic Samburu traditions</p>
          <p className="text-foreground/70 max-w-3xl mx-auto">
            Experience the rich culture of the Samburu people through village tours, warrior ceremonies, and craft workshops. Support community development while learning about traditional practices that have shaped this remarkable community.
          </p>
        </div>
      </section>
      <CTASection />
      <Footer />
    </main>
  )
}
