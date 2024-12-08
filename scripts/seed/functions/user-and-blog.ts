import { hash } from '@node-rs/argon2'
import { DynamicBuffer } from "@oslojs/binary"
import { decodeBase64 } from '@oslojs/encoding'
import { Blog, Prisma } from '@prisma/client'
import { createCipheriv } from "crypto"
import { generateRandomRecoveryCode } from '../../../src/app/(protected-members-routes)/lib/server/utils'
import { usersAndBlogsSeed } from '../data/users-and-blogs'
import { getPrivateUrl } from './util'

const key = decodeBase64(process.env.ENCRYPTION_KEY ?? "");

export function encrypt(data: Uint8Array): Uint8Array {
	const iv = new Uint8Array(16);
	crypto.getRandomValues(iv);
	const cipher = createCipheriv("aes-128-gcm", key, iv);
	const encrypted = new DynamicBuffer(0);
	encrypted.write(iv);
	encrypted.write(cipher.update(data));
	encrypted.write(cipher.final());
	encrypted.write(cipher.getAuthTag());
	return encrypted.bytes();
}

export async function seedUsersAndBlogs(prisma: Prisma.TransactionClient) {
    const upsertUserBlogsPromises: Promise<Blog>[] = []

    console.log(`🚀 Adding dummy users to 'users' table...`)
    for (const { blogs, ...user } of usersAndBlogsSeed) {
        const passwordHash = await hash(user.password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1,
        })
        const recoveryCode = generateRandomRecoveryCode()
        const encryptedRecoveryCode = encrypt(new TextEncoder().encode(recoveryCode));

        const upsertedUser = await prisma.user.upsert({
            where: { id: user.id },
            update: {},
            create: {
                id: user.id,
                email: user.email,
                passwordHash,
                username: user.username,
                emailIsVerified: user.emailIsVerified,
                recoveryCode: Buffer.from(encryptedRecoveryCode), //convert Uint8Array to Buffer
            },
        })

        for (const blog of blogs) {
            const uploadThingImageUrl = getPrivateUrl(blog.imageUrl)

            upsertUserBlogsPromises.push(
                prisma.blog.upsert({
                    where: { id: blog.id },
                    update: {},
                    create: {
                        imageKey: blog.imageKey,
                        imageUrl: uploadThingImageUrl,
                        authorId: upsertedUser.id,
                    },
                }),
            )
        }
    }
    console.log(`🏁 Successfully seed 'users' table!`)

    console.log(`🚀 Seeding 'blogs' table...`)
    const upsertedBlogs = await Promise.all(upsertUserBlogsPromises)
    console.log(`🏁 Successfully seed 'blogs' table!`)
    return upsertedBlogs
}
