import { PracticeAreaPreviewData } from '@/app/api/practice-areas/preview/route'
import { Locale } from '@/i18n/request'
import kyInstance from '@/lib/ky'
import { getLocale } from 'next-intl/server'
import ClientPracticeAreas from './client-practice-areas'
import { cache } from 'react'

export const fetchPracticeAreasPreviewData = cache(async () => {
    return await kyInstance
        .get('api/practice-areas/preview')
        .json<PracticeAreaPreviewData[]>()
})

export default async function ServerPracticeAreas() {
    const data = await fetchPracticeAreasPreviewData()

    const currentLocale = (await getLocale()) as Locale

    return <ClientPracticeAreas data={data} currentLocale={currentLocale} />
}
