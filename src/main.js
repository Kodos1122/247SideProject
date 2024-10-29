import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia';
import router from './router';
import './assets/layout/main.css';
import './assets/layout/styles.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primevue/datatable';
import 'primevue/column';
import 'primevue/dialog';
import 'primevue/iconfield';
import 'primevue/inputicon';
import 'primevue/inputtext';

const app = createApp(App);
app.use(PrimeVue);
app.use(createPinia());
app.use(router);

app.mount('#app');
