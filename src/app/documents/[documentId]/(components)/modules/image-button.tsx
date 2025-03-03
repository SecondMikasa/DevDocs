import { useState } from "react"
import useEditorStore from "@/store/use-editor-store"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/hover-card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/dialog"
import { Input } from "@/components/input"

import {
    ImageIcon,
    SearchIcon,
    UploadIcon
} from "lucide-react"
import { Button } from "@/components/button"

export const ImageButton = () => {
    const { editor } = useEditorStore()

    const [open, setOpen] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [imageUrl, setImageUrl] = useState(editor?.getAttributes("link").href || "")

    const onChange = (src: string) => {
        editor?.chain().focus().setImage({ src }).run()
    }

    const onUpload = () => {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = "image/*"

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]

            if (file) {
                const imageUrl = URL.createObjectURL(file)
                onChange(imageUrl)
            }
        }
        input.click()
    }

    const handleImageUrlSubmit = () => {
        if (imageUrl) {
            onChange(imageUrl)
            setImageUrl("")
            setIsDialogOpen(false)
        }
    }

    return (
        <HoverCard openDelay={600}>
            <HoverCardTrigger>
                <DropdownMenu
                    open={open}
                    onOpenChange={(open) => {
                        setOpen(open)

                    }}>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
                            onClick={() => {
                                setOpen(false)
                            }}
                        >
                            <ImageIcon
                                className="size-4"
                            />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={onUpload}>
                            <UploadIcon className="size-4 mr-2" />
                                Upload
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                            <SearchIcon className="size-4 mr-2" />
                                Paste Image Url
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Insert Image Url
                            </DialogTitle>
                        </DialogHeader>
                        <Input
                            placeholder="Insert Image Url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleImageUrlSubmit()
                                }
                            }}
                        />
                    <DialogFooter>
                        <Button
                            onClick={handleImageUrlSubmit}
                        >
                            Insert
                        </Button>
                    </DialogFooter>
                    </DialogContent>
                </Dialog>

            </HoverCardTrigger>
            <HoverCardContent
                className="bg-neutral-200/80 text-black m-0 py-2 text-center"
            >
                Image Button
            </HoverCardContent>
        </HoverCard>
    )
}