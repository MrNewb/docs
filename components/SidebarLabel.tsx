import type { ComponentType } from 'react'

type SidebarIcon = ComponentType<{
  size?: number | string
  stroke?: number | string
  'aria-hidden'?: boolean
}>

export function SidebarLabel({
  icon: Icon,
  children,
}: {
  icon: SidebarIcon
  children: string
}) {
  return (
    <span className="sidebar-label" title={children}>
      <Icon size={16} stroke={1.5} aria-hidden />
      {children}
    </span>
  )
}

export function sidebarTitle(icon: SidebarIcon, label: string) {
  return {
    title: <SidebarLabel icon={icon}>{label}</SidebarLabel>,
  }
}
