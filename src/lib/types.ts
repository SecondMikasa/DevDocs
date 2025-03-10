import { type LucideIcon } from 'lucide-react'

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
    icon: LucideIcon,
}

export interface ListProps {
    label: string;
    icon: LucideIcon;
    isActive: () => boolean
    onClick: () => void
}

export interface LineHeightProps {
    label: string;
    value: string;
}

export interface MarkerProps {
    position: number;
    isLeft: boolean;
    isDragging: boolean;
    onMouseDown: () => void;
    onDoubleClick: () => void;
}