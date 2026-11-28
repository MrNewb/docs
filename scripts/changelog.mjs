// Builds a Changelog page for every documented script from MrNewb/patchnotes (resources.json).
// Only keys that have a docs folder get a page, so scripts that are not documented never appear.
// If the file cannot be fetched, the pages from the last run are left as they are.
import fs from 'node:fs'
import path from 'node:path'

const SOURCE = 'https://raw.githubusercontent.com/MrNewb/patchnotes/refs/heads/main/resources.json'
const contentRoot = path.resolve('content/docs')

// resource key -> docs folder, for the few that do not match by lowercasing
const FOLDER_OVERRIDES = { MrNewbsSpookySeason: 'mrnewbspookyseason' }

function folderFor(key) {
  const guess = FOLDER_OVERRIDES[key] ?? key.toLowerCase().replace(/_/g, '')
  if (fs.existsSync(path.join(contentRoot, guess))) return guess
  const underscored = key.toLowerCase()
  if (fs.existsSync(path.join(contentRoot, underscored))) return underscored
  return null
}

function compareVersions(a, b) {
  const pa = a.split('.').map((n) => parseInt(n, 10) || 0)
  const pb = b.split('.').map((n) => parseInt(n, 10) || 0)
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pb[i] ?? 0) - (pa[i] ?? 0)
    if (d !== 0) return d
  }
  return 0
}

async function load() {
  try {
    const res = await fetch(SOURCE, { signal: AbortSignal.timeout(15000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn(`changelog: could not fetch ${SOURCE} (${err.message}), keeping existing pages`)
    return null
  }
}

function writeKeepingEol(file, text) {
  const eol = fs.existsSync(file) && fs.readFileSync(file, 'utf8').includes('\r\n') ? '\r\n' : '\n'
  fs.writeFileSync(file, text.replace(/\r?\n/g, eol))
}

function ensureInMeta(folder) {
  const file = path.join(contentRoot, folder, 'meta.json')
  if (!fs.existsSync(file)) return
  const raw = fs.readFileSync(file, 'utf8')
  const meta = JSON.parse(raw)
  if (!Array.isArray(meta.pages) || meta.pages.includes('changelog')) return
  meta.pages.push('changelog')
  writeKeepingEol(file, JSON.stringify(meta, null, 2) + '\n')
}

const data = await load()
if (!data) process.exit(0)

let written = 0
for (const [key, entry] of Object.entries(data)) {
  const folder = folderFor(key)
  if (!folder) continue
  const versions = entry?.versions
  if (!versions || Object.keys(versions).length === 0) continue
  const sorted = Object.fromEntries(Object.entries(versions).sort(([a], [b]) => compareVersions(a, b)))
  const initial = JSON.stringify(sorted)
  const page = [
    '---',
    'title: "Changelog"',
    'description: "What changed in each version."',
    'icon: "IconHistory"',
    '---',
    '',
    `<Changelog resource="${key}" initial={${initial}} />`,
    '',
  ].join('\n')
  writeKeepingEol(path.join(contentRoot, folder, 'changelog.mdx'), page)
  ensureInMeta(folder)
  written++
}
console.log(`changelog: wrote ${written} pages`)
