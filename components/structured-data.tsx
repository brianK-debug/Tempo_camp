'use client'

export function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: 'Samburu Tempo Camp',
    description:
      'Luxury eco-tourism lodge offering sustainable hospitality, authentic cultural experiences, and unforgettable African safari adventures in Kenya.',
    url: 'https://samburutempocamp.co.ke',
    telephone: '+254712875127',
    email: 'info@samburutempocamp.co.ke',
    address: {
      '@type': 'PostalAddress',
      streetAddress: "Archer's Post",
      addressLocality: 'Samburu National Reserve',
      addressRegion: 'Kenya',
      postalCode: null,
      addressCountry: 'KE',
    },
    image: 'https://samburutempocamp.co.ke/hero-samburu.jpg',
    priceRange: '$$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '156',
    },
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Wildlife Safari Experiences',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Swimming Pool',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Fine Dining',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Spa & Wellness',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Cultural Experiences',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Solar Power',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'WiFi Internet',
      },
    ],
    sameAs: [
      'https://www.facebook.com/samburutempocamp',
      'https://www.instagram.com/samburutempocamp',
      'https://www.youtube.com/samburutempocamp',
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://samburutempocamp.co.ke',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: 'https://samburutempocamp.co.ke#about',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Experiences',
        item: 'https://samburutempocamp.co.ke#experiences',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Accommodations',
        item: 'https://samburutempocamp.co.ke#rooms',
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Contact',
        item: 'https://samburutempocamp.co.ke#contact',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  )
}
