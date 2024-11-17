'use client'

import { AnimatedCardProps } from '@/components/ui/animated-cards'
import dynamic from 'next/dynamic'
import Skeleton from './skeleton'

const AnimatedTestimonials = dynamic(
    () => import('@/components/ui/animated-cards'),
    {
        ssr: false,
        loading: () => <Skeleton />,
    },
)

export default function LawyerQuotesComponent({ ...props }: AnimatedCardProps) {
    return <AnimatedTestimonials {...props} />
}
