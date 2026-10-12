'use client'

import { Callout as FumadocsCallout } from 'fumadocs-ui/components/callout'
import { Tabs as FumadocsTabs } from 'fumadocs-ui/components/tabs'
import type { ReactNode } from 'react'

const calloutType = {
  info: 'info',
  warning: 'warn',
  warn: 'warn',
  error: 'error',
  success: 'success',
} as const

export function Callout({
  type = 'info',
  children,
}: {
  type?: string
  children?: ReactNode
}) {
  const mapped = calloutType[type as keyof typeof calloutType] ?? 'info'
  return <FumadocsCallout type={mapped}>{children}</FumadocsCallout>
}

export function Tabs({
  items,
  children,
}: {
  items: string[]
  storageKey?: string
  children?: ReactNode
}) {
  return <FumadocsTabs items={items}>{children}</FumadocsTabs>
}
