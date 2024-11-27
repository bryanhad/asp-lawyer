import PageTitleWithBackground from '@/components/any-page-components/page-title-with-background'
import { BaseContainer } from '@/components/containers/base-container'
import Section from '@/components/containers/section'
import { capitalizeFirstLetter, cn } from '@/lib/utils'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { cache } from 'react'
import { getCurrentLocale } from '../../layout'
import { getData } from './action'

import { poppins } from '@/app/[locale]/fonts'
import { Briefcase, NotebookPen } from 'lucide-react'
import MemberInfo from './_components/member-info'

type Props = {
    params: Promise<{ slug: string }>
}

const fetchMemberPageContent = cache(async (slug: string) => {
    return await Promise.all([
        getTranslations('eachMemberPage'),
        getData(slug),
        getCurrentLocale(),
    ])
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const [t, member] = await fetchMemberPageContent(slug)

    const capitalizedName = capitalizeFirstLetter(member.name)

    return {
        title: t('pageTitle', { name: capitalizedName }),
    }
}

export default async function MemberPage({ params }: Props) {
    const { slug } = await params
    const [t, member, currentLocale] = await fetchMemberPageContent(slug)

    const memberExperiences =
        currentLocale === 'en' ? member.experience.en : member.experience.id

    return (
        <BaseContainer>
            <PageTitleWithBackground
                publicUrlFromUploadThing="https://utfs.io/f/4YTZLQcHF0RY0C07LqvRxZw1sVP7NFXpDebCmyBYLAuWirln"
                alt="Background image of about us page"
                titleWhite={t('titleWhite')}
                titlePrimary={member.name}
            />
            <Section lessYSpacing className="max-md:py-8">
                {/* TOP DESKTOP SECTION */}
                <div className="flex flex-col items-start gap-8 md:flex-row md:gap-14">
                    <div className="relative mx-auto w-full max-w-[350px] overflow-hidden rounded-md bg-secondary shadow-sm md:min-w-[300px] lg:min-w-[360px]">
                        <Image
                            src={member.imageUrl}
                            alt={`Picture of ${member.name}`}
                            width={400}
                            height={400}
                            placeholder="blur"
                            blurDataURL={member.blurImageUrl}
                        />
                        <div
                            className={cn(
                                poppins.className,
                                'absolute bottom-0 left-0 z-30 flex w-full flex-col bg-stone-100/90 px-8 py-3 font-semibold backdrop-blur-sm dark:bg-secondary/70 max-md:text-sm',
                            )}
                        >
                            <div className="flex flex-col space-y-1">
                                <p className="text-lg text-stone-700 dark:text-primary">
                                    {member.name}
                                </p>
                                <div className="flex justify-between">
                                    <p className="font-light">
                                        {currentLocale === 'en'
                                            ? member.degree.en
                                            : member.degree.id}
                                    </p>
                                </div>
                            </div>
                            <p className="absolute bottom-0 right-0 z-30 rounded-tl-md bg-primary/80 px-4 py-1 text-white backdrop-blur-sm max-md:text-sm">
                                {currentLocale === 'en'
                                    ? member.position.en
                                    : member.position.id}
                            </p>
                        </div>
                    </div>
                    {/* CONTENT */}
                    <div className="flex flex-col gap-8 px-6 lg:px-0">
                        <MemberInfo
                            icon={
                                <NotebookPen className="shrink-0" size={30} />
                            }
                            titleTop={t('aboutMe.titlWhite')}
                            titleBottom={''}
                        >
                            <p className="whitespace-pre-line text-muted-foreground">
                                {currentLocale === 'en'
                                    ? member.bio.en
                                    : member.bio.id}
                            </p>
                        </MemberInfo>
                        <MemberInfo
                            icon={<Briefcase className="shrink-0" size={30} />}
                            titleTop={t('myExperiences.titlWhite')}
                            titleBottom=""
                            scrollClassName="md:max-h-[300px]"
                        >
                            <ul className="list-disc space-y-1 text-muted-foreground">
                                {memberExperiences.length > 0 ? (
                                    memberExperiences.map((exp, i) => (
                                        <li key={i} className="ml-5">
                                            {exp}
                                        </li>
                                    ))
                                ) : (
                                    <li className="ml-5">
                                        {t('myExperiences.fallback')}
                                    </li>
                                )}
                            </ul>
                        </MemberInfo>
                    </div>
                </div>
                {/* BOTTOM DESKTOP SECTION */}
                {/* <div className="grid grid-cols-1 mt-5 md:mt-12 md:grid-cols-2 px-6 lg:px-0">
                    <MemberInfo
                        titleTop={t('myAchievement.titlWhite')}
                        titleBottom={t('myAchievement.titlePrimary')}
                    >
                        <ul className="list-disc space-y-1 text-muted-foreground">
                            {memberAchievements.length > 0 ? (
                                memberAchievements.map((exp, i) => (
                                    <li key={i} className="ml-5">
                                        {exp}
                                    </li>
                                ))
                            ) : (
                                <li className="ml-5">
                                    {t('myAchievement.fallback')}
                                </li>
                            )}
                        </ul>
                    </MemberInfo>
                </div> */}
            </Section>
        </BaseContainer>
    )
}
