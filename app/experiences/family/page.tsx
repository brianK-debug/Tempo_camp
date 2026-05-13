import { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { CTASection } from '@/components/cta-section'

export const metadata: Metadata = {
  title: 'Family Getaways | Samburu Tempo Camp',
  description: 'Create lasting memories with family-friendly safari experiences.',
}

export default function FamilyPage() {
  return (
    <main className="bg-background">
      <Navigation />
      <section className="py-24 md:py-40 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6">
            Family Getaways
          </h1>
          <p className="text-xl text-foreground/75 mb-12">Create lasting memories with your loved ones</p>
          <p className="text-foreground/70 max-w-3xl mx-auto">
            Our family-friendly safaris and educational programs are designed for children of all ages. From junior naturalist programs to tembo kids initiatives, we create unforgettable experiences that teach respect for wildlife and nature.
          </p>
        </div>
      </section>
      <CTASection />
      <Footer />
    </main>
  )
}
