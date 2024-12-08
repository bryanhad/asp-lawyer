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
    moreInfo?: boolean
}

function InputorInfo({ inputedAt, authorId, authorName, moreInfo = false, tip = 'Created At', className, noIcon = false }: Props) {
    return (
        <div className={cn('flex items-center gap-2', { 'gap-3': moreInfo }, className)}>
            <Link href={`/members/users/${authorId}`} className={cn({ 'flex items-center gap-2': moreInfo })}>
                <UserAvatar username={authorName} />
                {moreInfo && <p className='hidden md:block'>{authorName}</p>}
            </Link>
            <div className="flex items-center gap-2">
                {(moreInfo || !noIcon) && (
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
