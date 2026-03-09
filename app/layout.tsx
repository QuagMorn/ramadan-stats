import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ramadan Stats — Ramadan Card Generator',
  description: 'Generate your shareable Ramadan worship card. Track fasting, tarawih, tadarus, tahajjud & charity.',
  openGraph: {
    title: 'Ramadan Stats',
    description: 'Generate your shareable Ramadan Card',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Naskh+Arabic:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
