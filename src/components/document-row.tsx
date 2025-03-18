import { DocumentRowProps } from "@/lib/types"

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
import { useRouter } from "next/navigation"

export const DocumentRow = ({
    document
}: DocumentRowProps) => {

    const router = useRouter()

    const onRowClick = (id: string) => {
        router.push(`/documents/${id}`)
    }

    const onNewTabClick = (id: string) => {
        window.open(`/documents/${id}`)
    }

    return (
        <TableRow
            className="cursor-pointer"
            onClick={() => onRowClick(document._id)}
        >
            <TableCell className="w-[50px]">
                <SiGoogledocs
                    className="size-6 fill-[#9ce8c4]"
                />
            </TableCell>
            <TableCell className="font-medium md:w-[45%]">
                {document.title}
            </TableCell>
            <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
                {
                    document.organizationId ? (
                        <>
                            <Building2Icon
                                className="size-4"
                            />
                            <span>
                                Organization
                            </span>
                        </>
                    ) : (
                        <>
                            <CircleUserIcon
                                className="size-4"
                            />
                            <span>
                                Personal
                            </span>
                        </>
                    )
                }
            </TableCell>
            <TableCell className="text-muted-foreground hidden md:table-cell">
                {format(new Date(document._creationTime), "MMM dd, yyyy")}
            </TableCell>
            <TableCell className="flex justify-end">
                <DocumentMenu
                    documentId={document._id}
                    title={document.title}
                    onNewTab={onNewTabClick}
                />
            </TableCell>
        </TableRow>
    )
}