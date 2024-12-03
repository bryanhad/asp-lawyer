'use client'

import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import Toolbar from './toolbar'
import BulletList from '@tiptap/extension-bullet-list'
import Heading from '@tiptap/extension-heading'

type Props = {
    content: string
    onChange: (richText: string) => void
    placeholder?: string
    onReady: () => void
}

export default function Tiptap({
    content,
    onChange,
    placeholder = `What's on your mind?`,
    onReady,
}: Props) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({}),
            Placeholder.configure({
                placeholder,
            }),
            BulletList.configure({}),
            Heading.configure({
                levels: [1, 2, 3],
            }),
        ],
        content,
        editorProps: {
            attributes: {
                class: 'tiptap max-h-[20rem] w-full flex-[1] overflow-y-auto rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            },
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML())
        },
        onCreate() {
            onReady()
        }
    })
    return (
        <div className="flex min-h-[15rem] flex-col space-y-2">
            <Toolbar editor={editor} />
            <EditorContent
                editor={editor}
                className="flex-[1] flex"
            />
        </div>
    )
}
