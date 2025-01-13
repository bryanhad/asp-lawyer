import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

type Props = {
    children: React.ReactNode
    tip: React.ReactNode
    className?: string
    tipClassName?: string
}

function SimplePopover({ children, tip, className, tipClassName }: Props) {
    return (
        <Popover>
            <PopoverTrigger className={cn('rounded-md border px-2 py-[2px]', className)}>{children}</PopoverTrigger>
            <PopoverContent className={cn('w-max max-w-[200px] px-2 py-1 text-center text-[11px]', tipClassName)}>
                {tip}
            </PopoverContent>
        </Popover>
    )
}

export default SimplePopover
