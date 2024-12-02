import { getCurrentLocale } from '@/app/(public)/[locale]/layout'
import { cache } from 'react'
import { getData } from './action'
import PracticeAreaTagsWithPreview from './tags-with-preview'

export const fetchPracticeAreasPreviewData = cache(async () => {
    return await getData()
})

export default async function FetchComponent() {
    const practiceAreasData = await fetchPracticeAreasPreviewData()
    const currentLocale = await getCurrentLocale()

    return (
        <PracticeAreaTagsWithPreview
            practiceAreas={practiceAreasData}
            currentLocale={currentLocale}
        />
    )
}
