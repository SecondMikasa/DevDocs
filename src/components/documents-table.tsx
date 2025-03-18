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
import { Loader } from "./modules/loader"
import { DocumentRow } from "./document-row"

export const DocumentsTable = ({
    documents,
    loadMore,
    status
}: DocumentTableProps) => {
    return (
        <div
            className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5"
        >
            {
                documents === undefined ? (
                    <div
                        className="flex justify-center items-center h-24"
                    >
                        <Loader
                            label="Crunching data to get your dcuments"
                        />
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-none">
                                <TableHead> Name </TableHead>
                                <TableHead> &nbsp; </TableHead>
                                <TableHead className="hidden md:table-cell"> Shared </TableHead>
                                <TableHead className="hidden md:table-cell"> Created At </TableHead>
                            </TableRow>
                        </TableHeader>
                        {
                            documents.length === 0 ? (
                                <TableBody>
                                    <TableRow className="hover:bg-transparent">
                                        <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                            No documents found
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ) : (
                                <TableBody>
                                    {
                                        documents.map((doc) => (
                                            <DocumentRow
                                                key={doc._id}
                                                document={doc}
                                            />
                                        ))
                                    }
                                </TableBody>
                            )
                        }
                    </Table>
                )
            }
        </div>
    )
}