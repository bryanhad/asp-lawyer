import { BaseContainer } from '@/components/containers/base-container'
import { SectionContainer } from '@/components/containers/section-container'
import { capitalizeFirstLetter } from '@/lib/utils'
import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { cache } from 'react'

type Props = {
    params: Promise<{ slug: string }>
}

const getPageTranslation = cache(async () => {
    return await getTranslations('eachMemberPage')
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const t = await getPageTranslation()
    const { slug } = await params

    const capitalizedSlug = capitalizeFirstLetter(slug)

    return {
        title: t('pageTitle', { name: capitalizedSlug }),
    }
}

export default async function MemberPage({ params }: Props) {
    const t = await getPageTranslation()

    const { slug } = await params
    const capitalizedSlug = capitalizeFirstLetter(slug)

    return (
        <BaseContainer>
            <SectionContainer variant="naked">
                <div className="p-7">
                    <h1 className="text-xl font-bold">
                        {t('wellcome', { name: capitalizedSlug })}
                    </h1>
                </div>
            </SectionContainer>
        </BaseContainer>
    )
}
