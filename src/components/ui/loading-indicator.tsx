type Props = {
    sizeInPx?: number
    className?: string
}

function LoadingIndicator({ className, sizeInPx = 100 }: Props) {
    return (
        <div className={className}>
            <div style={{ width: `${sizeInPx}px` }} className="my-loading-indicator text-muted-foreground"></div>
        </div>
    )
}

function PageLoadingIndicator({ className, sizeInPx = 100 }: Props) {
    return (
        <div className="grid flex-[1] place-content-center">
            <LoadingIndicator className={className} sizeInPx={sizeInPx} />
        </div>
    )
}

export { LoadingIndicator, PageLoadingIndicator }
