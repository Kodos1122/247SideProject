<template>
    <Dialog
        v-model:visible="isVisible"
        modal
        :header="dialogHeader"
        :style="{ width: '30rem' }"
        closable
        @hide="hideDialog"
    >
        <span class="text-gray-500 block mb-6 ml-4"
            >Fill in the details below.</span
        >

        <div v-if="itemType === 'Code Sets'" class="form-fields">
            <div class="form-field mb-7 p-float-label font-semibold">
                <InputText v-model="currentItem.name.en" id="codeSetsNameEn" />
                <label for="codeSetsNameEn">Name</label>
            </div>
            <div class="form-field mb-7 p-float-label font-semibold">
                <InputText
                    v-model="currentItem.description.en"
                    id="codeSetsDescriptionEn"
                />
                <label for="codeSetsDescriptionEn">Description</label>
            </div>
            <div class="form-field mb-7 p-float-label font-semibold">
                <Calendar
                    dateFormat="yy/mm/dd"
                    v-model="currentItem.effective_date"
                    id="codeSetsEffectiveDate"
                />
                <label for="codeSetsEffectiveDate">Effective Date</label>
            </div>
            <div class="form-field mb-4 p-float-label font-semibold">
                <InputText v-model="currentItem.status" id="codeSetsStatus" />
                <label for="codeSetsStatus">Status</label>
            </div>
        </div>

        <div v-if="itemType === 'Code Groups'" class="form-fields">
            <div class="form-field mb-7 p-float-label font-semibold">
                <InputText
                    v-model="currentItem.name.en"
                    id="codeGroupsNameEn"
                />
                <label for="codeGroupsNameEn">Name</label>
            </div>
            <div class="form-field mb-7 p-float-label font-semibold">
                <InputText
                    v-model="currentItem.description.en"
                    id="codeGroupsDescriptionEn"
                />
                <label for="codeGroupsDescriptionEn">Description</label>
            </div>
            <div class="form-field mb-7 p-float-label font-semibold">
                <Dropdown
                    v-model="currentItem.service_code_set.id"
                    :options="codeSetsOptions"
                    optionLabel="name"
                    optionValue="id"
                    id="codeGroupsServiceCodeSet"
                />
                <label for="codeGroupsServiceCodeSet">Service Code Set</label>
            </div>
            <div class="form-field mb-7 p-float-label font-semibold">
                <Calendar
                    dateFormat="yy/mm/dd"
                    v-model="currentItem.effective_date"
                    id="codeGroupsEffectiveDate"
                />
                <label for="codeGroupsEffectiveDate">Effective Date</label>
            </div>
            <div class="form-field mb-4 p-float-label font-semibold">
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
            <Button label="Save" class="p-button-success" @click="handleSave" />
        </div>

        <Toast position="top-right" />
    </Dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import {
    addCodeSet,
    updateCodeSet,
    addCodeGroup,
    updateCodeGroup
} from '../../../../../stores/localStorageData';

const toast = useToast();
const props = defineProps({
    visible: Boolean,
    itemType: String,
    actionType: String,
    itemData: Object,
    codeSetsOptions: Array
});
const emit = defineEmits(['update:visible', 'save', 'data-saved']);

const isVisible = computed({
    get: () => props.visible,
    set: (value) => emit('update:visible', value)
});

const currentItem = ref({
    name: { en: '', fr: '' },
    description: { en: '', fr: '' },
    effective_date: '',
    status: '',
    is_locked: false,
    service_code_set: { id: '', name: '' }
});

const dialogHeader = computed(() => `${props.actionType} ${props.itemType}`);

function hideDialog() {
    emit('update:visible', false);
}

async function handleSave() {
    if (!validateInputs()) return;

    const itemToSave = {
        ...currentItem.value,
        effective_date: currentItem.value.effective_date
            ? formatDateToUTC(currentItem.value.effective_date)
            : ''
    };

    try {
        if (props.itemType === 'Code Sets') {
            if (props.actionType === 'Add') {
                await addCodeSet(itemToSave);
            } else {
                if (!currentItem.value.id) {
                    throw new Error('Code Set ID is missing or undefined.');
                }
                await updateCodeSet(itemToSave);
            }
        } else if (props.itemType === 'Code Groups') {
            itemToSave.service_code_set = currentItem.value.service_code_set.id;
            if (props.actionType === 'Add') {
                await addCodeGroup(itemToSave);
            } else {
                if (!currentItem.value.id) {
                    throw new Error('Code Group ID is missing or undefined.');
                }
                await updateCodeGroup(itemToSave);
            }
        }
        showSuccessMessage();
        emit('save');
        emit('data-saved');
        hideDialog();
    } catch (error) {
        handleSaveError(error);
    }
}

function validateInputs() {
    const requiredFields = [
        'name.en',
        'description.en',
        'effective_date',
        'status'
    ];
    const missingFields = requiredFields.filter((field) => {
        const value = field
            .split('.')
            .reduce(
                (obj, key) => (obj ? obj[key] : undefined),
                currentItem.value
            );
        return !value;
    });

    if (missingFields.length) {
        toast.add({
            severity: 'error',
            summary: 'Validation Error',
            detail: 'Please fill in all required fields.',
            life: 3000
        });
        return false;
    }
    return true;
}

function handleSaveError(error) {
    if (error.response && error.response.data) {
        console.error('Validation Error:', error.response.data);
    } else {
        console.error('Error saving item:', error);
    }
    toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to save item.',
        life: 3000
    });
}

function formatDateToUTC(date) {
    const d = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function showSuccessMessage() {
    toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Your information has been saved',
        life: 3000
    });
}

watch(
    () => props.itemData,
    (newData) => {
        currentItem.value = {
            ...newData,
            name:
                typeof newData.name === 'object'
                    ? newData.name
                    : { en: newData.name || '', fr: '' },
            description:
                typeof newData.description === 'object'
                    ? newData.description
                    : { en: newData.description || '', fr: '' },
            effective_date: newData.effective_date
                ? new Date(newData.effective_date)
                : '',
            status: newData.status || '',
            is_locked: newData.is_locked || false,
            service_code_set: newData.service_code_set || {
                id: '',
                name: ''
            }
        };
    },
    { immediate: true }
);
</script>

<style scoped></style>
