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

export function FormEditAttribute({ data, openDialogEdit, onClose }: { data: any, openDialogEdit: boolean, onClose: () => void }) {
    const queryClient = useQueryClient();
    const { toast } = useToast()
    const [loading, setLoading] = React.useState(false);
    const [attribute, setAttribute] = React.useState<string>('');

    useEffect(() => {
        if (data) {
            setAttribute(data.atribut);
            createFormik.setFieldValue("attribute", attribute);
        }
    }, [data]);

    const initialValues = {
        attribute: '',
    }

    const validationSchema = Yup.object().shape({
        attribute: Yup.string().required('This field is required.'),
    })

    const createFormik = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            try {
                await createFormik.validateForm(values)
                setLoading(true)
                let formData = new URLSearchParams();
                formData.append('atribut', values.attribute)
                const response = await fetchPutAsset(`atribut/${ data.id }`, formData);
                if(response){
                    createFormik.setFieldValue("attribute", '');
                    toast({
                        title: "Success!",
                        description: "Data Atribut Berhasil Disimpan!",
                    })
                    await queryClient.invalidateQueries({ queryKey: ['attribute'] });
                    onClose()
                    setLoading(false)
                }else{
                    toast({
                        variant: "destructive",
                        title: "Wrong!",
                        description: "Data Atribut Gagal Disimpan!"
                    })
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error submitting data:', error)
            }
        },
    })

    const onChangeAttribute = (e: React.ChangeEvent<HTMLInputElement>) => {
        createFormik.handleChange(e);
        setAttribute(e.target.value);
    };

    return (
        <Dialog open={openDialogEdit} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Attribut</DialogTitle>
                    <DialogDescription>
                        Isi form berikut unuk mengubah data attribut
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={createFormik.handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="attribute" className="cols-span-1">
                            Attribut
                            </Label>
                            <Input
                                id="attribute"
                                type="text"
                                name="attribute"
                                placeholder="Attribut"
                                className="col-span-3"
                                value={attribute}
                                onChange={onChangeAttribute}
                                disabled={loading}
                            />
                            {createFormik.touched.attribute && createFormik.errors.attribute && (
                                <>
                                <div className="col-span-1"></div>
                                <p className='col-span-3 text-xs text-red-500'>{createFormik.errors.attribute}</p>
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
