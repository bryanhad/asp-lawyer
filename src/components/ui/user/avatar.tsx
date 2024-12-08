import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn, getNameInitial } from '@/lib/utils'

export type Props = {
    username: string
    className?:string
}

export default function UserAvatar({ username, className }: Props) {
    return (
        <Avatar className={cn('select-none', className)}>
            <AvatarFallback>{getNameInitial(username)}</AvatarFallback>
        </Avatar>
    )
}
