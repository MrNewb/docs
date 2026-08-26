import { IconBrandDiscord, IconShoppingBag } from '@tabler/icons-react'

export function NavCtas() {
  return (
    <div className="nav-ctas">
      <a
        className="nav-cta nav-cta-store"
        href="https://mrnewbscripts.tebex.io/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconShoppingBag size={16} stroke={1.5} aria-hidden />
        <span className="nav-cta-label-full">See the store</span>
        <span className="nav-cta-label-short">Store</span>
        <span className="sr-only">Opens in a new tab</span>
      </a>
      <a
        className="nav-cta nav-cta-discord"
        href="https://discord.gg/mrnewbscripts"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconBrandDiscord size={16} stroke={1.5} aria-hidden />
        <span className="nav-cta-label-full">My Discord</span>
        <span className="nav-cta-label-short">Discord</span>
        <span className="sr-only">Opens in a new tab</span>
      </a>
    </div>
  )
}
