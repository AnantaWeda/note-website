import {
    Dialog,
    DialogContent,
  } from "@/Components/ui/dialog"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { EditorComponent, ToolbarComponent } from "./Editor";
import { useForm } from '@inertiajs/react';
import { useToast } from "./ui/use-toast";
import { useContext, useEffect } from "react";
import { CategoryContext } from "@/context/CategoryContext";
import { useTheme } from "./ThemeProvider";

export default function DialogCreateNotes({open, setOpen, csrf}){
    const { toast } = useToast()
    const {data, setData, errors, post} = useForm({
        'id_category': '',
        'title': '',
        'note': ''
    });

    const { categoryColor } = useTheme()

    const {dataCategory} = useContext(CategoryContext);

    const backgroundColorToolbar = (id_category) => 
        categoryColor({variant: dataCategory.find(res => res.id_category === id_category)?.color})

    useEffect(() => {
        setData({
            'id_category': '',
            'title': '',
            'note': ''
        })
    },[open]);

    const handleSetNote = (val) => {
        setData("note",val);
    }

    const handleSetTitle = (val) => {
        setData("title",val);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route('home.create'),{
            onSuccess:() => {
                toast({
                    variant: "success",
                    title: "Success!",
                    description: "Your notes have been successfully inputted.",
                })
                setData({
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
    return(
        <Dialog open={open} onOpenChange={setOpen} className="costum-scroll">
            <DialogContent size="4" className="border-none p-0 max-w-[700px] gap-0" id="style-3">
                <form onSubmit={handleSubmit}>
                    <Input value={data.title} onChange={e => handleSetTitle(e.target.value)} className="border-none text-xl h-16 bg-transparent dark:text-white focus:outline-none focus-visible:ring-0 ring-transparent focus-visible:ring-offset-0" placeholder="Title..."/>
                    <EditorComponent csrf={csrf} valueNote={data.note} setValueNote={(val) => handleSetNote(val)}/>
                    <div className={`${backgroundColorToolbar(data.id_category ? data.id_category : open?.id_category)} rounded-b-lg flex py-1`}>
                        <ToolbarComponent value={data.id_category ? data.id_category : open?.id_category} setValue={res => setData("id_category",res)}/>
                        <Button className="ms-auto me-4">Save</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}