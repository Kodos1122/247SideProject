const CODE_SETS_KEY = 'codeSetsData';
const CODE_GROUPS_KEY = 'codeGroupsData';

const initialCodeSetsData = [];
const initialCodeGroupsData = [];

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

// Format date to 'YYYY-MM-DD'
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function getCodeSets() {
    const codeSets = getData(CODE_SETS_KEY);
    return codeSets.map((item) => ({
        ...item,
        effectiveDate: formatDate(item.effectiveDate),
        lastUpdated: formatDate(item.lastUpdated)
    }));
}

export function addCodeSet(newItem) {
    const codeSets = getCodeSets();
    newItem.id = Date.now();
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

export function getCodeGroups() {
    const codeGroups = getData(CODE_GROUPS_KEY);
    return codeGroups.map((item) => ({
        ...item,
        effectiveDate: formatDate(item.effectiveDate),
        lastUpdated: formatDate(item.lastUpdated)
    }));
}

export function addCodeGroup(newItem) {
    const codeGroups = getCodeGroups();
    newItem.id = Date.now();
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

initializeLocalStorage();
