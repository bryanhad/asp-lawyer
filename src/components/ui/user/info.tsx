import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import UserAvatar, { Props as AvatarProps } from './avatar'

type Props = AvatarProps & {}

export default function UserInfo({ ...userAvatarProps }: Props) {
    return (
        <Popover>
            <PopoverTrigger>
                <UserAvatar {...userAvatarProps} />
            </PopoverTrigger>
            <PopoverContent className="z-[91] w-auto p-2" align="start">
                <p>{userAvatarProps.username}</p>
            </PopoverContent>
        </Popover>
    )
}
