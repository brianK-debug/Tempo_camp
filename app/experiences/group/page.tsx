import { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { CTASection } from '@/components/cta-section'

export const metadata: Metadata = {
  title: 'Group Retreats | Samburu Tempo Camp',
  description: 'Transform your team with corporate retreats and group adventures.',
}

export default function GroupPage() {
  return (
    <main className="bg-background">
      <Navigation />
      <section className="py-24 md:py-40 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6">
            Group Retreats & Team Experiences
          </h1>
          <p className="text-xl text-foreground/75 mb-12">Transform your team in the wilderness</p>
          <p className="text-foreground/70 max-w-3xl mx-auto">
            Perfect for corporate retreats, team building, educational groups, and celebration events. We offer essential, premium, and exclusive packages ranging from 2 to 7 days of unforgettable experiences in Samburu National Reserve.
          </p>
        </div>
      </section>
      <CTASection />
      <Footer />
    </main>
  )
}
