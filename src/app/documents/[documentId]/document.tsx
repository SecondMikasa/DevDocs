"use client"

import Editor from "./_components/editor";
import Toolbar from "./_components/toolbar";
import Navbar from "./_components/navbar";

import { Room } from "@/app/documents/[documentId]/room";

import {
    Preloaded,
    usePreloadedQuery
} from "convex/react";

import { api } from "../../../../convex/_generated/api";

interface DocumentProps {
    preloadedDocument: Preloaded<typeof api.documents.getById>
}

const Document = ({
    preloadedDocument
}: DocumentProps) => {

    const document = usePreloadedQuery(preloadedDocument)

    return (
        <Room>
            <div className="fixed inset-0 bg-[#FAFBFD] z-50 isolate overflow-hidden">
                <div className="flex flex-col px-4 pt-2 gap-y-2 absolute top-0 left-0 right-0 z-[60] bg-[#FAFBFD] print:hidden border-b border-gray-200/50">
                    <Navbar
                        data={document}
                    />
                    <Toolbar />
                </div>
                <div className="absolute inset-0 pt-[130px] print:pt-0 overflow-y-auto">
                    <Editor
                        initialContent={document.initialContent}
                    />
                </div>
            </div>
        </Room>
    )
}

export default Document