import { Mail } from 'lucide-react'
import Image from 'next/image'
import ImageWithBlur from '../ui/image-with-blur'
import LinkedInIcon from '../icons/linked-in'
import { Link } from '@/i18n/routing'

export type MemberCardProps = {
    name: string
    position: string
    linkedInUrl?: string
    email?: string
    imageSrc: string
}

export function MemberCard({
    name,
    position,
    linkedInUrl,
    email,
    imageSrc,
}: MemberCardProps) {
    return (
        <div className="flex w-full flex-col items-center gap-2 p-4">
            <Link href={`/members/${name}`} className="group cursor-pointer">
                <div className="mb-4 aspect-square overflow-hidden rounded-full bg-muted duration-300 group-hover:bg-primary/50">
                    <ImageWithBlur
                        src={imageSrc}
                        alt={`Picture of ${name}`}
                        className="h-full w-full object-contain object-center duration-300 group-hover:scale-105"
                        height={180}
                        width={180}
                    />
                </div>
                <div className="flex flex-col items-center">
                    <h3 className="text-xl font-light capitalize">{name}</h3>
                    <p className="text-sm text-muted-foreground">{position}</p>
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
