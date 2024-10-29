<template>
    <router-link :to="to" class="sidebar-link">
        <i :class="icon" class="mr-2"></i> {{ label }}
    </router-link>
</template>

<script setup>
const props = defineProps({
    to: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    }
});
</script>

<style scoped></style>
