<template>
  <div class="flex h-screen items-center justify-center bg-gray-100">
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
          <label for="email" class="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="mt-1 p-2 w-full border rounded"
            required
          />
        </div>

        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Senha</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="mt-1 p-2 w-full border rounded"
            required
          />
        </div>

        <div class="mb-4">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmar Senha</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            class="mt-1 p-2 w-full border rounded"
            required
          />
        </div>

        <p v-if="errorMessage" class="text-red-500 text-sm mb-2 text-center">{{ errorMessage }}</p>
        <p v-if="successMessage" class="text-green-500 text-sm mb-2 text-center">{{ successMessage }}</p>

        <button
          type="submit"
          class="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
        >
          Criar Conta
        </button>
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
const { $prisma } = useNuxtApp(); // Certifique-se de que o Prisma Client está injetado no contexto do Nuxt
console.log('$supabase ', $supabase);

const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const successMessage = ref("");

async function register() {
  // Verifica se as senhas coincidem
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "As senhas não coincidem.";
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
    if (user) {
      await $prisma.user.create({
        data: {
          id: user.id,
          name: name.value,
          email: email.value,
          password: password.value, 
        },
      });
    }

    successMessage.value = "Verifique seu email para confirmar o cadastro!";
  } catch (err) {
    errorMessage.value = "Erro ao registrar. Tente novamente.";
    console.error(err); 
  }
}
</script>