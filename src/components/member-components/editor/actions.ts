'use server'

import prisma from '@/lib/prisma'
import { createMemberSchema } from '@/lib/validation'

export async function addMember(input: string) {
    // TODO: CHECK FOR VALIDATION

    const { name } = createMemberSchema.parse({ name: input })

    await prisma.member.create({
        data: {
            name
        },
    })
}
