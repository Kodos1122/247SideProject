<template>
    <Dialog
        v-model:visible="isVisible"
        modal
        :header="dialogHeader"
        :style="{ width: '30rem' }"
        closable
        @hide="hideDialog"
    >
        <span class="text-gray-500 block mb-6 ml-4">
            Fill in the details below.
        </span>

        <div v-if="itemType === 'Code Sets'" class="form-fields">
            <div class="form-field mb-7 p-float-label font-semibold">
                <InputText v-model="currentItem.name.en" id="codeSetsNameEn" />
                <label for="codeSetsNameEn">Name</label>
                <span v-if="validationErrors['name.en']" class="error-message">
                    {{ validationErrors['name.en'][0] }}
                </span>
            </div>
            <div class="form-field mb-7 p-float-label font-semibold">
                <InputText
                    v-model="currentItem.description.en"
                    id="codeSetsDescriptionEn"
                />
                <label for="codeSetsDescriptionEn">Description</label>
                <span
                    v-if="validationErrors['description.en']"
                    class="error-message"
                >
                    {{ validationErrors['description.en'][0] }}
                </span>
            </div>
            <div class="form-field mb-7 p-float-label font-semibold">
                <Calendar
                    dateFormat="yy/mm/dd"
                    v-model="currentItem.effective_date"
                    id="codeSetsEffectiveDate"
                />
                <label for="codeSetsEffectiveDate">Effective Date</label>
                <span
                    v-if="validationErrors['effective_date']"
                    class="error-message"
                >
                    {{ validationErrors['effective_date'][0] }}
                </span>
            </div>
            <div class="form-field mb-4 p-float-label font-semibold">
                <Dropdown
                    v-model="currentItem.status"
                    :options="statusOptions"
                    optionLabel="label"
                    optionValue="value"
                    id="codeSetsStatus"
                />
                <label for="codeSetsStatus">Status</label>
                <span v-if="validationErrors['status']" class="error-message">
                    {{ validationErrors['status'][0] }}
                </span>
            </div>
        </div>

        <div v-if="itemType === 'Code Groups'" class="form-fields">
            <div class="form-field mb-7 p-float-label font-semibold">
                <InputText
                    v-model="currentItem.name.en"
                    id="codeGroupsNameEn"
                />
                <label for="codeGroupsNameEn">Name</label>
                <span v-if="validationErrors['name.en']" class="error-message">
                    {{ validationErrors['name.en'][0] }}
                </span>
            </div>
            <div class="form-field mb-7 p-float-label font-semibold">
                <InputText
                    v-model="currentItem.description.en"
                    id="codeGroupsDescriptionEn"
                />
                <label for="codeGroupsDescriptionEn">Description</label>
                <span
                    v-if="validationErrors['description.en']"
                    class="error-message"
                >
                    {{ validationErrors['description.en'][0] }}
                </span>
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
                <span
                    v-if="validationErrors['service_code_set.id']"
                    class="error-message"
                >
                    {{ validationErrors['service_code_set.id'][0] }}
                </span>
            </div>
            <div class="form-field mb-7 p-float-label font-semibold">
                <Calendar
                    dateFormat="yy/mm/dd"
                    v-model="currentItem.effective_date"
                    id="codeGroupsEffectiveDate"
                />
                <label for="codeGroupsEffectiveDate">Effective Date</label>
                <span
                    v-if="validationErrors['effective_date']"
                    class="error-message"
                >
                    {{ validationErrors['effective_date'][0] }}
                </span>
            </div>
            <div class="form-field mb-4 p-float-label font-semibold">
                <Dropdown
                    v-model="currentItem.status"
                    :options="statusOptions"
                    optionLabel="label"
                    optionValue="value"
                    id="codeGroupsStatus"
                />
                <label for="codeGroupsStatus">Status</label>
                <span v-if="validationErrors['status']" class="error-message">
                    {{ validationErrors['status'][0] }}
                </span>
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
const validationErrors = ref({});

const statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' }
];

function hideDialog() {
    emit('update:visible', false);
}

async function handleSave() {
    validationErrors.value = {};
    const isValid =
        props.itemType === 'Code Sets'
            ? validateCodeSetsInputs()
            : validateCodeGroupsInputs();

    if (!isValid) return;

    const itemToSave = {
        ...currentItem.value,
        effective_date: currentItem.value.effective_date
            ? formatDateToUTC(currentItem.value.effective_date)
            : ''
    };

    if (props.itemType === 'Code Groups') {
        itemToSave.service_code_set_id = currentItem.value.service_code_set.id;
        delete itemToSave.service_code_set;
    }

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

function validateCodeSetsInputs() {
    const requiredFields = [
        'name.en',
        'description.en',
        'effective_date',
        'status'
    ];

    requiredFields.forEach((field) => {
        const value = field
            .split('.')
            .reduce(
                (obj, key) => (obj ? obj[key] : undefined),
                currentItem.value
            );

        if (!value || (field === 'name.en' && value.length < 3)) {
            validationErrors.value[field] = [
                field === 'name.en'
                    ? 'The name field must be at least 3 characters.'
                    : 'This field is required.'
            ];
        }
    });

    return Object.keys(validationErrors.value).length === 0;
}

function validateCodeGroupsInputs() {
    const requiredFields = [
        'name.en',
        'description.en',
        'effective_date',
        'status',
        'service_code_set.id'
    ];

    requiredFields.forEach((field) => {
        const value = field
            .split('.')
            .reduce(
                (obj, key) => (obj ? obj[key] : undefined),
                currentItem.value
            );

        if (!value || (field === 'name.en' && value.length < 3)) {
            validationErrors.value[field] = [
                field === 'name.en'
                    ? 'The name field must be at least 3 characters.'
                    : 'This field is required.'
            ];
        }
    });

    return Object.keys(validationErrors.value).length === 0;
}

function handleSaveError(error) {
    if (error.response && error.response.data.errors) {
        validationErrors.value = error.response.data.errors;
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
            effective_date: newData.effectiveDate
                ? adjustToLocalDate(newData.effectiveDate)
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

function adjustToLocalDate(dateString) {
    const utcDate = new Date(dateString);
    return new Date(
        utcDate.getUTCFullYear(),
        utcDate.getUTCMonth(),
        utcDate.getUTCDate()
    );
}
</script>

<style scoped>
.error-message {
    color: red;
    font-size: 12px;
    margin-top: 4px;
}
</style>
