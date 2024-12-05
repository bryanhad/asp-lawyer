import SimplePopover from '@/components/ui/simple-pop-over'
import UserAvatar from '@/components/ui/user/avatar'
import { cn, formatDateToLocale } from '@/lib/utils'
import { CalendarDays } from 'lucide-react'
import Link from 'next/link'

export type Props = {
    authorId: string | number
    authorName: string
    inputedAt: Date
    tip?: string
    className?: string
    noIcon?: boolean
}

function InputorInfo({ inputedAt, authorId, authorName, tip, className, noIcon = false }: Props) {
    return (
        <div className={cn('flex gap-2', className)}>
            <Link href={`/members/users/${authorId}`}>
                <UserAvatar username={authorName} />
            </Link>
            <div className="flex items-center gap-2">
                {!noIcon && (
                    <SimplePopover tip={tip} className="rounded-full p-2">
                        <CalendarDays className="shrink-0 text-muted-foreground" size={14} />
                    </SimplePopover>
                )}
                <p className="text-sm text-muted-foreground">{formatDateToLocale(inputedAt, 'id-ID', true)}</p>
            </div>
        </div>
    )
}

export default InputorInfo
