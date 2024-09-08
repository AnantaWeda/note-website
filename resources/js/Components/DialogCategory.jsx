import { cva } from "class-variance-authority";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useForm } from "@inertiajs/react";
import { useToast } from "./ui/use-toast";
import { useEffect } from "react";

export default function DialogCategory({open, setOpen,prevdata,update = false}){
    const {data,setData,post } = useForm({
        "id_category" : "",
        "category_name" : "",
        "color" : ""
    })

    const title = update ? "Update" : "Create";

    const {toast} = useToast();

    const categoryColor = cva(
        "transition-all w-8 h-8 rounded-full cursor-pointer border-2 ring-offset-background ring-2 me-3",
        {
            variants:{
                variant:{
                    green: "bg-green-500 border-green-700",
                    purple: "bg-purple-500 border-purple-700",
                    yellow: "bg-yellow-500 border-yellow-700",
                    red: "bg-red-500 border-red-700",
                },
                status:{
                  active: "ring-ring ring-offset-2 border-none"
                }
            }
        }
    );

    useEffect(() => {
        setData({
            "id_category" : prevdata?.id_category || "",
            "category_name" : prevdata?.name || "",
            "color" : prevdata?.color || ""
        })
    },[open])   

    const handleSubmit = (e) => {
        e.preventDefault()
        post(route(update ? "category.update" : "category.create"),{
            onSuccess: res => {
                toast({
                    variant: "success",
                    title: "Success!",
                    description: `Your notes have been successfully ${update ? "updated" : "inputted"}.`,
                })
                setData({
                    "id_category" : "",
                    "category_name" : "",
                    "color" : "green"
                });
                setOpen(false);
            },
            onError: err => {
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
            <DialogContent size="4" className="border-none costum-scroll max-w-[700px] gap-0 px-10 pt-10">
                <DialogHeader>
                    <DialogTitle>{title} Category</DialogTitle>
                    <DialogDescription>
                        {title} your category here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="items-center mb-5">
                        <Label htmlFor="name" className="text-right">Category Name</Label>
                        <Input id="name" value={data.category_name} onChange={e => setData("category_name",e.target.value)} className="col-span-3"/>
                    </div>
                    <div className="items-center">
                        <Label htmlFor="name" className="text-right">Choose Color</Label>
                        <div className="flex mt-2 ps-1">
                            <button type="button" className={categoryColor({variant: "green",status: data.color === "green" ? "active" : null})} onClick={() => setData("color","green")}></button>
                            <button type="button" className={categoryColor({variant: "yellow",status: data.color === "yellow" ? "active" : null})} onClick={() => setData("color","yellow")}></button>
                            <button type="button" className={categoryColor({variant: "red",status: data.color === "red" ? "active" : null})} onClick={() => setData("color","red")}></button>
                            <button type="button" className={categoryColor({variant: "purple",status: data.color === "purple" ? "active" : null})} onClick={() => setData("color","purple")}></button>
                        </div>
                    </div>
                    <Button className="mt-5 ms-auto block">Save</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}