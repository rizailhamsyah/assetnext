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
import { useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from "react"

export function FormEditLocation({ data, openDialogEdit, onClose }: { data: any, openDialogEdit: boolean, onClose: () => void }) {
    const queryClient = useQueryClient();
    const { toast } = useToast()
    const [loading, setLoading] = React.useState(false);
    const [id, setId] = React.useState<string>('');
    const [location, setLocation] = React.useState<string>('');
    const [area, setArea] = React.useState<string>('');

    useEffect(() => {
        if (data) {
            setId(data.id_lokasi);
            setLocation(data.lokasi);
            setArea(data.area);
            createFormik.setFieldValue("id", id);
            createFormik.setFieldValue("location", location);
            createFormik.setFieldValue("area", area);
        }
    }, [data]);

    const initialValues = {
        id: '',
        location: '',
        area: '',
    }

    const validationSchema = Yup.object().shape({
        id: Yup.string().required('This field is required.'),
        location: Yup.string().required('This field is required.'),
        area: Yup.string().required('This field is required.'),
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
                formData.append('id_lokasi', values.id)
                formData.append('lokasi', values.location)
                formData.append('area', values.area)
                const response = await fetchPutAsset(`lokasi/${data.id}`, formData);
                if(response){
                    createFormik.setFieldValue("id", '');
                    createFormik.setFieldValue("location", '');
                    createFormik.setFieldValue("area", '');
                    toast({
                        title: "Success!",
                        description: "Data Lokasi Berhasil Disimpan!",
                    })
                    await queryClient.invalidateQueries({ queryKey: ['location'] });
                    onClose()
                    setLoading(false)
                }else{
                    toast({
                        variant: "destructive",
                        title: "Wrong!",
                        description: "Data Lokasi Gagal Disimpan!"
                    })
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error submitting data:', error)
                toast({
                    variant: "destructive",
                    title: "Wrong!",
                    description: "Data Lokasi Gagal Disimpan!"
                })
                setLoading(false)
            }
        },
    })

    const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
        createFormik.handleChange(e);
        setId(e.target.value);
    };

    const onChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
        createFormik.handleChange(e);
        setLocation(e.target.value);
    };

    const onChangeArea = (e: React.ChangeEvent<HTMLInputElement>) => {
        createFormik.handleChange(e);
        setArea(e.target.value);
    };
    return (
        <Dialog open={openDialogEdit} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Lokasi</DialogTitle>
                    <DialogDescription>
                        Isi form berikut unuk mengubah data lokasi
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={createFormik.handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="id" className="cols-span-1">
                            ID Lokasi
                            </Label>
                            <Input
                                id="id"
                                type="text"
                                name="id"
                                placeholder="ID Lokasi"
                                className="col-span-3"
                                value={id}
                                onChange={onChangeId}
                                disabled={loading}
                                />
                            {createFormik.touched.id && createFormik.errors.id && (
                                <>
                                <div className="col-span-1"></div>
                                <p className='col-span-3 text-xs text-red-500'>{createFormik.errors.id}</p>
                                </>
                            )}
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="location" className="cols-span-1">
                            Lokasi
                            </Label>
                            <Input
                                id="location"
                                type="text"
                                name="location"
                                placeholder="Lokasi"
                                className="col-span-3"
                                value={location}
                                onChange={onChangeLocation}
                                disabled={loading}
                                />
                            {createFormik.touched.location && createFormik.errors.location && (
                                <>
                                <div className="col-span-1"></div>
                                <p className='col-span-3 text-xs text-red-500'>{createFormik.errors.location}</p>
                                </>
                            )}
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="area" className="cols-span-1">
                            Area
                            </Label>
                            <Input
                                id="area"
                                type="text"
                                name="area"
                                placeholder="Area"
                                className="col-span-3"
                                value={area}
                                onChange={onChangeArea}
                                disabled={loading}
                                />
                            {createFormik.touched.area && createFormik.errors.area && (
                                <>
                                <div className="col-span-1"></div>
                                <p className='col-span-3 text-xs text-red-500'>{createFormik.errors.area}</p>
                                </>
                            )}
                        </div>
                        <div className="grid justify-items-end">
                            <Button variant="default" type="submit">
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
