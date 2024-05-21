import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from '@inertiajs/react';
import { PiArchiveThin } from "react-icons/pi";

export default function Archive({auth}){
    return(
        <Authenticated auth={auth}>
            <Head title="Archive" />
            <h1 className="font-bold text-lg mt-6">Archive Notes</h1>
            <div className='w-full mt-12'>
                <PiArchiveThin className='text-[15rem] m-auto'/>
                <h1 className='font-bold text-lg text-center mb-2'>Looks like there are no notes here.</h1>
                <p className='text-center text-sm max-w-[40rem] m-auto'>Looks like the notebook's pages are yearning for a tale. Yet amidst the silence, imagination finds its stage to soar. Within the void, lies the potential of a story waiting to unfold.</p>
            </div>
        </Authenticated>
    )
}