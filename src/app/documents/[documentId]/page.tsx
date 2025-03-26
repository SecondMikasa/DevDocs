import React from "react";

import Editor from "./_components/editor";
import Toolbar from "./_components/toolbar";
import { Navbar } from "./_components/navbar";

import { Room } from "@/app/documents/[documentId]/room";

interface DocumentsIdPageProps {
    // From Next15 it has been started to be treated as a promise
    params: Promise<{
        documentId: string;
    }>
}

const DocumentsIdPage = ({
    params
}: DocumentsIdPageProps) => {

    // add "async" keyword at function start
    // const awaitedParams = await params
    // const documentId = awaitedParams.documentId
    // OR
    // const { documentId } = await params

    const { documentId } = React.use(params)

    return (
        <Room>
            <div className="min-h-screen bg-[#FAFBFD]">
                <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
                    <Navbar />
                    <Toolbar />
                </div>
                <div className="pt-[122px] print:pt-0">
                    <Editor />
                </div>
            </div>
        </Room>
    )
}

export default DocumentsIdPage