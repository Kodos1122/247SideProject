<template>
    <div>
        <div class="search-bar">
            <input
                v-model="localSearch"
                class="search-input"
                type="text"
                placeholder="Search"
            />
            <i class="pi pi-search"></i>
        </div>

        <DataTable
            :value="filteredServices"
            class="table-container"
            responsiveLayout="scroll"
        >
            <Column field="name" header="Name" sortable></Column>
            <Column
                field="effectiveDate"
                header="Effective Date"
                sortable
            ></Column>
            <Column field="lastUpdated" header="Last Updated" sortable></Column>
            <Column field="status" header="Status" sortable></Column>
            <Column header="Actions">
                <template #body="slotProps">
                    <button
                        @click="$emit('edit-item', slotProps.data)"
                        class="action-button edit-button"
                    >
                        Edit
                    </button>
                    <button
                        @click="confirmDelete(slotProps.data)"
                        class="action-button delete-button"
                    >
                        Delete
                    </button>
                </template>
            </Column>

            <ConfirmDialogComponent
                ref="confirmDialog"
                @confirm="handleDelete"
                @cancel="cancelDelete"
                message="Are you sure you want to delete this code set?"
                header="Delete Confirmation"
            />

            <Toast position="top-right" />
        </DataTable>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ConfirmDialogComponent from './dialogs/ConfirmDialog.vue';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import {
    getCodeSets,
    deleteCodeSet
} from '../../../../stores/localStorageData.js';

const localSearch = ref('');
const services = ref([]);
const toast = useToast();
const confirmDialog = ref(null);
const itemToDelete = ref(null);

function loadData() {
    services.value = getCodeSets() || [];
}

onMounted(() => {
    loadData();
    document.addEventListener('refreshCodeSets', loadData);
});

onBeforeUnmount(() => {
    document.removeEventListener('refreshCodeSets', loadData);
});

const filteredServices = computed(() => {
    return services.value.filter((service) =>
        service?.name?.toLowerCase().includes(localSearch.value.toLowerCase())
    );
});

function confirmDelete(item) {
    itemToDelete.value = item;
    confirmDialog.value.openConfirmDialog();
}

function handleDelete() {
    deleteCodeSet(itemToDelete.value.id);
    loadData();
    showSuccessMessage();
}

function cancelDelete() {
    itemToDelete.value = null;
}

function showSuccessMessage() {
    toast.add({
        severity: 'success',
        summary: 'Deleted',
        detail: 'Code set has been deleted successfully.',
        life: 2000
    });
}
</script>

<style scoped></style>
