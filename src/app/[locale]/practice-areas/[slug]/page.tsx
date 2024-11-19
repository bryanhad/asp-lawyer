import { BaseContainer } from '@/components/containers/base-container'
import Section from '@/components/containers/section'
import { Language } from '@/lib/enum'
import { Metadata } from 'next'
import { cache } from 'react'
import { getPracticeAreaPageContent } from '../action'
import { getCurrentLocale } from '../../layout'

type Props = {
    params: Promise<{ slug: string }>
}
const fetchPracticeAreaPageContent = cache(async (slug: string) => {
    return await Promise.all([getPracticeAreaPageContent(slug), getCurrentLocale()])
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params

    const [{ fullName }, currentLocale] =
        await fetchPracticeAreaPageContent(slug)

    const pageTitle = currentLocale === Language.EN ? fullName.en : fullName.id``

    return {
        title: pageTitle,
    }
}

export default async function MemberPage({ params }: Props) {
    const { slug } = await params
    const [{ content, fullName: _ }, currentLocale] =
        await fetchPracticeAreaPageContent(slug)

    const htmlContent = currentLocale === Language.EN ? content.en : content.id

    return (
        <BaseContainer>
            <Section className="prose max-w-custom-wide">
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </Section>
        </BaseContainer>
    )
}
