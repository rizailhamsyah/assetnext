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
} from "@/components/ui/dialog"
import { IconDeviceFloppy, IconLoader2 } from "@tabler/icons-react"
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { fetchPutAsset } from "@/service/api"
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from "react"

export function FormEditCompilator({ data, openDialogEdit, onClose }: { data: any, openDialogEdit: boolean, onClose: () => void }) {
    const queryClient = useQueryClient();
    const { toast } = useToast();
    const [loading, setLoading] = React.useState(false);
    const [cc_compilator, setCcCompilator] = React.useState<string>('');
    const [compilator, setCompilator] = React.useState<string>('');

    useEffect(() => {
        if (data) {
            setCcCompilator(data.cc_kompilator);
            setCompilator(data.kompilator);
            createFormik.setFieldValue("cc_compilator", cc_compilator);
            createFormik.setFieldValue("compilator", compilator);
        }
    }, [data]);

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
                const response = await fetchPutAsset(`kompilator/${ data.id }`, formData);
                if(response){
                    createFormik.setFieldValue("cc_compilator", '');
                    createFormik.setFieldValue("compilator", '');
                    toast({
                        title: "Success!",
                        description: "Data Kompilator Berhasil Diubah!",
                    })
                    await queryClient.invalidateQueries({ queryKey: ['compilator'] });
                    onClose()
                    setLoading(false)
                }else{
                    toast({
                        variant: "destructive",
                        title: "Wrong!",
                        description: "Data Kompilator Gagal Diubah!"
                    })
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error submitting data:', error)
                toast({
                    variant: "destructive",
                    title: "Wrong!",
                    description: "Data Kompilator Gagal Diubah!"
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
        <Dialog open={openDialogEdit} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Kompilator</DialogTitle>
                    <DialogDescription>
                        Isi form berikut unuk mengubah data kompilator
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
                                value={cc_compilator}
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
                                value={compilator}
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
