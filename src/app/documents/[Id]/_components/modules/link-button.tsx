import { useState } from "react"
import useEditorStore from "@/store/use-editor-store"

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
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { Link2Icon } from "lucide-react"

export const LinkButton = () => {
    const { editor } = useEditorStore()

    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(editor?.getAttributes("link").href || "")

    const onChange = (href: string) => {
        editor?.chain().focus().extendMarkRange("link").setLink({ href }).run()

        setValue("")
    }

    return (

        <HoverCard openDelay={600}>
            <HoverCardTrigger>
                <DropdownMenu
                    open={open}
                    onOpenChange={(open) => {
                        setOpen(open)
                        if (open) {
                            setValue(editor?.getAttributes("link").href || "")
                        }
                    }}>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                            onClick={() => {
                                setValue(editor?.getAttributes("link").href)
                                setOpen(false)
                            }}
                        >
                            <Link2Icon
                                className="size-4"
                            />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="p-2.5 flex items-center gap-x-2"
                    >
                        <Input
                            placeholder="https://example.com"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <Button
                            onClick={() => {
                                onChange(value)
                                setOpen(false)
                            }}
                        >
                            Apply
                        </Button>
                    </DropdownMenuContent>
                </DropdownMenu>
            </HoverCardTrigger>
            <HoverCardContent
                className="bg-neutral-200/80 text-black m-0 py-2 text-center"
            >
                Link Button
            </HoverCardContent>
        </HoverCard>
    )
}