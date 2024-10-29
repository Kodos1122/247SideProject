<template>
    <div class="flex min-h-screen">
        <aside
            :class="{
                '-translate-x-full': !mainStore.leftsideOpen,
                'translate-x-0': mainStore.leftsideOpen
            }"
            class="bg-blue-900 text-white w-64 p-6 space-y-4 transition-transform transform fixed inset-y-0 left-0 z-50"
        >
            <div class="mb-4">
                <img
                    src="../assets/images/new_logo_sidebar.png"
                    alt="GuardMe Logo"
                    class="w-full h-auto mx-auto"
                />
            </div>
            <nav class="space-y-3">
                <NavItem
                    to="/dashboard"
                    label="Dashboard"
                    icon="pi pi-calendar-plus"
                />
                <NavItem to="/services" label="Services" icon="pi pi-folder" />
                <NavItem to="/benefits" label="Benefits" icon="pi pi-shield" />
                <NavItem
                    to="/benefitgroups"
                    label="Benefit Groups"
                    icon="pi pi-sitemap"
                />
                <NavItem to="/plans" label="Plans" icon="pi pi-file-edit" />
                <NavItem to="/clients" label="Clients" icon="pi pi-building" />
                <NavItem
                    to="/admin"
                    label="Administration"
                    icon="pi pi-wrench"
                />
            </nav>
        </aside>

        <main
            :class="{ 'ml-0': !mainStore.leftsideOpen }"
            class="transition-all duration-300 p-6 bg-gray-50 flex-1 ml-64"
        >
            <div class="flex items-center space-x-4 mb-4">
                <button class="toggle-button" @click="mainStore.toggleLeftside">
                    <i
                        class="pi pi-bars text-gray-700 hover:text-white transition-colors duration-300"
                    ></i>
                </button>
                <Breadcrumb />
            </div>
            <Navbar />
            <router-view />
        </main>
    </div>
</template>

<script setup>
import { useMainStore } from '../stores/useStore';
import NavItem from './NavItem.vue';
import Breadcrumb from './Breadcrumb.vue';
import Navbar from './Navbar.vue';

const mainStore = useMainStore();
</script>

<style scoped></style>
