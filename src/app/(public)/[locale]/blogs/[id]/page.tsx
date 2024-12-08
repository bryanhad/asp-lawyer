import PageTitleWithBackground from '@/app/(public)/_components/any-page-components/page-title-with-background'
import { BaseContainer } from '@/app/(public)/_components/containers/base-container'
import Section from '@/app/(public)/_components/containers/section'
import { Locale } from '@/i18n/request'
import { routing } from '@/i18n/routing'
import prisma from '@/lib/prisma'
import { capitalizeFirstLetter } from '@/lib/utils'
import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import Image from 'next/image'
import { cache } from 'react'
import { getData } from './action'

type Props = {
    params: Promise<{ id: string; locale: Locale }>
}

const fetchBlogPageContent = cache(async (id: string) => {
    return await Promise.all([getData(id), getTranslations('blogsPage')])
})

/**
 * We must Nextjs the possible ids for this dynamic page, this is this dynamic page's structure:
 * /[locale]/blogs/[id]
 * So that Nextjs can prebuilt all the possible pages statically!
 */
export async function generateStaticParams() {
    const locales = routing.locales.map((locale) => locale)
    const blogIds = (await prisma.blog.findMany({ select: { id: true } })).map((blog) => blog.id)

    const params = []
    for (const locale of locales) {
        for (const id of blogIds) {
            params.push({ locale, id })
        }
    }

    return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, id } = await params
    const [blog] = await fetchBlogPageContent(id)

    const blogTitle = locale === 'en' ? blog.title.en : blog.title.id

    return {
        title: capitalizeFirstLetter(blogTitle),
    }
}

export default async function BlogPage({ params }: Props) {
    const { locale, id } = await params
    /**
     * Enable static rendering (just following next-intl's docs)
     *
     * Refer to next-intl's documentation:
     * @see https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#static-rendering
     */
    setRequestLocale(locale)

    const [blog, t] = await fetchBlogPageContent(id)

    const htmlContent = locale === 'en' ? blog.content.en : blog.content.id

    return (
        <BaseContainer>
            <PageTitleWithBackground
                publicUrlFromUploadThing="https://utfs.io/f/4YTZLQcHF0RYF2K4jaflMU0DgEQ2tYL7nTGNux3VXJqhH9pj"
                alt="Background image of about us page"
                titleWhite={t('titleWhite')}
                titlePrimary={t('titlePrimary')}
                useh2
            />
            <Section className="mb-12 flex flex-col items-center py-14">
                <h1 className="text-center text-3xl font-bold lg:text-5xl">
                    {locale === 'en' ? blog.title.en : blog.title.id}
                </h1>
                <p className="text-center mt-4 mb-6 xl:mt-6">
                    {new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'id-ID', {
                        // weekday: 'short', // Full weekday name
                        day: '2-digit', // Two-digit day
                        month: 'long', // Full month name
                        year: 'numeric', // Four-digit year
                    }).format(blog.createdAt)}
                </p>

                <div className="relative aspect-[4/2.2] w-full dark:brightness-[85%] max-md:max-h-[250px] md:min-w-[390px] max-w-[768px]">
                    <Image
                        className="rounded-md object-cover object-center shadow-md"
                        src={blog.imageUrl}
                        alt={`Picture of ${blog.title.en}`}
                        fill
                        placeholder="blur"
                        blurDataURL={blog.blurImageUrl}
                    />
                </div>
                <div
                    className="tiptap view mt-6 w-full max-w-[900px]"
                    dangerouslySetInnerHTML={{
                        __html: htmlContent,
                    }}
                />
            </Section>
        </BaseContainer>
    )
}
