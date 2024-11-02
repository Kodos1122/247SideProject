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
                        @click="deleteItem(slotProps.data)"
                        class="action-button delete-button"
                    >
                        Delete
                    </button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { getCodeGroups, deleteCodeGroup } from '../stores/localStorageData';

const localSearch = ref('');
const groups = ref([]);

function loadData() {
    groups.value = getCodeGroups() || [];
}

onMounted(() => {
    loadData();
    document.addEventListener('refreshCodeGroups', loadData);
});

onBeforeUnmount(() => {
    document.removeEventListener('refreshCodeGroups', loadData);
});

const filteredGroups = computed(() => {
    return groups.value.filter((group) =>
        group?.name?.toLowerCase().includes(localSearch.value.toLowerCase())
    );
});

function deleteItem(item) {
    deleteCodeGroup(item.id);
    loadData();
}
</script>

<style scoped>
/* Add any styles if necessary */
</style>
