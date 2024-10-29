import { Link } from '@/i18n/routing'
import { Mail } from 'lucide-react'
import LinkedInIcon from '../icons/linked-in'
import ImageWithBlur from '../ui/image-with-blur'

export type MemberCardProps = {
    fullName: string
    name: string
    degree: string
    position: string
    linkedInUrl?: string
    email?: string
    imageSrc: string
}

export function MemberCard({
    fullName,
    name,
    degree,
    position,
    linkedInUrl,
    email,
    imageSrc,
}: MemberCardProps) {
    return (
        <div className="flex w-full flex-col items-center gap-2 p-8">
            <Link
                href={`/members/${name}`}
                className="group flex flex-[1] cursor-pointer flex-col items-center"
            >
                <div className="mb-4 aspect-square h-[220px] w-[220px] overflow-hidden rounded-full bg-muted duration-300 group-hover:bg-primary/50">
                    <ImageWithBlur
                        src={imageSrc}
                        alt={`Picture of ${name}`}
                        className="h-full w-full object-contain object-center duration-300 group-hover:scale-105"
                        height={220}
                        width={220}
                    />
                </div>
                <div className="flex max-w-[80%] flex-[1] flex-col">
                    <div className="">
                        <h3 className="text-center text-xl font-light capitalize">
                            {fullName}
                        </h3>
                        <p className="text-center text-sm text-muted-foreground">
                            {degree}
                        </p>
                    </div>
                    <div className="flex flex-[1] items-center justify-center">
                        <p className="border-b border-primary text-primary px-1 text-sm my-2">{position}</p>
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
