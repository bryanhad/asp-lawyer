import { getTranslations } from 'next-intl/server'
import React from 'react'
import { SectionContainer } from '../ui/containers'
import LinkButton from '../ui/link-button'
import BlogEditor from '../blog-components/editor/BlogEditor'
import BioEditor from '../member-components/editor/BioEditor'

export default async function PreviewMembers() {
    const t = await getTranslations('homePage.previewMembers')

    return (
        <SectionContainer title={t('title')} desc={<p>{t('desc')}</p>}>
            <BioEditor />
            <LinkButton variant={'outline-accent'} href={'/members'}>
                {t('callToAction')}
            </LinkButton>
        </SectionContainer>
    )
}
