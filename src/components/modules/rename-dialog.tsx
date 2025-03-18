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
} from "@/components/ui/dialog"

import { RenameDialogProps } from "@/lib/types"

import { api } from "../../../convex/_generated/api"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

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