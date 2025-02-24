<template>
    <div class="dark:bg-gray-800">
        <slot />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isDarkMode = ref(true);

onMounted(() => {
    localStorage.setItem('theme', 'dark');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        isDarkMode.value = false;
        document.documentElement.classList.remove('dark');
    } else {
        isDarkMode.value = true;
        document.documentElement.classList.add('dark');
    }
});
function toggleTheme() {
    isDarkMode.value = !isDarkMode.value;
    if (isDarkMode.value) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
}
</script>
