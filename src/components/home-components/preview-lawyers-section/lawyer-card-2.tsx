import { poppins } from '@/app/[locale]/fonts'
import { LawyerCardData } from '@/app/api/lawyers/carousel/route'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Locale } from '@/i18n/request'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { EllipsisVertical, Mail } from 'lucide-react'
import Image from 'next/image'
import LinkedInIcon from '../../icons/linked-in'

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
                    <div className="relative flex flex-col overflow-hidden rounded-lg pt-2 duration-300">
                        <Image
                            alt={`Picture of ${slug}`}
                            src={imageSrc}
                            height={300}
                            width={250}
                            placeholder={'blur'}
                            blurDataURL={blurImageUrl}
                            className="z-20 object-cover contrast-[90%] duration-300 group-hover:scale-105 group-hover:contrast-100"
                        />
                        <div className="absolute z-30 inset-x-0 bottom-0 top-[40%] bg-gradient-to-t from-slate-600/20 via-transparent to-transparent dark:top-[40%] dark:from-zinc-600/[15%]" />

                        <div className="absolute inset-x-0 bottom-0 top-[22%] z-10 rounded-t-lg bg-secondary dark:bg-background-suit"></div>
                        <p className="absolute bottom-0 right-0 z-30 rounded-tl-md bg-primary/80 px-4 py-1 text-white backdrop-blur-sm max-md:text-sm">
                            {currentLocale === 'en' ? position.en : position.id}
                        </p>
                    </div>
                    {/* lawyer info */}
                    <div className="px-3 py-2">
                        <div
                            className={cn(
                                poppins.className,
                                'w-full space-y-1',
                            )}
                        >
                            <h3 className="line-clamp-1 md:text-lg">{name}</h3>
                            <p className="text-nowrap text-sm">
                                {currentLocale === 'en' ? degree.en : degree.id}
                            </p>
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