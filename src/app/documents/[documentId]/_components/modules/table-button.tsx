import { useState } from "react"
import useEditorStore from "@/store/use-editor-store"
import { TableIcon, RowsIcon, ColumnsIcon, Trash2Icon, MinusIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/dropdown-menu"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/hover-card"

export const TableButton = () => {
  const { editor } = useEditorStore()
  const [open, setOpen] = useState(false)

  const tableOptions = [
    {
      label: "Insert Table",
      icon: TableIcon,
      onClick: () => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    },
    {
      label: "Add Row",
      icon: RowsIcon,
      onClick: () => editor?.can().addRowAfter() && editor.chain().focus().addRowAfter().run(),
    },
    {
      label: "Add Column",
      icon: ColumnsIcon,
      onClick: () => editor?.can().addColumnAfter() && editor.chain().focus().addColumnAfter().run(),
    },
    {
      label: "Delete Row",
      icon: MinusIcon,
      onClick: () => editor?.can().deleteRow() && editor.chain().focus().deleteRow().run(),
    },
    {
      label: "Delete Column",
      icon: MinusIcon,
      onClick: () => editor?.can().deleteColumn() && editor.chain().focus().deleteColumn().run(),
    },
    {
      label: "Delete Table",
      icon: Trash2Icon,
      onClick: () => editor?.chain().focus().deleteTable().run(),
    },
  ]

  return (
    <HoverCard openDelay={600}>
      <HoverCardTrigger>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <button className="h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5">
              <TableIcon className="size-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
            {tableOptions.map(({ label, icon: Icon, onClick }) => (
              <button
                key={label}
                onClick={onClick}
                className="flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80"
              >
                <Icon className="size-4" />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </HoverCardTrigger>
      <HoverCardContent className="bg-neutral-200/80 text-black m-0 py-2 text-center">
        Table Actions
      </HoverCardContent>
    </HoverCard>
  )
}