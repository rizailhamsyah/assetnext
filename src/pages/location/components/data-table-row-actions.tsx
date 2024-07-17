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
import { locationSchema } from '../data/schema'
import { IconPencil, IconPhoto, IconTrash } from '@tabler/icons-react'
import { ViewLocation } from './view-location'
import { FormEditLocation } from './edit-location'
import { DeleteAlertDialog } from './delete-location'
import React from 'react'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const location = locationSchema.parse(row.original)
  const [openView, setOpenView] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const handleCloseDialogView = () => {
    setOpenView(false);
  };

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
        <DropdownMenuItem onClick={ async() => { setOpenView(true) }}>
            View Location
            <DropdownMenuShortcut><IconPhoto className='w-4 h-4 font-small'/></DropdownMenuShortcut>  
        </DropdownMenuItem>
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
    <ViewLocation data={location} openDialogView={openView} onClose={handleCloseDialogView} />
    <FormEditLocation data={location} openDialogEdit={openEdit} onClose={handleCloseDialogEdit} />
    <DeleteAlertDialog data={location} openDialogDelete={openDelete} onClose={handleCloseDialogDelete} />
    </>
  )
}
