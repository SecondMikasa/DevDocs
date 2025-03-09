import React from "react";

import Editor from "./_components/editor";
import Toolbar from "./_components/toolbar";

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
        <div className="min-h-screen bg-[#FAFBFD]">
            <Toolbar />
            <Editor />
        </div>
    )
}

export default DocumentsIdPage