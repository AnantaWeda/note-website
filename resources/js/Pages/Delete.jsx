import CardNotes from "@/Components/CardNotes";
import DialogUpdateNotes from "@/Components/DialogUpdateNotes";
import { PiTrashThin } from "react-icons/pi";

import { useToast } from "@/Components/ui/use-toast";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from '@inertiajs/react';
import { useState } from "react";
import { CategoryContext } from "@/context/CategoryContext";

export default function Delete({auth, data, csrf, dataCategory}){
    const [openUpdate, setOpenUpdate] = useState(null);

    const { toast } = useToast();

    const handleDeleteAction = (id_notes) => {
        router.delete(route('home.delete',id_notes),{
            onSuccess: () => {
                toast({
                    variant: "success",
                    title: "Success!",
                    description: "Your notes have been successfully deleted.",
                })
            }
        })
    };

    const colorVariant = (id_category) => dataCategory.find(res => res.id_category === id_category)?.color

    const handleRestoreAction = (id_notes) => {
        const formData = new FormData();

        formData.append("id_notes",id_notes);

        router.post(route('home.restore'),formData,{
            onSuccess: () => {
                toast({
                    variant: "success",
                    title: "Success!",
                    description: "Your notes have been successfully restore.",
                })
            }
        })
    };

    const itemPopover = (res) => [
        {
            name: 'Open Note',
            handle: () => setOpenUpdate(res),
            separator: false
        },
        {
            name: 'Delete Note',
            handle: () => handleDeleteAction(res.id_notes),
            separator: true
        },
        {
            name: 'Restore Note',
            handle: () => handleRestoreAction(res.id_notes),
            separator: false
        }
    ]

    return (
        <CategoryContext.Provider value={{dataCategory}}>
            <Authenticated auth={auth} dataCategory={dataCategory}>
                <Head title="Delete" />
                    <h1 className='font-bold mt-6 text-lg'>Delete Notes</h1>
                    <div className='md:flex md:flex-wrap grid grid-cols-2 gap-2 mt-6'>
                        {data.length ? data.map((res,key) => {
                            return(
                                <CardNotes 
                                    key={key}
                                    title={res.title} 
                                    value={res.note} 
                                    time={res.update_time} 
                                    variant={colorVariant(res.id_category)} 
                                    itemPopover={itemPopover(res)}
                                    onClick={() => setOpenUpdate(res) }
                                />
                            )
                        }) : (
                            <div className='w-full mt-12'>
                                <PiTrashThin className='text-[15rem] m-auto'/>
                                <h1 className='font-bold text-lg text-center mb-2'>Looks like there are no notes here.</h1>
                                <p className='text-center text-sm max-w-[40rem] m-auto'>Looks like the notebook's pages are yearning for a tale. Yet amidst the silence, imagination finds its stage to soar. Within the void, lies the potential of a story waiting to unfold.</p>
                            </div>
                        )}
                    
                    </div> 
                    <DialogUpdateNotes 
                        open={openUpdate} 
                        setOpen={setOpenUpdate}
                        disabled={true} 
                        csrf={csrf}
                    />
            </Authenticated>
        </CategoryContext.Provider>
    );
}