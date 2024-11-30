import { useState, useEffect } from 'react'

export const useIsScrolled = (threshold = 50) => {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Check if the user has scrolled down 50px or more
            if (window.scrollY > threshold) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }
        // Run once initially
        handleScroll()
        window.addEventListener('scroll', handleScroll)

        // Clean up the event listener when the component unmounts
        return () => window.removeEventListener('scroll', handleScroll)
    }, [threshold])

    return isScrolled
}
