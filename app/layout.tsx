import type { Metadata } from 'next'
import '../src/index.css'

export const metadata: Metadata = {
  title: 'One step',
  description: 'A minimalist aesthetic Pomodoro timer',
  icons: {
    icon: '/assets/images/browsericon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="cream">
      <body>
        {children}
      </body>
    </html>
  )
}
