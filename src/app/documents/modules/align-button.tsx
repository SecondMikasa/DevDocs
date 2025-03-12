import { useState } from "react"

import { cn } from "@/lib/utils"
import { AlignmentProps } from "@/lib/types"

import useEditorStore from "@/store/use-editor-store"

import {
    AlignCenterIcon,
    AlignJustifyIcon,
    AlignLeftIcon,
    AlignRightIcon,
    AlignEndHorizontal
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/dropdown-menu"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/hover-card"

export const AlignButton = () => {
    const { editor } = useEditorStore()

    const [open, setOpen] = useState(false)

    const alignments: AlignmentProps[] = [
        {
            label: "Align Left",
            value: "left",
            icon: AlignLeftIcon
        },
        {
            label: "Align Right",
            value: "right",
            icon: AlignRightIcon
        },
        {
            label: "Align Center",
            value: "center",
            icon: AlignCenterIcon
        },
        {
            label: "Align Justify",
            value: "justify",
            icon: AlignJustifyIcon
        },
    ]

    const getCurrentAlignmentIcon = () => {
        if (!editor) return AlignEndHorizontal;

        if (editor.isActive({ textAlign: 'left' })) return AlignLeftIcon
        else if (editor.isActive({ textAlign: 'right' })) return AlignRightIcon
        else if (editor.isActive({ textAlign: 'center' })) return AlignCenterIcon
        else if (editor.isActive({ textAlign: 'justify' })) return AlignJustifyIcon

        return AlignEndHorizontal
    }

    const CurrentAlignmentIcon = getCurrentAlignmentIcon();

    return (
        <HoverCard openDelay={600}>
            <HoverCardTrigger>
                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                            onClick={() => setOpen(false)}
                        >
                            <CurrentAlignmentIcon
                                className="size-4"
                            />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="p-1 flex flex-col gap-y-1"
                    >
                        {
                            alignments.map(({ label, value, icon: Icon }) => (
                                <button
                                    key={label}
                                    onClick={() => {
                                        editor?.chain().focus().setTextAlign(value).run()
                                        setOpen(false)
                                    }}
                                    className={cn(
                                        "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                                        editor?.isActive({ TextAlign: value }) && "bg-neutral-200/80"
                                    )}
                                >
                                    <Icon
                                        className="size-4"
                                    />
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
                Align Text
            </HoverCardContent>
        </HoverCard>
    )
}