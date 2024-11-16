'use client'

import { AnimatedTestimonialProps } from '@/components/ui/animated-testimonials'
import dynamic from 'next/dynamic'
import Skeleton from './skeleton'
const AnimatedTestimonials = dynamic(
    () => import('@/components/ui/animated-testimonials'),
    {
        ssr: false,
        loading: () => <Skeleton />,
    },
)

export default function SeniorQuotes({ ...props }: AnimatedTestimonialProps) {
    return (
        <>
            <AnimatedTestimonials {...props} />
        </>
    )
}
