import { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Gallery | Samburu Tempo Camp',
  description: 'Browse stunning photography from Samburu Tempo Camp. Wildlife, accommodations, cultural experiences, and the natural beauty of Samburu National Reserve.',
  keywords: 'safari photography, wildlife photos, camp gallery, Africa photography',
  openGraph: {
    title: 'Gallery | Samburu Tempo Camp',
    description: 'Stunning photography showcasing Samburu Tempo experiences.',
    images: [{ url: 'https://samburutempocamp.co.ke/gallery-hero.jpg', width: 1200, height: 630 }],
  },
}

export default function GalleryPage() {
  const galleryItems = [
    { src: '/gallery-1.jpg', alt: 'Wildlife Safari', category: 'Wildlife' },
    { src: '/tent-camping.jpg', alt: 'Luxury Accommodation', category: 'Accommodation' },
    { src: '/safari-experience.jpg', alt: 'Safari Experience', category: 'Wildlife' },
    { src: '/cultural-experience.jpg', alt: 'Cultural Visit', category: 'Culture' },
    { src: '/pool-recreation.jpg', alt: 'Pool Recreation', category: 'Recreation' },
    { src: '/family-experience.jpg', alt: 'Family Adventure', category: 'Family' },
    { src: '/group-experience.jpg', alt: 'Group Retreat', category: 'Groups' },
    { src: '/hero-samburu.jpg', alt: 'Samburu Landscape', category: 'Nature' },
  ]

  return (
    <main className="bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden pt-32 md:pt-40">
        <Image
          src="/gallery-hero.jpg"
          alt="Gallery"
          fill
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative h-full flex items-center justify-center px-6">
          <div className="text-center text-white max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">
              Gallery
            </h1>
            <p className="text-xl md:text-2xl font-light">
              Moments From Samburu Tempo
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 md:py-40 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
{galleryItems.map((item) => (
               <div key={item.src} className="relative h-64 md:h-80 group overflow-hidden rounded-lg">
                 <Image
                   src={item.src}
                   alt={item.alt}
                   fill
                   className="object-cover group-hover:scale-110 transition-transform duration-500"
                   quality={85}
                 />
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
                 <div className="absolute inset-0 flex items-end justify-start p-4">
                   <span className="text-white text-sm font-semibold bg-black/50 px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                     {item.category}
                   </span>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Ready to Create Your Own Memories?
          </h2>
          <p className="text-lg font-light mb-10 opacity-90">
            Book your stay at Samburu Tempo and experience the beauty firsthand
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-4 bg-secondary text-foreground font-bold hover:shadow-lg transition-all uppercase tracking-wide"
          >
            Book Now
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
