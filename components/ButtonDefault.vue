<template>
    <button :type="type" :class="customClass" :onclick="onClick">
        {{ label }}
    </button>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
    type: {
        default: 'submit',
    },
    label: {
        default: 'Click',
    },
    customClass: {
        default: 'bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition',
    },
});
const emit = defineEmits(['onClick']);
function onClick() {
    emit('onClick');
}
</script>
