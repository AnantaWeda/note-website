import { FaPlusCircle,FaFileArchive } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ModeToggle } from "./ModeToggle";
import { cva } from "class-variance-authority";
import ProfileSidebar from "./ProfileSidebar";
import { Link,usePage } from '@inertiajs/react';
import { Button } from "./ui/button";


export function Sidebar({auth ,sidebarCollapsed, handleSidebarCollapsed}){
    
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

    const tagActive = cva(
        "w-3 h-3 my-auto rounded-full me-3",
        {
            variants:{
                variant:{
                    red: "bg-red-500",
                    green: "bg-green-500",
                    purple: "bg-purple-500",
                }
            }
        }
    )

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
        }
    ]

    const listTag = [
        {
            name: "Important",
            color: "red"
        },
        {
            name: "School",
            color: "green"
        },
        {
            name: "Working",
            color: "purple"
        }
    ]

    const { url } = usePage()

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
                        <ul>
                            {listTag.map((res,key) => {
                                return(
                                    <li key={key}>
                                        <div className="text-sm rounded-md hover:bg-primary/20 p-2 justify-start inline-flex w-full cursor-pointer my-[1px]">
                                            <span className={tagActive({variant:res.color})}></span>{res.name}
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </aside>
                <Button variant="ghost" className={`absolute -end-11 text-end hover:bg-background transition-transform top-12 font-bold z-30 bg-background ${!sidebarCollapsed ? 'rotate-180' : ''}`} onClick={handleSidebarCollapsed}>{`<`}</Button>
            </div>
        </div>
    )
}