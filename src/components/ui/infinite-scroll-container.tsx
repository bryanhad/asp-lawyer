'use client'
import { PropsWithChildren } from 'react'
import { useInView } from 'react-intersection-observer'

type Props = PropsWithChildren & {
    onBottomReached: () => void
    className?: string
}

export default function InfiniteScrollContainer({ children, onBottomReached, className }: Props) {
    /**
     * the ref is used as the reference for the last element of the iteration, 
     * If it is reached (in view), then we will call the onBottomReached callback
     * 
     */
    
    const { ref } = useInView({
        // trigger the inView change with an offset of 200px from the ref element
        rootMargin: '100px',
        onChange(inView) {
            console.log({inView})
            if (inView) {
                onBottomReached()
            }
        },
    })

    return (
        <div className={className}>
            {children}
            <div ref={ref} />
        </div>
    )
}
