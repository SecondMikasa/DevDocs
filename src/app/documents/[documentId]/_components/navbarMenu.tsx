"use client"
import useEditorStore from "@/store/use-editor-store"
import printContent from "@/lib/print"

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"

import {
    Redo2Icon,
    BoldIcon,
    ItalicIcon,
    UnderlineIcon,
    StrikethroughIcon,
    RemoveFormattingIcon,
    TextIcon,
    Undo2Icon
} from "lucide-react"
import {
    BsFileEarmarkArrowDown,
    BsFileEarmarkPlus,
    BsFiletypeJson,
    BsFiletypeHtml,
    BsFileEarmarkPdf,
    BsFileEarmarkText
} from "react-icons/bs"
import {
    LuFilePen,
    LuTrash,
    LuPrinter
} from "react-icons/lu"

import { NavigationProps } from "@/lib/types"

export const NavbarMenu = ({
    data
}: NavigationProps) => {

    const { editor } = useEditorStore()

    const insertTable = (rows: number, cols: number) => {
        editor?.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
    }

    const onDownload = (blob: Blob, filename: string) => {
        const url = URL.createObjectURL(blob)

        const a = document.createElement("a")
        a.href = url
        a.download = filename
        a.click()
    }

    const onSaveJSON = () => {
        if(!editor) return 

        const content = editor.getJSON()
        const blob = new Blob([JSON.stringify(content)], {
            type: "application/json"
        })
        onDownload(blob, `${data.title}.json`)
    }

    const onSaveHTML = () => {
        if(!editor) return 

        const content = editor.getHTML()
        const blob = new Blob([content], {
            type: "text/html"
        })
        onDownload(blob, `${data.title}.html`)
    }

    const onSaveText = () => {
        if(!editor) return 

        const content = editor.getText()
        const blob = new Blob([content], {
            type: "text/html"
        })
        // TODO: Use Document Name, fetch from Database
        onDownload(blob, `${data.title}.txt`)
    }    

    return (
        <div className="flex">
            <Menubar
                className="border-none bg-transparent shadow-none h-auto p-0"
            >
                <MenubarMenu>
                    <MenubarTrigger
                        className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto"
                    >
                        File
                    </MenubarTrigger>
                    {/* Explicitly define print:hidden as this menu will remain open while printing */}
                    <MenubarContent className="print:hidden">
                        <MenubarSub>
                            <MenubarSubTrigger>
                                <BsFileEarmarkArrowDown
                                    className="size-4 mr-2"
                                />
                                Save
                            </MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarItem onClick={onSaveJSON}>
                                    <BsFiletypeJson
                                        className="size-4 mr-2"
                                    />
                                    JSON
                                </MenubarItem>
                                <MenubarItem onClick={onSaveHTML}>
                                    <BsFiletypeHtml
                                        className="size-4 mr-2"
                                    />
                                    HTML
                                </MenubarItem>
                                <MenubarItem onClick={() => printContent(editor!)}>
                                    <BsFileEarmarkPdf
                                        className="size-4 mr-2"
                                    />
                                    PDF
                                </MenubarItem>
                                <MenubarItem onClick={onSaveText}>
                                    <BsFileEarmarkText
                                        className="size-4 mr-2"
                                    />
                                    Text
                                </MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub>
                        <MenubarItem>
                            <BsFileEarmarkPlus
                                className="size-4 mr-2"
                            />
                            New Document
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>
                            <LuFilePen
                                className="size-4 mr-2"
                            />
                            Rename
                        </MenubarItem>
                        <MenubarItem>
                            <LuTrash
                                className="size-4 mr-2"
                            />
                            Remove
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem onClick={() => printContent(editor!)}>
                            <LuPrinter
                                className="size-4 mr-2"
                            />
                            Print
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger
                        className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto"
                    >
                        Edit
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem
                            onClick={() => editor?.chain().focus().undo().run()}
                        >
                            <Undo2Icon
                                className="size-4 mr-2"
                            />
                            Undo
                        </MenubarItem>
                        <MenubarItem
                            onClick={() => editor?.chain().focus().redo().run()}
                        >
                            <Redo2Icon
                                className="size-4 mr-2"
                            />
                            Redo
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger
                        className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto"
                    >
                        Insert
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarSub>
                            <MenubarSubTrigger>
                                Table
                            </MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarItem
                                    onClick={() => insertTable(1, 1)}
                                >
                                    1 x 1
                                </MenubarItem>
                                <MenubarItem
                                    onClick={() => insertTable(2, 2)}
                                >
                                    2 x 2
                                </MenubarItem>
                                <MenubarItem
                                    onClick={() => insertTable(3, 3)}
                                >
                                    3 x 3
                                </MenubarItem>
                                <MenubarItem
                                    onClick={() => insertTable(4, 4)}
                                >
                                    4 x 4
                                </MenubarItem>
                                <MenubarItem
                                    onClick={() => insertTable(5, 5)}
                                >
                                    5 x 5
                                </MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger
                        className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto"
                    >
                        Format
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarSub>
                            <MenubarSubTrigger>
                                <TextIcon
                                    className="size-4 mr-2"
                                />
                                Text
                            </MenubarSubTrigger>
                            <MenubarSubContent>
                                <MenubarItem
                                    onClick={() => editor?.chain().focus().toggleBold().run()}
                                >
                                    <BoldIcon
                                        className="size-4 mr-2"
                                    />
                                    Bold
                                </MenubarItem>
                                <MenubarItem
                                    onClick={() => editor?.chain().focus().toggleItalic().run()}
                                >
                                    <ItalicIcon
                                        className="size-4 mr-2"
                                    />
                                    Italic
                                </MenubarItem>
                                <MenubarItem
                                    onClick={() => editor?.chain().focus().toggleUnderline().run()}
                                >
                                    <UnderlineIcon
                                        className="size-4 mr-2"
                                    />
                                    Underline
                                </MenubarItem>
                                <MenubarItem
                                    onClick={() => editor?.chain().focus().toggleStrike().run()}
                                >
                                    <StrikethroughIcon
                                        className="size-4 mr-2"
                                    />
                                    Strikethrough
                                </MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub>
                        <MenubarItem
                            onClick={() => editor?.chain().focus().unsetAllMarks().run()}
                        >
                            <RemoveFormattingIcon
                                className="size-4 mr-2"
                            />
                            Clear Formatting
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
    )
}
