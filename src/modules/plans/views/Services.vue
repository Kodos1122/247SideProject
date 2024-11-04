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
import Navbar from '../../../components/Navbar.vue';
import CodeSets from '../../plans/components/services/Codesets.vue';
import CodeGroups from '../../plans/components/services/Codegroups.vue';
import Dialog from '../components/services/dialogs/Dialog.vue';
import { useMainStore } from '../../../stores/useStore';
import {
    addCodeSet,
    updateCodeSet,
    addCodeGroup,
    updateCodeGroup
} from '../../../stores/localStorageData';

const mainStore = useMainStore();
const currentSubTab = ref('Code Sets');
const dialogVisible = ref(false);
const dialogAction = ref('Add');
const currentItem = ref({});

mainStore.setMainTab('Services');
mainStore.setSubTab(currentSubTab.value);

watch(currentSubTab, (newTab) => {
    mainStore.setSubTab(newTab);
});

function selectSubTab(subTabName) {
    currentSubTab.value = subTabName;
}

function handleAddNewData() {
    dialogAction.value = 'Add';
    currentItem.value = {};
    dialogVisible.value = true;
}

function editItem(item) {
    dialogAction.value = 'Edit';
    currentItem.value = { ...item };
    dialogVisible.value = true;
}

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
    refreshData();
}

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
