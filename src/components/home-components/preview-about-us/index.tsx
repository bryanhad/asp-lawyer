import SectionWithBackground from '@/components/containers/section-with-blur-background'
import React from 'react'
import AboutUs from './about-us'

export default function PreviewAboutUs() {
    return (
        // <SectionWithBackground
        //     src="/low-poly-bg-light.svg"
        //     alt="Low poly background"
        //     priority
        // >
        <div className="flex w-full flex-col items-center bg-secondary/60 dark:bg-secondary dark:brightness-90">
            <AboutUs />
        </div>
        // </SectionWithBackground>
    )
}
