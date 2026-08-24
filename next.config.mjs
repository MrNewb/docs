import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  latex: false,
  readingTime: false,
  defaultShowCopyCode: true,
  // Lua-heavy pages: skip code block text from FlexSearch to cut ~200KB client payload
  search: { codeblocks: false },
})

export default withNextra({
  output: 'export',
  poweredByHeader: false,
  compress: true,
  images: {
    unoptimized: true,
  },
  basePath: '/docs',
  // Keep compiled routes around so clicking Installation again is not another 5s wait.
  onDemandEntries: {
    maxInactiveAge: 60 * 60 * 1000,
    pagesBufferLength: 40,
  },
  // basePath already prefixes assets; assetPrefix here doubled dev paths and caused blank pages
  async redirects() {
    // Dev convenience: localhost:3000 → localhost:3000/docs
    return [
      {
        source: '/',
        destination: '/docs',
        permanent: false,
        basePath: false,
      },
    ]
  },
})
