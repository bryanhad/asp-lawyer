import LinkSection from '@/components/ui/link-section'
import { cn } from '@/lib/utils'

type Props = {
    titleTop: string
    titleBottom: string
    className?: string
    side?: 'left' | 'right' | 'center'
}

export default function SectionHeading({
    titleTop,
    titleBottom,
    side = 'center',
    className,
}: Props) {
    const href = `${titleTop?.toLowerCase().split(' ').join('-')}-${titleBottom?.toLowerCase().split(' ').join('-')}`

    return (
        <div
            className={cn('flex flex-col items-center gap-2 xl:gap-4', {
                'md:items-start': side === 'left',
                'md:items-end': side === 'right',
            })}
        >
            <h2
                id={href ?? undefined}
                className={cn(
                    'flex max-w-max scroll-m-28 flex-col text-center font-semibold text-primary sm:gap-2 xl:font-bold',
                    className,
                    {
                        'md:items-start': side === 'left',
                        'md:items-end': side === 'right',
                    },
                )}
            >
                <span className="text-3xl text-gray-600 lg:text-3xl xl:text-4xl">
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
                        'md:rounded-full': side === 'center',
                        'md:rounded-r-full': side === 'left',
                        'md:rounded-l-full': side === 'right',
                    },
                )}
            />
        </div>
    )
}
