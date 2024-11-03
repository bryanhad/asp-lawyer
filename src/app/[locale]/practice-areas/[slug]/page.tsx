import { PracticeAreaPageData } from '@/app/api/practice-areas/[slug]/route'
import { BaseContainer } from '@/components/containers/base-container'
import { SectionContainer } from '@/components/containers/section-container'
import { Language } from '@/lib/enum'
import kyInstance from '@/lib/ky'
import { capitalizeFirstLetter } from '@/lib/utils'
import { Metadata } from 'next'
import { getLocale, getTranslations } from 'next-intl/server'
import { cache } from 'react'

type Props = {
    params: Promise<{ slug: string }>
}

const getPracticeAreaData = cache(async (slug: string) => {
    return await Promise.all([
        kyInstance
            .get(`api/practice-areas/${slug}`)
            .json<PracticeAreaPageData>(),
        getLocale(),
    ])
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params

    const [{ fullName }, currentLocale] = await getPracticeAreaData(slug)

    const pageTitle = currentLocale === Language.EN ? fullName.en : fullName.id

    return {
        title: pageTitle,
    }
}

export default async function MemberPage({ params }: Props) {
    const { slug } = await params
    const [{ content, fullName }, currentLocale] =
        await getPracticeAreaData(slug)

    const htmlContent = currentLocale === Language.EN ? content.en : content.id

    return (
        <SectionContainer variant="naked" className="prose mt-12">
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </SectionContainer>
    )
}
