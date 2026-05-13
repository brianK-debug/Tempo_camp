import { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { CTASection } from '@/components/cta-section'
import { WildlifeContent } from '@/components/wildlife-content'

export const metadata: Metadata = {
  title: 'Wildlife & Nature Safari | Samburu Tempo Camp',
  description: 'Experience unforgettable safari adventures in Samburu National Reserve with expert guides.',
  keywords: 'safari Kenya, wildlife safari, Samburu National Reserve, Big Five',
}

export default function WildlifePage() {
  return (
    <main className="bg-background">
      <Navigation />
      <WildlifeContent />
      <CTASection />
      <Footer />
    </main>
  )
}
