'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ReactNode, useState } from 'react'
import TagPreview from './tag-preview'

export type PracticeAreaTag = {
    title: string
    href: string
    color: string
    desc: string
    icon: ReactNode
}

export default function Tags({
    tags,
    learnMoreIntl,
}: {
    tags: PracticeAreaTag[]
    learnMoreIntl: string
}) {
    const [activeTag, setActiveTag] = useState(tags[0].title)

    function handleClick(tagTitle: string) {
        setActiveTag(tagTitle)
    }

    return (
        <>
            <div className="flex flex-wrap justify-center gap-3 xl:gap-8">
                {tags.map((tag) => (
                    <Button
                        key={tag.title}
                        onClick={() => handleClick(tag.title)}
                        className={cn(
                            'rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 text-sm',
                            {
                                'bg-blue-500 text-white hover:bg-blue-600':
                                    activeTag === tag.title,
                            },
                        )}
                    >
                        {tag.title}
                    </Button>
                ))}
            </div>
            <TagPreview
                {...tags.filter((tag) => tag.title === activeTag)[0]}
                learnMoreIntl={learnMoreIntl}
            />
        </>
    )
}
