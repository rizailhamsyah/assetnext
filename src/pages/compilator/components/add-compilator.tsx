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
import { fetchPostAsset } from "@/service/api"
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from "@/components/ui/use-toast"

export function FormAddCompilator() {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [ccCompilator, setCcCompilator] = React.useState<string>('');
    const [compilator, setCompilator] = React.useState<string>('');

    const initialValues = {
        cc_compilator: '',
        compilator: '',
    }

    const validationSchema = Yup.object().shape({
        cc_compilator: Yup.string().required('This field is required.'),
        compilator: Yup.string().required('This field is required.'),
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
                formData.append('cc_kompilator', values.cc_compilator)
                formData.append('kompilator', values.compilator)
                const response = await fetchPostAsset('kompilator/create', formData);
                if(response){
                    createFormik.setFieldValue("cc_compilator", '');
                    createFormik.setFieldValue("compilator", '');
                    toast({
                        title: "Success!",
                        description: "Data Kompilator Berhasil Disimpan!",
                    })
                    await queryClient.invalidateQueries({ queryKey: ['compilator'] });
                    setOpen(false);
                    setLoading(false)
                }else{
                    toast({
                        variant: "destructive",
                        title: "Wrong!",
                        description: "Data Kompilator Gagal Disimpan!"
                    })
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error submitting data:', error)
                toast({
                    variant: "destructive",
                    title: "Wrong!",
                    description: "Data Kompilator Gagal Disimpan!"
                })
                setLoading(false)
            }
        },
    })

    const onChangeCcCompilator = (e: React.ChangeEvent<HTMLInputElement>) => {
        createFormik.handleChange(e);
        setCcCompilator(e.target.value);
    };

    const onChangeCompilator = (e: React.ChangeEvent<HTMLInputElement>) => {
        createFormik.handleChange(e);
        setCompilator(e.target.value);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen} modal={open}>
            <DialogTrigger asChild>
                <Button variant="default" className='text-sm ml-2'>
                    <IconPlus className="mr-2 h-4 w-4" />
                    Add Kompilator
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Kompilator</DialogTitle>
                    <DialogDescription>
                        Isi form berikut unuk menambahkan data kompilator
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={createFormik.handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="cc_compilator" className="cols-span-1">
                            CC Kompilator
                            </Label>
                            <Input
                                id="cc_compilator"
                                type="text"
                                name="cc_compilator"
                                placeholder="CC Kompilator"
                                className="col-span-3"
                                value={createFormik.values.cc_compilator}
                                onChange={onChangeCcCompilator}
                                disabled={loading}
                            />
                            {createFormik.touched.cc_compilator && createFormik.errors.cc_compilator && (
                                <>
                                <div className="col-span-1"></div>
                                <p className='col-span-3 text-xs text-red-500'>{createFormik.errors.cc_compilator}</p>
                                </>
                            )}
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="compilator" className="cols-span-1">
                            Kompilator
                            </Label>
                            <Input
                                id="compilator"
                                type="text"
                                name="compilator"
                                placeholder="Kompilator"
                                className="col-span-3"
                                value={createFormik.values.compilator}
                                onChange={onChangeCompilator}
                                disabled={loading}
                            />
                            {createFormik.touched.compilator && createFormik.errors.compilator && (
                                <>
                                <div className="col-span-1"></div>
                                <p className='col-span-3 text-xs text-red-500'>{createFormik.errors.compilator}</p>
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
