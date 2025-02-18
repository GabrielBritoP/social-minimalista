// server/api/register.post.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const body = await readBody(event); // Lê o corpo da requisição
    console.log('body', body);
    // Validação básica
    if (!body.name || !body.email || !body.password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Name, email, and password are required',
        });
    }

    // Verifica se o email já está em uso
    const existingUser = await prisma.user.findUnique({
        where: { email: body.email },
    });

    if (existingUser) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email already in use',
        });
    }

    // Criptografa a senha
    // Cria o usuário no banco de dados
    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: body.password, // Salva a senha criptografada
            avatar: body.avatar || null, // Campo opcional
        },
    });

    // Retorna o usuário criado (sem a senha)
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        // avatar: user.avatar,
        createdAt: user.created_at,
    };
});
