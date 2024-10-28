'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { addMember } from './actions'
import { Button } from '@/components/ui/button'
import './styles.css'

export default function BioEditor() {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                // bold: false,
                // italic: false
            }),
            Placeholder.configure({
                placeholder: "What's the member's name?",
            }),
        ],
    })

    const input =
        editor?.getText({
            blockSeparator: '\n', // this defines how new lines would be handled
        }) || ''

    async function onSubmit() {
        await addMember(input)
        editor?.commands.clearContent()
    }

    return (
        <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
            <div className="flex gap-5">
                <EditorContent
                    editor={editor}
                    className="max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-muted px-5 py-3"
                />
            </div>
            <div className="flex justify-end">
                <Button
                    onClick={onSubmit}
                    disabled={!input.trim()}
                    className="min-w-20"
                >
                    Submit
                </Button>
            </div>
        </div>
    )
}