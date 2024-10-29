<template>
    <div class="main-content">
        <nav class="flex items-center justify-between bg-white-900">
            <div class="text-2xl text-black font-semibold">
                <span>{{ mainTab }}</span>
            </div>

            <Button class="new-button" @click="showDialog">
                <i text="New" class="pi pi-plus"></i> New
            </Button>
        </nav>

        <Dialog
            v-model:visible="visible"
            modal
            header="Add New Code Sets"
            :style="{ width: '30rem' }"
            :class="['custom-dialog']"
        >
            <span class="text-gray-500 block mb-5"
                >Fill in the details below.</span
            >

            <div class="form-field mb-7">
                <FloatLabel>
                    <InputText v-model="name" id="Name" />
                    <label for="Name">Name</label>
                </FloatLabel>
            </div>
            <div class="form-field mb-7">
                <FloatLabel>
                    <InputText v-model="effectiveDate" id="EffectiveDate" />
                    <label for="EffectiveDate">Effective Date</label>
                </FloatLabel>
            </div>
            <div class="form-field mb-7">
                <FloatLabel>
                    <InputText v-model="lastUpdated" id="LastUpdated" />
                    <label for="LastUpdated">Last Updated</label>
                </FloatLabel>
            </div>
            <div class="form-field mb-4">
                <FloatLabel>
                    <InputText v-model="status" id="Status" />
                    <label for="Status">Status</label>
                </FloatLabel>
            </div>

            <div class="flex justify-end gap-3 mt-6">
                <Button
                    label="Cancel"
                    class="p-button-outlined"
                    @click="hideDialog"
                />
                <Button
                    label="Save"
                    class="p-button-success"
                    @click="saveData"
                />
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useMainStore } from '../stores/useStore';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';

const mainStore = useMainStore();
const mainTab = computed(() => mainStore.mainTab);
const visible = ref(false);

const name = ref('');
const effectiveDate = ref('');
const lastUpdated = ref('');
const status = ref('');

const showDialog = () => {
    visible.value = true;
};
const hideDialog = () => {
    visible.value = false;
};

const saveData = () => {
    console.log(
        `Name: ${name.value}, Effective Date: ${effectiveDate.value}, Last Updated: ${lastUpdated.value}, Status: ${status.value}`
    );
    hideDialog();
};
</script>

<style scoped></style>
