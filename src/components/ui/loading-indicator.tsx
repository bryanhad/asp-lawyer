type Props = {
    sizeInPx?: number
    className?: string
    message?: string
}

function LoadingIndicator({ className, sizeInPx = 100 }: Props) {
    return (
        <div className={className}>
            <div style={{ width: `${sizeInPx}px` }} className="my-loading-indicator text-muted-foreground"></div>
        </div>
    )
}

function PageLoadingIndicator({ className, sizeInPx = 100, message }: Props) {
    return (
        <div className="mb-32 grid flex-[1] place-content-center">
            <LoadingIndicator className={className} sizeInPx={sizeInPx} />
            {message && <p className="mt-4">{message}</p>}
        </div>
    )
}

export { LoadingIndicator, PageLoadingIndicator }
