"use client"
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";

import { useParams } from "next/navigation";

import { BsCloudCheck } from "react-icons/bs";

import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { toast } from "sonner";
import { ConvexError } from "convex/values";

type DocumentParams = {
    documentId: Id<"documents">;
}

export const DocumentInput = () => {

    const { documentId } = useParams<DocumentParams>()

    const update = useMutation(api.documents.updateById)
    const document = useQuery(api.documents.getById, {
        id: documentId
    })

    const [title, setTitle] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (document?.title) {
            setTitle(document.title)
            setIsLoading(false)
        }
    }, [document])

    const handleBlur = () => {
        if (title) {
            update({
                id: documentId,
                title: title
            })
                .then(() => toast.success("Document renamed successfully"))
                .catch((err) => {
                    const errorMsg = err instanceof ConvexError ?
                        err.data :
                        "Unexpected error occured"

                    toast.error(errorMsg)
                })
                .finally(() => setIsEditing(false))
        }
    }

    const handleEnter = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault()
            handleBlur()
        }
    }

    return (
        <div className="flex items-center gap-2">
            {isEditing ? (
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleEnter}
                    autoFocus
                    className="text-lg px-1.5 border-b border-gray-400 outline-none"
                />
            ) : isLoading ? (
                <div className="w-4 h-4 border-4 border-[#aae9cb] border-b-transparent rounded-full inline-block box-border animate-spin" />
            ) : (
                <span
                    className="text-lg px-1.5 cursor-pointer truncate"
                    onClick={() => setIsEditing(true)}
                >
                    {title}
                </span>
            )}
            <BsCloudCheck />
        </div>
    )
}