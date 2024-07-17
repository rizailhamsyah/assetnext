import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

import { labels, priorities, statuses } from '../data/data'
import { Request } from '../data/schema'

export const columns: ColumnDef<Request>[] = [
  {
    accessorKey: 'id_request',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id_request')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'cc_pemir',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='CC Pemir' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('cc_pemir')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'department',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Unit Kerja' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('department')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'asset',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Asset' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('asset')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'qty',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Qty' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('qty')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Harga Satuan' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('price')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('status')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'year',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tahun' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('year')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
