import { Locale } from '@/i18n/request'
import { getLocale } from 'next-intl/server'
import { getPracticeAreasData } from './action'
import ClientPracticeAreas from './client-practice-areas'
import { cache } from 'react'

export const fetchPracticeAreasPreviewData = cache(async () => {
    return await getPracticeAreasData()
})

export default async function ServerPracticeAreas() {
    const data = await getPracticeAreasData()
    // const data = await fetchPracticeAreasPreviewData()

    const currentLocale = (await getLocale()) as Locale

    return <ClientPracticeAreas data={data} currentLocale={currentLocale} />
}
