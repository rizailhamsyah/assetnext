import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast";
import { fetchDeleteAsset } from "@/service/api";
import { IconLoader2, IconTrash } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

export function DeleteAlertDialog({ data, openDialogDelete, onClose }: { data: any, openDialogDelete: boolean, onClose: () => void }) {
    const queryClient = useQueryClient();
    const [loading, setLoading] = React.useState(false);
    const { toast } = useToast()
    const fetchDeleteAttribute = async () => {
        setLoading(true);
        try {
            const response = await fetchDeleteAsset(`kategori/${data.id}`);
            if (response) {
                toast({
                    title: "Success!",
                    description: "Data Kategori Berhasil Dihapus!",
                });
                await queryClient.invalidateQueries({ queryKey: ['category'] });
                setLoading(false)
                onClose()
            } else {
                toast({
                    variant: "destructive",
                    title: "Wrong",
                    description: "Data Kategori Gagal Dihapus",
                });
                setLoading(false)
                throw new Error("Data Kategori Gagal Dihapus!");
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Wrong",
                description: "Data Kategori Gagal Dihapus",
            });
            setLoading(false)
        }
    };

    return (
      <AlertDialog open={openDialogDelete} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>#{data.id} Delete Data Kategori?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda Yakin Ingin Menghapus Data Berikut ini!!!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={fetchDeleteAttribute} disabled={loading}>
              { loading ? <IconLoader2 className="mr-2 h-4 w-4 animate-spin" /> : <IconTrash className="mr-2 h-4 w-4" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
}