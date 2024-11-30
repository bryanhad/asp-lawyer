'use client'

import { Button } from '@/components/ui/button'
import { TriangleAlert } from 'lucide-react'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="my-16 flex flex-[1] flex-col items-center justify-center gap-3 lg:mt-24 lg:gap-6">
            <div className="flex flex-col items-center gap-2">
                <TriangleAlert className="shrink-0 text-primary" size={100} />
                <h2 className="text-3xl text-primary lg:text-5xl">Uh oh!</h2>
            </div>
            <div className="space-y-2 text-center">
                <h1 className="text-foreground lg:text-xl">
                    Something went wrong at our end.
                    <br />
                    Don&apos;t worry, it&apos;s not you - it&apos;s us.
                    <br className="lg:hidden" />
                    <span className="max-lg:hidden"> </span>
                    Sorry about that.
                </h1>
                <p className="text-muted-foreground">
                    You can try to refresh the page or
                    <br className="lg:hidden" />
                    <span className="max-lg:hidden"> </span>
                    try again later
                </p>
            </div>
            <Button
                onClick={
                    // Attempt to recover by trying to re-render the invoices route
                    () => reset()
                }
            >
                Try again
            </Button>
        </div>
    )
}
