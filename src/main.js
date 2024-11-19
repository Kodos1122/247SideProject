import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia';
import router from './router';

// Global CSS and PrimeVue theme
import './assets/layout/main.css';
import './assets/layout/pages.css';
import '../src/modules/plans/assets/styles.css';
import 'primevue/resources/themes/lara-light-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

// PrimeVue components
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Dropdown from 'primevue/dropdown';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import Skeleton from 'primevue/skeleton';
import ProgressSpinner from 'primevue/progressspinner';

const app = createApp(App);

// PrimeVue and register components
app.use(PrimeVue);
app.use(createPinia());
app.use(router);
app.use(ConfirmationService);
app.use(ToastService);

// Components registered globally
app.component('Dialog', Dialog);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('InputText', InputText);
app.component('Calendar', Calendar);
app.component('ConfirmDialog', ConfirmDialog);
app.component('Toast', Toast);
app.component('Dropdown', Dropdown);
app.component('Password', Password);
app.component('Checkbox', Checkbox);
app.component('Button', Button);
app.component('Skeleton', Skeleton);
app.component('ProgressSpinner', ProgressSpinner);

// Check authentication only once during initial load
if (window.location.pathname !== '/login.html') {
    const isAuthenticated = localStorage.getItem('authToken');
    if (!isAuthenticated) {
        window.location.href = '/login.html';
    } else {
        app.mount('#app');
    }
} else {
    app.mount('#app');
}
