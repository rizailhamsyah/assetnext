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
import { IconQrcode, IconPrinter } from "@tabler/icons-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { ScrollArea } from "@/components/ui/scroll-area"

export function FormPrintQrCode() {
    const [open, setOpen] = React.useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen} modal={open}>
            <DialogTrigger asChild>
                <Button variant="default" className='text-sm ml-2'>
                    <IconQrcode className="mr-2 h-4 w-4" />
                    Print QR COde
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Print QR Code</DialogTitle>
                    <DialogDescription>
                        Isi form berikut unuk mencetak QR Code Asset
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
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No. PR</TableHead>
                                        <TableHead>Kode Asset</TableHead>
                                        <TableHead>Nama Asset</TableHead>
                                        <TableHead>Kategori</TableHead>
                                        <TableHead>Lokasi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>PR001</TableCell>
                                        <TableCell>KD001</TableCell>
                                        <TableCell>Laptop Lenovo Core I5</TableCell>
                                        <TableCell>Perlengkapan</TableCell>
                                        <TableCell>Departemen TI</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>PR002</TableCell>
                                        <TableCell>KD002</TableCell>
                                        <TableCell>Laptop Lenovo Core I5</TableCell>
                                        <TableCell>Perlengkapan</TableCell>
                                        <TableCell>Departemen TI</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>PR003</TableCell>
                                        <TableCell>KD003</TableCell>
                                        <TableCell>Laptop Lenovo Core I5</TableCell>
                                        <TableCell>Perlengkapan</TableCell>
                                        <TableCell>Departemen TI</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                        <div className="grid justify-items-end">
                            <Button variant="default" type="submit">
                                <IconPrinter className="mr-2 h-4 w-4" />
                                Print
                            </Button>
                        </div>
                    </div>
                </ScrollArea>
                </form>
            </DialogContent>
        </Dialog>
    )
}
