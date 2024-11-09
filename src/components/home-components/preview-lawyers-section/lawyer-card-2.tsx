import { Locale } from '@/i18n/request'
import { Link } from '@/i18n/routing'
import { Mail, EllipsisVertical } from 'lucide-react'
import Image from 'next/image'
import LinkedInIcon from '../../icons/linked-in'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { LawyerCardData } from '@/app/api/lawyers/carousel/route'

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
}: LawyerCardData & { currentLocale: Locale }) {
    return (
        <div className="flex w-full flex-col items-center gap-2">
            <div className="relative w-full">
                <Link
                    href={`/lawyers/${slug}`}
                    className="group relative z-10 flex-[1] cursor-pointer"
                >
                    <div className="relative flex items-end justify-center overflow-hidden rounded-lg bg-secondary pt-2 duration-300 group-hover:bg-primary/30">
                        <Image
                            alt={`Picture of ${slug}`}
                            src={imageSrc}
                            height={300}
                            width={250}
                            placeholder={'blur'}
                            blurDataURL={blurImageUrl}
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* light effect */}
                        <div className="absolute inset-x-0 bottom-0 top-10 bg-gradient-to-t from-slate-600/80 via-transparent to-transparent dark:top-[40%] dark:from-stone-400/[15%]" />
                        {/* lawyer info */}
                        <div className="absolute bottom-0 left-0 right-0 w-full p-4">
                            <div className="w-full space-y-1 text-white">
                                <h3 className="line-clamp-1 text-lg font-bold">
                                    {name}
                                </h3>
                                <div className="flex w-full items-center gap-3">
                                    <p className="text-nowrap text-sm text-white/90">
                                        {currentLocale === 'en'
                                            ? degree.en
                                            : degree.id}
                                    </p>
                                    <div className="inline-flex max-w-[160px] items-center text-ellipsis rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white backdrop-blur-sm dark:backdrop-blur-md">
                                        <p className="truncate">
                                            {currentLocale === 'en'
                                                ? position.en
                                                : position.id}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
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
