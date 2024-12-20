import { fetchPracticeAreasPreviewData } from '@/app/(public)/_components/practice-areas/fetch-component'
import { getCurrentLocale } from '@/app/(public)/[locale]/layout'
import { Link } from '@/i18n/routing'
import { Facebook, Instagram, Linkedin } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

export default async function Footer() {
    const currentLocale = await getCurrentLocale()
    const [t, tLinks, tContactUs, practiceAreasData] = await Promise.all([
        getTranslations('footer'),
        getTranslations('links'),
        getTranslations('contactUs'),
        fetchPracticeAreasPreviewData(),
    ])

    const links = [
        {
            title: tLinks('aboutUs'),
            href: '/about-us',
        },
        {
            title: tLinks('ourTeam'),
            href: '/our-team',
        },
        {
            title: tLinks('contactUs'),
            href: '/contact-us',
        },
        {
            title: tLinks('blogs'),
            href: '/blogs',
        },
        {
            title: tLinks('privacyPolicy'),
            href: '/privacy-policy',
        },
        {
            title: tLinks('termsOfService'),
            href: '/terms-of-service',
        },
    ]

    return (
        <footer className="relative z-20 border-t border-border bg-background">
            <div className="mx-auto max-w-custom-navbar px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="flex flex-col gap-4 max-md:items-center max-md:text-center">
                        <Image
                            src={'/asp-logo-modified.png'}
                            alt="ASP Logo"
                            width={70}
                            height={40}
                            className="w-auto max-w-[70px]"
                        />
                        <p className="text-sm text-muted-foreground">{t('desc')}</p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Instagram</span>
                                <Instagram className="h-6 w-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                    <div className="max-md:text-center">
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                            {t('practiceAreas')}
                        </h3>
                        <ul className="space-y-2">
                            {practiceAreasData.map((pa) => (
                                <li key={pa.slug}>
                                    <Link
                                        href={`/practice-areas/${pa.slug}`}
                                        className="text-sm text-muted-foreground hover:text-foreground/80"
                                    >
                                        {currentLocale === 'en'
                                            ? !!pa.shortName.en
                                                ? pa.shortName.en
                                                : pa.fullName.en
                                            : pa.shortName.id
                                              ? pa.shortName.id
                                              : pa.fullName.id}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="max-md:text-center">
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                            {t('quickLinks')}
                        </h3>
                        <ul className="space-y-2">
                            {links.map((link) => (
                                <li key={link.title}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground/80"
                                    >
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="max-md:text-center">
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                            {tContactUs('title')}
                        </h3>
                        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <li>{tContactUs('address.building')}</li>
                            <li>{tContactUs('address.street')}</li>
                            <li>{tContactUs('address.district')}</li>
                            <li>{tContactUs('address.city')}</li>
                            <li className="mt-3">{tContactUs('phone.title') + ': ' + tContactUs('phone.desc')}</li>
                            <li>Email: info@asplawfirm.com</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-8 border-t border-border">
                <div className="mx-auto flex max-w-custom-navbar flex-col items-center justify-between px-4 py-10 sm:px-6 md:flex-row lg:px-8">
                    <p className="text-sm text-gray-500">&copy; 2024 ASP Law Firm. {t('allRightsReserved')}</p>
                    <div className="flex gap-2">
                        <p className="mt-4 text-sm text-gray-500 md:mt-0">
                            {t('designedBy')}{' '}
                            <Link href="#" className="text-primary hover:text-primary/90">
                                Bryan Hadinata
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
