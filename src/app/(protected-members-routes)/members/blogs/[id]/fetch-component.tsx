import LinkButton from '@/app/(protected-members-routes)/_components/link-button'
import Flag from '@/components/ui/flag'
import { Separator } from '@/components/ui/separator'
import { BlogTranslationKey, EntityType, Language } from '@/lib/enum'
import prisma from '@/lib/prisma'
import { getBlurredImageUrl } from '@/lib/server-utils'
import { Blog, User } from '@prisma/client'
import { notFound } from 'next/navigation'
import InputorInfo from '../_components/inputor-info'
import ImageWithFallbackPlaceholder from '@/components/ui/image-with-fallback-placeholder'

type Props = {
    currentUserId: number
    params: Promise<{ id: string }>
}

type FetchedBlogEntry = Pick<Blog, 'id' | 'imageUrl' | 'createdAt'> & {
    title: { id: string; en: string }
    content: { id: string; en: string }
    author: Pick<User, 'id' | 'username'>
}

// TODO: only show edit blog link if the current user id is the SAME as the author of the blog
export default async function FetchViewBlogPageContent({ currentUserId: _currentUserId, params }: Props) {
    const { id: blogId } = await params

    const existingBlog = (
        await prisma.$queryRaw<FetchedBlogEntry[]>`
        SELECT 
            b."id", b."imageUrl", b."createdAt", 
            -- get author details
            jsonb_build_object(
                'id', u."id",
                'username', u."username"
            ) AS author,
            -- get title: { id: string; en: string }
            jsonb_build_object(
                'id', MAX(CASE 
                    WHEN t."key" = ${BlogTranslationKey.TITLE} AND t."language" = ${Language.ID} 
                    THEN t."value" 
                END),
                'en', MAX(CASE 
                    WHEN t."key" = ${BlogTranslationKey.TITLE} AND t."language" = ${Language.EN} 
                    THEN t."value" 
                END)
            ) AS title,
            -- get content: { id: string; en: string }
            jsonb_build_object(
                'id', MAX(CASE 
                    WHEN t."key" = ${BlogTranslationKey.CONTENT} AND t."language" = ${Language.ID} 
                    THEN t."value" 
                END),
                'en', MAX(CASE 
                    WHEN t."key" = ${BlogTranslationKey.CONTENT} AND t."language" = ${Language.EN} 
                    THEN t."value" 
                END)
            ) AS content
        FROM blogs b
            LEFT JOIN translations AS t 
                ON t."entityId" = b."id" 
                AND t."entityType" = ${EntityType.BLOG}
                AND t."key" IN (${BlogTranslationKey.TITLE}, ${BlogTranslationKey.CONTENT})
            LEFT JOIN users u
                ON u."id" = b."authorId"
        WHERE b."id" = ${blogId}
        GROUP BY b."id", b."imageUrl", b."createdAt", u."id"
   `
    )[0]

    if (!existingBlog) return notFound()

    const blurredImageUrl = await getBlurredImageUrl(existingBlog.imageUrl)

    return (
        <>
            <div className="mb-4 flex flex-col-reverse items-center justify-between gap-2 md:flex-row">
                <div>
                    <p className="mb-2 text-center text-sm text-muted-foreground md:text-start">Created By</p>
                    <InputorInfo
                        authorId={existingBlog.author.id}
                        authorName={existingBlog.author.username}
                        inputedAt={existingBlog.createdAt}
                        className=""
                        moreInfo
                    />
                </div>
                <LinkButton className="max-md:mx-auto" href={`/members/blogs/${blogId}/edit`}>
                    Edit Blog
                </LinkButton>
            </div>
            <section>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="relative mx-auto aspect-[4/1.8] w-full dark:brightness-[85%] max-md:max-h-[250px] max-md:max-w-[400px]">
                        <ImageWithFallbackPlaceholder
                            className="rounded-md object-cover object-center shadow-md"
                            src={existingBlog.imageUrl}
                            alt={`Picture of ${existingBlog.title.en}`}
                            fill
                            placeholder="blur"
                            blurDataURL={blurredImageUrl}
                            variant="absolute-center"
                        />
                    </div>
                    <div className="flex flex-col gap-4 rounded-md border p-4">
                        <div className="flex items-start gap-2">
                            <Flag round flag="id" />
                            <div>
                                <p>Title:</p>
                                <h3 className="line-clamp-3 text-lg lg:text-xl">{existingBlog.title.id}</h3>
                            </div>
                        </div>
                        <div className="flex items-start gap-2">
                            <Flag round flag="en" />
                            <div>
                                <p>Title:</p>
                                <h3 className="line-clamp-3 text-lg lg:text-xl">{existingBlog.title.en}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <Separator className="my-4 bg-primary/60" />
                <div>
                    <div className="flex items-start gap-2 rounded-md border p-4">
                        <Flag round flag="id" />
                        <div className="">
                            <p>Content:</p>
                            <div
                                className="tiptap view"
                                dangerouslySetInnerHTML={{
                                    __html: existingBlog.content.id,
                                }}
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex items-start gap-2 rounded-md border p-4">
                        <Flag round flag="en" />
                        <div>
                            <p>Content:</p>
                            <div
                                className="tiptap view"
                                dangerouslySetInnerHTML={{
                                    __html: existingBlog.content.en,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
