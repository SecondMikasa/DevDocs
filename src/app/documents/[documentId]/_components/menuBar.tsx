"use client"
import useEditorStore from "@/store/use-editor-store";
import printContent from "@/lib/print";

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/menubar"

import {
    Redo2Icon,
    BoldIcon,
    ItalicIcon,
    UnderlineIcon,
    StrikethroughIcon,
    RemoveFormattingIcon,
    TextIcon,
    Undo2Icon
} from "lucide-react";
import {
    BsFileEarmarkArrowDown,
    BsFileEarmarkPlus,
    BsFiletypeJson,
    BsFiletypeHtml,
    BsFileEarmarkPdf,
    BsFileEarmarkText
} from "react-icons/bs";
import {
    LuFilePen,
    LuTrash,
    LuPrinter
} from "react-icons/lu";

export const MenuBar = () => {

    const { editor } = useEditorStore()

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
                                <MenubarItem>
                                    <BsFiletypeJson
                                        className="size-4 mr-2"
                                    />
                                    JSON
                                </MenubarItem>
                                <MenubarItem>
                                    <BsFiletypeHtml
                                        className="size-4 mr-2"
                                    />
                                    HTML
                                </MenubarItem>
                                <MenubarItem>
                                    <BsFileEarmarkPdf
                                        className="size-4 mr-2"
                                    />
                                    PDF
                                </MenubarItem>
                                <MenubarItem>
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
                        <MenubarItem>
                            <Undo2Icon
                                className="size-4 mr-2"
                            />
                            Undo
                        </MenubarItem>
                        <MenubarItem>
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
                                <MenubarItem>
                                    1 x 1
                                </MenubarItem>
                                <MenubarItem>
                                    2 x 2
                                </MenubarItem>
                                <MenubarItem>
                                    3 x 3
                                </MenubarItem>
                                <MenubarItem>
                                    4 x 4
                                </MenubarItem>
                                <MenubarItem>
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
                                <MenubarItem>
                                    <BoldIcon
                                        className="size-4 mr-2"
                                    />
                                        Bold
                                </MenubarItem>
                                <MenubarItem>
                                    <ItalicIcon
                                        className="size-4 mr-2"
                                    />
                                        Italic
                                </MenubarItem>
                                <MenubarItem>
                                    <UnderlineIcon
                                        className="size-4 mr-2"
                                    />
                                        Underline
                                </MenubarItem>
                                <MenubarItem>
                                    <StrikethroughIcon
                                        className="size-4 mr-2"
                                    />
                                        Strikethrough
                                </MenubarItem>
                            </MenubarSubContent>
                        </MenubarSub>
                        <MenubarItem>
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
