"use client"

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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { IconDeviceFloppy, IconLoader2, IconTrash} from "@tabler/icons-react"
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { fetchGetAsset, fetchPostAsset } from "@/service/api"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"
import React, { useEffect, useRef, useState } from "react"
import { DeleteGambarAlertDialog } from "./delete-gambar"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ViewLocation({ data, openDialogView, onClose }: { data: any, openDialogView: boolean, onClose: () => void }) {
    const queryClient = useQueryClient();
    const { toast } = useToast()
    const [loading, setLoading] = React.useState(false);
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [dataGambar, setDataGambar] = useState([])
    const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
    const [openDeleteGambar, setOpenDeleteGambar] = React.useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleCloseDialogDeleteGambar = () => {
        setOpenDeleteGambar(false);
    };

    const fetchGambar = async () => {
        const response = await fetchGetAsset(`gambar/${ data.id }`);
        if (!response) {
        throw new Error('Something went wrong...');
        }
        return response.data;
    };

    const { data: gambar, refetch } = useQuery({ queryKey: ['gambar'], queryFn: fetchGambar });
    useEffect(() => {
        if(openDialogView){
            setDataGambar(gambar)
            refetch()
        }
    }, [openDialogView, gambar])
    
    const initialValues = {
        image: '',
    }

    const validationSchema = Yup.object().shape({
        image: Yup.string().required('This field is required.'),
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
                let formData = new FormData();
                formData.append('lokasi_id', data.id)
                formData.append('gambar', values.image)
                const response = await fetchPostAsset('gambar/create', formData);
                if(response){
                    createFormik.resetForm();
                    setImage(null)
                    toast({
                        title: "Success!",
                        description: "Data Gambar Berhasil Disimpan!",
                    })
                    await queryClient.invalidateQueries({ queryKey: ['gambar', data.id] });
                    refetch()
                    setLoading(false)
                }else{
                    toast({
                        variant: "destructive",
                        title: "Wrong!",
                        description: "Data Gambar Gagal Disimpan!"
                    })
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error submitting data:', error)
                toast({
                    variant: "destructive",
                    title: "Wrong!",
                    description: "Data Gambar Gagal Disimpan!"
                })
                setLoading(false)
            }
        },
    })
    const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files && files[0]) {
            const file = files[0];
            createFormik.setFieldValue("image", file);
            setImage(file);
        } else {
            createFormik.setFieldValue("image", null);
            setImage(null);
        }
    };

    const handleDeleteImage = (imageId: number) => {
        setSelectedImageId(imageId);
        setOpenDeleteGambar(true);
    };
    
    return (
        <Dialog open={openDialogView} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>#{data.id} Denah Lokasi</DialogTitle>
                    <DialogDescription>
                        Isi form berikut unuk menambahkan data denah lokasi
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[450px] w-full">
                    <div className="grid gap-2 py-4">
                        <div className="grid w-full">
                            {dataGambar.length > 0 && (
                                <Carousel className="w-full">
                                    <CarouselContent>
                                        {dataGambar.map((value :any, index:number) => (
                                            <>
                                            <CarouselItem key={index}>
                                                <div className="p-1 relative">
                                                    <img src={ `https://storage.googleapis.com/pkc_gcp-storage/asset/lokasi/${value.gambar}` } alt="Image" className={`rounded-md aspect-[16/9] w-full ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} onLoad={() => setImageLoaded(true)} />
                                                    <div className="absolute inset-0 flex items-end justify-center p-5">
                                                        <Button variant="outline" className="absolute bottom-5" onClick={ async() => { handleDeleteImage(value.id) }}>
                                                            <IconTrash className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CarouselItem>
                                            </>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious className="left-0" />
                                    <CarouselNext className="right-0" />
                                </Carousel>
                            )}
                            {dataGambar.length == 0 && (
                                <div className="grid place-items-center">
                                    <img src="/images/no_data.png" alt="Image" className="aspect-[1/1] w-1/2" />
                                    <p className="text-muted-foreground text-sm">No Data</p>
                                </div>
                            )}
                        </div>
                        <form onSubmit={createFormik.handleSubmit}>
                            <div className="grid w-full items-center gap-1.5 mb-5">
                                <Label htmlFor="image" className="col-span-1">
                                Add Denah Lokasi
                                </Label>
                                <Input
                                    id="image"
                                    type="file"
                                    name="image"
                                    placeholder="Denah Lokasi"
                                    className="col-span-3"
                                    onChange={(event) => onChangeImage(event)}
                                    ref={fileInputRef}
                                    disabled={loading}
                                />
                                <p className="col-span-3 text-muted-foreground text-xs">*Ekstensi: .jpg, .jpeg, .png. Max File Size : 5mb</p>
                                {createFormik.touched.image && createFormik.errors.image && (
                                    <>
                                    <div className="col-span-1"></div>
                                    <p className='col-span-3 text-xs text-red-500'>{createFormik.errors.image}</p>
                                    </>
                                )}
                            </div>
                            <div className="grid justify-items-end">
                                <Button variant="default" type="submit" disabled={loading}>
                                    { loading ? <IconLoader2 className="mr-2 h-4 w-4 animate-spin" /> : <IconDeviceFloppy className="mr-2 h-4 w-4" />}
                                    Save
                                </Button>
                            </div>
                        </form>
                    </div>
                    {selectedImageId !== null && (
                        <DeleteGambarAlertDialog
                            data={selectedImageId}
                            openDialogDeleteGambar={openDeleteGambar}
                            onClose={handleCloseDialogDeleteGambar}
                        />
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
