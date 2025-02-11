<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">📢 Últimos Feeds</h1>

    <!-- Formulário de Post -->
    <div class="bg-white p-4 rounded-lg shadow-md mb-6">
      <textarea
        v-model="newPost"
        class="w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
        placeholder="O que você está pensando?"
      ></textarea>
      <button
        @click="createPost"
        class="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Postar
      </button>
    </div>

    <!-- Listagem de Posts -->
    <div v-if="posts.length === 0" class="text-gray-500 text-center">Nenhum post encontrado.</div>

    <div v-for="post in posts" :key="post.id" class="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 class="text-lg font-semibold">{{ post.user_name }}</h3>
      <p class="text-gray-700">{{ post.content }}</p>
      <small class="text-gray-400">{{ new Date(post.created_at).toLocaleString() }}</small>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const posts = ref([]);
const newPost = ref("");
const { $supabase } = useNuxtApp();
console.log('$supabase ', $supabase);
// 🔹 Buscar posts
const fetchPosts = async () => {
  try {
    const response = await $fetch("/api/posts"); // Chama a API para buscar posts
    posts.value = response;
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
  }
};

// 🔹 Criar um novo post
const createPost = async () => {
  if (!newPost.value.trim()) return;

  try {
    const { data: session } = await $supabase.auth.getSession();
    console.log('usesessionr ', session);
    const user = session?.session?.user;
    console.log('user ', user);
    console.log('usnewPoster ', newPost.value);

    // Chama a API para criar o post
    await $fetch("/api/posts", {
      method: "POST",
      body: {
        content: newPost.value.trim(),
        userId: user.id, 
      },
    });

    newPost.value = ""; // Limpa o campo de texto
    fetchPosts(); // Atualiza a lista de posts
  } catch (error) {
    console.error("Erro ao postar:", error);
  }
};

// onMounted(fetchPosts); // Busca os posts ao carregar a página
</script>

<style scoped>
</style>