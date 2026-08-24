import { IconPackage, IconPhoto, IconTerminal2 } from '@tabler/icons-react'
import { sidebarTitle } from '../../../components/SidebarLabel'

export default {
  commands: sidebarTitle(IconTerminal2, 'Commands'),
  inventory: sidebarTitle(IconPackage, 'Item setup'),
  'inventory-images': sidebarTitle(IconPhoto, 'Item images'),
}
