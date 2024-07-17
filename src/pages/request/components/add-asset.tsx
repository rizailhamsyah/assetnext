"use client"

import * as React from "react"
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { ScrollArea } from "@/components/ui/scroll-area"
import { IconPlus } from "@tabler/icons-react"
import {useFormik} from 'formik'
import * as Yup from 'yup'
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { fetchPostMudik } from "@/service/api"

export function FormAddAsset() {
    const [openAsset, setOpenAsset] = React.useState(false);
    const [asset, setAsset] = React.useState<string>('');
    const [compilator, setCompilator] = React.useState<string>('');
    const [quantity, setQuantity] = React.useState<string>('');
    const [price, setPrice] = React.useState<string>('');

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
        asset: '',
        compilator: '',
        quantity: '',
        price: '',
    }

    const validationSchema = Yup.object().shape({
        asset: Yup.string().required('This field is required.'),
        compilator: Yup.string().required('This field is required.'),
        quantity: Yup.string().required('This field is required.'),
        price: Yup.string().required('This field is required.'),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                await formik.validateForm(values)
                let formData = new URLSearchParams();
                formData.append('asset', values.asset)
                formData.append('kompilator', values.compilator)
                formData.append('quantity', values.quantity)
                formData.append('harga_satuan', values.price)
                // await saveBus.mutateAsync(formData);

                formik.setFieldValue("asset", ' ')
                formik.setFieldValue("compilator", ' ')
                formik.setFieldValue("quantity", ' ')
                formik.setFieldValue("price", ' ')
                setOpenAsset(false)
            } catch (error) {
                console.error('Error submitting data:', error)
            }
        },
    })

    const onChangeAsset = (value: string) => {
        formik.setFieldTouched('asset', true);
        formik.setFieldValue('asset', value);
        setAsset(value);
    };

    const onChangeCompilator = (value: string) => {
        formik.setFieldTouched('compilator', true);
        formik.setFieldValue('compilator', value);
        setCompilator(value);
    };

    const onChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(e);
        setQuantity(e.target.value);
    };

    const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(e);
        setPrice(e.target.value);
    };

    return (
        <Dialog open={openAsset} onOpenChange={setOpenAsset} modal={openAsset}>
            <DialogTrigger asChild>
                <Button variant="default" className='text-sm ml-2'>
                    <IconPlus className="mr-2 h-4 w-4" />
                    Add Asset
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add Asset</DialogTitle>
                    <DialogDescription>
                        Isi form berikut unuk menambahkan data asset
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={formik.handleSubmit}>
                    <ScrollArea className="h-[450px] w-full">
                    <div className="grid gap-4 py-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="asset" className="cols-span-1">
                            Kelompok Asset
                            </Label>
                            <Select name="asset" onValueChange={ onChangeAsset }>
                                <SelectTrigger className="col-span-3" id="asset">
                                    <SelectValue placeholder="Pilih Kelompok Asset" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Meja Rapat">Meja Rapat</SelectItem>
                                    <SelectItem value="Kursi Rapat">Kursi Rapat</SelectItem>
                                </SelectContent>
                            </Select>
                            {formik.touched.asset && formik.errors.asset && (
                                <>
                                <div className="col-span-1"></div>
                                <p className='col-span-3 text-xs text-red-500'>{formik.errors.asset}</p>
                                </>
                            )}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="compilator" className="cols-span-1">
                            Kompilator
                            </Label>
                            <Select name="compilator" onValueChange={ onChangeCompilator }>
                                <SelectTrigger className="col-span-3" id="compilator">
                                    <SelectValue placeholder="Pilih Kompilator" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Departemen IT">Departemen IT</SelectItem>
                                    <SelectItem value="Deparemen TJSL">Departemen TJSL</SelectItem>
                                </SelectContent>
                            </Select>
                            {formik.touched.compilator && formik.errors.compilator && (
                                <>
                                <div className="col-span-1"></div>
                                <p className='col-span-3 text-xs text-red-500'>{formik.errors.compilator}</p>
                                </>
                            )}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="quantity" className="cols-span-1">
                            Quantity
                            </Label>
                            <Input
                                id="quantity"
                                type="text"
                                name="quantity"
                                placeholder="Quantity"
                                className="col-span-3"
                                value={formik.values.quantity}
                                onChange={onChangeQuantity}
                                />
                            {formik.touched.quantity && formik.errors.quantity && (
                                <>
                                <div className="col-span-1"></div>
                                <p className='col-span-3 text-xs text-red-500'>{formik.errors.quantity}</p>
                                </>
                            )}
                        </div>
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="price" className="cols-span-1">
                            Harga Satuan
                            </Label>
                            <Input
                                id="price"
                                type="text"
                                name="price"
                                placeholder="Harga Satuan"
                                className="col-span-3"
                                value={formik.values.price}
                                onChange={onChangePrice}
                                />
                            {formik.touched.price && formik.errors.price && (
                                <>
                                <div className="col-span-1"></div>
                                <p className='col-span-3 text-xs text-red-500'>{formik.errors.price}</p>
                                </>
                            )}
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
                                <IconPlus className="mr-2 h-4 w-4" />
                                Add
                            </Button>
                        </div>
                    </div>
                    </ScrollArea>
                </form>
            </DialogContent>
        </Dialog>
    )
}
