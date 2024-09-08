import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet"
import { Link, useForm } from '@inertiajs/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import CropImage from "./CropImage";
import { useEffect, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { useToast } from "./ui/use-toast";

export default function ProfileSidebar({auth}){
    const [image,setImage] = useState();
    const [imageType,setImageType] = useState("");
    const [preview,setPreview] = useState();

    const { toast } = useToast();

    const {data,setData,post,errors} = useForm({
        'name': '',
        'profile': '',
        'password': '',
        'password_confirmation': ''
    });

    useEffect(() => {
        setData({
            'name': auth.user.name,
            'profile': ''
        })
    },[])

    async function blobUrlToFile(blobUrl, fileName, mimeType) {
        try {
            // Mengambil blob dari URL
            const response = await fetch(blobUrl);
            const blob = await response.blob();
    
            // Membuat objek File dari blob
            const file = new File([blob], fileName, { type: mimeType });
    
            return file;
        } catch (error) {
            console.error("Error converting Blob URL to File:", error);
            throw error;
        }
    }

    const handleSetImage = (res) => {
        setPreview(res);
        blobUrlToFile(res, `test.${imageType.split('/')[1]}`, imageType)
        .then(file => {
            setData("profile",file)
        })
        .catch(error => {
            console.error("Failed to create file:", error);
        });
    }

    const handleFileChange = (res) => {
        let filesize = Number(((res.size/1024)/1024).toFixed(4));
        if (filesize > 2) {
            toast({
                variant: "destructive",
                title: "Something went wrong",
                description: "Max file size is 2mb",
            })
            return;
        }
        setImageType(res.type)
        setImage(URL.createObjectURL(res));
    };

    const handleSubmit = (e) => {
        e.preventDefault(0)
        post(route("register.update"),{
            onSuccess: (res) => {
                toast({
                    variant: "success",
                    title: "Success!",
                    description: "Profile updated.",
                })
                setData({
                    'name': data.name,
                    'profile': '',
                    'password': '',
                    'password_confirmation': ''
                })
            },
            onError: err => {
                toast({
                    variant: "destructive",
                    title: "Something went wrong",
                    description: err[Object.keys(err)[0]],
                })
            }
        })
    }
    

    return(
        <Sheet>
            <SheetTrigger asChild>
                <Avatar className="w-14 h-14 rounded-full hover:brightness-75 cursor-pointer">
                    <AvatarImage src={auth?.user?.profile} />
                    <AvatarFallback>{auth?.user?.name.slice(0,2).toUpperCase()}</AvatarFallback>
                </Avatar>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit} className="grid gap-1 pt-4">
                    <div className='relative flex'>
                        <Avatar className="rounded-full w-24 h-24">
                            <AvatarImage src={preview ? preview : auth?.user?.profile} />
                            <AvatarFallback>{ auth?.user?.name.slice(0,2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className='grow px-5'>
                            <Button type="button" className="block w-full cursor-pointer mt-6 text-start p-0 mb-2 relative">
                                <input type='file' accept="image/png, image/jpg, image/jpeg" onChange={e => handleFileChange(e.target.files[0])} className='cursor-pointer absolute w-full top-0 opacity-0 h-full'/>
                                <p className='text-center'>Change Profile</p>
                            </Button>
                        </div>
                    </div>
                    <ErrorMessage message={errors.profile}/>
                    <div className="overflow-y-auto p-[3px] grid gap-4 max-h-[60vh]">
                        <div className="">
                            <Label htmlFor="name" className="text-right ps-1 mb-1">Email :</Label>
                            <Input id="name" value={auth?.user?.email} className="col-span-3" disabled readonly/>
                        </div>
                        <div className="">
                            <Label htmlFor="name" className="text-right ps-1 mb-1">Name :</Label>
                            <Input id="name" value={data.name} onChange={e => setData('name',e.target.value)} className="col-span-3" />
                            <ErrorMessage message={errors.name} className="ms-1"/>
                        </div>
                        {auth?.user?.provider === "platform" ? (
                            <>
                                <div className=''>
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" placeholder="Enter Password..." type="password" value={data.password} onChange={e => setData('password',e.target.value)}/>
                                    <ErrorMessage message={errors.password} className="ms-1"/>
                                </div>
                                <div className=''>
                                    <Label htmlFor="password_confirmation">Password Confirmation</Label>
                                    <Input id="password_confirmation" placeholder="Enter Password..." type="password" value={data.password_confirmation} onChange={e => setData('password_confirmation',e.target.value)}/>
                                    <ErrorMessage message={errors.password_confirmation} className="ms-1"/>
                                </div>
                            </>
                        ) : (<></>)}
                        <div className="flex">
                            <Button type="submit">Save changes</Button>
                            <Link className='ms-2' method="post" href={route('logout')} as='button'>Logout</Link>
                        </div>
                    </div>
                </form>
                <CropImage open={image} setOpen={setImage} handleImageCrop={handleSetImage}/>
            </SheetContent>
        </Sheet>
    )
}