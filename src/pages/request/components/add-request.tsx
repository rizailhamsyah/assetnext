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
import { IconPlus, IconDeviceFloppy, IconCalendar, IconTrash } from "@tabler/icons-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { ScrollArea } from "@/components/ui/scroll-area"
import { FormAddAsset } from "./add-asset"
import {useFormik} from 'formik'
import * as Yup from 'yup'
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { fetchPostMudik } from "@/service/api"

export function FormAddRequest() {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = React.useState<Date>();
    const [compilator, setCompilator] = React.useState<string>('');
    const [requester, setRequester] = React.useState<string>('');
    const [year, setYear] = React.useState<string>('');

    // const saveBus = useMutation(
        // async (formData: URLSearchParams) => {
        //     const response = await fetchPostMudik('bus/create', formData);
        //     return response;
        // },
        // {
        //     onSuccess: async (data) => {
        //         // await queryClient.invalidateQueries(['benefit']);
        //         // Alert Success

        //     },
        // }
    // );

    const initialValues = {
        compilator: '',
        requester: '',
        year: '',
    }

    const validationSchema = Yup.object().shape({
        compilator: Yup.string().required('This field is required.'),
        requester: Yup.string().required('This field is required.'),
        year: Yup.string().required('This field is required.'),
    })

    const createFormik = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                await createFormik.validateForm(values)
                let formData = new URLSearchParams();
                formData.append('kompilator', values.compilator)
                formData.append('requester', values.requester)
                formData.append('tahun', values.year)
                // await saveBus.mutateAsync(formData);

                createFormik.setFieldValue("compilator", ' ')
                createFormik.setFieldValue("requester", ' ')
                createFormik.setFieldValue("year", ' ')
                setOpen(false)
            } catch (error) {
                console.error('Error submitting data:', error)
            }
        },
    })

    const onChangeDate = (value: React.SetStateAction<Date | undefined>) => {
        setDate(value);
    };

    const onChangeCompilator = (value: string) => {
        createFormik.setFieldTouched('compilator', true);
        createFormik.setFieldValue('compilator', value);
        setCompilator(value);
    };

    const onChangeRequester= (e: React.ChangeEvent<HTMLInputElement>) => {
        createFormik.handleChange(e);
        setRequester(e.target.value);
    };

    const onChangeYear = (value: string) => {
        createFormik.setFieldTouched('year', true);
        createFormik.setFieldValue('year', value);
        setYear(value);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen} modal={open}>
            <DialogTrigger asChild>
                <Button variant="default" className='text-sm ml-2'>
                    <IconPlus className="mr-2 h-4 w-4" />
                    Add Kebutuhan Asset
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Add Kebutuhan Asset</DialogTitle>
                    <DialogDescription>
                        Isi form berikut unuk menambahkan data kebutuhan asset
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={createFormik.handleSubmit}>
                <ScrollArea className="h-[450px] w-full">
                    <div className="grid grid-cols-12 gap-4 py-4">
                        <div className="col-span-6">
                            <div className="grid w-full items-center gap-1.5 mb-3">
                                <Label htmlFor="compilator" className="cols-span-1">
                                Unit Kerja
                                </Label>
                                <Select name="compilator" onValueChange={ onChangeCompilator }>
                                    <SelectTrigger className="col-span-3" id="compilator">
                                        <SelectValue placeholder="Pilih Unit Kerja" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Departemen IT">Departemen IT</SelectItem>
                                        <SelectItem value="Deparemen TJSL">Departemen TJSL</SelectItem>
                                    </SelectContent>
                                </Select>
                                {createFormik.touched.compilator && createFormik.errors.compilator && (
                                    <>
                                    <div className="col-span-1"></div>
                                    <p className='col-span-3 text-xs text-red-500'>{createFormik.errors.compilator}</p>
                                    </>
                                )}
                            </div>
                            <div className="grid w-full items-center gap-1.5 mb-3">
                                <Label htmlFor="requester" className="cols-span-1">
                                Requester
                                </Label>
                                <Input
                                    id="requester"
                                    type="text"
                                    name="requester"
                                    placeholder="Requester"
                                    className="col-span-3"
                                    value={createFormik.values.requester}
                                    onChange={onChangeRequester}
                                    />
                                {createFormik.touched.requester && createFormik.errors.requester && (
                                    <>
                                    <div className="col-span-1"></div>
                                    <p className='col-span-3 text-xs text-red-500'>{createFormik.errors.requester}</p>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="grid w-full items-center gap-1.5 mb-3">
                                <Label htmlFor="year" className="cols-span-1">
                                Tahun Pengajuan
                                </Label>
                                <Select name="year" onValueChange={ onChangeYear }>
                                    <SelectTrigger className="col-span-3" id="year">
                                        <SelectValue placeholder="Pilih Tahun Pengajuan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="2024">2024</SelectItem>
                                        <SelectItem value="2025">2025</SelectItem>
                                    </SelectContent>
                                </Select>
                                {createFormik.touched.year && createFormik.errors.year && (
                                    <>
                                    <div className="col-span-1"></div>
                                    <p className='col-span-3 text-xs text-red-500'>{createFormik.errors.year}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-4 py-4">
                        <div className="grid justify-items-start">
                            <FormAddAsset />
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No</TableHead>
                                        <TableHead>Asset</TableHead>
                                        <TableHead>QTY</TableHead>
                                        <TableHead>Harga Satuan</TableHead>
                                        <TableHead>Kompilator</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>1</TableCell>
                                        <TableCell>Laptop Lenovo Core I5</TableCell>
                                        <TableCell>2</TableCell>
                                        <TableCell>5.000.000</TableCell>
                                        <TableCell>Departemen IT</TableCell>
                                        <TableCell>Pengajuan</TableCell>
                                        <TableCell>
                                            <Button variant="outline">
                                                <IconTrash className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>2</TableCell>
                                        <TableCell>Laptop Lenovo Core I5</TableCell>
                                        <TableCell>2</TableCell>
                                        <TableCell>5.000.000</TableCell>
                                        <TableCell>Departemen IT</TableCell>
                                        <TableCell>Pengajuan</TableCell>
                                        <TableCell>
                                            <Button variant="outline">
                                                <IconTrash className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>3</TableCell>
                                        <TableCell>Laptop Lenovo Core I5</TableCell>
                                        <TableCell>2</TableCell>
                                        <TableCell>5.000.000</TableCell>
                                        <TableCell>Departemen IT</TableCell>
                                        <TableCell>Pengajuan</TableCell>
                                        <TableCell>
                                            <Button variant="outline">
                                                <IconTrash className="h-4 w-4" />
                                            </Button>
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
