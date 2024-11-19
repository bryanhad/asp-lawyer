import { Suspense } from 'react'
import FetchComponent from './fetch-component'

export default function PracticeAreaCards() {
    return (
        <Suspense fallback='Loading..'>
            <FetchComponent />
        </Suspense>
    )
}
