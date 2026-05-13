'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function ExperiencesContent() {
  const experiences = [
    {
      title: 'Accommodation & Camping',
      description: 'Sleep under African stars in our luxurious safari tents and suites. World-class amenities with authentic wilderness experience.',
      href: '/experiences/accommodation',
      image: '/suite-luxury.jpg',
    },
    {
      title: 'Wildlife & Nature',
      description: 'Epic safari adventures with expert guides. Track the Big Five and encounter rare species in their natural habitat.',
      href: '/experiences/wildlife',
      image: '/safari-jeep.jpg',
    },
    {
      title: 'Cultural Visits',
      description: 'Immerse yourself in authentic Samburu traditions. Meet warriors, learn crafts, and support community development.',
      href: '/experiences/cultural',
      image: '/cultural-visit.jpg',
    },
    {
      title: 'Swimming & Recreation',
      description: 'Relax and rejuvenate with spa, yoga, and swimming. World-class wellness facilities in the heart of nature.',
      href: '/experiences/recreation',
      image: '/pool-recreation.jpg',
    },
    {
      title: 'Family Getaways',
      description: 'Create lasting memories with family-friendly safaris and activities. Educational programs for children of all ages.',
      href: '/experiences/family',
      image: '/family-experience.jpg',
    },
    {
      title: 'Group Retreats',
      description: 'Transform your team with corporate retreats and group adventures. Team building in the wilderness.',
      href: '/experiences/group',
      image: '/group-experience.jpg',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden pt-32 md:pt-40">
        <Image
          src="/experiences.jpg"
          alt="Samburu Experiences"
          fill
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative h-full flex items-center justify-center px-6">
          <div className="text-center text-white max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">
              Featured Experiences
            </h1>
            <p className="text-xl md:text-2xl font-light">
              Discover All Our Activities & Adventures
            </p>
          </div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-24 md:py-40 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group overflow-hidden"
              >
                <Link href={exp.href}>
                  <div className="relative h-64 overflow-hidden bg-muted rounded-lg mb-6">
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      quality={85}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  </div>
                </Link>
                
                <h3 className="text-2xl font-serif font-bold text-foreground mb-3">
                  {exp.title}
                </h3>
                <p className="text-foreground/75 mb-6 leading-relaxed">
                  {exp.description}
                </p>
                
                <Link
                  href={exp.href}
                  className="inline-flex items-center text-secondary font-semibold hover:underline group/link"
                >
                  Explore
                  <span className="ml-2 transition-transform group-hover/link:translate-x-1">→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Experiences */}
      <section className="py-24 md:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground text-center mb-16">
            Why Choose Samburu Tempo?
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: 'Expert Guides', description: 'Professional naturalists with deep knowledge of wildlife and culture' },
              { title: 'Luxury Facilities', description: 'World-class amenities combined with sustainable practices' },
              { title: 'Safety First', description: 'Rigorous protocols ensuring guest safety and wildlife protection' },
              { title: 'Community Impact', description: '30% of profits support local education and development' },
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <h4 className="text-xl font-serif font-bold text-foreground mb-3">
                  {feature.title}
                </h4>
                <p className="text-foreground/75 font-light">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Ready for Your Adventure?
          </h2>
          <p className="text-lg font-light mb-10 opacity-90">
            Choose your experience and start planning your unforgettable Samburu journey
          </p>
          <Link
            href="/#contact"
            className="inline-block px-10 py-4 bg-secondary text-foreground font-bold hover:shadow-lg transition-all uppercase tracking-wide"
          >
            Book Your Experience
          </Link>
        </div>
      </section>
    </>
  )
}
