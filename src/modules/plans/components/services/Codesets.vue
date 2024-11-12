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
            class="table-container text-sm"
            responsiveLayout="scroll"
            paginator
            :rows="5"
            :rowsPerPageOptions="[5, 10, 20, 50]"
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
                        @click="editItem(slotProps.data)"
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
        </DataTable>
        <Toast position="top-right" />
        <ConfirmDialogComponent
            ref="confirmDialog"
            @confirm="handleDelete"
            @cancel="cancelDelete"
            message="Are you sure you want to delete this code set?"
            header="Delete Confirmation"
        />
        <Dialog
            :visible="dialogVisible"
            :itemType="'Code Sets'"
            :actionType="dialogAction"
            :itemData="currentItem"
            @update:visible="dialogVisible = $event"
            @data-saved="loadData"
        />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Toast from 'primevue/toast';
import ConfirmDialogComponent from './dialogs/ConfirmDialog.vue';
import { useToast } from 'primevue/usetoast';
import Dialog from '../services/dialogs/Dialog.vue';
import {
    getCodeSets,
    deleteCodeSet
} from '../../../../stores/localStorageData';

const localSearch = ref('');
const services = ref([]);
const toast = useToast();
const dialogVisible = ref(false);
const dialogAction = ref('Add');
const currentItem = ref({});
const confirmDialog = ref(null);

async function loadData() {
    try {
        services.value = await getCodeSets();
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load code sets',
            life: 3000
        });
    }
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

function editItem(item) {
    currentItem.value = { ...item };
    dialogAction.value = 'Edit';
    dialogVisible.value = true;
}

function confirmDelete(item) {
    currentItem.value = { ...item };
    confirmDialog.value.openConfirmDialog();
}

async function handleDelete() {
    try {
        await deleteCodeSet(currentItem.value.id);
        loadData();
        toast.add({
            severity: 'success',
            summary: 'Deleted',
            detail: 'Code set deleted successfully',
            life: 3000
        });
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete code set',
            life: 3000
        });
    } finally {
        currentItem.value = {};
    }
}

function cancelDelete() {
    currentItem.value = {};
}

function addItem() {
    currentItem.value = {
        name: { en: '', fr: '' },
        description: { en: '', fr: '' },
        effective_date: '',
        status: 'active',
        is_locked: false
    };
    dialogAction.value = 'Add';
    dialogVisible.value = true;
}
</script>

<style scoped></style>
