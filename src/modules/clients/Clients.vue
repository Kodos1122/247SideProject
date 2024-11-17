<template>
    <div class="main-content">
        <nav class="flex items-center justify-between bg-white-900">
            <div class="text-[27px] font-medium">
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

<style scoped>
.content-container {
    font-family: Arial, sans-serif;
    background-color: var(--surface-0);
    padding: 32px 24px;
    border-radius: 8px;
    margin-top: 26px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

.header-container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 24px;
}

.page-title-container {
    color: var(--surface-900);
}
.page-title {
    font-size: 2.2rem;
    font-weight: bold;
    color: var(--primary-dark);
    margin-bottom: 8px;
}
.stats-container {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    color: var(--surface-600);
}
.stat-item {
    display: flex;
    align-items: center;
    font-size: 1rem;
    gap: 8px;
}
.stat-icon {
    font-size: 1.5rem;
    color: var(--primary);
}

.actions-container {
    display: flex;
    gap: 16px;
}
.action-button-add {
    padding: 8px 16px;
    border: 2px solid var(--primary);
    color: white;
    background-color: #14377d;
    font-weight: 600;
    transition:
        background-color 0.2s ease,
        color 0.2s ease;
}
.action-button-add:hover {
    background-color: #2467ba;
    color: var(--surface-0);
}
.action-button-primary {
    padding: 8px 16px;
    background-color: #2467ba;
    color: var(--surface-0);
    font-weight: bold;
    transition: background-color 0.2s ease;
}
.action-button-primary:hover {
    background-color: #22c55e;
}

.card {
    background-color: var(--surface-0);
    color: var(--surface-900);
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s ease;
}
.card:hover {
    box-shadow: 0px 12px 20px rgba(0, 0, 0, 0.15);
}
.card-title {
    font-size: 1.75rem;
    font-weight: bold;
    color: var(--surface-900);
    margin-bottom: 8px;
}
.card-subtitle {
    font-size: 1rem;
    color: var(--surface-600);
    margin-bottom: 16px;
}
.card-content {
    height: 150px;
    border: 2px dashed var(--surface-300);
    border-radius: 8px;
    background-color: var(--surface-50);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--surface-500);
    font-weight: 500;
    font-size: 1.1rem;
}
</style>
