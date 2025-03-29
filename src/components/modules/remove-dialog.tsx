"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "convex/react"

import { toast } from "sonner"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { RemoveDialogProps } from "@/lib/types"

import { api } from "../../../convex/_generated/api"

import { ConvexError } from "convex/values";

export const RemoveDialog = ({
    documentId,
    children
}: RemoveDialogProps) => {

    const router = useRouter()

    const remove = useMutation(api.documents.removeById)

    const [isRemoving, setIsRemoving] = useState(false)

    // FIXME: Upon deleting a document,the code is catching the error first and pushing afterwards
    const handleOnClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsRemoving(true)
        remove({ id: documentId })
            .then(() => {
                toast.success("Document removed successfully")
                // NOTE: Without setTimeout, the router is not even triggered for pushing
                setTimeout(() => {
                router.push('/')
            }, 100)
            })
            .catch((err) => {
                const errorMsg = err instanceof ConvexError ?
                    err.data :
                    "Unexpected error occured"
                
                toast.error(errorMsg)
                // if (err instanceof ConvexError) {
                //     console.log(err.data)
                // }
            })
            .finally(() => setIsRemoving(false))
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent
                onClick={(e) => e.stopPropagation()}
            >
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your selected document from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={(e) => e.stopPropagation()}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isRemoving}
                        onClick={handleOnClick}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}