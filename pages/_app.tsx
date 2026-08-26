import { Inter } from 'next/font/google'
import Head from 'next/head'
import Router from 'next/router'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { FallingTaco } from '../components/FallingTaco'
import '../styles.css'

// Dev-only: Nextra's sidebar prefetches every visible child. Each prefetch
// compiles a webpack page (~1s), so clicking Installation waits on a queue.
if (process.env.NODE_ENV === 'development') {
  Router.prefetch = async () => {}
}

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const youtubeIdPattern = /^[A-Za-z0-9_-]{11}$/

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target
      if (!(target instanceof Element)) return
      const button = target.closest('[data-youtube]')
      if (!(button instanceof HTMLButtonElement)) return
      const id = button.getAttribute('data-youtube')
      const title = button.getAttribute('data-title') || 'YouTube video'
      if (!id || !youtubeIdPattern.test(id)) return
      const iframe = document.createElement('iframe')
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`
      iframe.title = title
      iframe.setAttribute('loading', 'lazy')
      iframe.referrerPolicy = 'strict-origin-when-cross-origin'
      iframe.allow =
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
      iframe.allowFullscreen = true
      button.replaceWith(iframe)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    function restoreTitleTooltips() {
      document.querySelectorAll('[title="[object Object]"]').forEach((node) => {
        const text = node.textContent?.trim()
        if (text) node.setAttribute('title', text)
        else node.removeAttribute('title')
      })
    }
    restoreTitleTooltips()
    Router.events.on('routeChangeComplete', restoreTitleTooltips)
    return () => {
      Router.events.off('routeChangeComplete', restoreTitleTooltips)
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#reach-skip-nav">
        Skip to content
      </a>
      <Head>
        <style>{`:root{--font-inter:${inter.style.fontFamily},ui-sans-serif,system-ui,sans-serif}`}</style>
      </Head>
      <FallingTaco />
      <Component {...pageProps} />
    </>
  )
}
