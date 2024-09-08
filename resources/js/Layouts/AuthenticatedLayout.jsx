import DialogCategory from "@/Components/DialogCategory";
import { Sidebar } from "@/Components/Sidebar";
import React, { useState } from "react";

export default function Authenticated({auth, children}) {
    const [sidebarCollapsed, setSidebarCollpased] = useState(true);
    const [open, setOpen] = useState(false);
    const [dataCategory,setDataCategory] = useState(null);
    const handleSetOpen = () => {
        setDataCategory(null)
        setOpen(prev => !prev)
    };

    const handleSetDataCategory = (data) => {
        setDataCategory(data)
        setOpen(true)
    }

    const handleSidebarCollapsed = () => {
        setSidebarCollpased(prev => !prev);
    }

    return (
        <div className='flex bg-background'>
            <Sidebar auth={auth} setDataCategory={handleSetDataCategory} sidebarCollapsed={sidebarCollapsed} handleSidebarCollapsed={handleSidebarCollapsed} handleOpenCreateCategory={handleSetOpen}/>
            <div className="w-full md:py-8 py-2 md:px-4 px-1">
                <div className='bg-background2 w-full shadow-bordered rounded-2xl p-5 md:px-10 px-2 min-h-[90vh]'>
                    {children}
                </div>
            </div>
            <DialogCategory open={open} setOpen={handleSetOpen} prevdata={dataCategory} update={dataCategory ? true : false}/>
        </div>
    );
}
