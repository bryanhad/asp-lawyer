import {
    Briefcase,
    LayoutDashboard,
    ScrollText,
    Settings,
    UserRound,
    Users,
} from 'lucide-react'
import NavLink from './nav-link'

const SIDEBAR_SECTIONS = [
    {
        title: 'General',
        items: [
            {
                title: 'Dashboard',
                href: '/members',
                icon: <LayoutDashboard className="shrink-0" />,
            },
            // {
            //     title: 'Users',
            //     href: '/members/users',
            //     icon: <UserRound className="shrink-0" />,
            // },
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
                href: '/settings',
                icon: <Settings className="shrink-0" />,
            },
        ],
    },
]

export default function Sidebar() {
    return (
        <aside className="hidden min-w-[300px] border-r p-6 lg:block">
            <nav className="flex flex-col gap-2">
                {SIDEBAR_SECTIONS.map((section) => (
                    <div key={section.title}>
                        <h3 className="mb-1 ml-3 text-sm text-muted-foreground">
                            {section.title}
                        </h3>
                        <ul className="ml-4 flex flex-col gap-1">
                            {section.items.map((item) => (
                                <li key={item.title}>
                                    <NavLink item={item} />
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>
        </aside>
    )
}
