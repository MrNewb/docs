import { useEffect, useRef } from 'react'

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min)
}

export function FallingTaco() {
  const tacoRef = useRef<HTMLDivElement>(null)
  const waitRef = useRef(0)

  useEffect(() => {
    const tacoNode = tacoRef.current
    if (!tacoNode) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    function clearWait() {
      window.clearTimeout(waitRef.current)
    }

    function schedule(minMs: number, maxMs: number) {
      clearWait()
      waitRef.current = window.setTimeout(drop, randomBetween(minMs, maxMs))
    }

    function drop() {
      const node = tacoRef.current
      if (!node) return
      if (document.hidden) {
        schedule(12000, 24000)
        return
      }
      node.style.left = `${randomBetween(8, 86)}vw`
      node.style.setProperty('--taco-duration', `${randomBetween(5.2, 7.4)}s`)
      node.style.setProperty('--taco-from', `${randomBetween(-26, -8)}deg`)
      node.style.setProperty('--taco-to', `${randomBetween(16, 38)}deg`)
      node.style.setProperty('--taco-drift', `${randomBetween(-3.2, 3.2)}rem`)
      node.classList.add('is-falling')
    }

    function onEnd() {
      const node = tacoRef.current
      if (!node) return
      node.classList.remove('is-falling')
      schedule(42000, 95000)
    }

    function onVisibility() {
      const node = tacoRef.current
      if (!node) return
      if (document.hidden) {
        node.classList.remove('is-falling')
        clearWait()
        return
      }
      schedule(8000, 18000)
    }

    tacoNode.addEventListener('animationend', onEnd)
    document.addEventListener('visibilitychange', onVisibility)
    schedule(14000, 32000)

    return () => {
      clearWait()
      tacoNode.removeEventListener('animationend', onEnd)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className="falling-taco" ref={tacoRef} aria-hidden="true">
      <img src="/docs/favicon.png" alt="" width={52} height={52} decoding="async" />
    </div>
  )
}
