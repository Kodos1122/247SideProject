import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia';
import router from './router';
import { isAuthenticated } from './stores/localStorageData'; // Import the authentication check function

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

// Use PrimeVue and register components
app.use(PrimeVue);
app.use(createPinia());
app.use(router);
app.use(ConfirmationService);
app.use(ToastService);

// Register PrimeVue components globally
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

// Logo and ProgressSpinner container logic
const showLogoAndSpinnerContainer = () => {
    if (!sessionStorage.getItem('appAlreadyInitialized')) {
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.top = '50%';
        container.style.left = '50%';
        container.style.transform = 'translate(-50%, -50%) scale(0)';
        container.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
        container.style.zIndex = '9999';
        container.style.opacity = '0';

        // Add the logo image
        const logo = document.createElement('img');
        logo.src = '/new_favicon.png'; // Replace with your logo path
        logo.alt = 'App Logo';
        logo.style.width = '350px'; // Adjust size as needed
        logo.style.height = 'auto';
        logo.style.display = 'block';
        logo.style.margin = 'auto';
        container.appendChild(logo);

        // Add the progress spinner (hidden initially)
        const spinner = document.createElement('div');
        spinner.className = 'spinner'; // This class can be styled using PrimeVue or any CSS framework
        spinner.style.width = '50px';
        spinner.style.height = '50px';
        spinner.style.border = '5px solid rgba(0, 0, 0, 0.1)';
        spinner.style.borderTop = '5px solid #3498db'; // Customize spinner color
        spinner.style.borderRadius = '50%';
        spinner.style.animation = 'spin 1s linear infinite';
        spinner.style.display = 'none'; // Hide the spinner until the logo fades out
        spinner.style.marginTop = '20px';
        container.appendChild(spinner);

        // Attach the container to the body
        document.body.appendChild(container);

        // Trigger fade-in animation for the logo
        requestAnimationFrame(() => {
            container.style.transform = 'translate(-50%, -50%) scale(1)';
            container.style.opacity = '1';
        });

        return new Promise((resolve) => {
            setTimeout(() => {
                // Fade out the logo and fade in the spinner
                logo.style.opacity = '0'; // Fade out logo

                setTimeout(() => {
                    logo.style.display = 'none'; // Hide logo
                    spinner.style.display = 'block'; // Show spinner

                    // Continue showing spinner for a bit and then fade everything out
                    setTimeout(() => {
                        container.style.transform =
                            'translate(-50%, -50%) scale(0)';
                        container.style.opacity = '0';

                        setTimeout(() => {
                            document.body.removeChild(container);
                            sessionStorage.setItem(
                                'appAlreadyInitialized',
                                'true'
                            );
                            resolve();
                        }, 500); // Match fade-out transition duration
                    }, 1500); // Spinner visible duration
                }, 500); // Match logo fade-out duration
            }, 1500); // Logo show duration
        });
    }
    return Promise.resolve(); // If already initialized, resolve immediately
};

// Authentication and mounting logic
async function initializeApp() {
    await showLogoAndSpinnerContainer(); // Show logo and spinner on first load of the session

    if (!isAuthenticated() && window.location.pathname !== '/login.html') {
        window.location.href = '/login.html';
    } else {
        app.mount('#app');
    }
}

initializeApp();

// Optional spinner CSS (add this to your global CSS)
const style = document.createElement('style');
style.innerHTML = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
