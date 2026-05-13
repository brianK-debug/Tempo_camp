import { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { CTASection } from '@/components/cta-section'

export const metadata: Metadata = {
  title: 'Swimming & Recreation | Samburu Tempo Camp',
  description: 'Relax and rejuvenate with our world-class wellness facilities.',
}

export default function RecreationPage() {
  return (
    <main className="bg-background">
      <Navigation />
      <section className="py-24 md:py-40 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6">
            Swimming & Recreation
          </h1>
          <p className="text-xl text-foreground/75 mb-12">Relax and rejuvenate in the heart of nature</p>
          <p className="text-foreground/70 max-w-3xl mx-auto">
            Enjoy our world-class swimming pool, spa treatments, yoga sessions, and stargazing experiences. Perfect for unwinding after exciting safari adventures.
          </p>
        </div>
      </section>
      <CTASection />
      <Footer />
    </main>
  )
}
