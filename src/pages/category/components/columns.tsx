import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { Category } from '../data/schema'

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'id_kategori',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID Kategori' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id_kategori')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'kategori',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Kategori' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('kategori')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'kelompok_asset',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Kelompok Asset' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('kelompok_asset')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'kompilator_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Kompilator' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{ row.original.kompilator?.kompilator }</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'masa_manfaat_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Masa Manfaat' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.original.masaManfaat?.golongan}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
