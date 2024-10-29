import { defineStore } from 'pinia';

export const useMainStore = defineStore('mainStore', {
    state: () => ({
        leftsideOpen: true,
        mainTab: 'Dashboard',
        subTab: ''
    }),
    actions: {
        toggleLeftside() {
            this.leftsideOpen = !this.leftsideOpen;
        },
        setMainTab(tab) {
            this.mainTab = tab;
        },
        setSubTab(subTab) {
            this.subTab = subTab;
        }
    }
});
