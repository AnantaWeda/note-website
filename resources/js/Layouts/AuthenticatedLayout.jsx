import { Sidebar } from "@/Components/Sidebar";
import React, { useState } from "react";

export default function Authenticated({auth, children }) {
    const [sidebarCollapsed, setSidebarCollpased] = useState(true);

    const handleSidebarCollapsed = () => {
        setSidebarCollpased(prev => !prev);
    }

    return (
        <div className='flex bg-background'>
            <Sidebar auth={auth} sidebarCollapsed={sidebarCollapsed} handleSidebarCollapsed={handleSidebarCollapsed}/>
            <div className="w-full md:py-8 py-2 md:px-4 px-1">
                <div className='bg-background2 w-full shadow-bordered rounded-2xl p-5 md:px-10 px-2 min-h-[90vh]'>
                    {children}
                </div>
            </div>
        </div>
    );
}
