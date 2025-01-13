import { EditButton, ViewButton } from '@/app/(protected-members-routes)/_components/buttons'
import { cn } from '@/lib/utils'
import { getData } from '../action'
import UserAvatar from '@/components/ui/user/avatar'
import { UserStatus } from '@/lib/enum'
import { UserStatusBadge } from '@/app/(protected-members-routes)/_components/tables/user-status-badge'

// get the type of single user of the getData function
type Props = Awaited<ReturnType<typeof getData>>['users'][number] & {
    className?: string
    deleteButton: React.ReactNode
}

function UserCard({ className, deleteButton, ...user }: Props) {
    return (
        <div className={cn('flex flex-col overflow-hidden rounded-md border', className)}>
            <div className="flex justify-between p-2">
                <div className="flex items-center gap-4 flex-[1]">
                    <UserAvatar username={user.status !== UserStatus.ACTIVE ? '' : user.username} />
                    <div
                        className={cn('flex flex-col gap-1', {
                            'flex-col-reverse': user.status !== UserStatus.ACTIVE,
                        })}
                    >
                        {user.status === UserStatus.ACTIVE && (
                            <p className={cn('line-clamp-1 w-full')}>{user.username}</p>
                        )}
                        {user.status !== UserStatus.ACTIVE && (
                            <UserStatusBadge className="max-w-max text-sm" userStatus={user.status} />
                        )}
                        <p
                            className={cn('line-clamp-1 text-sm text-muted-foreground', {
                                'text-base text-white': user.status !== UserStatus.ACTIVE,
                            })}
                        >
                            {user.email}
                        </p>
                    </div>
                </div>
                {
                    <div
                        className={cn('size-3 rounded-full border-2', {
                            'border-green-500': user.status === UserStatus.ACTIVE,
                            'border-red-500': user.status === UserStatus.NOT_VERIFIED,
                            'border-blue-500': user.status === UserStatus.ON_BOARDING,
                        })}
                    />
                }
            </div>
            {/* <div className="col-span-2 ml-2 flex flex-col justify-between px-2">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-start gap-2">
                            <Flag round flag="en" />
                            <h3 className="line-clamp-1">{user.title.en}</h3>
                        </div>
                        <div className="flex items-start gap-2">
                            <Flag round flag="id" />
                            <h3 className="line-clamp-1">{user.title.id}</h3>
                        </div>
                    </div>
                    <div className="mt-4 space-y-1">
                        <p className="text-xs font-light text-muted-foreground">Created By</p>
                        <InputorInfo
                            authorId={user.author.id}
                            authorName={user.author.username}
                            inputedAt={user.createdAt}
                            noIcon
                        />
                    </div>
                </div> */}
            <div className="flex gap-4 p-2">
                {deleteButton}
                <EditButton className="flex-[1]" small href={`/members/users/${user.id}/edit`} />
                <ViewButton className="flex-[1]" small href={`/members/users/${user.id}`} />
            </div>
        </div>
    )
}

export default UserCard
