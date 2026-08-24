import { readFile, writeFile, mkdir, copyFile, readdir } from 'fs/promises'
import { join, dirname, relative, basename, extname } from 'path'
import { existsSync } from 'fs'

const ROOT = join(import.meta.dir, '..')
const GITBOOK = join(ROOT, '..', 'Gitbook')
const PAGES = join(ROOT, 'pages', 'scripts')
const PUBLIC_IMAGES = join(ROOT, 'public', 'images')

const HINT_STYLES = { info: 'info', success: 'success', warning: 'warning', danger: 'error' }

function extractYoutubeId(url) {
  const match = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/)
  return match ? match[1] : null
}

function gitbookPathToRoute(gitbookPath) {
  let p = gitbookPath.replace(/\\/g, '/').replace(/\.md$/, '')
  if (p.endsWith('/README') || p === 'README') {
    p = p.replace(/\/?README$/, '')
  }
  const segments = p.split('/').filter(Boolean)
  return '/scripts/' + segments.join('/')
}

function fixMarkdownLinks(content, currentFile) {
  return content.replace(/\]\(([^)\s]+)\)/g, (match, raw) => {
    if (raw.startsWith('http') || raw.startsWith('#') || raw.startsWith('mailto:')) return match
    if (raw.includes('.gitbook')) return match

    const [pathPart, hash = ''] = raw.split('#')
    if (!pathPart.endsWith('.md') && !pathPart.includes('README')) return match

    let resolved = pathPart.replace(/\.md$/, '')
    if (resolved.endsWith('/README')) resolved = resolved.slice(0, -'/README'.length)
    if (resolved === 'README') resolved = ''

    if (pathPart.startsWith('./') || pathPart.startsWith('../')) {
      const base = dirname(currentFile.replace(/\\/g, '/'))
      const parts = [...base.split('/'), ...resolved.split('/')]
      const normalized = []
      for (const part of parts) {
        if (!part || part === '.') continue
        if (part === '..') normalized.pop()
        else normalized.push(part)
      }
      resolved = normalized.join('/')
    }

    const route = gitbookPathToRoute(resolved)
    return `](${route}${hash ? `#${hash}` : ''})`
  })
}

function convertContent(content, filePath) {
  let body = content.replace(/^---[\s\S]*?---\r?\n?/m, '')

  body = body.replace(
    /\{%\s*hint\s+style="(\w+)"\s*%\}([\s\S]*?)\{%\s*endhint\s*%\}/g,
    (_, type, inner) => {
      const label = (HINT_STYLES[type] || type).toUpperCase()
      return `\n> **${label}:** ${inner.trim()}\n`
    },
  )

  body = body.replace(/\{%\s*embed\s+url="([^"]+)"\s*%\}/g, (_, url) => {
    const yt = extractYoutubeId(url)
    if (yt) {
      return `\n\n<iframe width="560" height="315" src="https://www.youtube.com/embed/${yt}" title="Preview" allowFullScreen style={{ maxWidth: '100%', aspectRatio: '16/9' }} />\n`
    }
    return `\n\n[Open preview](${url})\n`
  })

  body = body.replace(
    /<figure><img\s+src="([^"]+)"\s+alt="([^"]*)"\s*\/?>(?:<figcaption>[\s\S]*?<\/figcaption>)?<\/figure>/g,
    (_, src, alt) => {
      const name = src.split('/').pop()
      return `\n\n![${alt || name}](/docs/images/${name})\n`
    },
  )

  body = body.replace(/\\_/g, '_')
  body = body.replace(/\bcommunity_bridge\b/g, 'Newb_Bridge')
  body = body.replace(/github\.com\/MrNewb\/community_bridge/g, 'github.com/MrNewb/Newb_Bridge')
  body = body.replace(/github\.com\/TheOrderFivem\/community_bridge/g, 'github.com/MrNewb/Newb_Bridge')

  body = fixMarkdownLinks(body, filePath)

  return body.trim() + '\n'
}

function pathToOutput(gitbookRelative) {
  const rel = gitbookRelative.replace(/\\/g, '/')
  if (rel === 'README.md' || rel === 'SUMMARY.md') return null

  const dir = dirname(rel)
  const name = basename(rel, '.md')

  if (name === 'README') {
    return join(PAGES, dir === '.' ? '' : dir, 'index.mdx')
  }

  return join(PAGES, dir === '.' ? '' : dir, `${name}.mdx`)
}

async function walkMdFiles(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === '.gitbook') continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) await walkMdFiles(full, files)
    else if (entry.name.endsWith('.md') && entry.name !== 'SUMMARY.md') files.push(full)
  }
  return files
}

function parseSummary(summaryText) {
  /** @type {Map<string, Record<string, string>>} */
  const metas = new Map()
  metas.set('', { index: 'Scripts' })

  const lines = summaryText.split('\n')
  for (const line of lines) {
    const match = line.match(/^(\s*)\*\s+\[([^\]]+)\]\(([^)]+)\)/)
    if (!match) continue

    const indent = match[1].length
    const title = match[2]
    let path = match[3].replace(/\.md$/, '').replace(/\/README$/, '').replace(/\\/g, '/')

    if (path === 'README') continue

    const parts = path.split('/')
    const fileKey = parts.pop()
    const dirKey = parts.join('/')

    if (!metas.has(dirKey)) metas.set(dirKey, {})
    const meta = metas.get(dirKey)

    const key = fileKey === 'README' ? 'index' : fileKey
    if (key === 'index' && !meta.index) meta.index = title
    else meta[key] = title
  }

  return metas
}

function metaToJs(meta) {
  const entries = Object.entries(meta)
  entries.sort(([a], [b]) => {
    if (a === 'index') return -1
    if (b === 'index') return 1
    return a.localeCompare(b)
  })

  const lines = entries.map(([key, title]) => {
    const safeKey = key.includes('-') || key.includes('.') ? `'${key}'` : key
    const safeTitle = title.replace(/'/g, "\\'")
    return `  ${safeKey}: '${safeTitle}',`
  })

  return `export default {\n${lines.join('\n')}\n}\n`
}

async function copyAssets() {
  const assetsDir = join(GITBOOK, '.gitbook', 'assets')
  if (!existsSync(assetsDir)) return

  await mkdir(PUBLIC_IMAGES, { recursive: true })
  const files = await readdir(assetsDir)
  for (const file of files) {
    await copyFile(join(assetsDir, file), join(PUBLIC_IMAGES, file))
  }
}

async function main() {
  const summaryText = await readFile(join(GITBOOK, 'SUMMARY.md'), 'utf8')
  const metas = parseSummary(summaryText)
  const mdFiles = await walkMdFiles(GITBOOK)

  let converted = 0
  for (const file of mdFiles) {
    const rel = relative(GITBOOK, file)
    const out = pathToOutput(rel)
    if (!out) continue

    const raw = await readFile(file, 'utf8')
    const mdx = convertContent(raw, rel)

    await mkdir(dirname(out), { recursive: true })
    await writeFile(out, mdx, 'utf8')
    converted++
  }

  for (const [dirKey, meta] of metas) {
    if (dirKey === '') continue
    const metaPath = join(PAGES, dirKey, '_meta.js')
    await mkdir(dirname(metaPath), { recursive: true })
    await writeFile(metaPath, metaToJs(meta), 'utf8')
  }

  // scripts root _meta from SUMMARY top-level scripts only
  const scriptsMeta = { index: 'Overview' }
  for (const line of summaryText.split('\n')) {
    const match = line.match(/^\*\s+\[([^\]]+)\]\(([^)]+)\)/)
    if (!match) continue
    const title = match[1]
    let path = match[2].replace(/\.md$/, '').replace(/\/README$/, '')
    if (path === 'README') continue
    const key = path.split('/')[0]
    if (!scriptsMeta[key]) scriptsMeta[key] = title
  }

  await mkdir(PAGES, { recursive: true })
  await writeFile(join(PAGES, '_meta.js'), metaToJs(scriptsMeta), 'utf8')

  await copyAssets()

  console.log(`Converted ${converted} pages`)
  console.log(`Wrote ${metas.size} _meta.js files`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
