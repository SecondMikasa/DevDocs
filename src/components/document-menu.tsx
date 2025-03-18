import { ExternalLinkIcon, MoreVertical, TrashIcon } from "lucide-react"

import { DocumentProps } from "@/lib/types"

import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from "./ui/dropdown-menu"
import { RemoveDialog } from "./modules/remove-dialog"

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
                <DropdownMenuItem
                    onClick={() => onNewTab(documentId)}
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