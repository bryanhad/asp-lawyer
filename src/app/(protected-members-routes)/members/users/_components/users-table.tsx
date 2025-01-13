'use client'

import TableDataNotFound from '@/app/(protected-members-routes)/_components/tables/table-data-not-found'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { EditButton, ViewButton } from '../../../_components/buttons'
import { useUsersData } from './display-component'
import { SkeletonFallbackDesktop, SkeletonFallbackMobile } from './skeleton'
import { useUsersTableContext } from './table-context'
import UserAvatar from '@/components/ui/user/avatar'
import { UserStatus } from '@/lib/enum'
import UserStatusBadge from '@/app/(protected-members-routes)/_components/tables/user-status-badge'

export default function UsersTable() {
    const { isLoading } = useUsersTableContext()
    const { data } = useUsersData()

    // const queryClient = getQueryClient()
    // const { toast } = useToast()
    // DELETE BLOG MUTATION
    // const {
    //     mutate: deleteBlog,
    //     isPending: isDeleteBlogPending,
    //     isSuccess: isDeleteBlogSuccessful,
    // } = useMutation({
    //     mutationFn: deleteBlogAction,
    //     onSuccess: ({ success, message }) => {
    //         if (success) {
    //             // revalidate client cache
    //             queryClient.invalidateQueries({ queryKey: BLOGS_QUERY_KEY })
    //         }
    //         toast({ variant: success ? 'successful' : 'destructive', description: message })
    //     },
    //     onError: () => {
    //         toast({ variant: 'destructive', description: 'Internal server error' })
    //     },
    // })

    if (!data) return null

    return (
        <div className="flex-[1] bg-background md:rounded-md md:border">
            {/* MOBILE */}
            <div className="flex flex-col gap-4 md:hidden">
                {isLoading && <SkeletonFallbackMobile />}
                {!isLoading && data.users.length < 1 && <TableDataNotFound notForTable tableName="blog" />}
                {/* {!isLoading &&
                    data.users.length > 0 &&
                    data.users.map((blog) => (
                        <BlogCard
                            key={blog.id}
                            {...blog}
                            deleteButton={
                                <DeleteButton
                                    small
                                    className="flex-[1]"
                                    toBeDeletedName={blog.title.en}
                                    onApprove={() => deleteBlog(blog.id)}
                                    isPending={isDeleteBlogPending}
                                    isSuccessful={isDeleteBlogSuccessful}
                                />
                            }
                        />
                    ))} */}
            </div>
            {/* DESKTOP */}
            <Table
                className={cn('flex-[1] max-md:hidden', {
                    'border-b': data.users.length > 0,
                })}
            >
                <colgroup>
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '30%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '20%' }} />
                    <col style={{ width: '30%' }} />
                </colgroup>
                <TableHeader>
                    {/* type FetchedUserEntry = Pick<User, 'id' | 'email' | 'username' | 'emailIsVerified' | 'status'> & {
                        blog_count: number
                    } */}
                    <TableRow className="bg-accent text-accent-foreground duration-300">
                        <TableHead className="w-[60px] text-nowrap">No</TableHead>
                        <TableHead className="text-nowrap">User</TableHead>
                        <TableHead className="text-nowrap">Email</TableHead>
                        <TableHead className="text-nowrap">Status</TableHead>
                        <TableHead className="min-w-[140px] text-nowrap text-right max-md:hidden xl:min-w-[200px]">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading && <SkeletonFallbackDesktop />}
                    {!isLoading && data.users.length < 1 && (
                        // TODO: fix hasFilters
                        <TableDataNotFound colSpan={7} hasFilters={data.fetchDetail.isUsingFilter} tableName="blog" />
                    )}
                    {!isLoading &&
                        data.users.length > 0 &&
                        data.users.map((user, idx) => (
                            <TableRow key={user.id}>
                                <TableCell className="text-center">
                                    {idx + 1 + data.fetchDetail.fetchSize * (data.fetchDetail.currentPage - 1)}
                                </TableCell>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-4">
                                        <UserAvatar username={user.status !== UserStatus.ACTIVE ? '' : user.username} />
                                        <p className={cn("line-clamp-1 w-full", {
                                            "italic text-muted-foreground": user.status !== UserStatus.ACTIVE
                                        })}>
                                            {/* TODO: handle if user's status is hold */}
                                            {user.username === 'PLACEHOLDER_USERNAME'
                                                ? user.status === UserStatus.NOT_VERIFIED
                                                    ? 'not verified'
                                                    : 'onboarding'
                                                : user.username}
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <p className="line-clamp-1">{user.email}</p>
                                </TableCell>
                                <TableCell>
                                    <p className="line-clamp-1">
                                        <UserStatusBadge userStatus={user.status} />
                                    </p>
                                </TableCell>
                                <TableCell className="max-md:hidden">
                                    <div className="grid grid-cols-2 gap-2 xl:grid-cols-3">
                                        <ViewButton
                                            href={`/members/users/${user.id}`}
                                            className="col-span-2 min-w-min xl:order-3 xl:col-span-1"
                                            small
                                        />
                                        <ViewButton href={`/members/users/${user.id}`} className="min-w-min" small />
                                        {/* <DeleteButton
                                            small
                                            className="min-w-min"
                                            toBeDeletedName={blog.title.en}
                                            onApprove={() => deleteBlog(blog.id)}
                                            isPending={isDeleteBlogPending}
                                            isSuccessful={isDeleteBlogSuccessful}
                                        /> */}
                                        <EditButton
                                            small
                                            href={`/members/users/${user.id}/edit`}
                                            className="min-w-min"
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    )
}
