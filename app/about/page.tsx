import { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Samburu Tempo Camp | Luxury Eco-Tourism',
  description: 'Discover our story, mission, and commitment to luxury hospitality and environmental conservation. Founded on principles of sustainable tourism and community empowerment.',
  keywords: 'about Samburu Tempo, eco-tourism Kenya, luxury safari camp, sustainable hospitality',
  openGraph: {
    title: 'About Samburu Tempo Camp | Luxury Eco-Tourism',
    description: 'Discover our story, mission, and commitment to luxury and conservation.',
    images: [{ url: 'https://samburutempocamp.co.ke/about-hero.jpg', width: 1200, height: 630 }],
  },
}

export default function AboutPage() {
  return (
    <main className="bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-screen overflow-hidden pt-28 md:pt-40">
        <Image
          src="/hero-samburu.jpg"
          alt="About Samburu Tempo Camp"
          fill
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative h-full flex items-center justify-center px-6">
          <div className="text-center text-white max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl font-light">
              Where Luxury Meets Conservation
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-24 md:py-40 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-foreground/80 font-light mb-6 leading-relaxed">
                At Samburu Tempo Camp, we believe luxury and responsibility are inseparable. Founded on the principle that world-class hospitality must coexist with environmental stewardship and community empowerment, we've created a sanctuary where guests experience authentic African adventure while directly supporting conservation and local development.
              </p>
              <p className="text-lg text-foreground/80 font-light mb-6 leading-relaxed">
                Our name, "Tempo," reflects our commitment to sustainable rhythm—moving at nature's pace rather than modern urgency. We invite you to slow down, reconnect, and be part of something meaningful.
              </p>
            </div>
            <div className="relative h-96 md:h-[500px]">
              <Image
                src="/mission-image.jpg"
                alt="Our Mission"
                fill
                className="object-cover rounded-lg"
                quality={85}
              />
            </div>
          </div>

          {/* Core Values */}
          <div className="grid md:grid-cols-3 gap-12">
{[
               {
                 title: 'Authenticity',
                 description: 'Genuine experiences that honor the land and its people. No shortcuts, no pretense.',
               },
               {
                 title: 'Sustainability',
                 description: 'Operating with respect for nature. Carbon-neutral operations, conservation initiatives, and regenerative practices.',
               },
               {
                 title: 'Community First',
                 description: 'Direct investment in local livelihoods. 30% of profits support education, health, and economic opportunities.',
               },
             ].map((value) => (
               <div key={value.title} className="bg-white p-8 border border-border">
                 <h3 className="text-2xl font-serif font-bold text-foreground mb-3">{value.title}</h3>
                 <p className="text-foreground/75">{value.description}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground text-center mb-16">
            Our Journey
          </h2>
          
          <div className="space-y-12 max-w-3xl mx-auto">
{[
               { year: '2015', event: 'Samburu Tempo Camp founded with a vision of sustainable luxury' },
               { year: '2017', event: 'Launched Tembo Kids Initiative for youth conservation education' },
               { year: '2019', event: 'Achieved carbon-neutral operations status' },
               { year: '2022', event: 'Expanded conservation projects, planted 50,000 trees' },
               { year: '2024', event: 'Recognized as leading eco-tourism destination in East Africa' },
             ].map((milestone) => (
               <div key={milestone.year} className="flex gap-8">
                 <div className="flex-shrink-0">
                   <div className="w-24 font-serif font-bold text-2xl text-secondary">{milestone.year}</div>
                 </div>
                 <div className="flex-grow pt-2 pb-12 border-l-2 border-secondary pl-8">
                   <p className="text-lg text-foreground/75 font-light">{milestone.event}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 md:py-40 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground text-center mb-16">
            Our Team
          </h2>
          
          <p className="text-lg text-foreground/75 font-light text-center max-w-3xl mx-auto mb-12">
            Our team comprises experienced hospitality professionals, naturalists, conservation experts, and community members committed to creating unforgettable experiences while protecting the Samburu ecosystem.
          </p>

          <div className="grid md:grid-cols-3 gap-12">
{[
               { role: 'Expert Guides', count: '25+', description: 'Professional naturalists with deep knowledge' },
               { role: 'Hospitality Staff', count: '50+', description: 'Dedicated team ensuring your comfort' },
               { role: 'Local Community Members', count: '40+', description: 'Samburu partners supporting operations' },
             ].map((team) => (
               <div key={team.role} className="text-center">
                 <div className="text-4xl font-serif font-bold text-secondary mb-2">{team.count}</div>
                 <h4 className="text-xl font-bold text-foreground mb-2">{team.role}</h4>
                 <p className="text-foreground/75 font-light">{team.description}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Join Our Mission
          </h2>
          <p className="text-lg font-light mb-10 opacity-90">
            Experience luxury that makes a difference. Book your stay and be part of meaningful conservation and community impact.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 bg-secondary text-foreground font-bold hover:shadow-lg transition-all uppercase tracking-wide"
          >
            Book Now
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
