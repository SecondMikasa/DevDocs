import {
    Doc,
    Id
} from "../../convex/_generated/dataModel";
import { PaginationStatus } from "convex/react";

export interface SectionProps {
    label: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    onClick: () => void;
    isActive?: boolean
}

export interface ToolbarButtonProps {
    label: string;
    onClick?: () => void;
    isActive?: boolean;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface FontProps {
    label: string;
    value: string;
}

export interface HeadingProps {
    label: string;
    value: number;
    fontSize: string;
}

export interface AlignmentProps {
    label: string;
    value: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface ListProps {
    label: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    isActive: () => boolean
    onClick: () => void
}

export interface LineHeightProps {
    label: string;
    value: string;
}

export interface TableProps {
    label: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    onClick: () => void;
}

export interface MarkerProps {
    position: number;
    isLeft: boolean;
    isDragging: boolean;
    onMouseDown: () => void;
    onDoubleClick: () => void;
}

export interface EditorProps {
    initialContent?: string | undefined; 
}

export interface TemplateProps {
    id: string;
    label: string;
    imageUrl: string;
    initialContent: string;
}

export interface DocumentTableProps {
    documents: Doc<"documents">[] | undefined;
    loadMore: (numItems: number) => void;
    status: PaginationStatus;
}

export interface DocumentRowProps {
    document: Doc<"documents">;
}

export interface DocumentProps {
    documentId: Id<"documents">;
    title: string;
    onNewTab: (id: Id<"documents">) => void;
}

export interface RemoveDialogProps {
    documentId: Id<"documents">;
    children: React.ReactNode;
}

export interface RenameDialogProps  {
    documentId: Id<"documents">;
    initialContent: string;
    children: React.ReactNode;
}

export type User = {
    id: string;
    name: string;
    avatar: string;
}

export interface AvatarProps {
    src: string;
    name: string;
}

export interface NavbarProps {
    data: Doc<"documents">;
}

export interface NavbarMenuProps {
    data: Doc<"documents">;
    handleNewDocument: () => void;
}