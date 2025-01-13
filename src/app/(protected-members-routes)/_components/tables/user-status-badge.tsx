import SimplePopover from '@/components/ui/simple-pop-over'
import { UserStatus } from '@/lib/enum'
import { cn } from '@/lib/utils'

type Props = {
    userStatus: string
    className?: string
}

export function UserStatusBadge({ userStatus, className }: Props) {
    const detail = { tip: '', text: '' }

    switch (userStatus) {
        case UserStatus.ACTIVE:
            detail.text = 'Active'
            detail.tip = 'User is active'
            break
        case UserStatus.ON_BOARDING:
            detail.text = 'Onboarding'
            detail.tip = 'The user is in the process of completing onboarding steps.'
            break
        case UserStatus.NOT_VERIFIED:
            detail.text = 'Not Verified'
            detail.tip = 'The user has not yet verified their email address.'
            break
        default:
            detail.text = 'Unknown Status'
            detail.tip = `The current user status is: ${userStatus}`
    }

    return (
        <SimplePopover
            tip={detail.tip}
            className={cn(
                'border',
                {
                    'border-green-600 text-green-600': userStatus === UserStatus.ACTIVE,
                    'border-blue-500 text-blue-500 dark:border-blue-500 dark:text-blue-500':
                        userStatus === UserStatus.ON_BOARDING,
                    'border-red-600 text-red-600': userStatus === UserStatus.NOT_VERIFIED,
                },
                className,
            )}
        >
            {detail.text}
        </SimplePopover>
    )
}

type UserStatusBulletProps = {
    userStatus: string
    className?: string
}

export function UserStatusBullet({ userStatus }: UserStatusBulletProps) {
    return (
        <div
            className={cn('size-3 rounded-full border-2 border-red-500', {
                'border-green-500': userStatus === UserStatus.ACTIVE,
                'border-red-500': userStatus === UserStatus.NOT_VERIFIED,
                'border-blue-500': userStatus === UserStatus.ON_BOARDING,
            })}
        />
    )
}
