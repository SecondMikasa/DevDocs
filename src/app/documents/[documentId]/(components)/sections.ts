import useEditorStore from "@/store/use-editor-store";
import {
    BoldIcon,
    ItalicIcon,
    LucideIcon,
    MessageSquarePlusIcon,
    PrinterIcon,
    Redo2Icon,
    SpellCheckIcon,
    UnderlineIcon,
    Undo2Icon
} from "lucide-react"

export const getSections = (editor: any): {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean
}[][] => {
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
                    onClick: () => window.print()
                },
                {
                    label: "Spell Check",
                    icon: SpellCheckIcon,
                    onClick: () => {
                        const current = editor?.view.dom.getAttribute("spellcheck")
                        editor?.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false")
                    }
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
                }
            ],
            [
                {
                    label: "Comment",
                    icon: MessageSquarePlusIcon,
                    isActive: false,
                    //TODO: Implement Comment feature
                    onClick: () => console.log("Implementation in progress"),
                }
            ]
        ]
    )
} 