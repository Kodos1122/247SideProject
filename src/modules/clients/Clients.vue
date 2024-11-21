<template>
    <div class="main-content">
        <nav class="flex items-center justify-between bg-[#EFF3F8]">
            <div class="text-[27px] font-medium bg-[#EFF3F8]">
                <span>{{ mainTab }}</span>
            </div>
        </nav>
        <div class="content-container">
            <div class="header-container">
                <div class="page-title-container">
                    <h1 class="page-title">Clients</h1>
                    <div class="stats-container">
                        <div class="stat-item">
                            <i class="pi pi-users stat-icon" />
                            <span>332 Active Users</span>
                        </div>
                        <div class="stat-item">
                            <i class="pi pi-globe stat-icon" />
                            <span>9402 Sessions</span>
                        </div>
                    </div>
                </div>

                <div class="actions-container">
                    <Button
                        label="Add"
                        class="action-button-add"
                        icon="pi pi-user-plus"
                    />
                    <Button
                        label="Save"
                        class="action-button-primary"
                        icon="pi pi-check"
                    />
                </div>
            </div>

            <div class="card">
                <div class="card-title">Comments</div>
                <div class="card-subtitle">
                    Vivamus id nisl interdum, blandit augue sit amet, eleifend
                    mi.
                </div>
                <div class="card-content">Add comments here</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import { computed } from 'vue';
import { useMainStore } from '../../stores/useStore';

const mainStore = useMainStore();
const mainTab = computed(() => mainStore.mainTab);
</script>

<style scoped></style>
