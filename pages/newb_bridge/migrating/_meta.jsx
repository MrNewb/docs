import {
  IconBell,
  IconBriefcase,
  IconFocus2,
  IconForms,
  IconGasStation,
  IconKey,
  IconLayersSubtract,
  IconLoader,
  IconMenu2,
  IconMessage,
  IconMessages,
  IconPackage,
  IconSpeakerphone,
  IconTool,
} from '@tabler/icons-react'
import { sidebarTitle } from '../../../components/SidebarLabel'

export default {
  framework: sidebarTitle(IconLayersSubtract, 'Framework'),
  inventory: sidebarTitle(IconPackage, 'Inventory'),
  notifications: sidebarTitle(IconBell, 'Notifications'),
  textui: sidebarTitle(IconMessage, 'Text UI'),
  menu: sidebarTitle(IconMenu2, 'Menu'),
  inputs: sidebarTitle(IconForms, 'Inputs'),
  progressbar: sidebarTitle(IconLoader, 'Progress bar'),
  target: sidebarTitle(IconFocus2, 'Target'),
  vehiclekeys: sidebarTitle(IconKey, 'Vehicle keys'),
  vehiclefuel: sidebarTitle(IconGasStation, 'Vehicle fuel'),
  bossmenu: sidebarTitle(IconBriefcase, 'Boss menu'),
  dispatch: sidebarTitle(IconSpeakerphone, 'Dispatch'),
  dialogue: sidebarTitle(IconMessages, 'Dialogue'),
  utilities: sidebarTitle(IconTool, 'Libraries and utilities'),
}
