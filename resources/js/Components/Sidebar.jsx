import { FaPlusCircle,FaFileArchive } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { ModeToggle } from "./ModeToggle";
import { cva } from "class-variance-authority";
import ProfileSidebar from "./ProfileSidebar";
import { Link,router,usePage } from '@inertiajs/react';
import { Button } from "./ui/button";
import { useContext } from "react";
import { CategoryContext } from "@/context/CategoryContext";
import { useToast } from "./ui/use-toast";
import { useTheme } from "./ThemeProvider";
import { FaMotorcycle } from "react-icons/fa6";

export function Sidebar({auth,setDataCategory,sidebarCollapsed,handleSidebarCollapsed,handleOpenCreateCategory}){
    const {dataCategory} = useContext(CategoryContext);
    
    const { toast } = useToast();

    const linkActive = cva(
        "text-sm rounded-md p-2 justify-start inline-flex w-full cursor-pointer my-[1px]",
        {
            variants:{
                variant:{
                    active: "bg-primary text-primary-foreground ",
                    notActive: "dark:text-primary-foreground text-primary dark:hover:bg-primary/50 hover:bg-gray-300"
                }
            }
        }
    );

    const linkSidebar = [
        {
            name: 'Create Note',
            href: 'home.view',
            activeUrl: '/',
            icon: <FaPlusCircle className="me-3 ms-1 my-auto"/>
        },
        {
            name: 'Archive',
            href: 'notesArchive.view',
            activeUrl: '/notes/archive',
            icon: <FaFileArchive className="me-3 ms-1 my-auto"/>
        },
        {
            name: 'Delete',
            href: 'notesDelete.view',
            activeUrl: '/notes/delete',
            icon: <MdDelete className="me-3 ms-[2px] text-lg my-auto"/>
        },
        {
            name: "Motorcycle",
            href: 'motorcycle.view',
            activeUrl: "/motorcycle",
            icon: <FaMotorcycle className="me-3 ms-[2px] text-lg my-auto"/>
        }
    ]

    const { url } = usePage()

    const { categoryColor } = useTheme()

    const handleDelete = (id_category) => {
        router.delete(route('category.delete',id_category),{
            onSuccess:() => {
                toast({
                    variant: "success",
                    title: "Success!",
                    description: "Your notes have been successfully deleted.",
                })
            }
        })
    }

    return(
        <div className="relative">
            <div className={`bg-black/80 absolute inset-0 z-40 w-screen h-screen ${sidebarCollapsed ? 'hidden' : 'lg:hidden'}`} onClick={handleSidebarCollapsed}></div>
            <div className={`${sidebarCollapsed ? 'lg:w-64 w-0' : 'lg:w-0 w-64'} lg:sticky fixed z-50 top-0 h-screen transition-all`}>
                <aside className={`bg-background overflow-hidden h-full sticky`}>
                    <div className="py-10 ps-5 lg:pe-0 pe-5">
                        <div className="flex">
                            <ProfileSidebar auth={auth}/>
                            <div className="ms-3 my-auto w-28">
                                <div className="font-bold truncate">{auth?.user?.name}</div>
                                <div className="text-xs">{auth?.user?.provider}</div>
                            </div>
                            <ModeToggle className="w-14 h-14 rounded-full"/>
                        </div>
                        <hr className="my-5"/>
                        <ul>
                            {linkSidebar.map((res,key) => {
                                return(
                                    <li key={key}>
                                        <Link href={route(res.href)} className={linkActive({variant: (url === res.activeUrl ? 'active' : 'notActive')})}>{res.icon} {res.name}</Link>
                                    </li>
                                )
                            })}
                        </ul>
                        <hr className="my-5"/>
                        <div className="flex mb-2">
                            <h3 className="ms-2  text-md font-bold my-auto">Category : </h3>
                            <Button variant="bordered" className="rounded-full w-7 h-8 text-sm ms-auto me-5" onClick={handleOpenCreateCategory}>+</Button>
                        </div>
                        <ul>
                            {dataCategory.length ? dataCategory.map((res,key) => {
                                return(
                                    <li className="relative group" key={key}>
                                        <Link href={route('home.view.category',res.id_category)} className="text-sm rounded-md group-hover:bg-primary/20 justify-start inline-flex w-full cursor-pointer my-[1px]">
                                            <span className={`w-3 h-3 my-auto ms-2 rounded-full me-3 ${categoryColor({variant:res.color})}`}></span>
                                            <p className="truncate w-full my-2 max-w-48">{res.name}</p>
                                            
                                        </Link>
                                        <div className="absolute h-full bg-gradient-to-l top-0 group-hover:block hidden from-background to-primary/5 end-0 rounded-r-md">
                                            <button className="bg-background2 p-[5px] rounded-md me-1 ms-0 mt-[6px]" onClick={() => setDataCategory(res)}><AiOutlineEdit/></button>
                                            <button className="bg-background2 p-[5px] rounded-md me-1" onClick={() => handleDelete(res.id_category)}><IoTrashOutline/></button>
                                        </div>
                                    </li>
                                )
                            }) : (
                                <p className="text-xs mt-5 text-start ms-2">Add category for your notes</p>
                            )}
                        </ul>
                    </div>
                </aside>
                <Button variant="ghost" className={`absolute -end-11 text-end hover:bg-background transition-transform top-12 font-bold z-30 bg-background ${!sidebarCollapsed ? 'rotate-180' : ''}`} onClick={handleSidebarCollapsed}>{`<`}</Button>
            </div>
        </div>
    )
}