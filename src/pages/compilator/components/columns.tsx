import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { Compilator } from '../data/schema'

export const columns: ColumnDef<Compilator>[] = [
  {
    accessorKey: 'cc_kompilator',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='CC Kompilator' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('cc_kompilator')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'kompilator',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Kompilator' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('kompilator')}
          </span>
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
