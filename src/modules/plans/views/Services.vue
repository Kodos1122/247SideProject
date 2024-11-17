<template>
    <div class="main-content">
        <Navbar class="nav" @add-new-data="handleAddNewData" />

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
            <CodeSets v-if="currentSubTab === 'Code Sets'" @refresh="refresh" />
            <CodeGroups
                v-if="currentSubTab === 'Code Groups'"
                :codeSetsOptions="availableCodeSets"
                @refresh="refresh"
            />
        </div>

        <Dialog
            :visible="dialogVisible"
            :itemType="currentSubTab"
            :actionType="dialogAction"
            :itemData="currentItem"
            :codeSetsOptions="availableCodeSets"
            @update:visible="dialogVisible = $event"
            @save="refresh"
        >
            <template #footer>
                <div class="flex justify-end gap-4">
                    <button
                        class="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded"
                        @click="dialogVisible = false"
                    >
                        Cancel
                    </button>
                    <button
                        class="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded"
                        @click="handleSave"
                    >
                        Save
                    </button>
                </div>
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue';
import Navbar from '../../../components/Navbar.vue';
import CodeSets from '../../plans/components/services/Codesets.vue';
import CodeGroups from '../../plans/components/services/Codegroups.vue';
import Dialog from '../components/services/dialogs/Dialog.vue';
import {
    addCodeSet,
    fetchCodeSetsForCodeGroups,
    addCodeGroup
} from '../../../stores/localStorageData';
import { useMainStore } from '../../../stores/useStore';

const mainStore = useMainStore();
const currentSubTab = ref('Code Sets');
const dialogVisible = ref(false);
const dialogAction = ref('Add');
const currentItem = ref({});
const availableCodeSets = ref([]);

// Set initial main tab and sub-tab
mainStore.setMainTab('Services');
mainStore.setSubTab(currentSubTab.value);

// Watch for sub-tab changes
watch(currentSubTab, (newTab) => {
    mainStore.setSubTab(newTab);
    refresh(); // Reload data on tab change
});

// Select a sub-tab
function selectSubTab(subTabName) {
    currentSubTab.value = subTabName;
}

// Add new item logic
async function handleAddNewData() {
    if (currentSubTab.value === 'Code Groups') {
        await loadCodeSetsForDialog(); // Fetch Code Sets for dropdown
    }

    currentItem.value = {
        name: { en: '', fr: '' },
        description: { en: '', fr: '' },
        effective_date: '',
        status: '',
        is_locked: false,
        service_code_set: { id: '', name: '' }
    };
    dialogAction.value = 'Add';
    dialogVisible.value = true;
}

// Save logic for both Code Sets and Code Groups
async function handleSave() {
    try {
        dialogVisible.value = false;
    } catch (error) {
        console.error('Error saving item:', error);
    }
}

async function loadCodeSetsForDialog() {
    try {
        availableCodeSets.value = await fetchCodeSetsForCodeGroups(); // Use the new function
    } catch (error) {
        console.error('Failed to fetch Code Sets for Code Groups:', error);
    }
}

// Refresh data based on the active tab
function refresh() {
    if (currentSubTab.value === 'Code Sets') {
        document.dispatchEvent(new CustomEvent('refreshCodeSets'));
    } else if (currentSubTab.value === 'Code Groups') {
        document.dispatchEvent(new CustomEvent('refreshCodeGroups'));
    }
}

// Load initial data when component mounts
onBeforeUnmount(() => {
    refresh();
});
</script>

<style scoped></style>
