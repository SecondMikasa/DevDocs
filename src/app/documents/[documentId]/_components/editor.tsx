"use client"
import {
    useEditor,
    EditorContent,
} from '@tiptap/react'
import useEditorStore from '@/store/use-editor-store'

import { useLiveblocksExtension, FloatingToolbar } from "@liveblocks/react-tiptap";

import { all, createLowlight } from 'lowlight'

import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'

import StarterKit from '@tiptap/starter-kit'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'

import { FontSizeExtension } from '@/extensions/font-size'
import { LineHeightExtension } from '@/extensions/line-height'

import ImageResize from 'tiptap-extension-resize-image'

import { Ruler } from './ruler'
import { Threads } from './threads';

const lowlight = createLowlight(all)

lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('js', js)
lowlight.register('ts', ts)

const EditorComponent = () => {
    const { setEditor } = useEditorStore()

    const liveblocks = useLiveblocksExtension()

    const editor = useEditor({
        
        // Unified editor callbacks
        onCreate: ({ editor }) => setEditor(editor),

        onDestroy: () => setEditor(null),

        onUpdate: ({ editor }) => setEditor(editor),

        onSelectionUpdate: ({ editor }) => setEditor(editor),

        onTransaction: ({ editor }) => setEditor(editor),

        onFocus: ({ editor }) => setEditor(editor),

        onBlur: ({ editor }) => setEditor(editor),
        
        onContentError: ({ editor }) => setEditor(editor),

        // Editor properties
        editorProps: {
            attributes: {
                style: "padding-left: 56px; padding-right: 56px;",
                class: "focus:outline-none print:border-0 border bg-white border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text"
            }
        },

        // Extensions
        extensions: [
            liveblocks,
            StarterKit.configure({
                history: false,
                codeBlock: false
            }),
            FontSizeExtension,
            LineHeightExtension.configure({
                types: ["heading", "paragraph"],
                defaultLineHeight: "normal"
            }),
            Underline,
            Color,
            Highlight.configure({ multicolor: true }),
            FontFamily,
            TextStyle,
            TaskList,
            TaskItem.configure({ nested: true }),
            Table.configure({
                resizable: true,
                lastColumnResizable: false,
                allowTableNodeSelection: true
            }),
            TableRow,
            TableHeader,
            TableCell,
            ImageResize,
            Link.configure({
                openOnClick: true,
                autolink: true,
                defaultProtocol: 'https'
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
                alignments: ['left', 'right', 'center', 'justify'],
            }),
            CodeBlockLowlight.configure({
                lowlight,
            }),
        ],

        immediatelyRender: false,
    })

    return (
        <div
            className='size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible'
        >
            <Ruler />
            <div
                className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'
            >
                <EditorContent
                    editor={editor}
                />
                <Threads
                    editor={editor}
                />
            </div>
        </div>
    )
}

export default EditorComponent
