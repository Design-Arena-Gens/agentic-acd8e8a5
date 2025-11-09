import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zephyr - AI Drone Delivery',
  description: "India's First AI Drone Delivery Platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
