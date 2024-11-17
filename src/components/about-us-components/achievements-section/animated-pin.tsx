'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export const PinContainer = ({
    children,
    title,
    className,
    containerClassName,
}: {
    children: React.ReactNode
    title?: string
    className?: string
    containerClassName?: string
}) => {
    const [transform, setTransform] = useState(
        'translate(-50%,-50%) rotateX(0deg)',
    )

    const onMouseEnter = () => {
        setTransform('translate(-50%,-50%) rotateX(40deg) scale(0.8)')
    }
    const onMouseLeave = () => {
        setTransform('translate(-50%,-50%) rotateX(0deg) scale(1)')
    }

    return (
        <div
            className={cn(
                'group/pin relative z-50',
                containerClassName,
            )}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div
                style={{
                    perspective: '1000px',
                    transform: 'rotateX(70deg) translateZ(0deg)',
                }}
                className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
            >
                <div
                    style={{
                        transform: transform,
                    }}
                    className="absolute left-1/2 top-1/2 flex items-start justify-start overflow-hidden rounded-2xl bg-background shadow-[0_8px_16px_rgb(0_0_0/0.4)] transition duration-700 group-hover/pin:border-white/[0.2]"
                >
                    <div className={cn('relative z-50', className)}>
                        {children}
                    </div>
                    <div className="absolute inset-0 z-[60] bg-black bg-opacity-0 transition duration-500 group-hover/pin:bg-opacity-30 dark:bg-black dark:bg-opacity-0"></div>
                </div>
            </div>
            <PinPerspective title={title} />
        </div>
    )
}

export const PinPerspective = ({ title }: { title?: string }) => {
    return (
        <motion.div className="pointer-events-none z-[60] flex h-96 w-full items-center justify-center opacity-0 transition duration-500 group-hover/pin:opacity-100">
            <div className="inset-0 -mt-7 h-full w-full flex-none">
                <div className="absolute inset-x-0 top-0 flex justify-center">
                    <div className="relative z-10 max-w-[500px] flex items-center space-x-2 rounded-md bg-secondary/80 p-5 ring-1 ring-white/10 backdrop-blur-sm">
                        <span className="relative z-20 inline-block text-center text-sm text-foreground">
                            {title}
                        </span>

                        {/* Cool Underlight Effect */}
                        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-primary/0 via-primary/90 to-primary/0 transition-opacity duration-500 group-hover/btn:opacity-40"></span>
                    </div>
                </div>

                <div
                    style={{
                        perspective: '1000px',
                        transform: 'rotateX(70deg) translateZ(0)',
                    }}
                    className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
                >
                    <>
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0,
                                x: '-50%',
                                y: '-50%',
                            }}
                            animate={{
                                opacity: [0, 1, 0.5, 0],
                                scale: 1,

                                z: 0,
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                delay: 0,
                            }}
                            className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
                        ></motion.div>
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0,
                                x: '-50%',
                                y: '-50%',
                            }}
                            animate={{
                                opacity: [0, 1, 0.5, 0],
                                scale: 1,

                                z: 0,
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                delay: 2,
                            }}
                            className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
                        ></motion.div>
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0,
                                x: '-50%',
                                y: '-50%',
                            }}
                            animate={{
                                opacity: [0, 1, 0.5, 0],
                                scale: 1,

                                z: 0,
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                delay: 4,
                            }}
                            className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
                        ></motion.div>
                    </>
                </div>

                <>
                    <motion.div className="absolute bottom-1/2 right-1/2 h-20 w-px translate-y-[14px] bg-gradient-to-b from-transparent to-primary blur-[2px] group-hover/pin:h-40" />
                    <motion.div className="absolute bottom-1/2 right-1/2 h-20 w-px translate-y-[14px] bg-gradient-to-b from-transparent to-primary group-hover/pin:h-40" />
                    <motion.div className="absolute bottom-1/2 right-1/2 z-40 h-[4px] w-[4px] translate-x-[1.5px] translate-y-[14px] rounded-full bg-primary blur-[3px]" />
                    <motion.div className="absolute bottom-1/2 right-1/2 z-40 h-[2px] w-[2px] translate-x-[0.5px] translate-y-[14px] rounded-full bg-primary" />
                </>
            </div>
        </motion.div>
    )
}
