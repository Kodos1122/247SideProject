<template>
    <div class="flex min-h-screen">
        <Leftside />
        <main
            :class="{ 'ml-0': !mainStore.leftsideOpen }"
            class="transition-all duration-300 p-5 bg-gray-50 flex-1 ml-64"
        >
            <div class="flex items-center space-x-4 mb-4">
                <button class="toggle-button" @click="mainStore.toggleLeftside">
                    <i
                        class="pi pi-bars text-gray-700 bg-[#f1f1f1] border-4 border-transparent rounded-full transition-colors duration-300 ease-in-out hover:bg-[#1e3a8a] hover:border-[#bfdbfe] hover:text-white p-2"
                    ></i>
                </button>
                <Breadcrumb />
            </div>
            <div class="main-content">
                <router-view />
            </div>
            <Toast position="top-right" />
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMainStore } from '../stores/useStore';
import Leftside from '../components/Leftside.vue';
import Breadcrumb from '../components/Breadcrumb.vue';
import Toast from 'primevue/toast';

const mainStore = useMainStore();
</script>

<style scoped></style>
