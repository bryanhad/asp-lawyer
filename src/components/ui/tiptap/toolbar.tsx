'use client'

import { type Editor } from '@tiptap/react'
import { Toggle } from '../toggle'
import { Bold, Heading1, Heading2, Heading3, Italic, List, ListOrdered, Strikethrough } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
    editor: Editor | null
}

export default function Toolbar({ editor }: Props) {
    if (!editor) {
        return null
    }

    return (
        <div
            className={cn('flex select-none rounded-md border border-input bg-transparent p-1', {
                'pointer-events-none cursor-not-allowed select-none opacity-50': editor.isEditable === false,
            })}
        >
            <Toggle
                title="Control + alt + 1"
                size={'sm'}
                pressed={editor.isActive('heading', { level: 1 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            >
                <Heading1 className="size-4 shrink-0" />
            </Toggle>
            <Toggle
                title="Control + alt + 2"
                size={'sm'}
                pressed={editor.isActive('heading', { level: 2 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            >
                <Heading2 className="size-4 shrink-0" />
            </Toggle>
            <Toggle
                title="Control + alt + 3"
                size={'sm'}
                pressed={editor.isActive('heading', { level: 3 })}
                onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            >
                <Heading3 className="size-4 shrink-0" />
            </Toggle>
            <Toggle
                title="Control + B"
                size={'sm'}
                pressed={editor.isActive('bold')}
                onPressedChange={() => editor.chain().focus().toggleBold().run()}
            >
                <Bold className="size-4 shrink-0" />
            </Toggle>
            <Toggle
                title="Control + I"
                size={'sm'}
                pressed={editor.isActive('italic')}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            >
                <Italic className="size-4 shrink-0" />
            </Toggle>
            <Toggle
                title="Control + Shift + S"
                size={'sm'}
                pressed={editor.isActive('strike')}
                onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            >
                <Strikethrough className="size-4 shrink-0" />
            </Toggle>
            <Toggle
                title="Control + Shift + 7"
                size={'sm'}
                pressed={editor.isActive('orderedList')}
                onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <ListOrdered className="size-4 shrink-0" />
            </Toggle>
            <Toggle
                title="Control + Shift + 8"
                size={'sm'}
                pressed={editor.isActive('bulletList')}
                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
            >
                <List className="size-4 shrink-0" />
            </Toggle>
        </div>
    )
}
