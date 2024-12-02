import PageTitleWithBackground from '@/components/any-page-components/page-title-with-background'
import { BaseContainer } from '@/app/(public)/_components/containers/base-container'
import Section from '@/app/(public)/_components/containers/section'
import { Separator } from '@/components/ui/separator'
import { Locale } from '@/i18n/request'
import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { cache } from 'react'
import { getData } from './action'
import prisma from '@/lib/prisma'
import { routing } from '@/i18n/routing'

type Props = {
    params: Promise<{ slug: string; locale: Locale }>
}

const fetchPracticeAreaPageContent = cache(async (slug: string) => {
    return await getData(slug)
})

/**
 * We must Nextjs the possible slugs for this dynamic page, this is this dynamic page's structure:
 * /[locale]/practice-areas/[slug]
 * So that Nextjs can prebuilt all the possible pages statically!
 */
export async function generateStaticParams() {
    const locales = routing.locales.map((locale) => locale)
    const practiceAreaSlugs = (await prisma.practiceArea.findMany({ select: { slug: true } })).map(
        (member) => member.slug,
    )

    const params = []
    for (const locale of locales) {
        for (const slug of practiceAreaSlugs) {
            params.push({ locale, slug })
        }
    }

    return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params

    const { fullName } = await fetchPracticeAreaPageContent(slug)

    const pageTitle = locale === 'en' ? fullName.en : fullName.id

    return {
        title: pageTitle,
    }
}

export default async function PracticeAreaPage({ params }: Props) {
    const { locale, slug } = await params
    /**
     * Enable static rendering (just following next-intl's docs)
     *
     * Refer to next-intl's documentation:
     * https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#static-rendering
     */
    setRequestLocale(locale)

    const pa = await fetchPracticeAreaPageContent(slug)

    const htmlContent = locale === 'en' ? pa.content.en : pa.content.id

    // heavy as shiet.. commented for now..
    // const window = new JSDOM('').window
    // const purify = DOMPurify(window)
    // const cleanHtmlContent = purify.sanitize(htmlContent)

    return (
        <BaseContainer>
            <PageTitleWithBackground
                publicUrlFromUploadThing="https://utfs.io/f/4YTZLQcHF0RY7urtob5DOJvheu1RKs3ZwfbE2xA6jHUTBPgr"
                alt="Background image of about us page"
                titleWhite={locale === 'en' ? pa.fullName.en : pa.fullName.id}
            />
            <Section className="mb-12 space-y-6 py-14">
                <div className="flex flex-col gap-5 md:flex-row md:gap-8 lg:gap-12">
                    <div className="relative aspect-[4/1.8] w-full dark:brightness-[85%] max-md:max-h-[250px] md:min-w-[390px]">
                        <Image
                            className="rounded-md object-cover object-center shadow-md"
                            src={pa.imageUrl}
                            alt={`Picture of ${pa.slug}`}
                            fill
                            placeholder="blur"
                            blurDataURL={pa.blurImageUrl}
                        />
                    </div>
                    <p className="practice-area-desc first-letter:text-5xl first-letter:font-semibold">
                        {locale === 'en' ? pa.desc.en : pa.desc.id}
                    </p>
                </div>
                <Separator className="bg-primary/60" />
                <div
                    className="tiptap view mt-6"
                    dangerouslySetInnerHTML={{
                        __html: htmlContent,
                    }}
                />
            </Section>
        </BaseContainer>
    )
}
