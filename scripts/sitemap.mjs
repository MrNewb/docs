import fs from 'node:fs'
import path from 'node:path'

const site = 'https://mrnewb.github.io/docs'
const contentRoot = path.resolve('content/docs')
const outDir = path.resolve('out')

function walk(dir, base = '') {
  const routes = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'meta.json') continue
    if (entry.isDirectory()) {
      routes.push(...walk(path.join(dir, entry.name), path.posix.join(base, entry.name)))
      continue
    }
    if (!entry.name.endsWith('.mdx')) continue
    let route = path.posix.join(base, entry.name).replace(/\.mdx$/, '')
    if (route.endsWith('/index')) route = route.slice(0, -'/index'.length)
    if (route === 'index') route = ''
    routes.push(route)
  }
  return routes
}

if (!fs.existsSync(outDir)) {
  console.error('sitemap: out/ is missing, skip')
  process.exit(0)
}

const urls = walk(contentRoot).sort()
const body = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map((route) => `  <url><loc>${route ? `${site}/${route}` : site}</loc></url>`),
  '</urlset>',
  '',
].join('\n')

fs.writeFileSync(path.join(outDir, 'sitemap.xml'), body)
fs.writeFileSync(
  path.join(outDir, 'robots.txt'),
  `User-agent: *\nAllow: /\nHost: https://mrnewb.github.io\nSitemap: ${site}/sitemap.xml\n`,
)
console.log(`sitemap: ${urls.length} urls`)
