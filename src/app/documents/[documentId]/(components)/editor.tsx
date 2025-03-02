"use client"

import useSetupEditor from "@/hooks/use-setup-editor"
import { EditorContent } from '@tiptap/react'

const Editor = () => {

    const editor = useSetupEditor()

    return (
        <div
            className='size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible'
        >
            <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
                <EditorContent
                    editor={editor}
                />
            </div>
        </div>
    )
}

export default Editor