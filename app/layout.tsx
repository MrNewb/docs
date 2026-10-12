import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'
import { FallingTaco } from '@/components/FallingTaco'
import { Provider } from '@/components/provider'
import { YouTubeBridge } from '@/components/YouTubeBridge'
import './global.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#nd-page">
          Skip to content
        </a>
        <YouTubeBridge />
        <FallingTaco />
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
