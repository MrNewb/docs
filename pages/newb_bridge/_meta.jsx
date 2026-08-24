import {
  IconArrowsExchange,
  IconBolt,
  IconCircleCheck,
  IconDownload,
  IconFolders,
  IconPuzzle,
  IconSettings,
  IconTool,
} from '@tabler/icons-react'
import { sidebarTitle } from '../../components/SidebarLabel'

export default {
  'getting-started': sidebarTitle(IconDownload, 'Installation'),
  configuration: sidebarTitle(IconSettings, 'Configuration'),
  supported: sidebarTitle(IconCircleCheck, 'Supported'),
  'resource-layout': sidebarTitle(IconFolders, 'Resource layout'),
  modules: sidebarTitle(IconPuzzle, 'Modules'),
  utilities: sidebarTitle(IconTool, 'Utilities'),
  events: sidebarTitle(IconBolt, 'Events'),
  migrating: sidebarTitle(IconArrowsExchange, 'Migrating'),
}
