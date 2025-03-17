import { DocumentTableProps } from "@/lib/types"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"  

export const DocumentsTable = ({
    documents,
    loadMore,
    status
}: DocumentTableProps) => {
    return (
        <div
            className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5"
        >
            Documents Page
        </div>
    )
}