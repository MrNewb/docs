import { docs } from 'collections/server'
import { loader } from 'fumadocs-core/source'
import * as tablerIcons from '@tabler/icons-react'
import { createElement, type ComponentType } from 'react'

const icons = tablerIcons as unknown as Record<string, ComponentType<{ size?: number; stroke?: number }>>

export const source = loader({
  baseUrl: '/',
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon) return
    const Icon = icons[icon]
    if (!Icon) return
    return createElement(Icon, { size: 16, stroke: 1.5 })
  },
})
