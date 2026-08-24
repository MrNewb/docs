import { IconLayersSubtract, IconPackage, IconPhoto } from '@tabler/icons-react'
import { sidebarTitle } from '../../../components/SidebarLabel'

export default {
  inventory: sidebarTitle(IconPackage, 'Item setup'),
  'inventory-images': sidebarTitle(IconPhoto, 'Item images'),
  framework: sidebarTitle(IconLayersSubtract, 'Framework'),
}
