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
        <DataTable
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
                                'INACTIVE'
                        }"
                    >
                        {{ slotProps.data.status?.toUpperCase() || 'UNKNOWN' }}
                    </span>
                </template>
            </Column>

            <Column header="Actions">
                <template #body="slotProps">
                    <button
                        v-for="action in actions"
                        :key="action.label"
                        @click="action.method(slotProps.data)"
                        class="action-button"
                        :class="action.class"
                    >
                        {{ action.label }}
                    </button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const props = defineProps({
    value: Array,
    columns: Array,
    actions: Array,
    rows: { type: Number, default: 5 },
    rowsPerPageOptions: { type: Array, default: () => [5, 10, 20, 50] },
    stripedRows: { type: Boolean, default: true }
});

const search = ref('');

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

watch(props.value, () => {
    search.value = '';
});
</script>

<style scoped></style>
