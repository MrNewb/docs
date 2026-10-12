'use client'

import { useEffect } from 'react'

const youtubeIdPattern = /^[A-Za-z0-9_-]{11}$/

export function YouTubeBridge() {
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

  return null
}
