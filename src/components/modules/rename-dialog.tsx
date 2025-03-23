"use client"

import { useState } from "react"
import { useMutation } from "convex/react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

import { toast } from "sonner"

import { RenameDialogProps } from "@/lib/types"

import { api } from "../../../convex/_generated/api"

import { ConvexError } from "convex/values";

export const RenameDialog = ({
    documentId,
    initialContent,
    children
}: RenameDialogProps) => {

    const update = useMutation(api.documents.updateById)

    const [title, setTitle] = useState(initialContent)
    const [isUpdating, setIsUpdating] = useState(false)
    const [open, setOpen] = useState(false)

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsUpdating(true)

        update({
            id: documentId,
            title: title.trim() || "Untitled"
        })
            .then(() => toast.success("Document renamed successfully"))
            .catch((err) => {
                const errorMsg = err instanceof ConvexError ?
                    err.data :
                    "Unexpected error occured"

                toast.error(errorMsg)
            })
            .finally(() => {
                setIsUpdating(false)
                setOpen(false)
            })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent
                onClick={(e) => e.stopPropagation()}
            >
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            Rename Document
                        </DialogTitle>
                        <DialogDescription>
                            Enter a new name for the document
                        </DialogDescription>
                    </DialogHeader>
                    <div className="my-4">
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="ghost"
                            disabled={isUpdating}
                            onClick={(e) => {
                                e.stopPropagation()
                                setOpen(false)
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isUpdating}
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}