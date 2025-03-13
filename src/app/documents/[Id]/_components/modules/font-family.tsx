import { useState } from "react"

import useEditorStore from "@/store/use-editor-store";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/dropdown-menu"

import { cn } from "@/lib/utils";

import { ChevronDownIcon } from "lucide-react"
import { FontProps } from "@/lib/types";

export const FontFamilyButton = () => {
    const { editor } = useEditorStore()

    const [open, setOpen] = useState(false)

    const fonts: FontProps[] = [
        { label: "Arial", value: "Arial" },
        { label: "Times New Roaman", value: "Times New Roman" },
        { label: "Courier New", value: "Courier New" },
        { label: "Georgia", value: "Georgia" },
        { label: "Verdana", value: "Verdana" }
    ]

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                >
                    <span className="truncate">
                        {editor?.getAttributes("textStyle").fontFamily || "Arial"}
                    </span>
                    <ChevronDownIcon
                        className="ml-2 size-4 shrink-0"
                    />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="p-1 flex flex-col gap-y-1"
            >
                {
                    fonts.map(({ label, value }) => (
                        <button
                            key={value}
                            onClick={() => {
                                editor?.chain().focus().setFontFamily(value).run()
                                setOpen(false)
                            }}
                            className={cn(
                                "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                                editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80"
                            )}
                            // Too dynamic for tailwind classes to implement font, instead using this
                            style={{ fontFamily: value }}
                        >
                            <span className="text-sm">
                                {label}
                            </span>
                        </button>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}