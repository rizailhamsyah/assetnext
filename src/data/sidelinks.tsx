import {
  IconLayoutDashboard,
  IconChartPie,
  IconPin,
  IconAlarm,
  IconPuzzle,
  IconShoppingBag,
  IconCategory,
  IconArrowsMove,
  IconMapPins,
  IconHeartHandshake,
  IconSettingsCheck,
  IconTrash,
  IconBuilding,
  IconDatabase,
  IconBuildingWarehouse,
  IconHomeCog,
  IconPackageExport,
  IconChecklist
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/',
    icon: <IconChartPie size={18} />,
  },
  {
    title: 'Master Data',
    label: '',
    href: '',
    icon: <IconLayoutDashboard size={18} />,
    sub: [
      {
        title: 'Masa Manfaat',
        label: '',
        href: '/benefit',
        icon: <IconAlarm size={18} />,
      },
      {
        title: 'Lokasi',
        label: '',
        href: '/location',
        icon: <IconPin size={18} />,
      },
      {
        title: 'Kompilator',
        label: '',
        href: '/compilator',
        icon: <IconBuilding size={18} />,
      }
    ],
  },
  {
    title: 'Asset',
    label: '',
    href: '',
    icon: <IconDatabase size={18} />,
    sub: [
      {
        title: 'Atribut Asset',
        label: '',
        href: '/attribute',
        icon: <IconPuzzle size={18} />,
      },
      {
        title: 'Kategori Asset',
        label: '',
        href: '/category',
        icon: <IconCategory size={18} />,
      },
      {
        title: 'Kebutuhan Asset',
        label: '',
        href: '/request',
        icon: <IconShoppingBag size={18} />,
      },
      {
        title: 'Inventory Asset',
        label: '',
        href: '/inventory',
        icon: <IconBuildingWarehouse size={18} />,
      }
    ],
  },
  {
    title: 'Mutasi',
    label: '',
    href: '',
    icon: <IconArrowsMove size={18} />,
    sub: [
      {
        title: 'Mutasi Asset',
        label: '',
        href: '/mutation',
        icon: <IconMapPins size={18} />,
      },
      {
        title: 'Peminjaman Asset',
        label: '',
        href: '/submission',
        icon: <IconHeartHandshake size={18} />,
      },
      {
        title: 'Penyerahan Asset',
        label: '',
        href: '/receive',
        icon: <IconPackageExport size={18} />,
      },
      {
        title: 'Pengendalian Asset',
        label: '',
        href: '/control',
        icon: <IconHomeCog size={18} />,
      },
      {
        title: 'Perbaikan Asset',
        label: '',
        href: '/repair',
        icon: <IconSettingsCheck size={18} />,
      },
      {
        title: 'Pemusnahan Asset',
        label: '',
        href: '/delete',
        icon: <IconTrash size={18} />,
      },
    ],
  },
  {
    title: 'Stock Opname',
    label: '',
    href: '/stockopname',
    icon: <IconChecklist size={18} />,
  },
  // {
  //   title: 'Activity',
  //   label: '',
  //   href: '',
  //   icon: <IconClipboard size={18} />,
  //   sub: [
  //     {
  //       title: 'Peminjaman Asset',
  //       label: '',
  //       href: '/borrowing',
  //       icon: <IconHeartHandshake size={18} />,
  //     },
  //     {
  //       title: 'Perbaikan Asset',
  //       label: '',
  //       href: '/repair',
  //       icon: <IconSettingsCheck size={18} />,
  //     },
  //     {
  //       title: 'Penghapusan Asset',
  //       label: '',
  //       href: '/delete',
  //       icon: <IconTrash size={18} />,
  //     }
  //   ],
  // },
  // {
  //   title: 'Stock Opname',
  //   href: '/stock',
  //   icon: <IconTag size={18} />,
  // },
]
