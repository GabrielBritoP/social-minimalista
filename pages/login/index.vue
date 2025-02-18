<template>
    <div class="flex h-screen items-center justify-center bg-gray-100">
        <div class="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
            <h2 class="text-2xl font-semibold text-center mb-4">Login</h2>

            <form @submit.prevent="login">
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

                <button
                    type="submit"
                    class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                >
                    Entrar
                </button>
            </form>

            <p class="text-center text-sm mt-4">
                Não tem uma conta?
                <NuxtLink to="/register" class="text-blue-500 hover:underline"
                    >Cadastre-se</NuxtLink
                >
            </p>
        </div>
    </div>
</template>

<script setup>
const { $supabase } = useNuxtApp();
console.log('$supabase ', $supabase);
const email = ref('');
const password = ref('');
const errorMessage = ref('');

async function login() {
    const { error } = await $supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    });

    if (error) {
        errorMessage.value = error.message;
    } else {
        navigateTo('/feeds');
    }
}
</script>
