import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { WhyStaySection } from '@/components/why-stay-section'
import { AboutSection } from '@/components/about-section'
import { ExperiencesSection } from '@/components/experiences-section'
import { RoomsSection } from '@/components/rooms-section'
import { TestimonialsSection } from '@/components/testimonials-section'
import { GallerySlider } from '@/components/gallery-slider'
import { StatsSection } from '@/components/stats-section'
import { ConservationSection } from '@/components/conservation-section'
import { CTASection } from '@/components/cta-section'
import { FAQSection } from '@/components/faq-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="bg-background">
      <Navigation />
      <HeroSection />
      <WhyStaySection />
      <AboutSection />
      <ExperiencesSection />
      <RoomsSection />
      <TestimonialsSection />
      <GallerySlider />
      <ConservationSection />
      <CTASection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
