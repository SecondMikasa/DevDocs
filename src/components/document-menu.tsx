import { ExternalLinkIcon, FilePenIcon, MoreVertical, TrashIcon } from "lucide-react"

import { DocumentProps } from "@/lib/types"

import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "./ui/dropdown-menu"
import { RemoveDialog } from "./modules/remove-dialog"
import { RenameDialog } from "./modules/rename-dialog"

export const DocumentMenu = ({
    documentId,
    title,
    onNewTab
}: DocumentProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    <MoreVertical
                        className="size-4"
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <RemoveDialog
                    documentId={documentId}
                >
                    <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <TrashIcon
                            className="size-4 mr-2"
                        />
                        Remove
                    </DropdownMenuItem>
                </RemoveDialog>
                <RenameDialog
                    initialContent={title}
                    documentId={documentId}
                >
                    <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <FilePenIcon
                            className="size-4 mr-2"
                        />
                        Rename
                    </DropdownMenuItem>
                </RenameDialog>
                <DropdownMenuItem
                    onClick={(e) => {
                        e.stopPropagation()
                        onNewTab(documentId)
                    }}
                >
                    <ExternalLinkIcon
                        className="size-4 mr-2"
                    />
                    Open in new tab
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}