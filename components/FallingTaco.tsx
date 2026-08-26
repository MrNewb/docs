import { useEffect, useRef } from 'react'

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

export function FallingTaco() {
  const tacoRef = useRef<HTMLDivElement>(null)
  const waitRef = useRef(0)

  useEffect(() => {
    const taco = tacoRef.current
    if (!taco) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    function clearWait() {
      window.clearTimeout(waitRef.current)
    }

    function schedule(minMs: number, maxMs: number) {
      clearWait()
      waitRef.current = window.setTimeout(drop, randomBetween(minMs, maxMs))
    }

    function drop() {
      if (document.hidden) {
        schedule(12000, 24000)
        return
      }
      taco.style.left = `${randomBetween(8, 86)}vw`
      taco.style.setProperty('--taco-duration', `${randomBetween(5.2, 7.4)}s`)
      taco.style.setProperty('--taco-from', `${randomBetween(-26, -8)}deg`)
      taco.style.setProperty('--taco-to', `${randomBetween(16, 38)}deg`)
      taco.style.setProperty('--taco-drift', `${randomBetween(-3.2, 3.2)}rem`)
      taco.classList.add('is-falling')
    }

    function onEnd() {
      taco.classList.remove('is-falling')
      schedule(42000, 95000)
    }

    function onVisibility() {
      if (document.hidden) {
        taco.classList.remove('is-falling')
        clearWait()
        return
      }
      schedule(8000, 18000)
    }

    taco.addEventListener('animationend', onEnd)
    document.addEventListener('visibilitychange', onVisibility)
    schedule(14000, 32000)

    return () => {
      clearWait()
      taco.removeEventListener('animationend', onEnd)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className="falling-taco" ref={tacoRef} aria-hidden="true">
      <svg viewBox="0 0 72 72" width="52" height="52">
        <ellipse cx="36" cy="64" rx="16" ry="3.5" fill="rgba(0,0,0,0.22)" />
        <path
          d="M10 38c1.2-18.5 12.2-30 26-30s24.8 11.5 26 30c-1.8 2.4-8.4 4-26 4s-24.2-1.6-26-4z"
          fill="#f0c14b"
        />
        <path
          d="M14 38c1-14.5 9.6-23.5 22-23.5S57 23.5 58 38c-1.4 1.6-7.2 2.8-22 2.8S15.4 39.6 14 38z"
          fill="#f6d98a"
        />
        <path
          d="M16 36.5c2.2-7.4 8.6-11.8 20-11.8s17.8 4.4 20 11.8c-3.4 3.6-10.8 5.4-20 5.4s-16.6-1.8-20-5.4z"
          fill="#6a3a1c"
        />
        <path
          d="M18 34c3.6-3.2 8-2.2 10.4.4 3.2-3.8 8.6-4 12.4-.2 2.4-2.4 6.4-3 9.6.2-2.2 2.8-8.4 4.6-16.2 4.6S20.4 36.8 18 34z"
          fill="#4fa24a"
        />
        <circle cx="26" cy="32.2" r="3.1" fill="#d64532" />
        <circle cx="37.5" cy="30.6" r="2.6" fill="#e2573e" />
        <circle cx="47" cy="32.8" r="2.3" fill="#c73b2a" />
        <path
          d="M22 31.5c3.4.8 6.6.4 9.2-.6M31 29.4c3.8 1.1 7.6 1.4 11.2.3M40 32.2c2.8.6 5.6.4 8.2-.5"
          stroke="#f2c94c"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M11 38c5.6 11.2 14.4 16.4 25 16.4S55.4 49.2 61 38c-2.2 1.8-10.4 3.4-25 3.4S13.2 39.8 11 38z"
          fill="#e2a83a"
        />
        <path
          d="M13.5 38.6c4.8 8.8 12.2 12.6 22.5 12.6s17.7-3.8 22.5-12.6"
          stroke="#c48a22"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
