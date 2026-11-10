import '@fontsource-variable/inter'
import type { ReactNode } from 'react'
import { FallingTaco } from '@/components/FallingTaco'
import { Provider } from '@/components/provider'
import { YouTubeBridge } from '@/components/YouTubeBridge'
import './global.css'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
