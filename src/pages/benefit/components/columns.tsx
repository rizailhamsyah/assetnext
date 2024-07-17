import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

import { labels } from '../data/data'
import { Benefit } from '../data/schema'

export const columns: ColumnDef<Benefit>[] = [
  {
    accessorKey: 'golongan',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Golongan' />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.golongan)

      return (
        <div className='flex space-x-2'>
          {label && <Badge variant='outline'>{label.label}</Badge>}
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('golongan')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'masa_manfaat',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Masa Manfaat (Tahun)' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('masa_manfaat')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'metode_penyusutan',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Metode Penyusutan' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('metode_penyusutan')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
