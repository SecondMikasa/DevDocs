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