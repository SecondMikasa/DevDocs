"use client"
import { useRef, useState } from "react"
import { useMutation } from "convex/react"

import {
    BsCloudCheck,
    BsCloudSlash
} from "react-icons/bs"

import { api } from "../../../../../convex/_generated/api"
import { Id } from "../../../../../convex/_generated/dataModel"

import { useDebounce } from "@/hooks/use-debounce"

import { toast } from "sonner"

import { ConvexError } from "convex/values"

import { useStatus } from "@liveblocks/react"

type DocumentParams = {
    title: string
    id: Id<"documents">;
}

export const DocumentInput = ({
    title,
    id
}: DocumentParams) => {

    const status = useStatus()

    const mutate = useMutation(api.documents.updateById)

    const [value, setValue] = useState(title)

    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)

    const debouncedUpdate = useDebounce((newValue: string) => {
        if (newValue === title) return

        setIsLoading(true)

        mutate({
            id: id,
            title: newValue
        })
            .then(() => {
                // setIsEditing(false)
                toast.success("Document renamed successfully")
            })
            .catch((err) => {
                const errorMsg = err instanceof ConvexError ?
                    err.data :
                    "Unexpected error occured"

                toast.error(errorMsg)
            })
            .finally(() => setIsLoading(false))
    })

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const newValue = e.target.value

        setValue(newValue)
        debouncedUpdate(newValue)
    }

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setIsLoading(true)
        mutate({
            id: id,
            title: value
        })
            .then(() => {
                setIsEditing(false)
                toast.success("Document renamed successfully")
            })
            .catch((err) => {
                const errorMsg = err instanceof ConvexError ?
                    err.data :
                    "Unexpected error occured"

                toast.error(errorMsg)
            })
            .finally(() => setIsLoading(false))
    }

    const showLoader = isLoading || status === "connecting" || status === "reconnecting"
    const showError = status === "disconnected"

    return (
        <div className="flex items-center gap-2">
            {isEditing ? (
                <form
                    className="relative w-fit max-w-[50ch]"
                    onSubmit={handleOnSubmit}
                >
                    <span className="invisible whitespace-pre px-1.5 text-lg">
                        {
                            value || ""
                        }
                    </span>
                    <input
                        ref={inputRef}
                        value={value}
                        onBlur={() => setIsEditing(false)}
                        onChange={handleOnChange}
                        className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate"
                    />
                </form>
            ) : (
                <span
                    className="text-lg px-1.5 cursor-pointer truncate"
                    onClick={() => {
                        setIsEditing(true)
                        setTimeout(() => {
                            inputRef.current?.focus()
                        }, 0)
                    }}
                >
                    {title}
                </span>
            )}
            {
                showError && (
                    <BsCloudSlash
                        className="size-4"
                    />
                )
            }
            {
                !showError && !showLoader && (
                    <BsCloudCheck
                        className="size-4"
                    />
                )
            }
            {
                showLoader && (
                    <div className="size-4 border-4 border-[#aae9cb] border-b-transparent rounded-full inline-block box-border animate-spin" />
                )
            }
        </div>
    )
}