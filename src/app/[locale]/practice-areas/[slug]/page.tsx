import { BaseContainer } from '@/components/containers/base-container'
import Section from '@/components/containers/section'
import { Metadata } from 'next'
import { cache } from 'react'
import { getCurrentLocale } from '../../layout'
import { getData } from './action'
import PageTitleWithBackground from '@/components/any-page-components/page-title-with-background'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'

type Props = {
    params: Promise<{ slug: string }>
}

const fetchPracticeAreaPageContent = cache(async (slug: string) => {
    return await Promise.all([getData(slug), getCurrentLocale()])
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params

    const [{ fullName }, currentLocale] =
        await fetchPracticeAreaPageContent(slug)

    const pageTitle = currentLocale === 'en' ? fullName.en : fullName.id

    return {
        title: pageTitle,
    }
}

export default async function PracticeAreaPage({ params }: Props) {
    const { slug } = await params
    const [practiceArea, currentLocale] =
        await fetchPracticeAreaPageContent(slug)

    const htmlContent =
        currentLocale === 'en'
            ? practiceArea.content.en
            : practiceArea.content.id

    // heavy as shiet.. commented for now..
    // const window = new JSDOM('').window
    // const purify = DOMPurify(window)
    // const cleanHtmlContent = purify.sanitize(htmlContent)

    return (
        <BaseContainer>
            <PageTitleWithBackground
                publicUrlFromUploadThing="https://utfs.io/f/4YTZLQcHF0RY7urtob5DOJvheu1RKs3ZwfbE2xA6jHUTBPgr"
                alt="Background image of about us page"
                titleWhite={
                    currentLocale === 'en'
                        ? practiceArea.fullName.en
                        : practiceArea.fullName.id
                }
            />
            <Section className="mb-12 space-y-6 py-14">
                <div className="flex flex-col md:flex-row gap-5 md:gap-8 lg:gap-12">
                    <div className="relative aspect-[4/1.8] max-md:max-h-[250px] md:min-w-[390px] w-full dark:brightness-[85%]">
                        <Image
                            className="rounded-md object-cover object-center shadow-md"
                            src={practiceArea.imageUrl}
                            alt={`Picture of ${practiceArea.slug}`}
                            fill
                            placeholder="blur"
                            blurDataURL={practiceArea.blurImageUrl}
                        />
                    </div>
                    <p className='practice-area-desc first-letter:text-5xl first-letter:font-semibold'>
                        {currentLocale === 'en'
                            ? practiceArea.desc.en
                            : practiceArea.desc.id}
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
