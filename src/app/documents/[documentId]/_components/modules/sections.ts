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
    Strikethrough,
    Quote,
    FileCode 
} from "lucide-react"

export const getSections = (editor: any): {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean
}[][] => {

    const current = editor?.view.dom.getAttribute("spellcheck")

    function printContent(editor: Editor) {
        const printFrame = document.createElement("iframe");
        printFrame.style.position = "absolute";
        printFrame.style.width = "0px";
        printFrame.style.height = "0px";
        printFrame.style.border = "none";
        printFrame.style.backgroundColor = "#000000"
        document.body.appendChild(printFrame);

        const printDocument = printFrame.contentDocument || printFrame.contentWindow?.document;
        if (!printDocument) return;

        printDocument.open();

        // FIXME: 'printDocument.write' is deprecated
        printDocument.write(`
            <html>
            <head>
                <title>Print</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    
                    /* Hide print headers & footers */
                    @page {
                        margin: 0; /* Removes default browser margins (including headers/footers) */
                    }
                    body { 
                        margin: 20px; /* Adds custom margin to avoid content touching the edge */
                    }
                </style>
            </head>
            <body>
                ${editor.getHTML()}
            </body>
            </html>
        `);
        printDocument.close();

        printFrame.contentWindow?.focus();
        printFrame.contentWindow?.print();

        // Cleanup after printing
        setTimeout(() => document.body.removeChild(printFrame), 1000);
    }

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
                    icon: Strikethrough,
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