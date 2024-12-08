import { LayoutDashboard, ScrollText, Settings, UserRound } from 'lucide-react'

export const AVAILABLE_LINKS = [
    {
        title: 'General',
        items: [
            {
                title: 'Dashboard',
                href: '/members',
                icon: <LayoutDashboard className="shrink-0" />,
            },
            {
                title: 'Users',
                href: '/members/users',
                icon: <UserRound className="shrink-0" />,
            },
            // {
            //     title: 'Team Members',
            //     href: '/members/team-members',
            //     icon: <Users className="shrink-0" />,
            // },
            {
                title: 'Blogs',
                href: '/members/blogs',
                icon: <ScrollText className="shrink-0" />,
            },
            // {
            //     title: 'Practice Areas',
            //     href: '/members/practice-areas',
            //     icon: <Briefcase className="shrink-0" />,
            // },
        ],
    },
    {
        title: 'User',
        items: [
            {
                title: 'Settings',
                href: '/members/my-settings',
                icon: <Settings className="shrink-0" />,
            },
        ],
    },
] as const