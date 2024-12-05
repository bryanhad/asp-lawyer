import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

function SimplePopover({
    children,
    tip,
    className,
}: {
    children: React.ReactNode
    tip: React.ReactNode
    className?: string
}) {
    return (
        <Popover>
            <PopoverTrigger className={cn('rounded-md border px-2 py-[2px]', className)}>{children}</PopoverTrigger>
            <PopoverContent className="w-max px-2 py-1 text-[11px]">{tip}</PopoverContent>
        </Popover>
    )
}

export default SimplePopover
