<template>
    <div class="main-content">
        <div class="tabs-container">
            <button
                :class="[
                    'tab-button',
                    { 'active-tab': currentSubTab === 'Code Sets' }
                ]"
                @click="selectSubTab('Code Sets')"
            >
                Code Sets
            </button>
            <button
                :class="[
                    'tab-button',
                    { 'active-tab': currentSubTab === 'Code Groups' }
                ]"
                @click="selectSubTab('Code Groups')"
            >
                Code Groups
            </button>
        </div>

        <div class="bg-white shadow-md rounded mt-4">
            <div class="search-bar">
                <input
                    v-model="search"
                    class="search-input"
                    type="text"
                    placeholder="Search"
                />
                <i class="pi pi-search"></i>
            </div>

            <DataTable
                v-if="currentSubTab === 'Code Sets'"
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
                <Column
                    field="lastUpdated"
                    header="Last Updated"
                    sortable
                ></Column>
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
                            @click="deleteItem(slotProps.data)"
                            class="action-button delete-button"
                        >
                            Delete
                        </button>
                    </template>
                </Column>
            </DataTable>

            <DataTable
                v-if="currentSubTab === 'Code Groups'"
                :value="filteredGroups"
                class="table-container"
                responsiveLayout="scroll"
            >
                <Column field="name" header="Group Name" sortable></Column>
                <Column
                    field="description"
                    header="Description"
                    sortable
                ></Column>
                <Column
                    field="createdDate"
                    header="Created Date"
                    sortable
                ></Column>
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
                            @click="deleteItem(slotProps.data)"
                            class="action-button delete-button"
                        >
                            Delete
                        </button>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useMainStore } from '../stores/useStore';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const mainStore = useMainStore();

const search = ref('');
const services = ref([
    {
        id: 1,
        name: 'Health Service',
        effectiveDate: '2023-10-01',
        lastUpdated: '2023-10-15',
        status: 'Active'
    },
    {
        id: 2,
        name: 'Life Insurance',
        effectiveDate: '2023-09-01',
        lastUpdated: '2023-09-20',
        status: 'Inactive'
    }
]);
const groups = ref([
    {
        id: 1,
        name: 'Admin Group',
        description: 'Group for Admins',
        createdDate: '2023-05-01',
        status: 'Active'
    },
    {
        id: 2,
        name: 'User Group',
        description: 'Group for Users',
        createdDate: '2023-06-15',
        status: 'Inactive'
    }
]);

const currentSubTab = computed(() => mainStore.subTab);

const filteredServices = computed(() =>
    services.value.filter((service) =>
        service.name.toLowerCase().includes(search.value.toLowerCase())
    )
);
const filteredGroups = computed(() =>
    groups.value.filter((group) =>
        group.name.toLowerCase().includes(search.value.toLowerCase())
    )
);

function selectSubTab(subTabName) {
    mainStore.setSubTab(subTabName);
}
function editItem(item) {
    console.log('Edit', item);
}
function deleteItem(item) {
    console.log('Delete', item);
}

mainStore.setMainTab('Services');
selectSubTab('Code Sets');
</script>

<style scoped></style>
