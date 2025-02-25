<template>
    <div class="max-w-2xl mx-auto p-6">
        <h1 class="text-2xl font-bold mb-4 text-white">📢 Últimos Feeds</h1>

        <div class="bg-white p-4 rounded-lg shadow-md mb-6">
            <textarea
                v-model="newPost"
                class="w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
                placeholder="O que você está pensando?"
            ></textarea>
            <ButtonDefault
                @onClick="createPost"
                label="Postar"
                customClass="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            ></ButtonDefault>
        </div>

        <div v-if="posts.length === 0" class="text-gray-500 text-center">
            Nenhum post encontrado.
        </div>

        <div v-for="post in posts" :key="post.id" class="bg-white p-4 rounded-lg shadow-md mb-4">
            <h3 class="text-lg font-semibold">{{ post.user_name }}</h3>
            <p class="text-gray-700">{{ post.content }}</p>
            <small class="text-gray-400">{{ new Date(post.created_at).toLocaleString() }}</small>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
definePageMeta({
    middleware: 'auth',
});
const posts = ref([]);
const newPost = ref('');
const { $supabase } = useNuxtApp();
const fetchPosts = async () => {
    try {
        const response = await $fetch('/api/posts');
        posts.value = response;
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
    }
};

const createPost = async () => {
    if (!newPost.value.trim()) return;

    try {
        const { data: session } = await $supabase.auth.getSession();
        const user = session?.session?.user;

        await $fetch('/api/posts', {
            method: 'POST',
            body: {
                content: newPost.value.trim(),
                userId: user.id,
                email: user.email,
            },
        });

        newPost.value = '';
        fetchPosts();
    } catch (error) {
        console.error('Erro ao postar:', error);
    }
};

onMounted(fetchPosts);
</script>

<style scoped></style>
