import { createRouter, createWebHistory } from 'vue-router';
import { useMainStore } from '../stores/useStore';
import Benefits from '../views/Benefits.vue';
import Benefitgroups from '../views/Benefitgroups.vue';
import Plans from '../views/Plans.vue';
import Clients from '../views/Clients.vue';
import Admin from '../views/Admin.vue';
import Dashboard from '../views/Dashboard.vue';
import Services from '../views/Services.vue';

const routes = [
    { path: '/', redirect: '/dashboard' },
    { path: '/dashboard', name: 'dashboard', component: Dashboard },
    { path: '/services', name: 'services', component: Services },
    { path: '/benefits', name: 'benefits', component: Benefits },
    { path: '/benefitgroups', name: 'benefitgroups', component: Benefitgroups },
    { path: '/plans', name: 'plans', component: Plans },
    { path: '/clients', name: 'clients', component: Clients },
    { path: '/admin', name: 'admin', component: Admin }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Define tabs and sub-tabs mapping
const mainTabs = {
    '/dashboard': 'Dashboard',
    '/services': 'Services',
    '/benefits': 'Benefits',
    '/benefitgroups': 'Benefit Groups',
    '/plans': 'Plans',
    '/clients': 'Clients',
    '/admin': 'Administration'
};

const subTabs = {
    '/codesets': 'Code Sets',
    '/codegroups': 'Code Groups'
};

router.beforeEach((to, from, next) => {
    const mainStore = useMainStore();
    const currentMainTab = mainTabs[to.path];
    const currentSubTab = subTabs[to.name] || '';

    if (currentMainTab) mainStore.setMainTab(currentMainTab);
    if (currentSubTab) mainStore.setSubTab(currentSubTab);
    next();
});

export default router;
