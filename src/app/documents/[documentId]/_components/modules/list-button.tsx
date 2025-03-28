import { useState } from "react"

import { cn } from "@/lib/utils"
import { ListProps } from "@/lib/types"

import useEditorStore from "@/store/use-editor-store"

import {
    ListIcon,
    ListOrderedIcon
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

export const ListButton = () => {
    const { editor } = useEditorStore()

    const [open, setOpen] = useState(false)

    const lists: ListProps[] = [
        {
            label: "Bullet List",
            icon: ListIcon,
            isActive: () => editor ? editor.isActive("bulletList") : false,
            onClick: () => editor?.chain().focus().toggleBulletList().run()
        },
        {
            label: "Ordered List",
            icon: ListOrderedIcon,
            isActive: () => editor ? editor.isActive("orderedList") : false,
            onClick: () => editor?.chain().focus().toggleOrderedList().run()
        }
    ]


    return (
        <HoverCard openDelay={600}>
            <HoverCardTrigger>
                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                            onClick={() => setOpen(false)}
                        >
                            <ListIcon 
                                className="size-4" 
                            />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="p-1 flex flex-col gap-y-1"
                    >
                        {
                            lists.map(({ label, icon: Icon, onClick, isActive }) => (
                                <button
                                    key={label}
                                    onClick={onClick}
                                    className={cn(
                                        "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                                        isActive() && "bg-neutral-200/80"
                                    )}
                                >
                                    <Icon className="size-4" />
                                    <span className="text-sm">
                                        {label}
                                    </span>
                                </button>
                            ))
                        }
                    </DropdownMenuContent>
                </DropdownMenu>
            </HoverCardTrigger>
            <HoverCardContent
                className="bg-neutral-200/80 text-black m-0 py-2 text-center"
            >
                List Items
            </HoverCardContent>
        </HoverCard>
    )
}