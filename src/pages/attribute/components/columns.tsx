import { ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

import { labels } from '../data/data'
import { Attribute } from '../data/schema'

export const columns: ColumnDef<Attribute>[] = [
  {
    accessorKey: 'atribut',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Atribut' />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.atribut)

      return (
        <div className='flex space-x-2'>
          {label && <Badge variant='outline'>{label.label}</Badge>}
          <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            {row.getValue('atribut')}
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
