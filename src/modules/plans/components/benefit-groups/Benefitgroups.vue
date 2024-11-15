<template>
    <div class="main-content">
        <nav class="flex items-center justify-between bg-white-900">
            <div class="text-[27px] font-medium">
                <span>{{ mainTab }}</span>
            </div>
        </nav>
        <div class="content-wrapper">
            <div class="info-card">
                <h1 class="info-header">Benefit Groups</h1>
                <p class="info-description">
                    Morbi tristique blandit turpis. In viverra ligula id nulla
                    hendrerit rutrum.
                </p>
                <ul class="info-list">
                    <li class="info-item">
                        <div class="info-label">Universities</div>
                        <div class="info-content">Ontario</div>
                        <div class="info-action">
                            <Button
                                label="Join"
                                icon="pi pi-users"
                                class="action-button"
                            />
                        </div>
                    </li>
                    <li class="info-item">
                        <div class="info-label">Universities</div>
                        <div class="info-content">Quebec</div>
                        <div class="info-action">
                            <Button
                                label="Join"
                                icon="pi pi-users"
                                class="action-button"
                            />
                        </div>
                    </li>
                    <li class="info-item">
                        <div class="info-label">Hospitals</div>
                        <div class="info-content">Ontario</div>
                        <div class="info-action">
                            <Button
                                label="Join"
                                icon="pi pi-users"
                                class="action-button"
                            />
                        </div>
                    </li>
                    <li class="info-item">
                        <div class="info-label">Schools</div>
                        <div class="info-content">Ontario</div>
                        <div class="info-action">
                            <Button
                                label="Join"
                                icon="pi pi-users"
                                class="action-button"
                            />
                        </div>
                    </li>
                    <li class="info-item">
                        <div class="info-label">Hospitals</div>
                        <div class="info-content">Quebec</div>
                        <div class="info-action">
                            <Button
                                label="Join"
                                icon="pi pi-users"
                                class="action-button"
                            />
                        </div>
                    </li>
                    <li class="info-item">
                        <div class="info-label">Schools</div>
                        <div class="info-content">Quebec</div>
                        <div class="info-action">
                            <Button
                                label="Join"
                                icon="pi pi-users"
                                class="action-button"
                            />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import Chip from 'primevue/chip';
import { computed } from 'vue';
import { useMainStore } from '../../../../stores/useStore';

const mainStore = useMainStore();
const mainTab = computed(() => mainStore.mainTab);
</script>

<style scoped>
.content-wrapper {
    padding: 16px;
    background-color: #f4f4f4;
}

.info-card {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.info-header {
    font-size: 1.75rem;
    font-weight: bold;
    color: #14377d;
    margin-bottom: 8px;
}
.info-description {
    font-size: 0.9rem;
    color: #6c757d;
    margin-bottom: 16px;
}

.info-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
}
.info-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    border-top: 1px solid #e5e7eb;
    flex-wrap: wrap;
}

.info-label {
    font-size: 0.9rem;
    color: #5a6b7b;
    font-weight: 500;
    width: 100%;
    max-width: 150px;
}
.info-content {
    flex: 1;
    color: #495057;
    font-size: 0.95rem;
}

.action-button {
    background-color: #14377d;
    color: #ffffff;
    padding: 5px 12px;
    font-size: 0.85rem;
    font-weight: 600;
    border-radius: 8px;
    transition: background-color 0.3s ease;
}
.action-button:hover {
    background-color: #2467ba;
}
</style>
