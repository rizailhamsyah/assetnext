import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { compilatorSchema } from '../data/schema'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { FormEditCompilator } from './edit-compilator'
import { DeleteAlertDialog } from './delete-compilator'
import React from 'react'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const compilator = compilatorSchema.parse(row.original)
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);

  const handleCloseDialogEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseDialogDelete = () => {
    setOpenDelete(false);
  };

  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem onClick={ async() => { setOpenEdit(true) }}>
          Edit
          <DropdownMenuShortcut><IconPencil className='w-4 h-4 font-small'/></DropdownMenuShortcut>  
        </DropdownMenuItem>
        <DropdownMenuItem onClick={ async() => { setOpenDelete(true) }}>
          Delete
          <DropdownMenuShortcut><IconTrash className='w-4 h-4 font-small'/></DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <FormEditCompilator data={compilator} openDialogEdit={openEdit} onClose={handleCloseDialogEdit} />
    <DeleteAlertDialog data={compilator} openDialogDelete={openDelete} onClose={handleCloseDialogDelete} />
    </>
  )
}
