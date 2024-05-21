import {
    Dialog,
    DialogContent,
  } from "@/Components/ui/dialog"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { EditorComponent, ToolbarComponent } from "./Editor";
import { router, useForm } from '@inertiajs/react';
import { useToast } from "./ui/use-toast";
import { useEffect, useState } from "react";

export default function DialogUpdateNotes({open, setOpen,disabled = false, csrf}){
    const { toast } = useToast()
    const [category, setCategory] = useState();

    const [data, setData] = useState({
        'id_notes': '',
        'title': '',
        'note': ''
    });

    useEffect(() => {
        setData({
            id_notes: open?.id_notes || '', 
            title: open?.title || '', 
            note: open?.note || '',
        });
    },[open]);
    

    const handleSubmitUpdate = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("id_notes",data.id_notes)
        formData.append("title",data.title)
        formData.append("note",data.note)

        router.put(route('home.update'),formData,{
            onSuccess:() => {
                toast({
                    variant: "success",
                    title: "Success!",
                    description: "Your notes have been successfully updated.",
                })
                setData({
                    id_notes: '',
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

    const handleSubmitDelete = (e) => {
        e.preventDefault()
    }

    return(
        <Dialog open={open ? true : false} onOpenChange={setOpen} className="costum-scroll">
            <DialogContent size="4" className="border-none costum-scroll p-0 max-w-[700px] gap-0">
                <form onSubmit={!disabled ? handleSubmitUpdate : handleSubmitDelete}>
                    <Input value={data.title} onChange={e => setData(prev => ({...prev,'title': e.target.value}))} className="border-none text-xl h-16 bg-transparent dark:text-white focus:outline-none focus-visible:ring-0 ring-transparent focus-visible:ring-offset-0" placeholder="Title..." disabled={disabled}/>
                    <EditorComponent disabled={disabled} csrf={csrf} valueNote={data.note} setValueNote={value => setData(prev => ({...prev,'note': value}))}/>
                    <div className={`${category} rounded-b-lg flex py-1`}>
                        <ToolbarComponent value={res => setCategory(res)}/>
                        {!disabled ? (
                            <Button className="ms-auto me-4">Save</Button>
                        ) : (
                            <Button className="ms-auto me-4">Delete</Button>
                        )}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}