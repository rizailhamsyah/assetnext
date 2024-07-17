"use client"

import * as React from "react"
import { Button } from "@/components/custom/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { IconPlus, IconDeviceFloppy, IconLoader2 } from "@tabler/icons-react"
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { useQueryClient } from '@tanstack/react-query';
import { fetchPostAsset } from "@/service/api"
import { useToast } from "@/components/ui/use-toast"

export function FormAddBenefit() {
    const queryClient = useQueryClient();
    const { toast } = useToast()
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [group, setGroup] = React.useState<string>('');
    const [benefit, setBenefit] = React.useState<string>('');
    const [depreciation, setDepreciation] = React.useState<string>('');

    const initialValues = {
        group: '',
        benefit: '',
        depreciation: '',
    }

    const validationSchema = Yup.object().shape({
        group: Yup.string().required('This field is required.'),
        benefit: Yup.string().required('This field is required.'),
        depreciation: Yup.string().required('This field is required.'),
    })

    const createFormik = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                setLoading(true)
                await createFormik.validateForm(values)
                let formData = new URLSearchParams();
                formData.append('golongan', values.group)
                formData.append('masa_manfaat', values.benefit)
                formData.append('metode_penyusutan', values.depreciation)
                const response = await fetchPostAsset('manfaat/create', formData);
                if(response){
                    createFormik.setFieldValue("group", '');
                    createFormik.setFieldValue("benefit", '');
                    createFormik.setFieldValue("depreciation", '');
                    toast({
                        title: "Success!",
                        description: "Data Masa Manfaat Berhasil Disimpan!",
                    })
                    await queryClient.invalidateQueries({ queryKey: ['benefit'] });
                    setOpen(false);
                    setLoading(false)
                }else{
                    toast({
                        variant: "destructive",
                        title: "Wrong!",
                        description: "Data Masa Manfaat Gagal Disimpan!"
                    })
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error submitting data:', error)
                toast({
                    variant: "destructive",
                    title: "Wrong!",
                    description: "Data Masa Manfaat Gagal Disimpan!"
                })
                setLoading(false)
            }
        },
    })

    const onChangeGroup = (e: React.ChangeEvent<HTMLInputElement>) => {
        createFormik.handleChange(e);
        setGroup(e.target.value);
    };

    const onChangeBenefit = (value:string) => {
        const value2 = value ? value.replace(/\D/g, '').slice(0, 3) : '';
		createFormik.handleChange(value2)
        createFormik.setFieldValue("benefit", value2)
        setBenefit(value2)
    };

    const onChangeDepreciation = (e: React.ChangeEvent<HTMLInputElement>) => {
        createFormik.handleChange(e);
        setDepreciation(e.target.value);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen} modal={open}>
            <DialogTrigger asChild>
                <Button variant="default" className='text-sm ml-2'>
                    <IconPlus className="mr-2 h-4 w-4" />
                    Add Masa Manfaat
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Masa Manfaat</DialogTitle>
                    <DialogDescription>
                        Isi form berikut unuk menambahkan data masa manfaat
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={createFormik.handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="group" className="cols-span-1">
                            Golongan
                            </Label>
                            <Input
                                id="group"
                                type="text"
                                name="group"
                                placeholder="Golongan"
                                className="col-span-3"
                                value={createFormik.values.group}
                                onChange={onChangeGroup}
                                disabled={loading}
                            />
                            {createFormik.touched.group && createFormik.errors.group && (
                                <>
                                <div className="col-span-1"></div>
                                <p className='col-span-3 text-xs text-red-500'>{createFormik.errors.group}</p>
                                </>
                            )}
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="benefit" className="cols-span-1">
                            Masa Manfaat (Tahun)
                            </Label>
                            <Input
                                id="benefit"
                                type="text"
                                name="benefit"
                                placeholder="Masa Manfaat"
                                className="col-span-3"
                                value={createFormik.values.benefit}
                                onChange={(e) => onChangeBenefit(e.target.value)}
                                disabled={loading}
                            />
                            {createFormik.touched.benefit && createFormik.errors.benefit && (
                                <>
                                <div className="col-span-1"></div>
                                <p className='col-span-3 text-xs text-red-500'>{createFormik.errors.benefit}</p>
                                </>
                            )}
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="depreciation" className="cols-span-1">
                            Metode Penyusutan
                            </Label>
                            <Input
                                id="depreciation"
                                type="text"
                                name="depreciation"
                                placeholder="Masa Penyusutan"
                                className="col-span-3"
                                value={createFormik.values.depreciation}
                                onChange={onChangeDepreciation}
                                disabled={loading}
                            />
                            {createFormik.touched.depreciation && createFormik.errors.depreciation && (
                                <>
                                <div className="col-span-1"></div>
                                <p className='col-span-3 text-xs text-red-500'>{createFormik.errors.depreciation}</p>
                                </>
                            )}
                        </div>
                        <div className="grid justify-items-end">
                            <Button variant="default" type="submit" disabled={loading}>
                                { loading ? <IconLoader2 className="mr-2 h-4 w-4 animate-spin" /> : <IconDeviceFloppy className="mr-2 h-4 w-4" />}
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
