import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { Inventory } from '../data/schema'

export const columns: ColumnDef<Inventory>[] = [
  {
    accessorKey: 'no_pr',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='No PR' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('no_pr')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'code',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Kode Asset' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('code')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nama Asset' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('name')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Kategori Asset' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('category')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tanggal Perolehan' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('date')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Nilai Perolehan' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('price')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'location',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Lokasi' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('location')}</div>,
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
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
