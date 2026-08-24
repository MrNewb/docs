import { IconCode, IconDownload } from '@tabler/icons-react'
import { sidebarTitle } from '../../components/SidebarLabel'

export default {
  install: sidebarTitle(IconDownload, 'Installation'),
  exports: sidebarTitle(IconCode, 'Exports'),
}
