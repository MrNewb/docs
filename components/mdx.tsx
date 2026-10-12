import defaultMdxComponents from 'fumadocs-ui/mdx'
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion'
import { Steps, Step } from 'fumadocs-ui/components/steps'
import { Tab } from 'fumadocs-ui/components/tabs'
import type { MDXComponents } from 'mdx/types'
import { Callout, Tabs } from '@/components/nextra-compat'
import { ProviderKey, ProviderTable } from '@/components/ProviderChart'
import { YouTubePoster } from '@/components/YouTubePoster'
import { DocLink } from '@/components/brand-link'
import { LinkEmbed } from '@/components/link-embed'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    a: DocLink,
    Callout,
    Accordion,
    Accordions,
    Steps,
    Step,
    Tabs,
    Tab,
    YouTubePoster,
    LinkEmbed,
    ProviderKey,
    ProviderTable,
    ...components,
  }
}
