<template>
    <div>
        <div class="search-bar">
            <input
                v-model="search"
                class="search-input"
                type="text"
                placeholder="Search"
            />
            <i class="pi pi-search"></i>
        </div>

        <div v-if="isLoading" class="skeleton-loader">
            <Skeleton
                v-for="n in rows"
                :key="n"
                width="100%"
                height="50px"
                class="mb-2"
            />
        </div>
        <DataTable
            v-else
            :value="filteredData"
            class="table-container text-sm divide-y divide-gray-400"
            responsiveLayout="scroll"
            paginator
            :rows="rows"
            :rowsPerPageOptions="rowsPerPageOptions"
            :stripedRows="stripedRows"
        >
            <Column
                v-for="(col, index) in displayColumns"
                :key="index"
                :field="col.field"
                :header="col.header"
                :sortable="col.sortable"
            ></Column>

            <Column field="status" header="Status" sortable>
                <template #body="slotProps">
                    <span
                        :class="{
                            'status-badge': true,
                            'status-active':
                                slotProps.data.status?.toUpperCase() ===
                                'ACTIVE',
                            'status-inactive':
                                slotProps.data.status?.toUpperCase() ===
                                'INACTIVE',
                            'status-draft':
                                slotProps.data.status?.toUpperCase() === 'DRAFT'
                        }"
                    >
                        {{ slotProps.data.status?.toUpperCase() || 'UNKNOWN' }}
                    </span>
                </template>
            </Column>

            <Column header="Actions">
                <template #body="slotProps">
                    <button
                        class="action-button edit-button"
                        @click="actions.edit(slotProps.data)"
                    >
                        <i class="pi pi-pencil"></i> Edit
                    </button>
                    <button
                        class="action-button delete-button"
                        @click="actions.delete(slotProps.data)"
                    >
                        <i class="pi pi-trash"></i> Delete
                    </button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Skeleton from 'primevue/skeleton';

const props = defineProps({
    value: Array,
    columns: Array,
    actions: Object,
    rows: { type: Number, default: 5 },
    rowsPerPageOptions: { type: Array, default: () => [5, 10, 20, 50] },
    stripedRows: { type: Boolean, default: true }
});

const search = ref('');
const isLoading = ref(true);

const displayColumns = computed(() => {
    return props.columns.filter((col) => col.field !== 'status');
});

const filteredData = computed(() => {
    if (!search.value) return props.value;
    return props.value.filter((item) =>
        Object.values(item)
            .join(' ')
            .toLowerCase()
            .includes(search.value.toLowerCase())
    );
});

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false;
    }, 2000);
});

watch(props.value, () => {
    search.value = '';
});
</script>

<style scoped></style>
