import { source } from '@/lib/source'
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page'
import type { Item, Node } from 'fumadocs-core/page-tree'
import { notFound } from 'next/navigation'
import { getMDXComponents } from '@/components/mdx'
import { Callout } from '@/components/nextra-compat'
import type { Metadata } from 'next'

const brand = 'MrNewb Scripts'
const homeTitle = 'MrNewb Scripts | FiveM docs for vehicle keys and server scripts (ESX, QBCore, Qbox)'
const siteOrigin = 'https://mrnewb.github.io'
const resources: Record<string, string> = {
  newb_bridge: 'Newb_Bridge',
  mrnewbbeekeeping: 'BeeKeeping',
  mrnewbcityhall: 'CityHall',
  mrnewbcustomplates: 'CustomPlates',
  mrnewbdigitalpets: 'DigitalPets',
  mrnewbprescriptions: 'Prescriptions',
  mrnewbgiftbox: 'GiftBox',
  mrnewbloottables: 'LootTables',
  mrnewbnamechanger: 'NameChanger',
  mrnewborganics: 'Organics',
  mrnewbpawn: 'Pawn',
  mrnewbphonetracker: 'PhoneTracker',
  mrnewbplatecarriers: 'PlateCarriers',
  mrnewbrecycling: 'Recycling',
  mrnewbspookyseason: 'SpookySeason',
  mrnewbvehiclerentals: 'VehicleRentals',
  mrnewbvehiclekeys: 'VehicleKeys',
  mrnewbweapontints: 'WeaponTints',
  partners: 'Partners',
  tacolink: 'TacoLink',
  'getting-started': 'Getting started',
}

const inDev = new Set(['mrnewbprescriptions', 'mrnewbdigitalpets', 'mrnewbvehiclekeys', 'mrnewbrecycling'])

function listPages(nodes: Node[], pages: Item[] = []) {
  for (const node of nodes) {
    if (node.type === 'folder') {
      if (node.index) listPages([node.index], pages)
      listPages(node.children, pages)
    } else if (node.type === 'page' && !node.external) {
      pages.push(node)
    }
  }
  return pages
}

function resourceOf(url: string) {
  return url.split('/').filter(Boolean)[0]
}

function footerItems(slug?: string[]) {
  const current = `/${slug?.join('/') ?? ''}`
  const resource = resourceOf(current)
  if (!resource) return
  const pages = listPages(source.getPageTree().children)
  const index = pages.findIndex((item) => item.url === current)
  if (index < 0) return
  const previous = pages[index - 1]
  const next = pages[index + 1]
  const sameResource = (item?: Item) => !!item && resourceOf(item.url) === resource
  const items = {
    previous: sameResource(previous) ? previous : undefined,
    next: sameResource(next) ? next : undefined,
  }
  if (!items.previous && !items.next) return
  return items
}

function seoTitle(slugs: string[], heading: string) {
  if (slugs.length === 0) return homeTitle
  const resource = resources[slugs[0]] || slugs[0]
  const head = heading.trim()
  if (slugs.length === 1) return `${head} | ${brand}`
  let scope = resource
  if (slugs[1] === 'modules') scope = `${resource} module`
  else if (slugs[1] === 'migrating') scope = `${resource} migration`
  if (head.toLowerCase().includes(resource.toLowerCase())) return `${head} | ${brand}`
  return `${head} | ${scope} | ${brand}`
}

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page) notFound()

  const MDX = page.data.body
  const items = footerItems(slug)

  return (
    <DocsPage toc={page.data.toc} full={page.data.full} footer={{ enabled: !!items, items }}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      {slug && inDev.has(slug[0]) && (
        <Callout type="warning">
          <strong>In-development version.</strong> These docs cover the testing build of{' '}
          {resources[slug[0]]}. The official release is still documented on the GitBook linked in
          its README.
        </Callout>
      )}
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  )
}

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page) notFound()

  const slugs = page.slugs
  const title = seoTitle(slugs, page.data.title)
  const description = page.data.description || title
  const path = slugs.length ? `/${slugs.join('/')}` : ''
  const url = `${siteOrigin}/docs${path}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: brand,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}
