type ProviderKind = 'auto' | 'manual' | 'fallback'

type ProviderRow = {
  name: string
  kind: ProviderKind
  note: string
}

type ProviderGroup = {
  id: string
  rows: ProviderRow[]
}

function auto(name: string, note = 'Detected automatically'): ProviderRow {
  return { name, kind: 'auto', note }
}

function manual(name: string, note: string): ProviderRow {
  return { name, kind: 'manual', note }
}

function fallback(name: string, note: string): ProviderRow {
  return { name, kind: 'fallback', note }
}

const groups: Record<string, ProviderGroup> = {
  framework: {
    id: 'framework',
    rows: [auto('kora_core'), auto('qbx_core'), auto('qb-core'), auto('es_extended')],
  },
  inventory: {
    id: 'inventory',
    rows: [
      auto('kora_inventory'),
      auto('ox_inventory'),
      auto('wasabi_inventory'),
      auto('m-Inventory'),
      auto('jaksam_inventory'),
      auto('tgiann-inventory'),
      auto('codem-inventory'),
      auto('core_inventory'),
      auto('origen_inventory'),
      auto('qs-inventory'),
      auto('qb-inventory'),
      manual(
        'one_inventory',
        'Set Config.Inventory = "one_inventory". It provides itself as ox_inventory, so auto-detect picks ox_inventory instead.',
      ),
      manual(
        'qb-framework',
        'Set Config.Inventory. QBCore / QBX player items via Player.Functions. No stashes, shops, or hooks.',
      ),
      manual(
        'esx-framework',
        'Set Config.Inventory. ESX xPlayer inventory. No stashes, shops, or hooks.',
      ),
    ],
  },
  target: {
    id: 'target',
    rows: [
      auto('kora_target'),
      auto('ox_target'),
      auto('tgiann-target'),
      auto('core_focus'),
      auto('qb-target'),
      auto('sleepless_interact'),
    ],
  },
  'vehicle-keys': {
    id: 'vehicle-keys',
    rows: [
      auto('MrNewbVehicleKeys'),
      auto('kora_vehiclekeys', 'No client exports: grant keys from the server. Keys last until the player disconnects.'),
      auto('jg-vehiclekeys', 'Detected before qbx_vehiclekeys and qb-vehiclekeys, which it provides.'),
      auto('qbx_vehiclekeys'),
      auto('cd_garage'),
      auto('mVehicle'),
      auto('okokGarage'),
      auto('qb-vehiclekeys'),
      auto('vehicles_keys'),
      auto('wasabi_carlock'),
      auto('Renewed-Vehiclekeys'),
      auto('mk_vehiclekeys'),
      auto('ak47_vehiclekeys'),
      auto('0r-vehiclekeys'),
    ],
  },
  'vehicle-fuel': {
    id: 'vehicle-fuel',
    rows: [
      auto('ox_fuel'),
      auto('rcore_fuel'),
      auto('okokGasStation'),
      auto('LegacyFuel'),
      auto('cdn-fuel'),
      auto('lc_fuel'),
      auto('qb-fuel'),
      auto('Renewed-Fuel'),
      auto('ps-fuel'),
      auto('qs-fuelstations'),
      auto('ti_fuel'),
      fallback('internal', 'The built-in version: native fuel. Used when nothing in the list is installed.'),
    ],
  },
  menu: {
    id: 'menu',
    rows: [auto('ox_lib'), auto('lation_ui'), auto('qb-menu')],
  },
  notifications: {
    id: 'notifications',
    rows: [
      auto('ox_lib'),
      auto('vms_notifyv2'),
      auto('codem-notification'),
      auto('brutal_notify'),
      auto('fl-notify'),
      auto('mythic_notify'),
      auto('okokNotify'),
      auto('pnotify'),
      auto('solaire_notify'),
      auto('t-notify'),
      auto('lation_ui'),
      auto('wasabi_notify'),
      auto('ZSX_UIV2'),
      fallback('internal', 'The built-in version: the bridge toast. Used when nothing in the list is installed.'),
    ],
  },
  inputs: {
    id: 'inputs',
    rows: [auto('ox_lib'), auto('lation_ui')],
  },
  'text-ui': {
    id: 'text-ui',
    rows: [
      auto('ox_lib'),
      auto('lation_ui'),
      auto('okokTextUI'),
      auto('cd_drawtextui'),
      auto('jg-textui'),
      auto('lab-TextUI'),
      auto('ZSX_UIV2'),
    ],
  },
  'progress-bar': {
    id: 'progress-bar',
    rows: [
      auto('ox_lib'),
      auto('lation_ui'),
      auto('wasabi_uikit'),
      auto('progressbar'),
      auto('ZSX_UIV2'),
    ],
  },
  'boss-menu': {
    id: 'boss-menu',
    rows: [
      auto('qbx_management'),
      auto('qb-management'),
      auto('esx_society'),
      auto('vms_bossmenu'),
      auto('tk_bosstablet'),
      auto('okokBossMenu'),
      auto('codem-bossmenu'),
      auto('zat-bossmenu'),
      auto('m-BossMenu'),
      auto('lation_jobs'),
      auto('ShitDevScripts-Bossmenu'),
      auto('apex_bossmenu'),
    ],
  },
  banking: {
    id: 'banking',
    rows: [
      auto('Renewed-Banking'),
      auto('qb-banking'),
      auto('okokBanking'),
      auto('lation_banking'),
      auto('fd_banking'),
      auto('kartik-banking'),
      auto('tgg-banking'),
      auto('tgiann-bank'),
      auto('wasabi_banking'),
      auto('esx_addonaccount'),
      auto('ShitDevScripts-Banking'),
      fallback('none', 'Nothing installed: the module does nothing. Balance is 0 and changes return false.'),
    ],
  },
  doorlock: {
    id: 'doorlock',
    rows: [
      auto('ox_doorlock'),
      auto('qb-doorlock'),
      auto('rcore_doorlock'),
      auto('doors_creator'),
      fallback('none', 'Nothing installed: the module does nothing.'),
    ],
  },
  phone: {
    id: 'phone',
    rows: [
      auto('kora_phone', 'Provides sd-phone, lb-phone and yseries, so it is detected first.'),
      auto('sd-phone', 'Provides lb-phone, qs-smartphone, gksphone and qb-phone.'),
      auto('sky_phone', 'Provides lb-phone, qs-smartphone and yseries. Cannot send email: sendEmail returns false.'),
      auto('lb-phone'),
      auto('gksphone'),
      auto('okokPhone'),
      auto('qs-smartphone'),
      auto('yseries'),
      auto('qb-phone', 'Detected last, because it is often left installed beside the phone actually in use.'),
      fallback('none', 'Nothing installed: the module does nothing. Everything returns false.'),
    ],
  },
  weather: {
    id: 'weather',
    rows: [
      auto('Renewed-Weathersync'),
      auto('qb-weathersync'),
      auto('cd_easytime'),
      fallback('none', 'Nothing installed: the module does nothing.'),
    ],
  },
  dispatch: {
    id: 'dispatch',
    rows: [
      auto('ps-dispatch'),
      auto('cd_dispatch'),
      auto('tk_dispatch'),
      auto('rcore_dispatch'),
      auto('lb-tablet'),
      auto('origen_police'),
      auto('core_dispatch'),
      auto('kartik-mdt'),
      auto('codem-dispatch'),
      auto('wasabi_mdt'),
      auto('redutzu-mdt'),
      fallback('internal', 'The built-in version: on-duty blip + notification. Used when no dispatch resource is installed.'),
    ],
  },
}

const statusLabel: Record<ProviderKind, string> = {
  auto: 'Auto',
  manual: 'Manual',
  fallback: 'Fallback',
}

function CheckMark({ muted = false }: { muted?: boolean }) {
  return (
    <svg
      className={muted ? 'provider-check provider-check--muted' : 'provider-check'}
      viewBox="0 0 16 16"
      width="14"
      height="14"
      aria-hidden="true"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8.5 6.5 12 13 4.5"
      />
    </svg>
  )
}

function Status({ kind }: { kind: ProviderKind }) {
  return (
    <span className={`provider-status provider-status--${kind}`}>
      <CheckMark muted={kind !== 'auto'} />
      {statusLabel[kind]}
    </span>
  )
}

export function ProviderKey() {
  return (
    <div className="provider-chart-wrap">
      <table className="provider-chart provider-chart--key">
        <colgroup>
          <col className="provider-col-status" />
          <col className="provider-col-notes" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">Status</th>
            <th scope="col">Meaning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Status kind="auto" />
            </td>
            <td className="provider-note">First installed resource wins. Pin a name in Configuration to skip detect.</td>
          </tr>
          <tr>
            <td>
              <Status kind="manual" />
            </td>
            <td className="provider-note">Set in Config. Never auto-detected.</td>
          </tr>
          <tr>
            <td>
              <Status kind="fallback" />
            </td>
            <td className="provider-note">Not a resource. `internal` is the bridge's built-in version, `none` means the module does nothing. Used when nothing in the list is installed.</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export function ProviderTable({ group }: { group: keyof typeof groups }) {
  const rows = groups[group].rows
  return (
    <div className="provider-chart-wrap">
      <table className="provider-chart">
        <colgroup>
          <col className="provider-col-resource" />
          <col className="provider-col-status" />
          <col className="provider-col-notes" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">Resource</th>
            <th scope="col">Status</th>
            <th scope="col">Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.kind}-${row.name}`}>
              <td>
                <span className="provider-name">{row.name}</span>
              </td>
              <td>
                <Status kind={row.kind} />
              </td>
              <td className="provider-note">{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
