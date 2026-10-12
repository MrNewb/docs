import type { ReactNode } from 'react'

export function LinkEmbed({ href, title, children }: { href: string; title: string; children?: ReactNode }) {
  let host = href
  try {
    host = new URL(href).hostname.replace(/^www\./, '')
  } catch {
    host = href
  }
  return (
    <a className="link-embed" href={href} target="_blank" rel="noopener noreferrer">
      <span className="link-embed-copy">
        <span className="link-embed-title">{title}</span>
        <span className="link-embed-host">{children ?? host}</span>
      </span>
      <span className="link-embed-arrow" aria-hidden="true">↗</span>
    </a>
  )
}
