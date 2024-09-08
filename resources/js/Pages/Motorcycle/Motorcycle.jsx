import Authenticated from "@/Layouts/AuthenticatedLayout";
import { CategoryContext } from "@/context/CategoryContext";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import Create from "./Partials/Create";
import { Button } from "@/Components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/Components/ui/table"
  
import { CiEdit,CiTrash } from "react-icons/ci";
import Update from "./Partials/Update";
import { useToast } from "@/Components/ui/use-toast";
import { Pagination, PaginationItem } from "@mui/material";

export default function Motorcycle({auth,dataMotorcycle,dataCategory}){
    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);

    console.log(dataMotorcycle);

    const {toast} = useToast();

    const handleDeleteData = id => {
        const formData = new FormData();
        formData.append("id_motorcycle", id);

        router.post(route("motorcycle.delete"),formData,{
            onSuccess: () => {
                toast({
                    variant: "success",
                    title: "Success!",
                    description: "Your motorcycle have been successfully deleted.",
                })
            }
        });
    }
    
    return (
        <CategoryContext.Provider value={{dataCategory}}>
            <Authenticated auth={auth} dataCategory={dataCategory}>
                <Head title="Motorcycle" />
                <div className='flex'>
                    <h1 className='font-bold mt-6 text-lg'>All Motorcycle</h1>
                    <Button className="ms-auto my-auto" onClick={() => setOpenCreateModal(true)}>Add Motorcycle +</Button>
                </div>
                <div className="pt-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">No</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Merk</TableHead>
                                <TableHead className="text-right">CC</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dataMotorcycle.data.length ? dataMotorcycle.data.map(({id_motorcycle,name,type_motorcycle,merk_motorcycle,CC},key) => (
                                <TableRow key={key}>
                                    <TableCell className="font-medium">{(key+1)+(10*(dataMotorcycle.current_page-1))}</TableCell>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>{type_motorcycle}</TableCell>
                                    <TableCell>{merk_motorcycle}</TableCell>
                                    <TableCell className="text-right">{CC}</TableCell>
                                    <TableCell className="text-right flex gap-2 justify-end">
                                        <button className="w-8 h-8 bg-blue-500 rounded-full" onClick={() => setOpenUpdateModal(id_motorcycle)}><CiEdit className="text-xl m-auto text-white dark:text-dark"/></button>
                                        <button className="w-8 h-8 bg-red-500 rounded-full" onClick={() => handleDeleteData(id_motorcycle)}><CiTrash className="text-xl m-auto text-white dark:text-dark"/></button>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan="6" className="text-center">Data not exists</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <Pagination 
                        className='my-3'
                        defaultPage={dataMotorcycle.current_page}
                        count={dataMotorcycle.last_page}
                        renderItem={(item) => (
                            <PaginationItem
                                className="text-dark dark:text-white"
                                component={Link}
                                href={`?page=${item.page}`}
                                {...item}
                            />
                        )}
                    />
                </div>
            </Authenticated>
            <Create open={openCreateModal} setOpen={() => setOpenCreateModal(false)}/>
            <Update open={openUpdateModal ? true : false} setOpen={() => setOpenUpdateModal(false)} dataProps={dataMotorcycle.data?.find(res => res.id_motorcycle == openUpdateModal)}/>
        </CategoryContext.Provider>
    )
}