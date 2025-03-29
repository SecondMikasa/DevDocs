import React from "react"

import Document from "./document"

import { Id } from "../../../../convex/_generated/dataModel"

import { auth } from "@clerk/nextjs/server"

import { preloadQuery } from "convex/nextjs"

import { api } from "../../../../convex/_generated/api"

interface DocumentsIdPageProps {
    // From Next15 it has been started to be treated as a promise
    params: Promise<{
        documentId: Id<"documents">;
    }>
}

const DocumentsIdPage = async ({
    params
}: DocumentsIdPageProps) => {

    // add "async" keyword at function start
    // const awaitedParams = await params
    // const documentId = awaitedParams.documentId
    // OR
    // const { documentId } = React.use(params)
    
    const { documentId } = await params

    const { getToken } = await auth()
    const token = await getToken({ template: "convex" }) ?? "undefined"

    if (!token) {
        throw new Error("Unauthorized Access")
    }

    const preloadedDocument = await preloadQuery(
        api.documents.getById,
        { id: documentId },
        { token }
    )

    if (!preloadedDocument) {
        throw new Error("Some error creeped in while loading your document")
    }

    return (
        <Document
            preloadedDocument={preloadedDocument}
        />
    )
}

export default DocumentsIdPage