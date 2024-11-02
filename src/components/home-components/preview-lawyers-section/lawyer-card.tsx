import { Locale } from '@/i18n/request'
import { Link } from '@/i18n/routing'
import { LawyerCarouselItemData } from '@/lib/types'
import { Mail, EllipsisVertical } from 'lucide-react'
import Image from 'next/image'
import LinkedInIcon from '../../icons/linked-in'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

export default function LawyerCard({
    name,
    slug,
    degree,
    position,
    linkedInUrl,
    email,
    imageSrc,
    currentLocale,
    blurImageUrl,
}: LawyerCarouselItemData & { currentLocale: Locale }) {
    return (
        <div className="flex w-full flex-col items-center gap-2">
            <div className="relative w-full max-w-[220px]">
                <Link
                    href={`/members/${slug}`}
                    className="group relative z-10 flex flex-[1] cursor-pointer flex-col items-center"
                >
                    <div className="mb-4 aspect-square h-[180px] w-[180px] overflow-hidden rounded-full bg-muted duration-300 group-hover:bg-primary/50">
                        <Image
                            alt={`Picture of ${slug}`}
                            src={imageSrc}
                            height={220}
                            width={220}
                            placeholder={'blur'}
                            className="h-full w-full object-contain object-center duration-300 group-hover:scale-105"
                            blurDataURL={blurImageUrl}
                        />
                    </div>
                    <div className="flex flex-[1] flex-col">
                        <p className="mx-auto rounded-full bg-yellow-600 px-3 text-sm text-white">
                            {currentLocale === 'en' ? position.EN : position.ID}
                        </p>
                        <h3 className="mt-2 line-clamp-2 text-center text-lg font-light capitalize leading-tight">
                            {name}
                        </h3>
                        <p className="text-center text-sm text-muted-foreground">
                            {currentLocale === 'en' ? degree.EN : degree.ID}
                        </p>
                    </div>
                </Link>
                <div className="absolute right-0 top-0 z-20 flex translate-x-1/3 flex-col items-center gap-2 p-2">
                    <Popover>
                        <PopoverTrigger>
                            <EllipsisVertical className="shrink-0 text-gray-400" />
                        </PopoverTrigger>
                        <PopoverContent
                            align="end"
                            className="flex w-max flex-col items-center gap-2 p-2"
                        >
                            {linkedInUrl && (
                                <a
                                    href={linkedInUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-yellow-500 hover:text-yellow-600"
                                >
                                    <span className="text-gray-300 duration-300 hover:text-blue-500">
                                        <LinkedInIcon width={18} height={18} />
                                    </span>
                                </a>
                            )}
                            {email && (
                                <a
                                    href={`mailto:${email}`}
                                    className="text-gray-300 duration-300 hover:text-gray-500"
                                >
                                    <Mail size={22} />
                                </a>
                            )}
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    )
}
