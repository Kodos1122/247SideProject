<!-- Dialog.vue -->
<template>
    <Dialog
        v-model:visible="isVisible"
        modal
        :header="dialogHeader"
        :style="{ width: '30rem' }"
        closable
        @hide="hideDialog"
    >
        <span class="text-gray-500 block mb-6">Fill in the details below.</span>

        <div v-if="itemType === 'Code Sets'" class="form-fields">
            <div class="form-field mb-7 p-float-label font-bold">
                <InputText v-model="currentItem.name" id="codeSetsName" />
                <label for="codeSetsName">Name</label>
            </div>
            <div class="form-field mb-7 p-float-label font-bold">
                <InputText
                    v-model="currentItem.effectiveDate"
                    id="codeSetsEffectiveDate"
                />
                <label for="codeSetsEffectiveDate">Effective Date</label>
            </div>
            <div class="form-field mb-7 p-float-label font-bold">
                <InputText
                    v-model="currentItem.lastUpdated"
                    id="codeSetsLastUpdated"
                />
                <label for="codeSetsLastUpdated">Last Updated</label>
            </div>
            <div class="form-field mb-4 p-float-label font-bold">
                <InputText v-model="currentItem.status" id="codeSetsStatus" />
                <label for="codeSetsStatus">Status</label>
            </div>
        </div>

        <div v-if="itemType === 'Code Groups'" class="form-fields">
            <div class="form-field mb-7 p-float-label font-bold">
                <InputText v-model="currentItem.name" id="codeGroupsName" />
                <label for="codeGroupsName">Name</label>
            </div>
            <div class="form-field mb-7 p-float-label font-bold">
                <InputText
                    v-model="currentItem.effectiveDate"
                    id="codeGroupsEffectiveDate"
                />
                <label for="codeGroupsEffectiveDate">Effective Date</label>
            </div>
            <div class="form-field mb-7 p-float-label font-bold">
                <InputText
                    v-model="currentItem.lastUpdated"
                    id="codeGroupsLastUpdated"
                />
                <label for="codeGroupsLastUpdated">Last Updated</label>
            </div>
            <div class="form-field mb-4 p-float-label font-bold">
                <InputText v-model="currentItem.status" id="codeGroupsStatus" />
                <label for="codeGroupsStatus">Status</label>
            </div>
        </div>

        <div class="flex justify-end gap-4 mt-5">
            <Button
                label="Cancel"
                class="p-button-outlined"
                @click="hideDialog"
            />
            <Button label="Save" class="p-button-success" @click="save" />
        </div>
    </Dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const props = defineProps({
    visible: Boolean,
    itemType: String,
    actionType: String,
    itemData: Object
});

const emit = defineEmits(['update:visible', 'save']);

// Computed property to bind with visible state
const isVisible = computed({
    get: () => props.visible,
    set: (value) => emit('update:visible', value)
});

const currentItem = ref({ ...props.itemData });
const dialogHeader = computed(() => `${props.actionType} ${props.itemType}`);

function hideDialog() {
    emit('update:visible', false);
}

function save() {
    emit('save', currentItem.value);
}

// Watch for changes to itemData prop and reset currentItem
watch(
    () => props.itemData,
    (newData) => {
        currentItem.value = { ...newData };
    },
    { immediate: true }
);
</script>

<style scoped></style>
