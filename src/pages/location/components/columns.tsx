import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { Location } from '../data/schema'

export const columns: ColumnDef<Location>[] = [
  {
    accessorKey: 'id_lokasi',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID Lokasi'   />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id_lokasi')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'lokasi',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Lokasi' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('lokasi')}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: 'area',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Area' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('area')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
