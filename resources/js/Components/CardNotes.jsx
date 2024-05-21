import { cva } from "class-variance-authority";
import { Button } from "./ui/button";
import { cleanHTML } from "@/lib/utils";
import { TbDotsVertical } from "react-icons/tb";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "./ui/menubar";

export default function CardNotes({title, value, time, variant, className, itemPopover = [], ...props}){
    const headerColor = cva(
        "px-3 py-4 flex",
        {
            variants:{
                variant:{
                    green: ["dark:bg-green-500 bg-green-400"],
                    purple: ["dark:bg-purple-500 bg-purple-400"]
                }
            }
        }
    );

    return(
        <div className="relative">
            <div className={`rounded-2xl min-h-60 h-full border border-border p-2 hover:shadow-bordered w-[200px] ${className}`} {...props}>
                <div className='overflow-hidden h-full border border-border text-xs rounded-2xl cursor-pointer shadow-inner'>
                    <div className={headerColor({variant})}>
                        <p className='font-bold truncate w-28'>{title}</p>
                        <p className='ms-auto'>{time}</p>
                    </div>
                    <div className='p-3'>
                        <p className='line-clamp-[6]'>
                            {cleanHTML(value)}
                        </p>
                    </div>
                </div>
            </div>
            {itemPopover.length ? <PopoverCard className="absolute bottom-4 end-4" itemPopover={itemPopover}/> : ''}
        </div>
    ); 
}

function PopoverCard({className,itemPopover}){
    return(
        <div className={className}>
            <Menubar className="bg-transparent border-none">
                <MenubarMenu>
                    <MenubarTrigger asChild>
                        <Button className="p-2 font-bold rounded-full w-8 h-8 cursor-pointer data-[state=open]:border-primary data-[state=open]:border-2"><TbDotsVertical className="text-3xl" /></Button>
                    </MenubarTrigger>
                    <MenubarContent>
                        {itemPopover.map((res,key) => {
                            return(
                                <div key={key}>
                                    <MenubarItem className="cursor-pointer" onClick={res.handle}>{res.name}</MenubarItem>
                                    {res.separator ? (<MenubarSeparator />) : ('')}                            
                                </div>
                            )
                        })}
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
    )
}


