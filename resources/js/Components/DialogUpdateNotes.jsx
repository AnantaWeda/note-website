import {
    Dialog,
    DialogContent,
  } from "@/Components/ui/dialog"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { EditorComponent, ToolbarComponent } from "./Editor";
import { router } from '@inertiajs/react';
import { useToast } from "./ui/use-toast";
import { useContext, useEffect, useState } from "react";
import { CategoryContext } from "@/context/CategoryContext";
import { useTheme } from "./ThemeProvider";

export default function DialogUpdateNotes({open, setOpen,disabled = false, csrf}){
    const { toast } = useToast()

    const [data, setData] = useState({
        'id_notes': '',
        'id_category': '',
        'title': '',
        'note': ''
    });

    const { categoryColor } = useTheme()

    const {dataCategory} = useContext(CategoryContext);

    const handleSetData = (key,value) => {
        setData(prev => ({
            ...prev, 
            [key]: value
        }))
    }

    useEffect(() => {
        setData({
            id_notes: open?.id_notes || '', 
            id_category: open?.id_category || '', 
            title: open?.title || '', 
            note: open?.note || '',
        });
    },[open]);

    const backgroundColorToolbar = (id_category) => 
        categoryColor({variant: dataCategory.find(res => res.id_category === id_category)?.color})

    const handleSubmitUpdate = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("id_notes",data.id_notes)
        formData.append("id_category",data.id_category)
        formData.append("title",data.title)
        formData.append("note",data.note)

        router.post(route('home.update'),formData,{
            onSuccess:() => {
                toast({
                    variant: "success",
                    title: "Success!",
                    description: "Your notes have been successfully updated.",
                })
                setData({
                    id_notes: '',
                    id_category: '',
                    title: '',
                    note: ''
                });
                setOpen(false);
            },
            onError:(err) => {
                toast({
                    variant: "destructive",
                    title: "Something went wrong",
                    description: err[Object.keys(err)[0]],
                })
            }
        });
    }

    const handleDelete = () => {
        router.delete(route('home.delete',data.id_notes),{
            onSuccess: () => {
                toast({
                    variant: "success",
                    title: "Success!",
                    description: "Your notes have been successfully deleted.",
                })
                setOpen(false);
            }
        })
    }

    return(
        <Dialog open={open ? true : false} onOpenChange={setOpen} className="costum-scroll">
            <DialogContent size="4" className="border-none costum-scroll p-0 max-w-[700px] gap-0">
                <form onSubmit={!disabled ? handleSubmitUpdate : handleDelete}>
                    <Input value={data.title} onChange={e => handleSetData('title',e.target.value)} className="border-none text-xl h-16 bg-transparent dark:text-white focus:outline-none focus-visible:ring-0 ring-transparent focus-visible:ring-offset-0" placeholder="Title..." disabled={disabled}/>
                    <EditorComponent disabled={disabled} csrf={csrf} valueNote={data.note} setValueNote={value => setData(prev => ({...prev,'note': value}))}/>
                    <div className={`${backgroundColorToolbar(data.id_category ? data.id_category : open?.id_category)} rounded-b-lg flex py-1`}>
                        <ToolbarComponent value={data.id_category ? data.id_category : open?.id_category} setValue={res => handleSetData('id_category',res)}/>
                        {!disabled ? (
                            <Button className="ms-auto me-4">Save</Button>
                        ) : (
                            <Button className="ms-auto me-4" type="button" onClick={() => handleDelete()}>Delete</Button>
                        )}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}