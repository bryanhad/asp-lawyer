import { getTranslations } from 'next-intl/server'
import { SectionContainer } from '../ui/containers'
import SectionHeading from '../ui/section-heading'
import LinkButton from '../ui/link-button'

export default async function AboutUsPreview() {
    const t = await getTranslations('homePage.aboutUsPreview')

    return (
        <SectionContainer
            title={<SectionHeading>{t('title')}</SectionHeading>}
            desc={<p className="text-center">{t('desc')}</p>}
        >
            <LinkButton variant={'outline-accent'} href={'/about-us'}>
                {t('callToAction')}
            </LinkButton>
        </SectionContainer>
    )
}
