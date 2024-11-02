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
            <CodeSets
                v-if="currentSubTab === 'Code Sets'"
                @edit-item="editItem"
                @refresh-data="refreshData"
            />
            <CodeGroups
                v-if="currentSubTab === 'Code Groups'"
                @edit-item="editItem"
                @refresh-data="refreshData"
            />
        </div>

        <Dialog
            :visible="dialogVisible"
            :itemType="currentSubTab"
            :actionType="dialogAction"
            :itemData="currentItem"
            @update:visible="dialogVisible = $event"
            @save="saveItem"
        />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import Navbar from '../components/Navbar.vue';
import CodeSets from '../modules/Codesets.vue';
import CodeGroups from '../modules/Codegroups.vue';
import Dialog from '../components/Dialog.vue';
import { useMainStore } from '../stores/useStore';
import {
    addCodeSet,
    updateCodeSet,
    addCodeGroup,
    updateCodeGroup
} from '../stores/localStorageData';

const mainStore = useMainStore();
const currentSubTab = ref('Code Sets'); // Default to Code Sets tab
const dialogVisible = ref(false);
const dialogAction = ref('Add');
const currentItem = ref({});

// Set initial values in the store
mainStore.setMainTab('Services');
mainStore.setSubTab(currentSubTab.value);

// Watch the `currentSubTab` ref and update the store whenever it changes
watch(currentSubTab, (newTab) => {
    mainStore.setSubTab(newTab);
});

// Handle tab selection
function selectSubTab(subTabName) {
    currentSubTab.value = subTabName;
}

// Handle adding new data
function handleAddNewData() {
    dialogAction.value = 'Add';
    currentItem.value = {}; // Reset the item
    dialogVisible.value = true;
}

// Handle editing existing data
function editItem(item) {
    dialogAction.value = 'Edit';
    currentItem.value = { ...item };
    dialogVisible.value = true;
}

// Save item after editing or adding and emit a refresh event
function saveItem(item) {
    if (currentSubTab.value === 'Code Sets') {
        if (dialogAction.value === 'Add') {
            addCodeSet(item);
        } else {
            updateCodeSet(item);
        }
    } else if (currentSubTab.value === 'Code Groups') {
        if (dialogAction.value === 'Add') {
            addCodeGroup(item);
        } else {
            updateCodeGroup(item);
        }
    }
    dialogVisible.value = false;
    refreshData(); // Trigger data refresh after save
}

// Emit refresh event
function refreshData() {
    if (currentSubTab.value === 'Code Sets') {
        document.dispatchEvent(new CustomEvent('refreshCodeSets'));
    } else if (currentSubTab.value === 'Code Groups') {
        document.dispatchEvent(new CustomEvent('refreshCodeGroups'));
    }
}
</script>

<style scoped>
.nav {
    margin-bottom: 20px;
}
</style>
