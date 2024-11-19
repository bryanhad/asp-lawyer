import { BaseContainer } from '@/components/containers/base-container'
import Section from '@/components/containers/section'
import { Language } from '@/lib/enum'
import { Metadata } from 'next'
import { cache } from 'react'
import { getCurrentLocale } from '../../layout'
import { getData } from './action'
import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

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

    const pageTitle = currentLocale === Language.EN ? fullName.en : fullName.id

    return {
        title: pageTitle,
    }
}

export default async function MemberPage({ params }: Props) {
    const { slug } = await params
    const [{ content, fullName: _ }, currentLocale] =
        await fetchPracticeAreaPageContent(slug)

    const htmlContent = currentLocale === Language.EN ? content.en : content.id

    const window = new JSDOM('').window
    const purify = DOMPurify(window)
    const cleanHtmlContent = purify.sanitize(htmlContent)

    return (
        <BaseContainer>
            <Section>
                <div
                    className="tiptap view"
                    dangerouslySetInnerHTML={{
                        __html: cleanHtmlContent,
                    }}
                />
            </Section>
        </BaseContainer>
    )
}
