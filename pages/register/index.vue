<template>
    <div class="flex h-screen items-center justify-center">
        <div class="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
            <h2 class="text-2xl font-semibold text-center mb-4">Criar Conta</h2>

            <form @submit.prevent="register">
                <div class="mb-4">
                    <label for="name" class="block text-sm font-medium text-gray-700">Nome</label>
                    <input
                        id="name"
                        v-model="name"
                        type="text"
                        class="mt-1 p-2 w-full border rounded"
                        required
                    />
                </div>

                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700"
                        >E-mail</label
                    >
                    <input
                        id="email"
                        v-model="email"
                        type="email"
                        class="mt-1 p-2 w-full border rounded"
                        required
                    />
                </div>

                <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700"
                        >Senha</label
                    >
                    <input
                        id="password"
                        v-model="password"
                        type="password"
                        class="mt-1 p-2 w-full border rounded"
                        required
                    />
                </div>

                <div class="mb-4">
                    <label for="confirmPassword" class="block text-sm font-medium text-gray-700"
                        >Confirmar Senha</label
                    >
                    <input
                        id="confirmPassword"
                        v-model="confirmPassword"
                        type="password"
                        class="mt-1 p-2 w-full border rounded"
                        required
                    />
                </div>

                <p v-if="errorMessage" class="text-red-500 text-sm mb-2 text-center">
                    {{ errorMessage }}
                </p>
                <p v-if="successMessage" class="text-green-500 text-sm mb-2 text-center">
                    {{ successMessage }}
                </p>
                <ButtonDefault
                    label="Criar conta"
                    customClass="w-full bg-green-700 text-white p-2 rounded hover:bg-green-900 transition"
                ></ButtonDefault>
            </form>

            <p class="text-center text-sm mt-4">
                Já tem uma conta?
                <NuxtLink to="/login" class="text-blue-500 hover:underline">Faça login</NuxtLink>
            </p>
        </div>
    </div>
</template>

<script setup>
const { $supabase } = useNuxtApp();
const { $prisma } = useNuxtApp();
console.log('$supabase ', $supabase);
const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');
const successMessage = ref('');

async function register() {
    // Verifica se as senhas coincidem
    if (password.value !== confirmPassword.value) {
        errorMessage.value = 'As senhas não coincidem.';
        return;
    }

    try {
        // Registra o usuário no Supabase
        const { data, error } = await $supabase.auth.signUp({
            email: email.value,
            password: password.value,
        });

        if (error) {
            errorMessage.value = error.message;
            return;
        }

        const user = data.user;
        console.log('user', user);
        if (user) {
            await $fetch('/api/register', {
                method: 'POST',
                body: {
                    userId: user.id,

                    name: name.value,
                    email: email.value,
                    password: password.value,
                    content: { ...user },
                },
            });
        }
        router.push('/feeds');
        successMessage.value = 'Verifique seu email para confirmar o cadastro!';
    } catch (err) {
        errorMessage.value = 'Erro ao registrar. Tente novamente.';
        console.error(err);
    }
}
</script>
