"use client";

import { useState } from "react";
import useEditorStore from "@/store/use-editor-store";

import {
  RowsIcon,
  ColumnsIcon,
} from "lucide-react";
import {
  AiOutlineDeleteColumn,
  AiOutlineDeleteRow,
} from "react-icons/ai";
import {
  TbTable,
  TbTablePlus,
  TbTableMinus,
  TbTableRow,
  TbTableColumn,
  TbTableSpark
} from "react-icons/tb";
import { RxCrossCircled } from "react-icons/rx";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { TableProps } from "@/lib/types";

export const TableButton = () => {

  const { editor } = useEditorStore();

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const [showTableSelector, setShowTableSelector] = useState(false);
  const [selectedRows, setSelectedRows] = useState(0);
  const [selectedCols, setSelectedCols] = useState(0);

  const maxRows = 10;
  const maxCols = 10;

  // Responsible for inserting the table based on the selected rows and columns.
  const handleTableSelect = (rows: number, cols: number) => {

    editor?.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();

    // Closing the table selector and sidebar after table insert
    setShowTableSelector(false);
    setSidebarOpen(false);

    // Reset selection 
    setSelectedRows(0);
    setSelectedCols(0);
  };

  const handleOptionClick = (action: () => void) => () => {
    action?.();
    // Same as if(action){ action() }
    // The optional chaining syntax is a more concise, modern way to conditionally call a function.
  };

  const tableOptions: TableProps[] = [
    {
      label: "Insert Table",
      icon: TbTablePlus,
      onClick: () => setShowTableSelector(!showTableSelector),
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
      icon: TbTableMinus,
      onClick: () => editor?.chain().focus().deleteTable().run(),
    },
  ];

  return (
    <>
      <HoverCard openDelay={600}>
        <HoverCardTrigger>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 relative"
          >
            <TbTable
              className="size-4"
            />
          </button>
        </HoverCardTrigger>
        <HoverCardContent
          className="bg-neutral-200/80 text-black m-0 py-2 text-center"
        >
          Table Actions
        </HoverCardContent>
      </HoverCard>

      {isSidebarOpen &&
        (
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
                onClick={() => {
                  setSidebarOpen(false)
                  setShowTableSelector(false)
                }}
                className="text-xl font-bold"
              >
                <RxCrossCircled />
              </button>
            </div>
            <div
              className="flex flex-col gap-y-2 relative"
            >
              {
                tableOptions.map(({ label, icon: Icon, onClick }) => (
                  <button
                    key={label}
                    onClick={handleOptionClick(onClick)}
                    className="flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80 relative"
                  >
                    <Icon className="size-4" />
                    <span className="text-sm">
                      {label}
                    </span>
                    {/* Handling condition when Insert Table is clicked */}
                    {
                      label === "Insert Table" && showTableSelector && (
                        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 p-2 shadow-md z-10">
                          <div className="mb-2 text-sm">
                            {selectedRows > 0 && selectedCols > 0
                              ? `${selectedRows} x ${selectedCols}`
                              : "Select table size"}
                          </div>
                          <div
                            className="relative w-[200px] h-[200px] grid grid-cols-10 grid-rows-10 gap-1 bg-white cursor-crosshair"
                            onMouseMove={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              // console.log(rect);
                              const x = e.clientX - rect.left;
                              const y = e.clientY - rect.top;
                              const newCols = Math.min(Math.floor(x / 20) + 1, maxCols);
                              const newRows = Math.min(Math.floor(y / 20) + 1, maxRows);
                              setSelectedRows(newRows);
                              setSelectedCols(newCols);
                            }}
                            onMouseLeave={() => {
                              setSelectedRows(0)
                              setSelectedCols(0)
                            }}
                            onClick={() => handleTableSelect(selectedRows, selectedCols)}
                          >
                            {/* Render grid cells */}
                            {Array.from({ length: maxRows * maxCols }).map((_, index) => (
                              <div
                                key={index}
                                className="w-full h-full border border-gray-300"
                                style={{
                                  boxSizing: "border-box"
                                }}
                              />
                            ))}

                            {/* Highlight overlay on top of grid cells */}
                            <div
                              className="absolute top-0 left-0 bg-[#bdedd7] border-2 border-[#85e2b5] pointer-events-none"
                              style={{
                                width: `${selectedCols * 20}px`,
                                height: `${selectedRows * 20}px`,
                              }}
                            />
                          </div>
                        </div>
                      )
                    }
                  </button>
                ))}
            </div>
          </div>
        )}
    </>
  );
};
