import { sourceSerif4 } from '@/app/fonts'
import { cn } from '@/lib/utils'
import { ImageProps } from 'next/image'
import { Scale } from 'lucide-react'
import { getBlurredImageUrl, getPrivateUrl } from '@/lib/server-utils'
import { Separator } from '@/components/ui/separator'
import ImageWithFallbackPlaceholder from '@/components/ui/image-with-fallback-placeholder'

type Props = {
    titleWhite?: string
    titlePrimary?: string
    publicUrlFromUploadThing: string
    useh2?: boolean
} & Omit<ImageProps, 'src' | 'placeholder' | 'blurDataURL'>

export default async function PageTitleWithBackground({
    titleWhite,
    titlePrimary,
    publicUrlFromUploadThing,
    alt,
    fill = true,
    priority = true,
    className,
    useh2 = false,
    ...imageProps
}: Props) {
    const imageUrl = getPrivateUrl(publicUrlFromUploadThing)
    const blurImageUrl = await getBlurredImageUrl(imageUrl)

    return (
        <div className="relative flex min-h-[230px] w-full lg:min-h-[250px]">
            <ImageWithFallbackPlaceholder
                variant="absolute-center"
                src={imageUrl}
                alt={alt}
                fill={fill}
                priority={priority}
                placeholder="blur"
                blurDataURL={blurImageUrl}
                className={cn('z-10 object-cover object-center', className)}
                {...imageProps}
            />

            {/* image overlay */}
            <div className="absolute inset-0 z-20 bg-background-suit opacity-[88%]"></div>
            {/* content */}
            <div className="relative z-30 mt-16 grid w-full select-none place-content-center px-2 py-2 lg:mt-20">
                {!useh2 ? (
                    <h1
                        className={cn(
                            sourceSerif4.className,
                            'flex text-center text-3xl max-lg:flex-col lg:gap-4 lg:text-4xl',
                        )}
                    >
                        <TitleContent titlePrimary={titlePrimary} titleWhite={titleWhite} />
                    </h1>
                ) : (
                    <h2
                        className={cn(
                            sourceSerif4.className,
                            'flex text-center text-3xl max-lg:flex-col lg:gap-4 lg:text-4xl',
                        )}
                    >
                        <TitleContent titlePrimary={titlePrimary} titleWhite={titleWhite} />
                    </h2>
                )}
                <div className="mt-2 flex items-center justify-center gap-4">
                    <Separator className="w-full max-w-[40%] bg-white/50" />
                    <Scale className="shrink-0 text-white/50" size={20} />
                    <Separator className="w-full max-w-[40%] bg-white/50" />
                </div>
            </div>
        </div>
    )
}

function TitleContent({ titlePrimary, titleWhite }: Pick<Props, 'titleWhite' | 'titlePrimary'>) {
    return (
        <>
            {titleWhite && <span className="text-white">{titleWhite}</span>}
            {titlePrimary && <span className="text-primary">{titlePrimary}</span>}
        </>
    )
}
