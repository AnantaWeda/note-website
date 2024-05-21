import CardNotes from '@/Components/CardNotes';
import DialogCreateNotes from '@/Components/DialogCreateNotes';
import DialogUpdateNotes from '@/Components/DialogUpdateNotes';
import { Button } from '@/Components/ui/button';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import { useToast } from '@/Components/ui/use-toast';
import { PiNoteThin } from "react-icons/pi";

export default function Welcome({auth,data,csrf}) {
    const [openCreate, setOpenCreate] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(null);

    const { toast } = useToast();

    const handleDeleteAction = (id_notes) => {
        router.delete(route('home.soft.delete',id_notes),{
            onSuccess: () => {
                toast({
                    variant: "success",
                    title: "Success!",
                    description: "Your notes have been successfully deleted.",
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
            name: 'Archive Note',
            handle: () => setOpenUpdate(res),
            separator: false
        }
    ]


    return (
        <Authenticated auth={auth}>
            <Head title="Welcome" />
                <div className='flex'>
                    <h1 className='font-bold mt-6 text-lg'>All Notes ( {data.length} )</h1>
                    <Button className="ms-auto my-auto" onClick={() => setOpenCreate(true)}>Create Note +</Button>
                </div>
                <div className='md:flex md:flex-wrap grid grid-cols-2 gap-2 mt-6 h-full'>
                    {data.length ? data.map((res,key) => {
                        return(
                            <CardNotes 
                                key={key}
                                title={res.title} 
                                value={res.note} 
                                time={res.update_time} 
                                variant={"green"} 
                                itemPopover={itemPopover(res)}
                                onClick={() => setOpenUpdate(res) }
                            />
                        )
                    }) : (
                        <div className='w-full mt-12'>
                            <PiNoteThin className='text-[15rem] m-auto'/>
                            <h1 className='font-bold text-lg text-center mb-2'>Looks like there are no notes here.</h1>
                            <p className='text-center text-sm max-w-[40rem] m-auto'>Looks like the notebook's pages are yearning for a tale. Yet amidst the silence, imagination finds its stage to soar. Within the void, lies the potential of a story waiting to unfold.</p>
                        </div>
                    )}
                </div> 
                <DialogCreateNotes 
                    open={openCreate} 
                    setOpen={setOpenCreate} 
                    csrf={csrf}
                />
                <DialogUpdateNotes 
                    open={openUpdate} 
                    setOpen={setOpenUpdate} 
                    csrf={csrf}
                />
                
        </Authenticated>
    );
}
