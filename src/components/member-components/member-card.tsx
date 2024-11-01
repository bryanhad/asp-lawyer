import { Locale } from '@/i18n/request'
import { Link } from '@/i18n/routing'
import { LawyerCarouselItemData } from '@/lib/types'
import { Mail } from 'lucide-react'
import Image from 'next/image'
import LinkedInIcon from '../icons/linked-in'

export function MemberCard({
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
        <div className="flex w-full flex-col items-center gap-2 p-8">
            <Link
                href={`/members/${slug}`}
                className="group flex flex-[1] cursor-pointer flex-col items-center"
            >
                <div className="mb-4 aspect-square h-[220px] w-[220px] overflow-hidden rounded-full bg-muted duration-300 group-hover:bg-primary/50">
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
                <div className="flex max-w-[80%] flex-[1] flex-col">
                    <div className="">
                        <h3 className="text-center text-xl font-light capitalize">
                            {name}
                        </h3>
                        <p className="text-center text-sm text-muted-foreground">
                            {currentLocale === 'en' ? degree.EN : degree.ID}
                        </p>
                    </div>
                    <div className="flex flex-[1] items-center justify-center">
                        <p className="my-2 border-b border-primary px-1 text-sm text-primary">
                            {currentLocale === 'en' ? position.EN : position.ID}
                        </p>
                    </div>
                </div>
            </Link>
            <div className="flex items-center gap-2">
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
            </div>
        </div>
    )
}
