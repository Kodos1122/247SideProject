<template>
    <div>
        <DataTable
            :value="filteredServices"
            :columns="columns"
            :actions="actions"
        />
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
import DataTable from './dialogs/DataTable.vue';
import Toast from 'primevue/toast';
import ConfirmDialogComponent from './dialogs/ConfirmDialog.vue';
import Dialog from '../services/dialogs/Dialog.vue';
import { useToast } from 'primevue/usetoast';
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

const columns = [
    { field: 'name', header: 'Name', sortable: true },
    { field: 'effectiveDate', header: 'Effective Date', sortable: true },
    { field: 'lastUpdated', header: 'Last Updated', sortable: true },
    { field: 'status', header: 'Status', sortable: true }
];

const actions = {
    edit: editItem,
    delete: confirmDelete
};

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
</script>
