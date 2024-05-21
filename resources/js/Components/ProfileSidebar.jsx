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
import { Link } from '@inertiajs/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default function ProfileSidebar({auth}){
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
                <div className="grid gap-4 py-4">
                    <div className='relative flex'>
                        <Avatar className="rounded-full w-24 h-24">
                            <AvatarImage src={auth?.user?.profile} />
                            <AvatarFallback>{auth?.user?.name.slice(0,2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className='grow px-5'>
                            <Button className="block w-full cursor-pointer text-start p-0 mb-2 relative">
                                <input type='file' className='cursor-pointer absolute w-full top-0 opacity-0 h-full'/>
                                <p className='text-center'>Change Profile</p>
                            </Button>
                            <Button className="block w-full">Delete Profile</Button>
                        </div>
                    </div>
                    <div className="">
                        <Label htmlFor="name" className="text-right ps-1 mb-1">Email :</Label>
                        <Input id="name" value={auth?.user?.email} className="col-span-3" disabled readonly/>
                    </div>
                    <div className="">
                        <Label htmlFor="name" className="text-right ps-1 mb-1">Name :</Label>
                        <Input id="name" value="Pedro Duarte" className="col-span-3" />
                    </div>
                </div>
                <Button type="submit">Save changes</Button>
                <Link className='ms-2' method="post" href={route('logout')} as='button'>Logout</Link>
            </SheetContent>
        </Sheet>
    )
}