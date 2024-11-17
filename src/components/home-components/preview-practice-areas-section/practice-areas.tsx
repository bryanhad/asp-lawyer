import { getCurrentLocale } from '@/app/[locale]/layout'
import { cache } from 'react'
import { getPracticeAreasData } from './action'
import ClientPracticeAreas from './client-practice-areas'

export const fetchPracticeAreasPreviewData = cache(async () => {
    return await getPracticeAreasData()
})

export default async function ServerPracticeAreas() {
    const data = await getPracticeAreasData()
    const currentLocale = await getCurrentLocale()

    return <ClientPracticeAreas data={data} currentLocale={currentLocale} />
}
