// server/api/posts.post.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event); // Lê o corpo da requisição

  // Validação básica
  if (!body.content || !body.userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Content and userId are required',
    });
  }

  // Cria o post no banco de dados
  const post = await prisma.post.create({
    data: {
      content: body.content,
      userId: body.userId,
    },
  });

  return post;
});