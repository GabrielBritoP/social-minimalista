// server/api/posts.get.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
console.log('primas',prisma)
export default defineEventHandler(async (event) => {
  
  const posts = await prisma.post.findMany({
    orderBy: { created_at: 'desc' }, // Ordena por data de criação (mais recente primeiro)
    include: { user: true }, // Inclui os dados do usuário
  });

  return posts;
});