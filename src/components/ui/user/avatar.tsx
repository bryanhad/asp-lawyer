import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn, getNameInitial } from '@/lib/utils'
import { Smile } from 'lucide-react'

export type Props = {
    username: string
    className?: string
}

export default function UserAvatar({ username, className }: Props) {
    return (
        <Avatar className={cn('select-none', className)}>
            <AvatarFallback>
                {username !== '' && getNameInitial(username)}
                {username === '' && <Smile className="shrink-0 text-muted-foreground" size={20} />}
            </AvatarFallback>
        </Avatar>
    )
}
