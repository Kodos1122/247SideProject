<template>
    <router-link
        :to="to"
        :class="['sidebar-link', { active: isActive }]"
        @click="setActiveTab"
    >
        <i :class="icon" class="mr-2"></i> {{ label }}
    </router-link>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useMainStore } from '../stores/useStore';

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

const mainStore = useMainStore();
const isActive = computed(() => mainStore.mainTab === props.label);

const setActiveTab = () => {
    mainStore.setMainTab(props.label);
};
</script>

<style scoped></style>
