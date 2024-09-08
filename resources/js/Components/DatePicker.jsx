import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import { Calendar } from "@/Components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/Components/ui/popover"
import moment from "moment"

export function DatePicker({dateProps, onChangeProps}) {
    const [date, setDate] = React.useState()

    const hadleSetDate = (val) => {
        setDate(val);
        onChangeProps(moment(val).format('YYYY-MM-DD'));
    }

    React.useEffect(() => {
        setDate(dateProps);
    },[dateProps]);

    return (
        <Popover>
        <PopoverTrigger asChild>
            <Button
            variant={"outline"}
            className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
            )}
            >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 !z-[1000] relative">
            <Calendar
            mode="single"
            selected={date}
            onSelect={hadleSetDate}
            initialFocus
            />
        </PopoverContent>
        </Popover>
    )
}
