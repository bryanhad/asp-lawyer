import { getCurrentLocale } from '@/app/[locale]/layout'
import { cache } from 'react'
import { getPracticeAreasData } from './action'
import ClientPracticeAreas from './client-practice-areas'

export const fetchPracticeAreasPreviewData = cache(async () => {
    return await getPracticeAreasData()
})

export default async function ServerPracticeAreas() {
    const practiceAreasData = await getPracticeAreasData()
    const currentLocale = await getCurrentLocale()

    return (
        <ClientPracticeAreas
            practiceAreas={practiceAreasData}
            currentLocale={currentLocale}
        />
    )
}
