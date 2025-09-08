import { DocumentTableProps } from "@/lib/types"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Loader } from "./modules/loader"
import { DocumentRow } from "./document-row"
import { Button } from "./ui/button"

export const DocumentsTable = ({
    documents,
    loadMore,
    status
}: DocumentTableProps) => {
    return (
        <div
            className="max-w-screen-xl mx-auto px-2 xxs:px-4 sm:px-8 lg:px-16 py-6 flex flex-col gap-5"
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
                    <div className="overflow-x-auto touch-pan-x smooth-scroll mobile-optimized">
                        <Table className="touch-manipulation w-full min-w-full">
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-none">
                                    {/* Mobile: Single column header */}
                                    <TableHead className="sm:hidden">Documents</TableHead>

                                    {/* Tablet and Desktop: Multi-column headers */}
                                    <TableHead className="hidden sm:table-cell w-[50px]">&nbsp;</TableHead>
                                    <TableHead className="hidden sm:table-cell">Name</TableHead>
                                    <TableHead className="hidden sm:table-cell">Shared</TableHead>
                                    <TableHead className="hidden lg:table-cell">Created At</TableHead>
                                    <TableHead className="hidden sm:table-cell">&nbsp;</TableHead>
                                </TableRow>
                            </TableHeader>
                            {
                                documents.length === 0 ? (
                                    <TableBody>
                                        <TableRow className="hover:bg-transparent">
                                            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
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
                    </div>
                )
            }
            <div className="flex items-center justify-center">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => loadMore(5)}
                    disabled={status !== "CanLoadMore"}
                    className="min-h-[44px] touch-manipulation active:scale-95 transition-transform duration-75"
                >
                    {status === "CanLoadMore" ? "Load more" : "End of results"}
                </Button>
            </div>
        </div>
    )
}