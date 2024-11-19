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
    addCodeGroup,
    fetchCodeSetsForCodeGroups
} from '../../../stores/localStorageData';
import { useMainStore } from '../../../stores/useStore';

const mainStore = useMainStore();
const currentSubTab = ref('Code Sets');
const dialogVisible = ref(false);
const dialogAction = ref('Add');
const currentItem = ref({});
const availableCodeSets = ref([]);

mainStore.setMainTab('Services');
mainStore.setSubTab(currentSubTab.value);

watch(currentSubTab, (newTab) => {
    mainStore.setSubTab(newTab);
    refresh();
});

function selectSubTab(subTabName) {
    currentSubTab.value = subTabName;
}

async function handleAddNewData() {
    if (currentSubTab.value === 'Code Groups') {
        await loadCodeSets();
    }
    resetCurrentItem();
    dialogAction.value = 'Add';
    dialogVisible.value = true;
}

async function handleSave() {
    try {
        const saveFn =
            currentSubTab.value === 'Code Sets' ? addCodeSet : addCodeGroup;

        await saveFn(currentItem.value);
        refresh();
        dialogVisible.value = false;
    } catch (error) {
        console.error(`Error saving ${currentSubTab.value}:`, error);
    }
}

async function loadCodeSets() {
    try {
        availableCodeSets.value = await fetchCodeSetsForCodeGroups();
    } catch (error) {
        console.error('Failed to load Code Sets:', error);
    }
}

function refresh() {
    if (currentSubTab.value === 'Code Sets') {
        document.dispatchEvent(new CustomEvent('refreshCodeSets'));
    } else if (currentSubTab.value === 'Code Groups') {
        document.dispatchEvent(new CustomEvent('refreshCodeGroups'));
    }
}

function resetCurrentItem() {
    currentItem.value = {
        name: { en: '', fr: '' },
        description: { en: '', fr: '' },
        effective_date: '',
        status: '',
        is_locked: false,
        service_code_set: { id: '', name: '' }
    };
}

onBeforeUnmount(() => {
    refresh();
});
</script>

<style scoped></style>
