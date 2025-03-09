"use client"
import { cn } from "@/lib/utils";

import { LucideIcon } from "lucide-react"

import { Separator } from "@/components/separator";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/hover-card"

import useEditorStore from "@/store/use-editor-store";

import { getSections } from "./modules/sections";
import { HighlightColorButton } from "./modules/highlight-color";
import { LinkButton } from "./modules/link-button";
import { ImageButton } from "./modules/image-button";
import { AlignButton } from "./modules/align-button";
import { ListButton } from "./modules/list-button";
import { FontFamilyButton } from "./modules/font-family";
import { HeadingLevelButton } from "./modules/heading-level"
import { TextColorButton } from "./modules/text-color";
import { FontSizeButton } from "./modules/font-size";
import { LineHeightButton } from "./modules/line-height";

interface ToolbarButtonProps {
    label: string;
    onClick?: () => void;
    isActive?: boolean;
    icon: LucideIcon
}

const ToolbarButton = ({
    label,
    onClick,
    isActive,
    icon: Icon
}: ToolbarButtonProps) => {
    return (
        <HoverCard openDelay={600}>
            <HoverCardTrigger>
                <button
                    onClick={onClick}
                    className={cn(
                        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
                        isActive && "bg-neutral-200/80"
                    )}
                >
                    <Icon
                        className="size-4"
                    />
                </button>
            </HoverCardTrigger>
            <HoverCardContent
                className="bg-neutral-200/80 text-black m-0 py-2 text-center"
            >
                {label}
            </HoverCardContent>
        </HoverCard>
    )
}

const Toolbar = () => {

    const { editor } = useEditorStore()
    // console.log("Toolbar Editor:", ({ editor }))

    const sections = getSections(editor)

    return (
        <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
            {
                sections[0].map((item) => (
                    <ToolbarButton
                        key={item.label}
                        {...item}
                    />
                ))
            }

            <Separator
                orientation="vertical"
                className="h-6 bg-neutral-300"
            />

            {/* [x]: Font Family */}

            <FontFamilyButton />

            <Separator
                orientation="vertical"
                className="h-6 bg-neutral-300"
            />

            {/* [x]: Heading */}

            <HeadingLevelButton />

            <Separator
                orientation="vertical"
                className="h-6 bg-neutral-300"
            />

            {/* [x]: Font Size */}

            <FontSizeButton />
            
            <Separator
                orientation="vertical"
                className="h-6 bg-neutral-300"
            />

            {
                sections[1].map((item) => (
                    <ToolbarButton
                        key={item.label}
                        {...item}
                    />
                ))
            }

            {/* [x]: Text Color */}

            <TextColorButton />

            {/* [x]: Highlight Color */}

            <HighlightColorButton />

            <Separator
                orientation="vertical"
                className="h-6 bg-neutral-300"
            />

            {/* [x]: Link */}

            <LinkButton />

            {/* [x]: Image */}

            <ImageButton />

            {/* [x]: Align */}

            <AlignButton />
                
            {/* [x]: Line Height */}

            <LineHeightButton />

            {/* [x]: List */}

            <ListButton />

            {
                sections[2].map((item) => (
                    <ToolbarButton
                        key={item.label}
                        {...item}
                    />
                ))
            }

        </div>
    )
}

export default Toolbar