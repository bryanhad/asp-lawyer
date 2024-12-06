import { BlogTranslationKey, EntityType, Language } from '@/lib/enum'
import prisma from '@/lib/prisma'
import { Blog } from '@prisma/client'
import { notFound } from 'next/navigation'
import EditBlogForm from './form'
import { editBlogAction } from '../../action'

type Props = {
    currentUserId: number
    params: Promise<{ id: string }>
}

type FetchedBlogEntry = Pick<Blog, 'authorId' | 'imageUrl' | 'imageKey'> & {
    title: { id: string; en: string }
    content: { id: string; en: string }
}

export default async function FetchEditBlogPageContent({currentUserId, params }: Props) {
    const { id: blogId } = await params

    const existingBlog = (
        await prisma.$queryRaw<FetchedBlogEntry[]>`
        SELECT b."imageUrl", b."imageKey", b."authorId",
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
        WHERE
            b."id" = ${blogId}
        GROUP BY b."imageUrl", b."imageKey", b."authorId"
    `
    )[0]

    if (!existingBlog) return notFound()

    if (currentUserId !== existingBlog.authorId) throw new Error('Not Authorized')

    return (
        <EditBlogForm
            devaultValues={{
                titleID: existingBlog.title.id,
                titleEN: existingBlog.title.en,
                contentID: existingBlog.content.id,
                contentEN: existingBlog.content.en,
                imageUrl: existingBlog.imageUrl,
            }}
            onSubmit={editBlogAction.bind(null, blogId, existingBlog.imageKey)}
        />
    )
}
