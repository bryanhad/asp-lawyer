import LinkSection from '@/components/ui/link-section'
import { cleanString, cn } from '@/lib/utils'
import { sourceSerif4 } from '@/app/[locale]/fonts'

export type Props = {
    titleTop: string
    titleBottom: string
    className?: string
    side?: 'left' | 'right' | 'center'
    textAlign?: 'left' | 'right' | 'center'
    oneLine?: boolean
    flipText?: boolean
    lessAccentLineYSpacing?:boolean
    lessImportant?:boolean
}

export default function SectionHeading({
    titleTop,
    titleBottom,
    side = 'center',
    className,
    textAlign,
    oneLine = false,
    flipText = false,
    lessAccentLineYSpacing = false,
    lessImportant = false
}: Props) {
    const href = `${cleanString(!flipText ? titleTop : titleBottom)
        .toLowerCase()
        .split(' ')
        .join('-')}-${cleanString(!flipText ? titleBottom : titleTop)
        .toLowerCase()
        .split(' ')
        .join('-')}`

    return (
        <div
            className={cn(
                'flex select-none flex-col items-center gap-2 xl:gap-4',
                {
                    // prioritize textAlign value
                    'md:items-start':
                        textAlign === 'left' || (!textAlign && side === 'left'),
                    // prioritize textAlign value
                    'md:items-end':
                        textAlign === 'right' ||
                        (!textAlign && side === 'right'),
                    'md:items-center': textAlign === 'center',
                    'xl:gap-2': lessAccentLineYSpacing === true
                },
            )}
        >
            <h2
                id={href ?? undefined}
                className={cn(
                    sourceSerif4.className,
                    'flex max-w-max scroll-m-28 flex-col items-center text-center text-primary sm:gap-1 xl:font-bold ',
                    className,
                    {
                        // prioritize textAlign value
                        'md:items-start':
                            textAlign === 'left' ||
                            (!textAlign && side === 'left'),
                        // prioritize textAlign value
                        'md:items-end':
                            textAlign === 'right' ||
                            (!textAlign && side === 'right'),
                        'md:items-center': textAlign === 'center',
                    },
                )}
            >
                {oneLine ? (
                    <LinkSection
                        titleTop={!flipText ? titleTop : titleBottom}
                        titleBottom={!flipText ? titleBottom : titleTop}
                        size={24}
                    >
                        {!flipText ? (
                            <>
                                <span className="text-4xl text-secondary-foreground lg:text-4xl xl:text-5xl">
                                    {titleTop}
                                </span>
                                <span className="ml-4 text-4xl text-primary lg:text-4xl xl:text-5xl">
                                    {titleBottom}
                                </span>
                            </>
                        ) : (
                            <>
                                <span className="mr-4 text-4xl text-primary lg:text-4xl xl:text-5xl">
                                    {titleBottom}
                                </span>
                                <span className="text-3xl text-secondary-foreground lg:text-4xl xl:text-5xl">
                                    {titleTop}
                                </span>
                            </>
                        )}
                    </LinkSection>
                ) : (
                    <>
                        <span className="text-3xl text-secondary-foreground lg:text-3xl xl:text-5xl">
                            {titleTop}
                        </span>
                        <LinkSection
                            titleTop={!flipText ? titleTop : titleBottom}
                            titleBottom={!flipText ? titleBottom : titleTop}
                            size={24}
                        >
                            <span className="text-4xl text-primary lg:text-5xl xl:text-6xl">
                                {titleBottom}
                            </span>
                        </LinkSection>
                    </>
                )}
            </h2>
            {!lessImportant && 
            <div
                className={cn(
                    'h-1 w-12 bg-primary max-md:rounded-full xl:h-2 xl:w-20',
                    {
                        // prioritize textAlign value
                        'md:rounded-r-full':
                            textAlign === 'left' ||
                            (!textAlign && side === 'left'),
                        // prioritize textAlign value
                        'md:rounded-l-full':
                            textAlign === 'right' ||
                            (!textAlign && side === 'right'),
                        'md:rounded-full':
                            textAlign === 'center' || side === 'center',
                    },
                )}
            />
            }
        </div>
    )
}
