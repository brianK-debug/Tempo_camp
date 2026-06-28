import type { Metadata } from 'next'
import { Crimson_Text, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ScrollProvider } from '@/components/scroll-provider'
import { WhatsAppButton } from '@/components/whatsapp-button'
import { StructuredData } from '@/components/structured-data'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const crimsonText = Crimson_Text({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-serif',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.samburutempocamp.co.ke'),

  title: 'Samburu Tempo Camp | Luxury Eco-Tourism & Safari Lodge in Kenya',

  description:
    'Experience world-class luxury eco-tourism at Samburu Tempo Camp. Sustainable hospitality, authentic cultural experiences, and unforgettable African safari adventures near Samburu National Reserve.',

  keywords: [
    'luxury safari lodge Kenya',
    'eco-tourism',
    'sustainable travel',
    'Samburu National Reserve',
    'luxury accommodation Kenya',
    'Kenya safari',
    'Samburu safari',
    'eco lodge Kenya',
    'cultural experiences',
  ],

  authors: [
    {
      name: 'Samburu Tempo Camp',
    },
  ],

  creator: 'Samburu Tempo Camp',
  publisher: 'Samburu Tempo Camp',
  generator: 'Next.js',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.samburutempocamp.co.ke',
    siteName: 'Samburu Tempo Camp',
    title: 'Samburu Tempo Camp | Luxury Eco-Tourism in Kenya',
    description:
      'Experience world-class luxury eco-tourism at Samburu Tempo Camp, combining sustainable hospitality with unforgettable African safari adventures.',

    images: [
      {
        url: '/hero-samburu.jpg',
        width: 1200,
        height: 630,
        alt: 'Samburu Tempo Camp Luxury Safari Lodge',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Samburu Tempo Camp | Luxury Eco-Tourism in Kenya',
    description:
      'Experience world-class luxury eco-tourism at Samburu Tempo Camp.',

    images: ['/hero-samburu.jpg'],
  },

  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],

    shortcut: ['/favicon.ico'],

    apple: [
      {
        url: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },

  manifest: '/manifest.webmanifest',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2d5a4d" />
        <link
          rel="alternate"
          hrefLang="en"
          href="https://www.samburutempocamp.co.ke"
        />
      </head>
      <body className={`${inter.variable} ${crimsonText.variable} font-sans antialiased`}>
        <StructuredData />
        <ScrollProvider>
          {children}
          <WhatsAppButton />
        </ScrollProvider>
        <Toaster />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
