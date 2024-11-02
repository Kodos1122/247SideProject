<template>
    <div class="flex min-h-screen">
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
                <NavItem
                    to="/admin"
                    label="Administration"
                    icon="pi pi-wrench"
                />
            </nav>
        </aside>

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
                <router-view
                    ref="codesetsTable"
                    v-if="activeComponent === 'Codesets'"
                    :is="Codesets"
                />
                <router-view
                    ref="codegroupsTable"
                    v-if="activeComponent === 'Codegroups'"
                    :is="Codegroups"
                />
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMainStore } from '../stores/useStore';
import NavItem from './NavItem.vue';
import Breadcrumb from './Breadcrumb.vue';
import Navbar from './Navbar.vue';
import Codesets from '../modules/Codesets.vue';
import Codegroups from '../modules/Codegroups.vue';

const mainStore = useMainStore();

const activeComponent = ref('Codesets'); // Adjust based on active route // Adjust based on active route

const handleAddNewData = () => {
    if (activeComponent.value === 'Codesets') {
        // Show dialog in Codesets component
        const codesetsTable = ref.codesetsTable;
        if (codesetsTable && codesetsTable.showDialog) {
            codesetsTable.showDialog('Add');
        }
    } else if (activeComponent.value === 'Codegroups') {
        // Show dialog in Codegroups component
        const codegroupsTable = ref.codegroupsTable;
        if (codegroupsTable && codegroupsTable.showDialog) {
            codegroupsTable.showDialog('Add');
        }
    }
};
</script>

<style scoped></style>
