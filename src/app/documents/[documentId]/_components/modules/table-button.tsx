import { useState } from "react";
import useEditorStore from "@/store/use-editor-store";

import {
  TableIcon,
  RowsIcon,
  ColumnsIcon,
  Trash2Icon,
} from "lucide-react";
import {
  AiOutlineDeleteColumn,
  AiOutlineDeleteRow,
} from "react-icons/ai";
import {
  TbTableRow,
  TbTableColumn,
  TbTableSpark,
} from "react-icons/tb";
import { RxCrossCircled } from "react-icons/rx";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/hover-card"
import { TableProps } from "@/lib/types";

export const TableButton = () => {
  const { editor } = useEditorStore();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleOptionClick = (action: () => void) => () => {
    action?.();
    // Same as if(action){ action() }
    // The optional chaining syntax is a more concise, modern way to conditionally call a function.
  };

  const tableOptions: TableProps[] = [
    {
      label: "Insert Table",
      icon: TableIcon,
      onClick: () =>
        editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    },
    {
      label: "Add Row",
      icon: RowsIcon,
      onClick: () =>
        editor?.can().addRowAfter() && editor.chain().focus().addRowAfter().run(),
    },
    {
      label: "Add Column",
      icon: ColumnsIcon,
      onClick: () =>
        editor?.can().addColumnAfter() && editor.chain().focus().addColumnAfter().run(),
    },
    {
      label: "Toggle Header Row",
      icon: TbTableRow,
      onClick: () =>
        editor?.can().toggleHeaderRow() && editor.chain().focus().toggleHeaderRow().run(),
    },
    {
      label: "Toggle Header Column",
      icon: TbTableColumn,
      onClick: () =>
        editor?.can().toggleHeaderColumn() && editor.chain().focus().toggleHeaderColumn().run(),
    },
    {
      label: "Toggle Header Cell",
      icon: TbTableSpark,
      onClick: () =>
        editor?.can().toggleHeaderCell() && editor.chain().focus().toggleHeaderCell().run(),
    },
    {
      label: "Delete Row",
      icon: AiOutlineDeleteRow,
      onClick: () =>
        editor?.can().deleteRow() && editor.chain().focus().deleteRow().run(),
    },
    {
      label: "Delete Column",
      icon: AiOutlineDeleteColumn,
      onClick: () =>
        editor?.can().deleteColumn() && editor.chain().focus().deleteColumn().run(),
    },
    {
      label: "Delete Table",
      icon: Trash2Icon,
      onClick: () =>
        editor?.chain().focus().deleteTable().run(),
    },
  ];

  return (
    <>
      <HoverCard openDelay={600}>
        <HoverCardTrigger>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5"
          >
            <TableIcon className="size-4" />
          </button>
        </HoverCardTrigger>
        <HoverCardContent
          className="bg-neutral-200/80 text-black m-0 py-2 text-center"
        >
          Table Actions
        </HoverCardContent>
      </HoverCard>

      {isSidebarOpen && (
        <div
          className="fixed right-0 top-0 z-50 w-64 bg-neutral-50 shadow-xl h-full p-4"
        >
          <div
            className="flex items-center justify-between mb-4"
          >
            <h2
              className="text-lg font-semibold"
            >
              Table Actions
            </h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-xl font-bold"
              aria-label="Close sidebar"
            >
              <RxCrossCircled 
              />
            </button>
          </div>
          <div
            className="flex flex-col gap-y-2"
          >
            {
              tableOptions.map(({ label, icon: Icon, onClick }) => (
              <button
                key={label}
                onClick={handleOptionClick(onClick)}
                className="flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80"
              >
                <Icon className="size-4" />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
