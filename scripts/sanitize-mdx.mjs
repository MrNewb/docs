import { readFile, writeFile, readdir } from 'fs/promises'
import { join } from 'path'

const PAGES = join(import.meta.dir, '..', 'pages', 'scripts')

async function walk(dir, files = []) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) await walk(full, files)
    else if (entry.name.endsWith('.mdx')) files.push(full)
  }
  return files
}

function sanitize(content) {
  let body = content

  body = body.replace(/\{%\s*endembed\s*%\}/g, '')
  body = body.replace(/\{%\s*embed[\s\S]*?%\}/g, '')

  body = body.replace(/\/docs\/images\//g, '/docs/images/')

  // basePath-aware static assets + lazy load
  body = body.replace(/<img\s+([^>]*?)\s*\/?>/g, (match, attrs) => {
    let a = attrs
      .replace(/\ssrc="\/images\//g, ' src="/docs/images/')
      .replace(/\s\/\s*$/, '')
      .trim()
    if (!/\bloading=/.test(a)) a += ' loading="lazy"'
    if (!/\bdecoding=/.test(a)) a += ' decoding="async"'
    return `<img ${a} />`
  })

  body = body.replace(/!\[([^\]]*)\]\((\/images\/[^)]+)\)/g, (_, alt, src) => {
    const path = src.startsWith('/docs/') ? src : `/docs${src}`
    return `<img src="${path}" alt="${alt}" loading="lazy" decoding="async" style={{ maxWidth: "100%" }} />`
  })

  // Repair prior bad sanitizer pass: `/>` split before lazy attrs
  body = body.replace(/ \/\s+loading="lazy"\s+decoding="async"\s*\/?>/g, ' loading="lazy" decoding="async" />')

  body = body.replace(
    /<pre class="language-[^"]*"><code class="lang-[^"]*">([\s\S]*?)<\/code><\/pre>/g,
    (_, code) => {
      const cleaned = code
        .replace(/<\/?strong>/g, '')
        .replace(/&#x3C;/g, '<')
        .replace(/&#x3E;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .trim()
      const lang = cleaned.includes('case ') || cleaned.includes('function ') ? 'javascript' : 'lua'
      return '\n```' + lang + '\n' + cleaned + '\n```\n'
    },
  )

  body = body.replace(
    /<iframe[^>]*src="https:\/\/www\.youtube\.com\/embed\/([^"]+)"[^>]*\/?>/g,
    (_, id) => `\n[Watch on YouTube](https://www.youtube.com/watch?v=${id})\n`,
  )

  // Bare HTML tags that break MDX outside code fences
  body = body.replace(/<p>([^<]*)<\/p>/g, '$1\n')

  return body
}

async function main() {
  const files = await walk(PAGES)
  let changed = 0
  for (const file of files) {
    const raw = await readFile(file, 'utf8')
    const next = sanitize(raw)
    if (next !== raw) {
      await writeFile(file, next, 'utf8')
      changed++
    }
  }
  console.log(`Sanitized ${files.length} files (${changed} updated)`)
}

main()
