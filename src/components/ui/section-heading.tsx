import LinkSection from '@/components/ui/link-section'
import { cleanString, cn } from '@/lib/utils'
import { sourceSerif4 } from '@/app/[locale]/fonts'

type Props = {
    titleTop: string
    titleBottom: string
    className?: string
    side?: 'left' | 'right' | 'center'
    textAlign?: 'left' | 'right' | 'center'
}

export default function SectionHeading({
    titleTop,
    titleBottom,
    side = 'center',
    className,
    textAlign,
}: Props) {
    const href = `${cleanString(titleTop).toLowerCase().split(' ').join('-')}-${cleanString(titleBottom).toLowerCase().split(' ').join('-')}`

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
                },
            )}
        >
            <h2
                id={href ?? undefined}
                className={cn(
                    sourceSerif4.className,
                    'flex max-w-max scroll-m-28 flex-col items-center text-center text-primary sm:gap-1 xl:font-bold',
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
                <span className="text-3xl text-secondary-foreground lg:text-3xl xl:text-5xl">
                    {titleTop}
                </span>
                <LinkSection
                    titleTop={titleTop}
                    titleBottom={titleBottom}
                    className="text-primary"
                    size={24}
                >
                    <span className="text-4xl text-primary lg:text-5xl xl:text-6xl">
                        {titleBottom}
                    </span>
                </LinkSection>
            </h2>
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
        </div>
    )
}
