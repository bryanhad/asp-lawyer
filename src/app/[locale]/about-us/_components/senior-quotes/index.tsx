import { Suspense } from 'react'
import Section from '@/components/containers/section'
import SkeletonFallback from './skeleton'
import FetchComponent from './fetch-component'

export default async function SeniorQuotesSection() {
    return (
        <div className="w-full bg-secondary">
            <Section className="mx-auto" lessYSpacing>
                <Suspense fallback={<SkeletonFallback />}>
                    <FetchComponent />
                </Suspense>
            </Section>
        </div>
    )
}
