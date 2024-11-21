<template>
    <Toast />
    <ConfirmDialogComponent
        ref="confirmDialog"
        @confirm="handleLogout"
        @cancel="cancelLogout"
        message="Are you sure you want to log out?"
        header="Log Out Confirmation"
    />
    <div class="main-content">
        <nav class="flex items-center justify-between bg-white-900">
            <div class="text-[27px] font-medium">
                <span>{{ mainTab }}</span>
            </div>
        </nav>

        <div
            class="dashboard-container bg-surface-50 dark:bg-surface-950 px-6 py-8 md:px-12 lg:px-20"
        >
            <div class="dashboard-grid">
                <div class="dashboard-card">
                    <div class="card-header">
                        <div>
                            <span class="card-label">Orders</span>
                            <div class="card-value">152</div>
                        </div>
                        <div
                            class="icon-wrapper bg-blue-100 dark:bg-blue-400/30"
                        >
                            <i class="pi pi-shopping-cart icon-blue" />
                        </div>
                    </div>
                    <div class="card-footer">
                        <span class="highlight-text">24 new </span>
                        <span class="subtext">since last visit</span>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <div>
                            <span class="card-label">Revenue</span>
                            <div class="card-value">$2,100</div>
                        </div>
                        <div
                            class="icon-wrapper bg-orange-100 dark:bg-orange-400/30"
                        >
                            <i class="pi pi-map-marker icon-orange" />
                        </div>
                    </div>
                    <div class="card-footer">
                        <span class="highlight-text">%52+ </span>
                        <span class="subtext">since last week</span>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <div>
                            <span class="card-label">Customers</span>
                            <div class="card-value">28,441</div>
                        </div>
                        <div
                            class="icon-wrapper bg-cyan-100 dark:bg-cyan-400/30"
                        >
                            <i class="pi pi-inbox icon-cyan" />
                        </div>
                    </div>
                    <div class="card-footer">
                        <span class="highlight-text">520 </span>
                        <span class="subtext">newly registered</span>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="card-header">
                        <div>
                            <span class="card-label">Comments</span>
                            <div class="card-value">152 Unread</div>
                        </div>
                        <div
                            class="icon-wrapper bg-purple-100 dark:bg-purple-400/30"
                        >
                            <i class="pi pi-comment icon-purple" />
                        </div>
                    </div>
                    <div class="card-footer">
                        <span class="highlight-text">85 </span>
                        <span class="subtext">responded</span>
                    </div>
                </div>
            </div>
            <div class="community-section-wrapper">
                <div class="community-content text-center">
                    <div class="community-powered-by">
                        <i class="pi pi-github" />&nbsp;POWERED BY GUARDME
                    </div>
                    <h1 class="community-title">Join Our GitHub</h1>
                    <p class="community-description">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Velit numquam eligendi quos.
                    </p>
                    <Button
                        label="Join Now"
                        icon="pi pi-github"
                        raised
                        rounded
                        class="community-join-button"
                        @click="openLink"
                    />
                    <Button
                        label="Logout"
                        icon="pi pi-sign-out"
                        raised
                        rounded
                        class="logout-button"
                        @click="confirmLogout"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import ConfirmDialogComponent from '../plans/components/services/dialogs/ConfirmDialog.vue';
import { computed, ref, onMounted } from 'vue';
import { useMainStore } from '../../stores/useStore';
import { useToast } from 'primevue/usetoast';
import { apiLogout, isAuthenticated } from '../../stores/localStorageData';

const mainStore = useMainStore();
const mainTab = computed(() => mainStore.mainTab);
const toast = useToast();
const confirmDialog = ref(null);

function logout() {
    apiLogout(); // Call the logout API
    localStorage.setItem('justLoggedOut', 'true'); // Set the logout flag
    window.location.href = '/login.html'; // Redirect to login page
}

function confirmLogout() {
    confirmDialog.value.openConfirmDialog();
}

function handleLogout() {
    logout();
    localStorage.setItem('justLoggedOut', 'true'); // Set flag for spinner on login page
    window.location.href = '/login.html';
}

function openLink() {
    window.open('https://github.com/Kodos1122/247SideProject.git', '_blank');
}

onMounted(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated()) {
        window.location.href = '/login.html';
    }

    // Show login success message if recently logged in
    const justLoggedIn = localStorage.getItem('justLoggedIn');
    if (justLoggedIn) {
        toast.add({
            severity: 'success',
            summary: 'Logged In!',
            detail: 'Login successful.',
            life: 4000
        });
        localStorage.removeItem('justLoggedIn'); // Clear the flag
    }
});
</script>

<style scoped></style>
