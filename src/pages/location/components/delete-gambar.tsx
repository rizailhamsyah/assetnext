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

export function DeleteGambarAlertDialog({ data, openDialogDeleteGambar, onClose }: { data: number, openDialogDeleteGambar: boolean, onClose: () => void }) {
    const queryClient = useQueryClient();
    const [loading, setLoading] = React.useState(false);
    const { toast } = useToast()
    const fetchDeleteGambar = async () => {
        setLoading(true);
        try {
            const response = await fetchDeleteAsset(`gambar/${data}`);
            if (response) {
                toast({
                    title: "Success!",
                    description: "Data Gambar Berhasil Dihapus!",
                });
                await queryClient.invalidateQueries({ queryKey: ['gambar'] });
                setLoading(false)
                onClose()
            } else {
                toast({
                    variant: "destructive",
                    title: "Wrong",
                    description: "Data Gambar Gagal Dihapus",
                });
                setLoading(false)
                throw new Error("Data Gambar Gagal Dihapus!");
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Wrong",
                description: "Data Gambar Gagal Dihapus",
            });
            setLoading(false)
        }
    };

    return (
      <AlertDialog open={openDialogDeleteGambar} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>#{data} Delete Data Gambar?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda Yakin Ingin Menghapus Data Berikut ini!!!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={fetchDeleteGambar} disabled={loading}>
              { loading ? <IconLoader2 className="mr-2 h-4 w-4 animate-spin" /> : <IconTrash className="mr-2 h-4 w-4" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
}