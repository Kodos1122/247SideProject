<template>
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
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import { computed } from 'vue';
import { useMainStore } from '../../stores/useStore';

const mainStore = useMainStore();
const mainTab = computed(() => mainStore.mainTab);
function openLink() {
    window.open('https://github.com/Kodos1122/247SideProject.git', '_blank');
}
</script>

<style scoped>
.dashboard-container {
    background-color: var(--surface-50);
    padding: 2rem 1.5rem;
}

.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
}

@media (min-width: 768px) {
    .dashboard-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .dashboard-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

.dashboard-card {
    background-color: var(--surface-0);
    padding: 1.5rem;
    border-radius: 0.75rem;
    box-shadow:
        0px 2px 6px rgba(0, 0, 0, 0.12),
        0px 4px 10px rgba(0, 0, 0, 0.03);
}

.dashboard-card:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.card-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.card-label {
    font-size: 1rem;
    color: var(--surface-600);
}

.card-value {
    font-size: 1.75rem;
    font-weight: bold;
    color: var(--surface-900);
}

.icon-wrapper {
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

.icon-blue {
    color: var(--blue-600);
    font-size: 1.5rem;
}

.icon-orange {
    color: var(--orange-600);
    font-size: 1.5rem;
}

.icon-cyan {
    color: var(--cyan-600);
    font-size: 1.5rem;
}

.icon-purple {
    color: var(--purple-600);
    font-size: 1.5rem;
}

.card-footer {
    font-size: 0.875rem;
    color: var(--surface-500);
}

.highlight-text {
    color: var(--green-500);
    font-weight: 500;
}

.subtext {
    color: var(--surface-500);
}

.community-section-wrapper {
    padding: 80px 24px;
    background-color: #f4f4f4;
    color: #495057;
}
.community-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    color: #495057;
}
.community-powered-by {
    font-size: 1.1rem;
    font-weight: bold;
    color: #060606;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.community-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #080808;
    margin-bottom: 12px;
    line-height: 1.3;
}
.community-description {
    font-size: 1.25rem;
    color: #6c757d;
    margin-bottom: 32px;
    line-height: 1.6;
}
.community-join-button {
    font-weight: bold;
    padding: 12px 32px;
    background-color: #14377d;
    color: #ffffff;
    border-radius: 8px;
    transition: background-color 0.3s ease;
}
.community-join-button:hover {
    background-color: #2467ba;
}
</style>
