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
            :value="filteredGroups"
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
                        @click="editGroup(slotProps.data)"
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
        <Dialog
            :visible="dialogVisible"
            :itemType="'Code Groups'"
            :actionType="dialogAction"
            :itemData="currentGroup"
            :codeSets="codeSets"
            @update:visible="dialogVisible = $event"
            @data-saved="loadData"
        />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import Dialog from '../services/dialogs/Dialog.vue';
import {
    getCodeGroups,
    deleteCodeGroup,
    getCodeSets
} from '../../../../stores/localStorageData';

const localSearch = ref('');
const groups = ref([]);
const codeSets = ref([]);
const toast = useToast();
const dialogVisible = ref(false);
const dialogAction = ref('Add');
const currentGroup = ref({
    name: { en: '', fr: '' },
    description: { en: '', fr: '' },
    effective_date: '',
    status: 'active',
    is_locked: false,
    service_code_set: ''
});

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

async function loadCodeSets() {
    try {
        codeSets.value = await getCodeSets();
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
    loadCodeSets();
});

const filteredGroups = computed(() => {
    return groups.value.filter((group) =>
        group?.name?.toLowerCase().includes(localSearch.value.toLowerCase())
    );
});

function editGroup(group) {
    currentGroup.value = { ...group };
    dialogAction.value = 'Edit';
    dialogVisible.value = true;
}

async function confirmDelete(group) {
    try {
        await deleteCodeGroup(group.id);
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
    }
}

function addGroup() {
    currentGroup.value = {
        name: { en: '', fr: '' },
        description: { en: '', fr: '' },
        effective_date: '',
        status: 'active',
        is_locked: false,
        service_code_set: ''
    };
    dialogAction.value = 'Add';
    dialogVisible.value = true;
}
</script>

<style scoped></style>
