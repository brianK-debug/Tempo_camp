import { Metadata } from 'next'

const baseUrl = 'https://samburutempocamp.co.ke'

export const sharedMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Samburu Tempo Camp | Luxury Eco-Tourism & Safari Lodge in Kenya',
    template: '%s | Samburu Tempo Camp',
  },
  description:
    'Experience world-class luxury eco-tourism at Samburu Tempo Camp. Sustainable hospitality, authentic cultural experiences, and unforgettable African safari adventures near Samburu National Reserve.',
  keywords: [
    'luxury safari lodge Kenya',
    'eco-tourism Kenya',
    'sustainable travel',
    'Samburu National Reserve',
    'luxury accommodation Kenya',
    'safari experiences Kenya',
    'cultural immersion Africa',
    'eco-lodge Kenya',
    'wildlife safari',
    'African luxury resort',
  ],
  authors: [{ name: 'Samburu Tempo Camp' }],
  creator: 'Samburu Tempo Camp',
  publisher: 'Samburu Tempo Camp',
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Samburu Tempo Camp',
    title: 'Samburu Tempo Camp | Luxury Eco-Tourism in Kenya',
    description:
      'Experience world-class luxury eco-tourism at Samburu Tempo Camp, combining sustainable hospitality with unforgettable African safari adventures.',
    images: [
      {
        url: `${baseUrl}/hero-samburu.jpg`,
        width: 1200,
        height: 630,
        alt: 'Samburu Tempo Camp Luxury Safari Lodge',
        type: 'image/jpeg',
      },
      {
        url: `${baseUrl}/safari-experience.jpg`,
        width: 1200,
        height: 630,
        alt: 'African Safari Experience',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samburu Tempo Camp | Luxury Eco-Tourism in Kenya',
    description: 'Experience world-class luxury eco-tourism at Samburu Tempo Camp',
    images: [`${baseUrl}/hero-samburu.jpg`],
    creator: '@samburutempocamp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      'en-US': `${baseUrl}/en`,
      'en-KE': `${baseUrl}/en-ke`,
    },
  },
}
