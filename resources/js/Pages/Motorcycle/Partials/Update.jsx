import {
    Dialog,
    DialogContent,
  } from "@/Components/ui/dialog"
  import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { useForm } from "@inertiajs/react"
import ErrorMessage from '@/Components/ErrorMessage';
import { Button } from "@/Components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { DatePicker } from "@/Components/DatePicker";
import { useToast } from "@/Components/ui/use-toast";
import { useEffect } from "react";

export default function Update({open,setOpen,dataProps}){
    const {data,setData,errors,reset,post} = useForm({
        'id_motorcycle' : "",
        'name' : "",
        'type_motorcycle' : "",
        'merk_motorcycle' : "",
        'cc' : "",
        'color' : "",
        'price' : "",
        'date_launching' : dataProps?.date_launching ?? ""
    })

    useEffect(() => {
        setData({
            'id_motorcycle' : dataProps?.id_motorcycle ?? "",
            'name' : dataProps?.name ?? "",
            'type_motorcycle' : dataProps?.type_motorcycle ?? "",
            'merk_motorcycle' : dataProps?.merk_motorcycle ?? "",
            'cc' : dataProps?.CC ?? "",
            'color' : dataProps?.color ?? "",
            'price' : dataProps?.price ?? "",
            'date_launching' : dataProps?.date_launching ?? ""
        });
    },[dataProps]);

    const { toast } = useToast()

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("motorcycle.update"),{
            onSuccess:() => {
                toast({
                    variant: "success",
                    title: "Success!",
                    description: "Your motorcycle have been successfully updated.",
                })
                reset();
                setOpen();
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
                <div className="p-5">
                    <h1 className="font-bold mb-5">Update Data Motorcycle</h1>
                    <form className="grid grid-cols-2 gap-3" onSubmit={handleSubmit}>
                        <div className="col-span-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="name" value={data.name} onChange={e => setData("name",e.target.value)}/>
                            <ErrorMessage message={errors.name}/>
                        </div>
                        
                        <div className="col-span-2">
                            <Label htmlFor="name">Type</Label>
                            <Select value={data.type_motorcycle} onValueChange={e => setData("type_motorcycle",e)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sport">Sport</SelectItem>
                                    <SelectItem value="matic">Matic</SelectItem>
                                    <SelectItem value="offroad">Offroad</SelectItem>
                                </SelectContent>
                            </Select>
                            <ErrorMessage message={errors.type_motorcycle}/>
                        </div>
                        <div className="">
                            <Label htmlFor="cc">CC</Label>
                            <Input id="cc" placeholder="cc" value={data.cc} onChange={e => setData("cc",e.target.value)}/>
                            <ErrorMessage message={errors.cc}/>
                        </div>
                        <div className="">
                            <Label htmlFor="color">Color</Label>
                            <Input id="color" placeholder="color" value={data.color} onChange={e => setData("color",e.target.value)}/>
                            <ErrorMessage message={errors.color}/>
                        </div>
                        <div className="col-span-2">
                            <Label htmlFor="name">Merk</Label>
                            <Select value={data.merk_motorcycle} onValueChange={e => setData("merk_motorcycle",e)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Merk" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="yamaha">Yamaha</SelectItem>
                                    <SelectItem value="kawasaki">Kawasaki</SelectItem>
                                    <SelectItem value="honda">Honda</SelectItem>
                                    <SelectItem value="dll">dll</SelectItem>
                                </SelectContent>
                            </Select>
                            <ErrorMessage message={errors.merk_motorcycle}/>
                        </div>
                        <div className="">
                            <Label htmlFor="price">Price</Label>
                            <Input id="price" type="number" placeholder="price" value={data.price} onChange={e => setData("price",e.target.value)}/>
                            <ErrorMessage message={errors.price}/>
                        </div>
                        <div className="">
                            <Label htmlFor="name">Date</Label>
                            <DatePicker dateProps={data.date_launching} onChangeProps={e => setData("date_launching",e)}/>
                            <ErrorMessage message={errors.name}/>
                        </div>
                        <div className="col-span-2">
                            <Button className="!ms-auto block">Submit</Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}