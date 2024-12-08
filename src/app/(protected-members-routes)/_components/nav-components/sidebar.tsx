import { AVAILABLE_LINKS } from './available-links'
import SidebarLinks from './sidebar-links'

export default function Sidebar() {
    return (
        <aside className="hidden min-w-[300px] border-r p-6 lg:block">
            <nav className="flex flex-col gap-2">
                {AVAILABLE_LINKS.map((section) => (
                    <div key={section.title}>
                        <h3 className="mb-1 ml-3 text-sm text-muted-foreground">{section.title}</h3>
                        <SidebarLinks items={section.items} />
                    </div>
                ))}
            </nav>
        </aside>
    )
}
