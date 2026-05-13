import { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { CTASection } from '@/components/cta-section'
import { AccommodationContent } from '@/components/accommodation-content'

export const metadata: Metadata = {
  title: 'Luxury Accommodation & Camping | Samburu Tempo Camp',
  description: 'Discover world-class accommodation at Samburu Tempo Camp. Choose from luxury bed & breakfast rooms or premium tent camping experiences in the heart of Samburu National Reserve.',
  keywords: 'luxury accommodation Kenya, safari camping, tent hire Samburu, bed and breakfast Kenya',
  openGraph: {
    title: 'Luxury Accommodation & Camping | Samburu Tempo Camp',
    description: 'Experience premium accommodation in Samburu wilderness',
  },
}

export default function AccommodationPage() {
  return (
    <main className="bg-background">
      <Navigation />
      <AccommodationContent />
      <CTASection />
      <Footer />
    </main>
  )
}
