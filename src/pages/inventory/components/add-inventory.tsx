"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/custom/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { IconPlus, IconDeviceFloppy, IconCalendar } from "@tabler/icons-react"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from "date-fns"

export function FormAddInventory() {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date>();
    const onChangeDate = (value: React.SetStateAction<Date | undefined>) => {
        setDate(value);
    };
    return (
        <Dialog open={open} onOpenChange={setOpen} modal={open}>
            <DialogTrigger asChild>
                <Button variant="default" className='text-sm ml-2'>
                    <IconPlus className="mr-2 h-4 w-4" />
                    Add Asset
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px]">
                <DialogHeader>
                    <DialogTitle>Add Asset</DialogTitle>
                    <DialogDescription>
                        Isi form berikut unuk menambahkan data inventory asset
                    </DialogDescription>
                </DialogHeader>
                <form>
                <ScrollArea className="h-[450px] w-full">
                    <div className="grid gap-4 py-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="no_pr" className="cols-span-1">
                            No PR
                            </Label>
                            <Input
                            id="no_pr"
                            type="text"
                            name="no_pr"
                            placeholder="No PR"
                            className="col-span-3"
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="code" className="cols-span-1">
                            Kode Asset
                            </Label>
                            <Input
                            id="code"
                            type="text"
                            name="code"
                            placeholder="Kode Asset"
                            className="col-span-3"
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="group" className="cols-span-1">
                            Kelompok Asset
                            </Label>
                            <Select name="group">
                                <SelectTrigger className="col-span-3" id="group">
                                    <SelectValue placeholder="Pilih Kelompok Asset" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Perlengkapan dan Peralatan">Perlengkapan dan Peralatan</SelectItem>
                                    <SelectItem value="Kendaraan">Kendaraan</SelectItem>
                                    <SelectItem value="Bangunan">Bangunan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="category" className="cols-span-1">
                            Kategori Asset
                            </Label>
                            <Select name="category">
                                <SelectTrigger className="col-span-3" id="category">
                                    <SelectValue placeholder="Pilih Kategori Asset" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Kategori 1">Kategori 1</SelectItem>
                                    <SelectItem value="Kategori 2">Kategori 2</SelectItem>
                                    <SelectItem value="Kategori 3">Kategori 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name" className="cols-span-1">
                            Nama Asset
                            </Label>
                            <Input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Nama Asset"
                            className="col-span-3"
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="date_start">
                                Tanggal Perolehan
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                    >
                                    <IconCalendar className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={onChangeDate}
                                    initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="price" className="cols-span-1">
                            Nilai Perolehan
                            </Label>
                            <Input
                            id="price"
                            type="text"
                            name="price"
                            placeholder="Nilai Perolehan"
                            className="col-span-3"
                            />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="department" className="cols-span-1">
                            Unit Kerja
                            </Label>
                            <Select name="department">
                                <SelectTrigger className="col-span-3" id="department">
                                    <SelectValue placeholder="Pilih Unit Kerja" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Departemen IT">Departemen IT</SelectItem>
                                    <SelectItem value="Deparemen TJSL">Departemen TJSL</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="location" className="cols-span-1">
                            Lokasi Penempatan
                            </Label>
                            <Select name="location">
                                <SelectTrigger className="col-span-3" id="location">
                                    <SelectValue placeholder="Pilih Lokasi Penempatan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Departemen IT">Departemen IT</SelectItem>
                                    <SelectItem value="Deparemen TJSL">Departemen TJSL</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Attribut</TableHead>
                                        <TableHead>Deskripsi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Warna</TableCell>
                                        <TableCell>
                                            <Input
                                                id="color"
                                                type="text"
                                                name="color"
                                                placeholder="Warna"
                                                className="w-full"/>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Bahan</TableCell>
                                        <TableCell>
                                            <Input
                                                id="material"
                                                type="text"
                                                name="material"
                                                placeholder="Bahan"
                                                className="w-full"/>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                        <div className="grid justify-items-end">
                            <Button variant="default" type="submit">
                                <IconDeviceFloppy className="mr-2 h-4 w-4" />
                                Save
                            </Button>
                        </div>
                    </div>
                </ScrollArea>
                </form>
            </DialogContent>
        </Dialog>
    )
}
