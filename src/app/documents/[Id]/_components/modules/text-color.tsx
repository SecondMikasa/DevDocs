import { useState } from "react"

import useEditorStore from "@/store/use-editor-store";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import { type ColorResult, SketchPicker } from "react-color"

export const TextColorButton = () => {
    const { editor } = useEditorStore()

    const [open, setOpen] = useState(false)

    const value = editor?.getAttributes("textStyle").color || "#000000"

    const onChange = (color: ColorResult) => {
        editor?.chain().focus().setColor(color.hex).run()
    }

    return (

        <HoverCard openDelay={600}>
            <HoverCardTrigger>
                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                            onClick={() => setOpen(false)}
                        >
                            <span className="text-xs">
                                A
                            </span>
                            <div
                                className="h-0.5 w-full"
                                style={{ backgroundColor: value }}
                            />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="p-0"
                    >
                        <SketchPicker
                            color={value}
                            onChange={onChange}
                        />
                    </DropdownMenuContent>
                </DropdownMenu>
            </HoverCardTrigger>
            <HoverCardContent
                className="bg-neutral-200/80 text-black m-0 py-2 text-center"
            >
                Text Color
            </HoverCardContent>
        </HoverCard>
    )
}