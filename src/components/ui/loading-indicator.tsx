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
        <div className="mb-3 flex-[1] flex flex-col items-center">
            <LoadingIndicator className={className} sizeInPx={sizeInPx} />
            {message && <p className="mt-4 text-muted-foreground">{message}</p>}
        </div>
    )
}

export { LoadingIndicator, PageLoadingIndicator }
