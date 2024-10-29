<template>
    <div>
        <table class="styled-table">
            <thead>
                <tr>
                    <th v-for="col in columns" :key="col">
                        {{
                            col
                                .replace(/([A-Z])/g, ' $1')
                                .replace(/^./, (str) => str.toUpperCase())
                        }}
                    </th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in data" :key="row.id">
                    <td v-for="col in columns" :key="col">{{ row[col] }}</td>
                    <td>
                        <button
                            class="action-button edit-button"
                            @click="handleEdit(row)"
                        >
                            Edit
                        </button>
                        <button
                            class="action-button delete-button"
                            @click="handleDelete(row.id)"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    columns: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['edit', 'delete']);

function handleEdit(row) {
    emit('edit', row);
}

function handleDelete(id) {
    emit('delete', id);
}
</script>

<style scoped></style>
