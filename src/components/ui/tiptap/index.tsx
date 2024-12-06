'use client'

import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect } from 'react'
import Toolbar from './toolbar'
import BulletList from '@tiptap/extension-bullet-list'
import Heading from '@tiptap/extension-heading'
import { cn } from '@/lib/utils'

type Props = {
    content: string
    onChange: (richText: string) => void
    placeholder?: string
    onReady: () => void
    disabled?: boolean
}

export default function Tiptap({
    content,
    onChange,
    placeholder = `What's on your mind?`,
    onReady,
    disabled = false,
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
        },
        editable: !disabled, // Initial value for editable
    })

    // Update editable state dynamically when `disabled` changes
    useEffect(() => {
        if (editor) {
            editor.setEditable(!disabled)
        }
    }, [disabled, editor])

    return (
        <div className="flex min-h-[15rem] flex-col space-y-2">
            <Toolbar editor={editor}/>
            <EditorContent editor={editor} className={cn("flex flex-[1]", {
                'cursor-not-allowed opacity-50 select-none': editor?.isEditable === false
            })} />
        </div>
    )
}
