import { BriefcaseBusiness, Headset, Home, Info, ScrollText, Users } from 'lucide-react'

export const AVAILABLE_LINKS = [
    {
        href: '/',
        icon: <Home className="shrink-0" size={30} />,
        translationKey: 'home'
    },
    {
        href: '/about-us',
        icon: <Info className="shrink-0" size={30} />,
        translationKey: 'aboutUs'
    },
    {
        href: '/practice-areas',
        icon: <BriefcaseBusiness className="shrink-0" size={30} />,
        translationKey: 'practiceAreas'
    },
    {
        href: '/our-team',
        icon: <Users className="shrink-0" size={30} />,
        translationKey: 'ourTeam'
    },
    {
        href: '/blogs',
        icon: <ScrollText className="shrink-0" size={30} />,
        translationKey: 'blogs'
    },
    {
        href: '/contact-us',
        icon: <Headset className="shrink-0" size={30} />,
        translationKey: 'contactUs'
    },
    {
        href: '/test',
        icon: <Headset className="shrink-0" size={30} />,
        translationKey: 'contactUs'
    },
] as const
