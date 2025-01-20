'use client'

import TableDataNotFound from '@/app/(protected-members-routes)/_components/tables/table-data-not-found'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { EditButton, ViewButton } from '../../../_components/buttons'
import { useMembersData } from './display-component'
import { SkeletonFallbackDesktop, SkeletonFallbackMobile } from './skeleton'
import { useMembersTableContext } from './table-context'

export default function UsersTable() {
    const { isLoading } = useMembersTableContext()
    const { data } = useMembersData()

    /**
     * data is ready when, 
     * - the fetch isn't loading 
     * - AND data is present
     */
    const DATA_READY = !isLoading && !!data

    return (
        <div className="flex-[1] bg-background md:rounded-md md:border">
            {/* MOBILE */}
            <div className="flex flex-col gap-4 md:hidden">
                {!DATA_READY && <SkeletonFallbackMobile />}
                {DATA_READY && data.members.length < 1 && <TableDataNotFound notForTable tableName="user" />}
                {DATA_READY &&
                    data.members.length > 0 &&
                    data.members.map((member) => (
                        <p key={member.id}>{member.name}</p>
                        // <UserCard
                        //     key={user.id}
                        //     {...user}
                        //     deleteButton={
                        //         <ViewButton
                        //             href={`/members/users/${user.id}`}
                        //             className="col-span-2 min-w-min xl:order-3 xl:col-span-1"
                        //             small
                        //         />
                        //     }
                        // />
                    ))}
            </div>
            {/* DESKTOP */}
            <Table
                className={cn('flex-[1] max-md:hidden', {
                    'border-b': !data || data.members.length > 0,
                })}
            >
                {/* type FetchedMemberEntry = Pick<Member, 'id' | 'name' | 'role' | 'order' | 'email' | 'imageUrl' | 'slug' | "createdAt"> & {
                    inputor: {
                        id: number
                        username:string
                    } */}
                <colgroup>
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '25%' }} />
                    <col style={{ width: '10%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '30%' }} />
                </colgroup>
                <TableHeader>
                    <TableRow className="bg-accent text-accent-foreground duration-300">
                        <TableHead className="w-[60px] text-nowrap">No</TableHead>
                        <TableHead className="text-nowrap">Member</TableHead>
                        <TableHead className="text-nowrap">Role</TableHead>
                        <TableHead className="text-nowrap">Inputor</TableHead>
                        <TableHead className="text-nowrap">Editor</TableHead>
                        <TableHead className="min-w-[140px] text-nowrap text-right max-md:hidden xl:min-w-[200px]">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {!DATA_READY && <SkeletonFallbackDesktop />}
                    {DATA_READY && data.members.length < 1 && (
                        // TODO: fix hasFilters
                        <TableDataNotFound colSpan={7} hasFilters={data.fetchDetail.isUsingFilter} tableName="user" />
                    )}
                    {DATA_READY &&
                        data.members.length > 0 &&
                        data.members.map((member, idx) => (
                            <TableRow key={member.id}>
                                <TableCell className="text-center">
                                    {idx + 1 + data.fetchDetail.fetchSize * (data.fetchDetail.currentPage - 1)}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {member.name}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {member.role}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {JSON.stringify(member.inputor)}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {JSON.stringify(member.editor)}
                                    </div>
                                </TableCell>
                                <TableCell className="max-md:hidden">
                                    <div className="grid grid-cols-2 gap-2 xl:grid-cols-3">
                                        <ViewButton
                                            href={`/members/team-members/${member.id}`}
                                            className="col-span-2 min-w-min xl:order-3 xl:col-span-1"
                                            small
                                        />
                                        <ViewButton href={`/members/team-members/${member.id}`} className="min-w-min" small />
                                        {/* <DeleteButton
                                            small
                                            className="min-w-min"
                                            toBeDeletedName={user.title.en}
                                            onApprove={() => deleteUser(user.id)}
                                            isPending={isDeleteUserPending}
                                            isSuccessful={isDeleteUserSuccessful}
                                        /> */}
                                        <EditButton
                                            small
                                            href={`/members/team-members/${member.id}/edit`}
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
