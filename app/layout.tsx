import type { Metadata } from 'next'
import '../src/index.css'

export const metadata: Metadata = {
  title: 'onestepomodoro — Minimalist & Aesthetic Pomodoro Timer',
  description: 'onestepomodoro is a beautiful, minimalist, and aesthetic online Pomodoro timer. Boost your focus with customizable color themes, ambient alerts, and a focus checklist.',
  keywords: [
    'pomodoro timer',
    'pomodoro online',
    'aesthetic pomodoro',
    'minimalist pomodoro timer',
    'onestepomodoro',
    'productivity timer',
    'focus timer',
    'pomodoro technique'
  ],
  authors: [{ name: 'onestepomodoro' }],
  metadataBase: new URL('https://onestepomodoro.online'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'onestepomodoro — Minimalist & Aesthetic Pomodoro Timer',
    description: 'Boost your focus with customizable color themes, ambient alerts, and a focus checklist.',
    url: 'https://onestepomodoro.online',
    siteName: 'onestepomodoro',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'onestepomodoro — Minimalist & Aesthetic Pomodoro Timer',
    description: 'Boost your focus with customizable color themes, ambient alerts, and a focus checklist.',
  },
  icons: {
    icon: '/assets/images/browsericon.png',
    apple: '/assets/images/browsericon.png',
  },
  verification: {
    google: 'lz1EGOwem2b9lLwYMNMktL5EAMEsnPl5Nwtg9uV7AnQ',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'onestepomodoro',
    'url': 'https://onestepomodoro.online',
    'description': 'onestepomodoro is a beautiful, minimalist, and aesthetic online Pomodoro timer.',
    'applicationCategory': 'Productivity',
    'operatingSystem': 'All',
  }

  return (
    <html lang="en" data-theme="cream" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
