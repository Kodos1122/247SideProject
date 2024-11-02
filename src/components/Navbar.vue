<template>
    <nav class="flex items-center justify-between bg-white-900">
        <div class="text-[27px] font-medium">
            <span>{{ mainTab }}</span>
        </div>
        <NewButton @click="handleAddNew" />
    </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useMainStore } from '../stores/useStore';
import NewButton from './NewButton.vue';

const mainStore = useMainStore();
const mainTab = computed(() => mainStore.mainTab);

const emit = defineEmits(['add-new-data']);

function handleAddNew() {
    console.log('handleAddNew triggered');
    console.log('subTab:', mainStore.subTab);
    emit('add-new-data', mainStore.subTab);
}
</script>

<style scoped></style>
