import { useState } from "react"

import { cn } from "@/lib/utils"
import { AlignmentProps, LineHeightProps } from "@/lib/types"

import useEditorStore from "@/store/use-editor-store"

import {
    AlignCenterIcon,
    AlignJustifyIcon,
    AlignLeftIcon,
    AlignRightIcon,
    AlignEndHorizontal,
    ListCollapseIcon
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

export const LineHeightButton = () => {
    const { editor } = useEditorStore()

    const [open, setOpen] = useState(false)

    const lineHeights: LineHeightProps[] = [
        {
            label: "Default",
            value: "normal",
            
        },
        {
            label: "Single",
            value: "1",
        },
        {
            label: "1.15",
            value: "1.15",
        },
        {
            label: "1.5",
            value: "1.5",
        },
        {
            label: "Double",
            value: "2",
        },
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
                            <ListCollapseIcon
                                className="size-4"
                            />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="p-1 flex flex-col gap-y-1"
                    >
                        {
                            lineHeights.map(({ label, value }) => (
                                <button
                                    key={label}
                                    onClick={() => {
                                        editor?.chain().focus().setLineHeight(value).run()
                                        setOpen(false)
                                    }}
                                    className={cn(
                                        "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                                        editor?.getAttributes("paragraph").lineHeight === value && "bg-neutral-200/80"
                                    )}
                                >
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
                Line Height
            </HoverCardContent>
        </HoverCard>
    )
}