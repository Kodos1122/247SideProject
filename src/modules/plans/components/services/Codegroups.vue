<template>
    <div>
        <DataTable
            :value="filteredGroups"
            :columns="columns"
            :actions="actions"
        />
        <Toast position="top-right" />
        <ConfirmDialogComponent
            ref="confirmDialog"
            @confirm="handleDelete"
            @cancel="cancelDelete"
            message="Are you sure you want to delete this code group?"
            header="Delete Confirmation"
        />
        <Dialog
            :visible="dialogVisible"
            :itemType="'Code Groups'"
            :actionType="dialogAction"
            :itemData="currentGroup"
            :codeSetsOptions="codeSets"
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
    getCodeGroups,
    deleteCodeGroup,
    getCodeSets
} from '../../../../stores/localStorageData';

const localSearch = ref('');
const groups = ref([]);
const codeSets = ref([]);
const isCodeSetsLoading = ref(false);
const toast = useToast();
const dialogVisible = ref(false);
const dialogAction = ref('Add');
const currentGroup = ref({
    name: { en: '', fr: '' },
    description: { en: '', fr: '' },
    effective_date: '',
    status: 'active',
    is_locked: false,
    service_code_set: { id: '', name: '' }
});
const confirmDialog = ref(null);

const columns = [
    { field: 'name', header: 'Name', sortable: true },
    { field: 'effectiveDate', header: 'Effective Date', sortable: true },
    { field: 'lastUpdated', header: 'Last Updated', sortable: true },
    { field: 'status', header: 'Status', sortable: true }
];

const actions = [
    { label: 'Edit', method: editGroup, class: 'edit-button' },
    { label: 'Delete', method: confirmDelete, class: 'delete-button' }
];

async function loadData() {
    try {
        groups.value = await getCodeGroups();
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load code groups',
            life: 3000
        });
    }
}

async function loadCodeSets(forceReload = false) {
    if (isCodeSetsLoading.value || (codeSets.value.length && !forceReload))
        return;

    isCodeSetsLoading.value = true;
    try {
        codeSets.value = await getCodeSets();
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load code sets',
            life: 3000
        });
    } finally {
        isCodeSetsLoading.value = false;
    }
}

onMounted(() => {
    loadData();
    loadCodeSets();
    document.addEventListener('refreshCodeSets', loadData);
});

onBeforeUnmount(() => {
    document.removeEventListener('refreshCodeSets', loadData);
});

const filteredGroups = computed(() => {
    return groups.value.filter((group) =>
        group?.name?.toLowerCase().includes(localSearch.value.toLowerCase())
    );
});

async function editGroup(group) {
    await loadCodeSets();
    currentGroup.value = { ...group };
    dialogAction.value = 'Edit';
    dialogVisible.value = true;
}

async function addGroup() {
    await loadCodeSets(true);
    currentGroup.value = {
        name: { en: '', fr: '' },
        description: { en: '', fr: '' },
        effective_date: '',
        status: 'active',
        is_locked: false,
        service_code_set: { id: '', name: '' }
    };
    dialogAction.value = 'Add';
    dialogVisible.value = true;
}

function confirmDelete(group) {
    currentGroup.value = { ...group };
    confirmDialog.value.openConfirmDialog();
}

async function handleDelete() {
    try {
        await deleteCodeGroup(currentGroup.value.id);
        loadData();
        toast.add({
            severity: 'success',
            summary: 'Deleted',
            detail: 'Code group deleted successfully',
            life: 3000
        });
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete code group',
            life: 3000
        });
    } finally {
        currentGroup.value = {};
    }
}

function cancelDelete() {
    currentGroup.value = {};
}
</script>

<style scoped></style>
