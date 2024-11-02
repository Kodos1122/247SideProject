const CODE_SETS_KEY = 'codeSetsData';
const CODE_GROUPS_KEY = 'codeGroupsData';

// Initial data for Code Sets and Code Groups
const initialCodeSetsData = [];

const initialCodeGroupsData = [];

// Initialize local storage data if it doesn't exist
function initializeLocalStorage() {
    if (!localStorage.getItem(CODE_SETS_KEY)) {
        localStorage.setItem(
            CODE_SETS_KEY,
            JSON.stringify(initialCodeSetsData)
        );
    }
    if (!localStorage.getItem(CODE_GROUPS_KEY)) {
        localStorage.setItem(
            CODE_GROUPS_KEY,
            JSON.stringify(initialCodeGroupsData)
        );
    }
}

// Fetch data from local storage
export function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

// Save updated data to local storage
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Code Sets Operations
export function getCodeSets() {
    return getData(CODE_SETS_KEY);
}

export function addCodeSet(newItem) {
    const codeSets = getCodeSets();
    newItem.id = Date.now(); // Simple ID generation
    codeSets.push(newItem);
    saveData(CODE_SETS_KEY, codeSets);
}

export function updateCodeSet(updatedItem) {
    const codeSets = getCodeSets().map((item) =>
        item.id === updatedItem.id ? updatedItem : item
    );
    saveData(CODE_SETS_KEY, codeSets);
}

export function deleteCodeSet(id) {
    const codeSets = getCodeSets().filter((item) => item.id !== id);
    saveData(CODE_SETS_KEY, codeSets);
}

// Code Groups Operations
export function getCodeGroups() {
    return getData(CODE_GROUPS_KEY);
}

export function addCodeGroup(newItem) {
    const codeGroups = getCodeGroups();
    newItem.id = Date.now(); // Simple ID generation
    codeGroups.push(newItem);
    saveData(CODE_GROUPS_KEY, codeGroups);
}

export function updateCodeGroup(updatedItem) {
    const codeGroups = getCodeGroups().map((item) =>
        item.id === updatedItem.id ? updatedItem : item
    );
    saveData(CODE_GROUPS_KEY, codeGroups);
}

export function deleteCodeGroup(id) {
    const codeGroups = getCodeGroups().filter((item) => item.id !== id);
    saveData(CODE_GROUPS_KEY, codeGroups);
}

// Initialize data on first load
initializeLocalStorage();
