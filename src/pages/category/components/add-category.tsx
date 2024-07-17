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
import { IconPlus, IconDeviceFloppy, IconTrash, IconLoader2 } from "@tabler/icons-react"
import {useFormik} from 'formik'
import * as Yup from 'yup'
import { ScrollArea } from "@/components/ui/scroll-area"
import { fetchGetAsset, fetchPostAsset } from "@/service/api"
import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/components/ui/use-toast"

interface dataCompilator{
    id: number,
    cc_kompilator: string,
    kompilator: string
}

interface dataGolongan{
    id: number,
    golongan: string
}

interface dataAtribut{
    id: number,
    atribut: string
}

export function FormAddCategory() {
    const queryClient = useQueryClient();
    const { toast } = useToast()
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [idCategory, setIdCategory] = React.useState<string>('');
    const [category, setCategory] = React.useState<string>('');
    const [group, setGroup] = React.useState<string>('');
    const [compilator, setCompilator] = React.useState<string>('');
    const [benefit, setBenefit] = React.useState<string>('');
    const [attributes, setAttributes] = React.useState([{ id: 1, value: '' }]);
    const [dataCompilator, setDataCompilator] = React.useState<dataCompilator[]>([])
    const [dataAttribut, setDataAttribut] = React.useState<dataAtribut[]>([])
    const [dataBenefit, setDataBenefit] = React.useState<dataGolongan[]>([])
    const fetchCommons = async () => {
		try {
			let response = await fetchGetAsset('kompilator');
			if (!response) {
				throw new Error('Failed to fetch data for ref-events-getall')
			}
			let data = await response
			setDataCompilator(data)

			let response2 = await fetchGetAsset('atribut');
			if (!response2) {
				throw new Error('Failed to fetch data for ref-time-getall')
			}
			let data2 = await response2
			setDataAttribut(data2)

            let response3 = await fetchGetAsset('manfaat');
			if (!response3) {
				throw new Error('Failed to fetch data for ref-time-getall')
			}
			let data3 = await response3
			setDataBenefit(data3)
		} catch (error) {
			console.error('Error fetching data:', error)
		}
	}
    useEffect(() => {
        fetchCommons()
    }, [])

    const handleAddAttribute = () => {
        setAttributes([...attributes, { id: attributes.length + 1, value: '' }]);
    };

    const handleChangeAttribute = (id: number, value: string) => {
        const newAttributes = attributes.map(attribute => attribute.id === id ? { ...attribute, value } : attribute);
        setAttributes(newAttributes);
        createFormik.setFieldValue('attributes', newAttributes);
    };

    const handleDeleteAttribute = (id: number) => {
        setAttributes(attributes.filter(attribute => attribute.id !== id));
    };

    const initialValues = {
        idCategory: '',
        category: '',
        group: '',
        compilator: '',
        benefit: '',
        attributes: attributes
    }

    const validationSchema = Yup.object().shape({
        idCategory: Yup.string().required('This field is required.'),
        category: Yup.string().required('This field is required.'),
        group: Yup.string().required('This field is required.'),
        compilator: Yup.string().required('This field is required.'),
        benefit: Yup.string().required('This field is required.'),
        attributes: Yup.array().of(
            Yup.object().shape({
                id: Yup.number().required(),
                value: Yup.string().required('This field is required.')
            })
        )
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
                formData.append('id_kategori', values.idCategory)
                formData.append('kategori', values.category)
                formData.append('kelompok_asset', values.group)
                formData.append('kompilator_id', values.compilator)
                formData.append('masa_manfaat_id', values.benefit)

                values.attributes.forEach((value, index) => {
                    formData.append(`attributes[${index}][attributes]`, value.value);
                });

                const response = await fetchPostAsset('kategori/create', formData);
                if(response){
                    createFormik.resetForm()
                    toast({
                        title: "Success!",
                        description: "Data Kategori Berhasil Disimpan!",
                    })
                    await queryClient.invalidateQueries({ queryKey: ['category'] });
                    setOpen(false);
                    setLoading(false)
                }else{
                    toast({
                        variant: "destructive",
                        title: "Wrong!",
                        description: "Data Kategori Gagal Disimpan!"
                    })
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error submitting data:', error)
            }
        },
    })

    const onChangeIdCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        createFormik.handleChange(e);
        setIdCategory(e.target.value);
    };

    const onChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        createFormik.handleChange(e);
        setCategory(e.target.value);
    };

    const onChangeGroup = (value: string) => {
        createFormik.setFieldTouched('group', true);
        createFormik.setFieldValue('group', value);
        setGroup(value);
    };

    const onChangeCompilator = (value: string) => {
        createFormik.setFieldTouched('compilator', true);
        createFormik.setFieldValue('compilator', value);
        setCompilator(value);
    };

    const onChangeBenefit = (value: string) => {
        createFormik.setFieldTouched('benefit', true);
        createFormik.setFieldValue('benefit', value);
        setBenefit(value);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen} modal={open}>
            <DialogTrigger asChild>
                <Button variant="default" className='text-sm ml-2'>
                    <IconPlus className="mr-2 h-4 w-4" />
                    Add Kategori
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Kategori</DialogTitle>
                    <DialogDescription>
                        Isi form berikut unuk menambahkan data Kategori
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[450px] w-full">
                <form onSubmit={createFormik.handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="id_category" className="cols-span-1">
                            ID Kategori
                            </Label>
                            <Input
                                id="idCategory"
                                type="text"
                                name="idCategory"
                                placeholder="ID Kategori"
                                className="col-span-3"
                                value={createFormik.values.idCategory}
                                onChange={onChangeIdCategory}
                                disabled={loading}
                            />
                            {createFormik.touched.idCategory && createFormik.errors.idCategory && (
                                <>
                                <div className="col-span-1"></div>
                                <p className='col-span-3 text-xs text-red-500'>{createFormik.errors.idCategory}</p>
                                </>
                            )}
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="category" className="cols-span-1">
                            Kategori
                            </Label>
                            <Input
                                id="category"
                                type="text"
                                name="category"
                                placeholder="Kategori"
                                className="col-span-3"
                                value={createFormik.values.category}
                                onChange={onChangeCategory}
                                disabled={loading}
                            />
                            {createFormik.touched.category && createFormik.errors.category && (
                                <>
                                <div className="col-span-1"></div>
                                <p className='col-span-3 text-xs text-red-500'>{createFormik.errors.category}</p>
                                </>
                            )}
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="group" className="cols-span-1">
                            Kelompok Asset
                            </Label>
                            <Select name="group" onValueChange={onChangeGroup} disabled={loading}>
                                <SelectTrigger className="col-span-3" id="group">
                                    <SelectValue placeholder="Pilih Kelompok Asset" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Perlengkapan dan Peralatan">Perlengkapan dan Peralatan</SelectItem>
                                    <SelectItem value="Bangunan & Prasarana">Bangunan & Prasarana</SelectItem>
                                    <SelectItem value="Kendaraan">Kendaraan</SelectItem>
                                    <SelectItem value="Perlengkapan & Peralatan">Perlengkapan & Peralatan</SelectItem>
                                    <SelectItem value="Pabrik & Peralatan Pabrik">Pabrik & Peralatan Pabrik</SelectItem>
                                </SelectContent>
                            </Select>
                            {createFormik.touched.group && createFormik.errors.group && (
                                <>
                                <div className="col-span-1"></div>
                                <p className='col-span-3 text-xs text-red-500'>{createFormik.errors.group}</p>
                                </>
                            )}
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="compilator" className="cols-span-1">
                            Kompilator
                            </Label>
                            <Select name="compilator" onValueChange={onChangeCompilator} disabled={loading}>
                                <SelectTrigger className="col-span-3" id="compilator">
                                    <SelectValue placeholder="Pilih Kompilator" />
                                </SelectTrigger>
                                <SelectContent>
                                    {dataCompilator.length > 0 && dataCompilator.map((value, index) => (
                                        <SelectItem value={value.id.toString()} key={index}>{value.cc_kompilator} - {value.kompilator}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {createFormik.touched.compilator && createFormik.errors.compilator && (
                                <>
                                <div className="col-span-1"></div>
                                <p className='col-span-3 text-xs text-red-500'>{createFormik.errors.compilator}</p>
                                </>
                            )}
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="benefit" className="cols-span-1">
                            Masa Manfaat
                            </Label>
                            <Select name="benefit" onValueChange={onChangeBenefit} disabled={loading}>
                                <SelectTrigger className="col-span-3" id="benefit">
                                    <SelectValue placeholder="Pilih Masa Manfaat" />
                                </SelectTrigger>
                                <SelectContent>
                                    {dataBenefit.length > 0 && dataBenefit.map((value, index) => (
                                        <SelectItem value={value.id.toString()} key={index}>{value.golongan}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {createFormik.touched.benefit && createFormik.errors.benefit && (
                                <>
                                <div className="col-span-1"></div>
                                <p className='col-span-3 text-xs text-red-500'>{createFormik.errors.benefit}</p>
                                </>
                            )}
                        </div>
                        <div className="grid justify-items-start mb-3">
                            <Button variant="default" type="button" onClick={handleAddAttribute}>
                                <IconPlus className="mr-2 h-4 w-4" />
                                Add Attribut
                            </Button>
                        </div>
                        {attributes.map((attribute, index) => (
                            <div key={attribute.id} className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor={`attribute-${attribute.id}`} className="cols-span-1">
                                    Attribut {attribute.id}
                                </Label>
                                <div className="grid grid-cols-12 gap-x-2">
                                    <Select name={`attribut-${attribute.id}`} required={true} onValueChange={(value) => handleChangeAttribute(attribute.id, value)} disabled={loading}>
                                        <SelectTrigger className={`${index == 0 ? 'col-span-12': 'col-span-10'}`} id={`attribut-${attribute.id}`}>
                                            <SelectValue placeholder="Pilih Attribut" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {dataAttribut.length > 0 && dataAttribut.map((value, index) => (
                                                <SelectItem value={value.id.toString()} key={index}>{value.atribut}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {index != 0 &&(
                                        <Button 
                                            name={`attribute-${attribute.id}`} 
                                            id={`attribut-${attribute.id}`} 
                                            variant="outline" 
                                            className="col-span-2" 
                                            onClick={() => handleDeleteAttribute(attribute.id)}>
                                            <IconTrash className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div className="grid justify-items-end">
                            <Button variant="default" type="submit" disabled={loading}>
                                { loading ? <IconLoader2 className="mr-2 h-4 w-4 animate-spin" /> : <IconDeviceFloppy className="mr-2 h-4 w-4" />}
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
