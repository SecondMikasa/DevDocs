import { type Editor } from "@tiptap/react";
import {
    BoldIcon,
    ItalicIcon,
    LucideIcon,
    MessageSquarePlusIcon,
    PrinterIcon,
    Redo2Icon,
    SpellCheckIcon,
    UnderlineIcon,
    Undo2Icon,
    ListTodoIcon,
    RemoveFormattingIcon,
    Code,
    Quote,
    FileCode, 
    StrikethroughIcon
} from "lucide-react"

import printContent from "@/lib/print";
import { SectionProps } from "@/lib/types";

export const getSections = (editor: any): SectionProps[][] => {

    const current = editor?.view.dom.getAttribute("spellcheck")

    return (
        [
            [
                {
                    label: "Undo",
                    icon: Undo2Icon,
                    onClick: () => editor?.chain().focus().undo().run()
                },
                {
                    label: "Redo",
                    icon: Redo2Icon,
                    onClick: () => editor?.chain().focus().redo().run()
                },
                {
                    label: "Print",
                    icon: PrinterIcon,
                    onClick: () => printContent(editor)
                },
                {
                    label: "Spell Check",
                    icon: SpellCheckIcon,
                    onClick: () => {
                        editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false")
                    },
                    isActive: editor?.view.dom.getAttribute("spellcheck", current === "false" ? "true" : "false")
                }
            ],
            [
                {
                    label: "Bold",
                    icon: BoldIcon,
                    isActive: editor?.isActive("bold"),
                    onClick: () => editor?.chain().focus().toggleBold().run(),
                },
                {
                    label: "Italic",
                    icon: ItalicIcon,
                    isActive: editor?.isActive("italic"),
                    onClick: () => editor?.chain().focus().toggleItalic().run(),
                },
                {
                    label: "Underline",
                    icon: UnderlineIcon,
                    isActive: editor?.isActive("underline"),
                    onClick: () => editor?.chain().focus().toggleUnderline().run(),
                },
                {
                    label: "Strikethrough",
                    icon: StrikethroughIcon,
                    isActive: editor?.isActive('strike'),
                    onClick: () => editor?.chain().focus().toggleStrike().run()
                },
            ],
            [
                {
                    label: "Code",
                    icon: Code,
                    isActive: editor?.isActive('code'),
                    onClick: () => {
                        editor?.chain().focus().toggleCode().run()
                        // if (!editor?.isActive('code')) {
                        // } else {
                        //     editor?.chain().focus().unsetCode().run()
                        // }
                    }
                },
                {
                    label: "Blockquote",
                    icon: Quote,
                    isActive: editor?.isActive('blockquote'),
                    onClick: () => editor?.chain().focus().toggleBlockquote().run()
                },
                {
                    label: "Code Block",
                    icon: FileCode,
                    isActive: editor?.isActive('codeBlock'),
                    onClick: () => editor?.chain().focus().toggleCodeBlock().run()
                }
            ],
            [
                {
                    label: "Comment",
                    icon: MessageSquarePlusIcon,
                    isActive: false,
                    //TODO: Implement Comment feature
                    onClick: () => console.log("Implementation in progress"),
                },

                {
                    label: "List Todo",
                    icon: ListTodoIcon,
                    onClick: () => editor?.chain().focus().toggleTaskList().run(),
                    isActive: editor?.isActive("taskList"),
                },
                {
                    label: "Remove Formatting",
                    icon: RemoveFormattingIcon,
                    onClick: () => editor?.chain().focus().unsetAllMarks().run(),
                    isActive: editor?.isActive("taskList"),
                },
            ],
        ]
    )
}