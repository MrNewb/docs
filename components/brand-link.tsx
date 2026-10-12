import type { ComponentProps } from 'react'
import defaultMdxComponents from 'fumadocs-ui/mdx'

const Link = defaultMdxComponents.a!

type Brand = 'github' | 'discord' | 'tebex' | 'youtube' | 'kofi'

function brandFor(href?: string): Brand | null {
  if (!href) return null
  let host = ''
  try {
    host = new URL(href, 'https://local.invalid').hostname.toLowerCase()
  } catch {
    return null
  }
  if (host === 'github.com' || host.endsWith('.github.com')) return 'github'
  if (host === 'discord.gg' || host === 'discord.com' || host.endsWith('.discord.com')) return 'discord'
  if (host === 'tebex.io' || host.endsWith('.tebex.io')) return 'tebex'
  if (host === 'youtube.com' || host.endsWith('.youtube.com') || host === 'youtu.be') return 'youtube'
  if (host === 'ko-fi.com' || host.endsWith('.ko-fi.com')) return 'kofi'
  return null
}

function BrandIcon({ brand }: { brand: Brand }) {
  if (brand === 'github') {
    return (
      <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    )
  }
  if (brand === 'discord') {
    return (
      <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M20.317 4.37a19.8 19.8 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.6 12.6 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.7 19.7 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14 14 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.8 19.8 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    )
  }
  if (brand === 'tebex') {
    return (
      <svg className="brand-icon brand-icon-tebex" viewBox="0 0 39 90" aria-hidden="true">
        <path fill="currentColor" d="M21.4255 22.8694C24.9869 17.2327 31.4365 15.5996 31.4365 15.5996C31.4365 15.5996 19.1274 12.4774 19.1274 0C19.1274 12.4774 6.81115 15.5996 6.81115 15.5996C6.81115 15.5996 13.2631 17.2327 16.8269 22.8694H0V44.4792L3.82548 37.7871H11.474V75.0824L26.7736 90V44.3354C22.872 42.5818 17.267 38.1234 15.2591 34.7228C18.6873 35.7318 23.2859 37.0587 26.8664 37.7894H38.25V22.8694H21.4255Z" />
      </svg>
    )
  }
  if (brand === 'youtube') {
    return (
      <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    )
  }
  return (
    <svg className="brand-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z" />
    </svg>
  )
}

export function DocLink({ href, className, children, ...props }: ComponentProps<'a'>) {
  const skip = className?.split(/\s+/).includes('intro-place')
  const brand = skip ? null : brandFor(href)
  const classes = [className, brand ? 'brand-link' : ''].filter(Boolean).join(' ')
  return (
    <Link href={href} className={classes || undefined} {...props}>
      {brand ? <BrandIcon brand={brand} /> : null}
      {children}
    </Link>
  )
}
