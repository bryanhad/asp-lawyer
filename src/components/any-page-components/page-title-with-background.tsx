import { sourceSerif4 } from '@/app/[locale]/fonts'
import { cn } from '@/lib/utils'
import Image, { ImageProps } from 'next/image'
import { Scale } from 'lucide-react'
import { Separator } from '../ui/separator'

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
        <div className="relative flex min-h-[230px] w-full lg:min-h-[250px]">
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
            <div className="relative z-30 mt-16 grid w-full select-none place-content-center px-2 py-2 lg:mt-20">
                <h1
                    className={cn(
                        sourceSerif4.className,
                        'flex text-center text-3xl max-lg:flex-col lg:gap-4 lg:text-4xl',
                    )}
                >
                    <span className="text-white">{titleWhite}</span>
                    <span className="text-primary">{titlePrimary}</span>
                </h1>
                <div className="mt-2 flex items-center justify-center gap-4">
                    <Separator className="w-full max-w-[50%] bg-white/50" />
                    <Scale className="shrink-0 text-white/50" size={20} />
                    <Separator className="w-full max-w-[50%] bg-white/50" />
                </div>
            </div>
        </div>
    )
}
