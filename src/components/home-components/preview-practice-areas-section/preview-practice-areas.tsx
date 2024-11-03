'use client'

import TagPreview from './tag-preview'
import { useQuery } from '@tanstack/react-query'
import { getPracticeAreaPreviewData } from '.'
import PreviewPracticeAreasSkeleton from './skeleton'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Locale } from '@/i18n/request'

export default function PreviewPracticeAreas({
    currentLocale,
}: {
    currentLocale: Locale
}) {
    // This useQuery could just as well happen in some deeper
    // child, data will be available immediately either way
    const { data, isPending, isError, isFetched } = useQuery({
        queryKey: ['practice-areas', 'preview'],
        queryFn: () => getPracticeAreaPreviewData(),
    })
    const [activeTag, setActiveTag] = useState<string | null>(null)

    useEffect(() => {
        // Set the initial active tag only once when data is available
        if (data && activeTag === null) {
            setActiveTag(data[0].slug)
        }
    }, [data])

    function handleClick(tagTitle: string) {
        setActiveTag(tagTitle)
    }

    // This query was not prefetched on the server and will not start
    // fetching until on the client, both patterns are fine to mix.
    //   const { data: commentsData } = useQuery({
    //     queryKey: ['posts-comments'],
    //     queryFn: getComments,
    //   })

    if (isPending) {
        return <PreviewPracticeAreasSkeleton />
    }

    if (isError) {
        return (
            <p className="text-center text-destructive">
                An error occured while loading practice areas data
            </p>
        )
    }

    return (
        <div className="flex flex-col items-center gap-6">
            <>
                <div className="flex flex-wrap justify-center gap-3 xl:gap-8">
                    {data.map((practiceArea) => (
                        <Button
                            key={practiceArea.slug}
                            onClick={() => handleClick(practiceArea.slug)}
                            className={cn(
                                'max-w-[200px] rounded-full bg-gray-200 text-sm text-gray-500 hover:bg-gray-300',
                                {
                                    'bg-blue-500 text-white hover:bg-blue-600':
                                        activeTag === practiceArea.slug,
                                },
                            )}
                        >
                            <p className="truncate">
                                {currentLocale === 'en'
                                    ? practiceArea.fullName.en
                                    : practiceArea.fullName.id}
                            </p>
                        </Button>
                    ))}
                </div>
                {activeTag && (
                    <TagPreview
                        {...data.filter((data) => data.slug === activeTag)[0]}
                    />
                )}
            </>
        </div>
    )
}
