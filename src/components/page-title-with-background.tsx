import { sourceSerif4 } from '@/app/[locale]/fonts'
import { cn } from '@/lib/utils'
import Image, { ImageProps } from 'next/image'

type Props = { titleWhite: string; titlePrimary: string } & ImageProps

export default function PageTitleWithBackground({
    titleWhite,
    titlePrimary,
    src,
    alt,
    fill = true,
    priority = true,
    className,
    ...imageProps
}: Props) {
    return (
        <div className="relative flex min-h-[40vh] w-full">
            <Image
                src={src}
                alt={alt}
                fill={fill}
                priority={priority}
                className={cn('z-10 object-cover object-center', className)}
                {...imageProps}
            />
            {/* image overlay */}
            <div className="absolute inset-0 z-20 bg-background-suit opacity-80"></div>
            {/* content */}
            <div className="relative z-30 mt-16 grid w-full place-content-center px-2 py-2 lg:mt-20 select-none">
                <h1
                    className={cn(
                        sourceSerif4.className,
                        'flex text-center text-5xl max-lg:flex-col lg:gap-4',
                    )}
                >
                    <span className="text-white">{titleWhite}</span>
                    <span className="text-primary">{titlePrimary}</span>
                </h1>
            </div>
        </div>
    )
}
