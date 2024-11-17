'use client'

import { Locale } from '@/i18n/request'
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type CardItems = {
    name: string
    degree: { id: string; en: string }
    position: { id: string; en: string }
    quote: { id?: string; en?: string }
    src: string
}

export type AnimatedCardProps = {
    cardItems: CardItems[]
    autoplay?: boolean
    currentLocale: Locale
}

const AnimatedCard = ({
    cardItems,
    autoplay = false,
    currentLocale,
}: AnimatedCardProps) => {
    const [active, setActive] = useState(0)

    const handleNext = () => {
        setActive((prev) => (prev + 1) % cardItems.length)
    }

    const handlePrev = () => {
        setActive((prev) => (prev - 1 + cardItems.length) % cardItems.length)
    }

    const isActive = (index: number) => {
        return index === active
    }

    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(handleNext, 5000)
            return () => clearInterval(interval)
        }
    }, [autoplay])

    // const randomRotateY = () => {
    //     return Math.floor(Math.random() * 21) - 10
    // }

    // redefined sequence of rotation angles that cycle through. The Prev method above with using math.random results in hydration error
    const rotateValues = [-10, -5, 0, 5, 10]

    const randomRotateY = (index: number) =>
        rotateValues[index % rotateValues.length]

    const quote =
        currentLocale === 'en'
            ? cardItems[active].quote.en
            : cardItems[active].quote.id

    return (
        <div className="relative z-10 mx-auto max-w-sm px-4 py-10 font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
            <div className="relative grid grid-cols-1 gap-20 md:grid-cols-2">
                <div onClick={handleNext} className="cursor-pointer">
                    <div className="relative h-80 w-full">
                        <AnimatePresence>
                            {cardItems.map((item, index) => (
                                <motion.div
                                    key={item.src}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.9,
                                        z: -100,
                                        rotate: randomRotateY(index),
                                    }}
                                    animate={{
                                        opacity: isActive(index) ? 1 : 0.7,
                                        scale: isActive(index) ? 1 : 0.95,
                                        z: isActive(index) ? 0 : -100,
                                        rotate: isActive(index)
                                            ? 0
                                            : randomRotateY(index),
                                        zIndex: isActive(index)
                                            ? 999
                                            : cardItems.length + 2 - index,
                                        y: isActive(index) ? [0, -80, 0] : 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.9,
                                        z: 100,
                                        rotate: randomRotateY(index),
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        ease: 'easeInOut',
                                    }}
                                    className="absolute inset-0 origin-bottom"
                                >
                                    <Image
                                        src={item.src}
                                        alt={item.name}
                                        width={500}
                                        height={500}
                                        draggable={false}
                                        className="h-full w-full rounded-3xl object-cover object-center"
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="flex flex-col justify-between py-4">
                    <motion.div
                        key={active}
                        initial={{
                            y: 20,
                            opacity: 0,
                        }}
                        animate={{
                            y: 0,
                            opacity: 1,
                        }}
                        exit={{
                            y: -20,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.2,
                            ease: 'easeInOut',
                        }}
                    >
                        <h3 className="space-x-2 text-2xl font-light text-black dark:text-white">
                            <span className='text-primary font-medium'>{cardItems[active].name}</span>
                            <span className="text-muted-foreground">
                                {currentLocale === 'en'
                                    ? cardItems[active].degree.en
                                    : cardItems[active].degree.id}
                            </span>
                        </h3>
                        <p className="text-gray-500 dark:text-neutral-500 px-2 py-1 rounded-full border max-w-max mt-1">
                            {currentLocale === 'en'
                                ? cardItems[active].position.en
                                : cardItems[active].position.id}
                        </p>
                        <div className="relative mt-8">
                            <Image
                                src={'/quote.png'}
                                alt="quote icon"
                                width={200}
                                height={200}
                                className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 opacity-5 dark:invert filter"
                            />
                            <motion.p className="relative z-20 text-lg text-gray-500 dark:text-neutral-300">
                                {quote
                                    ? quote.split(' ').map((word, index) => (
                                          <motion.span
                                              key={index}
                                              initial={{
                                                  filter: 'blur(10px)',
                                                  opacity: 0,
                                                  y: 5,
                                              }}
                                              animate={{
                                                  filter: 'blur(0px)',
                                                  opacity: 1,
                                                  y: 0,
                                              }}
                                              transition={{
                                                  duration: 0.2,
                                                  ease: 'easeInOut',
                                                  delay: 0.02 * index,
                                              }}
                                              className="inline-block italic"
                                          >
                                              {word}&nbsp;
                                          </motion.span>
                                      ))
                                    : 'NO QUOTES AVAILABLE'}
                            </motion.p>
                        </div>
                    </motion.div>
                    <div className="flex gap-4 pt-12 md:pt-0">
                        <button
                            onClick={handlePrev}
                            className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
                        >
                            <IconArrowLeft className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:rotate-12 dark:text-neutral-400" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="group/button flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-800"
                        >
                            <IconArrowRight className="h-5 w-5 text-black transition-transform duration-300 group-hover/button:-rotate-12 dark:text-neutral-400" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnimatedCard
