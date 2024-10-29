<template>
    <nav aria-label="breadcrumb" class="breadcrumb-container">
        <i class="pi pi-home home-icon"></i>
        <i class="pi pi-chevron-right breadcrumb-separator" />
        <i v-if="mainStore.mainTab === 'Services' && mainStore.subTab"></i>

        <span v-if="mainStore.mainTab" class="breadcrumb-item">
            {{ mainStore.mainTab }}
        </span>

        <i
            v-if="mainStore.mainTab === 'Services' && mainStore.subTab"
            class="pi pi-chevron-right breadcrumb-separator"
        ></i>
        <span
            v-if="mainStore.mainTab === 'Services' && mainStore.subTab"
            class="breadcrumb-item"
        >
            {{ mainStore.subTab }}
        </span>
    </nav>
</template>

<script setup>
import { useMainStore } from '../stores/useStore';

const mainStore = useMainStore();
</script>

<style scoped></style>
