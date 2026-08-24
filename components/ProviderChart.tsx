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
    rows: [auto('qbx_core'), auto('qb-core'), auto('es_extended')],
  },
  inventory: {
    id: 'inventory',
    rows: [
      auto('ox_inventory'),
      auto('m-Inventory'),
      auto('one_inventory'),
      auto('jaksam_inventory'),
      auto('tgiann-inventory'),
      auto('codem-inventory'),
      auto('core_inventory'),
      auto('origen_inventory'),
      auto('qs-inventory'),
      auto('qb-inventory'),
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
      fallback('internal', 'Native fuel when nothing in the list is installed.'),
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
      auto('zsx_uiv2'),
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
      auto('zsx_uiv2'),
    ],
  },
  'progress-bar': {
    id: 'progress-bar',
    rows: [
      auto('ox_lib'),
      auto('lation_ui'),
      auto('wasabi_uikit'),
      auto('progressbar'),
      auto('zsx_uiv2'),
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
    ],
  },
  dispatch: {
    id: 'dispatch',
    rows: [
      auto('ps-dispatch', 'When Config.Dispatch is "auto".'),
      auto('cd_dispatch', 'When Config.Dispatch is "auto".'),
      auto('tk_dispatch', 'When Config.Dispatch is "auto".'),
      auto('rcore_dispatch', 'When Config.Dispatch is "auto".'),
      auto('lb-tablet', 'When Config.Dispatch is "auto".'),
      auto('origen_police', 'When Config.Dispatch is "auto".'),
      auto('core_dispatch', 'When Config.Dispatch is "auto".'),
      auto('kartik-mdt', 'When Config.Dispatch is "auto".'),
      auto('codem-dispatch', 'When Config.Dispatch is "auto".'),
      auto('wasabi_mdt', 'When Config.Dispatch is "auto".'),
      auto('redutzu-mdt', 'When Config.Dispatch is "auto".'),
      fallback('internal', 'Default. On-duty blip + notification.'),
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
            <td className="provider-note">Used when nothing in the list is installed, or as the dispatch default.</td>
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
