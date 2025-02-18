// server/api/posts.post.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const prismaUser = await prisma.user.findUnique({
        where: {
            email: body.email,
        },
    });
    if (!body.content || !body.userId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Content and userId are required',
        });
    }

    if (!prismaUser) {
        throw createError({
            statusCode: 404,
            statusMessage: 'User not found',
        });
    }
    const user = await prisma.user.findUnique({
        where: { id: prismaUser.id },
    });
    console.log('user', user);
    if (!user) {
        throw createError({
            statusCode: 404,
            statusMessage: 'User not found',
        });
    }

    // Cria o post no banco de dados
    const post = await prisma.post.create({
        data: {
            content: body.content,
            userId: prismaUser.id,
        },
    });

    return post;
});
