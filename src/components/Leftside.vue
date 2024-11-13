<template>
    <aside
        :class="{
            '-translate-x-full': !mainStore.leftsideOpen,
            'translate-x-0': mainStore.leftsideOpen
        }"
        class="bg-gradient-to-br from-[#133477] from-10% via-[#1B3C80] to-[#3E5B95] to-4% text-white w-64 p-5 space-y-4 fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out"
    >
        <div class="mb-6">
            <img
                src="../assets/images/new_logo_sidebar.png"
                alt="GuardMe Logo"
                class="w-full h-auto mx-auto transform scale-110"
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
            <NavItem to="/admin" label="Administration" icon="pi pi-wrench" />
        </nav>
    </aside>
</template>

<script setup>
import { useMainStore } from '../stores/useStore';
import NavItem from '../components/NavItem.vue';

const mainStore = useMainStore();
</script>

<style scoped></style>
