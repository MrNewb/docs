import React from 'react'
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

const SITE_DESCRIPTION =
  'Install, config, and exports for MrNewb FiveM resources.'

function useHead() {
  const { asPath } = useRouter()
  const { frontMatter, title } = useConfig()
  const url = `https://mrnewb.github.io${asPath}`
  const description = (frontMatter.description as string | undefined) || SITE_DESCRIPTION
  const pageTitle = title ? `${title} | MrNewb` : 'MrNewb'

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/docs/favicon.png" type="image/png" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="description" content={description} />
      <meta name="theme-color" content="#1b1b1f" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
    </>
  )
}

const config: DocsThemeConfig = {
  logo: (
    <span className="site-logo">
      <img
        src="/docs/favicon.png"
        alt=""
        width={48}
        height={48}
        decoding="async"
      />
      MrNewb
    </span>
  ),
  project: {
    link: 'https://github.com/MrNewb',
  },
  chat: {
    link: 'https://discord.gg/mrnewbscripts',
  },
  docsRepositoryBase: 'https://github.com/MrNewb/docs/tree/main',
  footer: {
    content: (
      <span>
        {new Date().getFullYear()} © MrNewb
      </span>
    ),
  },
  head: useHead,
  color: {
    hue: 207,
    saturation: 72,
    lightness: {
      dark: 56,
      light: 43,
    },
  },
  darkMode: true,
  nextThemes: {
    defaultTheme: 'dark',
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
    title: 'On this page',
  },
  search: {
    placeholder: 'Search',
  },
}

export default config
