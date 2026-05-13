import { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { ExperiencesContent } from '@/components/experiences-content'

export const metadata: Metadata = {
  title: 'Featured Experiences | Samburu Tempo Camp',
  description: 'Explore all our featured experiences: Accommodation & Camping, Wildlife & Nature, Cultural Visits, Swimming & Recreation, Family Getaways, and Group Retreats.',
  keywords: 'safari experiences Kenya, adventure activities, eco-tourism experiences, Samburu activities',
  openGraph: {
    title: 'Featured Experiences | Samburu Tempo Camp',
    description: 'Explore all our featured experiences and activities.',
    images: [{ url: 'https://samburutempocamp.co.ke/experiences.jpg', width: 1200, height: 630 }],
  },
}

export default function ExperiencesPage() {
  return (
    <main className="bg-background">
      <Navigation />
      <ExperiencesContent />
      <Footer />
    </main>
  )
}
