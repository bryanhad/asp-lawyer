'use client'

import { debounce } from '@/lib/utils'
import { useEffect, useState } from 'react'
import Typewriter from 'typewriter-effect'

type Props = {
    desktop: string[]
    mobile: string[]
}

export default function TypeWriterComponent({ desktop, mobile }: Props) {
    const [words, setWords] = useState<string[]>([])

    useEffect(() => {
        /**
         * handleResize function
         * If there is a resize of the window width, it fires and determines the correct words for the Typewriter component
         */
        const handleResize = () => {
            const width = window.innerWidth

            if (width >= 768) {
                // md screens
                setWords(desktop)
            } else {
                setWords(mobile) // xs screens
            }
        }

        const debounceResize = debounce(handleResize, 1000)

        handleResize() // Initial setup
        window.addEventListener('resize', debounceResize)

        return () => window.removeEventListener('resize', debounceResize)
    }, [desktop, mobile])

    return (
        <>
            <span className="sr-only">{desktop[0]}</span>
            <Typewriter
                options={{
                    loop: true,
                    strings: words,
                    autoStart: true,
                    wrapperClassName: 'text-primary',
                    cursorClassName: 'text-primary animate-pulse',
                }}
            />
        </>
    )
}
