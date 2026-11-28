'use client'

import { useEffect, useState, type ReactNode } from 'react'

const SOURCE = 'https://raw.githubusercontent.com/MrNewb/patchnotes/refs/heads/main/resources.json'

type Versions = Record<string, string[]>

function compareVersions(a: string, b: string) {
  const pa = a.split('.').map((n) => parseInt(n, 10) || 0)
  const pb = b.split('.').map((n) => parseInt(n, 10) || 0)
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pb[i] ?? 0) - (pa[i] ?? 0)
    if (d !== 0) return d
  }
  return 0
}

function linkify(text: string): ReactNode[] {
  const parts = text.split(/(https?:\/\/[^\s)]+)/g)
  return parts.map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer">
        {part}
      </a>
    ) : (
      part
    ),
  )
}

/**
 * Patch notes for one script. The notes are baked in at build time (initial), then refreshed from the
 * patchnotes repo when the page opens, so an edit there shows up without rebuilding the docs.
 */
export function Changelog({ resource, initial }: { resource: string; initial: Versions }) {
  const [versions, setVersions] = useState<Versions>(initial)

  useEffect(() => {
    const controller = new AbortController()
    fetch(SOURCE, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const fresh = data?.[resource]?.versions as Versions | undefined
        if (fresh && Object.keys(fresh).length > 0) setVersions(fresh)
      })
      .catch(() => {})
    return () => controller.abort()
  }, [resource])

  const sorted = Object.keys(versions).sort(compareVersions)

  return (
    <div>
      {sorted.map((version, index) => (
        <section key={version}>
          <h2 id={`v${version.replace(/\./g, '-')}`}>
            {version}
            {index === 0 ? ' (latest in this list)' : ''}
          </h2>
          <ul>
            {versions[version].map((note, i) => (
              <li key={i}>{linkify(note)}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
