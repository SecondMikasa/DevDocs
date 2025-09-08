import { DocumentRowProps } from "@/lib/types"
import { useState, useEffect, useRef } from "react"

import { format } from "date-fns"

import {
    TableCell,
    TableRow
} from "@/components/ui/table"

import {
    Building2Icon,
    CircleUserIcon,
} from "lucide-react"
import { SiGoogledocs } from "react-icons/si"

import { DocumentMenu } from "./document-menu"
import { InlineLoader } from "./ui/inline-loader"
import { useRouter } from "next/navigation"

export const DocumentRow = ({
    document
}: DocumentRowProps) => {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const resetStates = () => {
        setIsLoading(false)
        if (loadingTimeoutRef.current) {
            clearTimeout(loadingTimeoutRef.current)
            loadingTimeoutRef.current = null
        }
        if (resetTimeoutRef.current) {
            clearTimeout(resetTimeoutRef.current)
            resetTimeoutRef.current = null
        }
    }

    const onRowClick = (id: string) => {
        // Prevent multiple clicks during loading
        if (isLoading) return

        // Set loading state
        setIsLoading(true)

        // Navigate to document
        router.push(`/documents/${id}`)

        // Reset states after a reasonable timeout to prevent stuck loading states
        resetTimeoutRef.current = setTimeout(() => {
            resetStates()
        }, 2000) // Reset after 2 seconds max
    }

    const onNewTabClick = (id: string) => {
        window.open(`/documents/${id}`)
    }

    // Cleanup timeouts on unmount
    useEffect(() => {
        return () => {
            resetStates()
        }
    }, [])

    return (
        <TableRow
            className="cursor-pointer"
            onClick={() => onRowClick(document._id)}
        >
            {/* Mobile Layout (< 640px): Single column with stacked information */}
            <TableCell className="sm:hidden p-4 min-h-[64px] touch-manipulation">
                <div className="flex items-start gap-3 w-full">
                    {/* Document icon with loading state */}
                    <div className="flex-shrink-0 mt-0.5 relative">
                        <div className={`
                            transition-all duration-300 ease-out
                            motion-reduce:transition-none
                            ${isLoading ? 'opacity-0 scale-75 rotate-12' : 'opacity-100 scale-100 rotate-0'}
                        `}>
                            <SiGoogledocs
                                className={`
                                    size-6 fill-[#9ce8c4] 
                                    transition-all duration-200 ease-out
                                    motion-reduce:transition-none
                                    group-hover:fill-[#8dd9b5] group-hover:scale-110
                                    group-active:scale-95
                                    motion-reduce:group-hover:scale-100 motion-reduce:group-active:scale-100
                                `}
                            />
                        </div>
                        <div className={`
                            absolute inset-0 flex items-center justify-center
                            transition-all duration-300 ease-out
                            motion-reduce:transition-none
                            ${isLoading ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
                        `}>
                            <InlineLoader size="sm" />
                        </div>
                    </div>

                    {/* Main content area */}
                    <div className="flex-1 min-w-0 overflow-hidden">
                        <div className="flex items-start justify-between gap-3">
                            {/* Document information stack */}
                            <div className="flex-1 min-w-0 space-y-2">
                                {/* Document title - prominent typography */}
                                <h3 className={`
                                    font-semibold text-base leading-snug text-foreground line-clamp-2 break-words
                                    transition-all duration-200 ease-out
                                    motion-reduce:transition-none
                                    ${isLoading ? 'opacity-70' : 'opacity-100'}
                                    group-hover:text-foreground/90
                                `}>
                                    {document.title}
                                </h3>

                                {/* Secondary information stack */}
                                <div className="space-y-1">
                                    {/* Owner type */}
                                    <div className={`
                                        flex items-center gap-2 text-sm text-muted-foreground
                                        transition-all duration-200 ease-out
                                        motion-reduce:transition-none
                                        ${isLoading ? 'opacity-60' : 'opacity-100'}
                                    `}>
                                        {document.organizationId ? (
                                            <>
                                                <Building2Icon className={`
                                                    size-3.5 flex-shrink-0
                                                    transition-transform duration-200 ease-out
                                                    motion-reduce:transition-none
                                                    group-hover:scale-110
                                                    motion-reduce:group-hover:scale-100
                                                `} />
                                                <span className="truncate font-medium">Organization</span>
                                            </>
                                        ) : (
                                            <>
                                                <CircleUserIcon className={`
                                                    size-3.5 flex-shrink-0
                                                    transition-transform duration-200 ease-out
                                                    motion-reduce:transition-none
                                                    group-hover:scale-110
                                                    motion-reduce:group-hover:scale-100
                                                `} />
                                                <span className="truncate font-medium">Personal</span>
                                            </>
                                        )}
                                    </div>

                                    {/* Creation date - secondary information */}
                                    <div className={`
                                        text-sm text-muted-foreground/80 font-normal
                                        transition-all duration-200 ease-out
                                        motion-reduce:transition-none
                                        ${isLoading ? 'opacity-50' : 'opacity-100'}
                                    `}>
                                        Created {format(new Date(document._creationTime), "MMM dd, yyyy")}
                                    </div>
                                </div>
                            </div>

                            {/* Document menu - touch-optimized */}
                            <div
                                className="flex-shrink-0 -mr-1 mt-0.5"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <DocumentMenu
                                    documentId={document._id}
                                    title={document.title}
                                    onNewTab={onNewTabClick}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </TableCell>

            {/* Tablet and Desktop Layout (>= 640px): Multi-column layout */}
            {/* Icon column - visible on all non-mobile screens */}
            <TableCell className="hidden sm:table-cell w-[50px] py-3">
                <div className="relative">
                    <div className={`
                        transition-all duration-300 ease-out
                        motion-reduce:transition-none
                        ${isLoading ? 'opacity-0 scale-75 rotate-12' : 'opacity-100 scale-100 rotate-0'}
                    `}>
                        <SiGoogledocs
                            className={`
                                size-6 fill-[#9ce8c4]
                                transition-all duration-200 ease-out
                                motion-reduce:transition-none
                                group-hover:fill-[#8dd9b5] group-hover:scale-110
                                group-active:scale-95
                                motion-reduce:group-hover:scale-100 motion-reduce:group-active:scale-100
                            `}
                        />
                    </div>
                    <div className={`
                        absolute inset-0 flex items-center justify-center
                        transition-all duration-300 ease-out
                        motion-reduce:transition-none
                        ${isLoading ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
                    `}>
                        <InlineLoader size="sm" />
                    </div>
                </div>
            </TableCell>

            {/* Title column - visible on all non-mobile screens */}
            <TableCell className={`
                hidden sm:table-cell font-medium lg:w-[45%] py-3
                transition-all duration-200 ease-out
                motion-reduce:transition-none
                ${isLoading ? 'opacity-70' : 'opacity-100'}
                group-hover:text-foreground/90
            `}>
                {document.title}
            </TableCell>

            {/* Owner type column - hidden on mobile, visible on tablet and desktop */}
            <TableCell className={`
                hidden sm:flex items-center gap-2 text-muted-foreground py-3
                transition-all duration-200 ease-out
                motion-reduce:transition-none
                ${isLoading ? 'opacity-60' : 'opacity-100'}
            `}>
                {document.organizationId ? (
                    <>
                        <Building2Icon className={`
                            size-4
                            transition-transform duration-200 ease-out
                            motion-reduce:transition-none
                            group-hover:scale-110
                            motion-reduce:group-hover:scale-100
                        `} />
                        <span>Organization</span>
                    </>
                ) : (
                    <>
                        <CircleUserIcon className={`
                            size-4
                            transition-transform duration-200 ease-out
                            motion-reduce:transition-none
                            group-hover:scale-110
                            motion-reduce:group-hover:scale-100
                        `} />
                        <span>Personal</span>
                    </>
                )}
            </TableCell>

            {/* Creation date column - hidden on mobile and tablet, visible on desktop */}
            <TableCell className={`
                hidden lg:table-cell text-muted-foreground py-3
                transition-all duration-200 ease-out
                motion-reduce:transition-none
                ${isLoading ? 'opacity-50' : 'opacity-100'}
            `}>
                {format(new Date(document._creationTime), "MMM dd, yyyy")}
            </TableCell>

            {/* Menu column - visible on all non-mobile screens */}
            <TableCell className="hidden sm:table-cell py-3">
                <div
                    className={`
                        flex justify-end pr-2
                        transition-all duration-200 ease-out
                        motion-reduce:transition-none
                        ${isLoading ? 'opacity-60' : 'opacity-100'}
                        group-hover:opacity-100
                    `}
                    onClick={(e) => e.stopPropagation()}
                >
                    <DocumentMenu
                        documentId={document._id}
                        title={document.title}
                        onNewTab={onNewTabClick}
                    />
                </div>
            </TableCell>
        </TableRow>
    )
}