import { Suspense } from 'react'
import FetchComponent from './fetch-component'
import SkeletonFallback from './skeleton'

export default function PracticeAreaCards() {
    return (
        <>
        <Suspense fallback={<SkeletonFallback/>}>
            <FetchComponent />
        </Suspense>
        </>
    )
}
