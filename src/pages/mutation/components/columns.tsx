import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from './data-table-column-header'

import { Mutation } from '../data/schema'

export const columns: ColumnDef<Mutation>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tanggal' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('date')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'location_start',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Lokasi Asal' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('location_start')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'department_start',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Departemen Asal' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('department_start')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'location_end',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Lokasi Tujuan' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('location_end')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'department_end',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Departemen Tujuan' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('department_end')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'employee',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Penanggung Jawab' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('employee')}</div>,
    enableSorting: true,
    enableHiding: true,
  },
]
