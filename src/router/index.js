import { createRouter, createWebHistory } from 'vue-router';
import { useMainStore } from '../stores/useStore';
import Login from '../views/Login.vue';
import Main from '../views/Main.vue';
import Benefits from '../modules/plans/components/benefits/Benefits.vue';
import Benefitgroups from '../modules/plans/components/benefit-groups/Benefitgroups.vue';
import Plans from '../modules/plans/components/plans/Plans.vue';
import Clients from '../modules/clients/Clients.vue';
import Admin from '../modules/administration/Admin.vue';
import Dashboard from '../modules/dashboard/Dashboard.vue';
import Services from '../modules/plans/views/Services.vue';

const routes = [
    { path: '/', redirect: '/login.html' },
    { path: '/login.html', name: 'Login', component: Login },
    {
        path: '/',
        component: Main,
        meta: { requireAuth: true },
        children: [
            { path: '/dashboard', name: 'dashboard', component: Dashboard },
            { path: '/services', name: 'services', component: Services },
            { path: '/benefits', name: 'benefits', component: Benefits },
            {
                path: '/benefitgroups',
                name: 'benefitgroups',
                component: Benefitgroups
            },
            { path: '/plans', name: 'plans', component: Plans },
            { path: '/clients', name: 'clients', component: Clients },
            { path: '/admin', name: 'admin', component: Admin }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

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
    const isAuthenticated = !!localStorage.getItem('authToken');
    const mainStore = useMainStore();

    const currentMainTab = mainTabs[to.path];
    const currentSubTab = subTabs[to.name] || '';
    if (currentMainTab) mainStore.setMainTab(currentMainTab);
    if (currentSubTab) mainStore.setSubTab(currentSubTab);

    if (to.meta.requiresAuth && !isAuthenticated) {
        if (to.path !== '/login.html') {
            return next('/login.html');
        }
    }

    next();
});

export default router;
