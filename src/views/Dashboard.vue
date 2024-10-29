<template>
    <div
        class="dashboard-container bg-surface-50 dark:bg-surface-950 px-6 py-8 md:px-12 lg:px-20"
    >
        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-12 md:col-span-6 lg:col-span-3">
                <div class="info-card">
                    <div class="flex justify-between mb-4">
                        <div>
                            <span class="info-label">Orders</span>
                            <div class="info-value">152</div>
                        </div>
                        <div
                            class="icon-wrapper bg-blue-100 dark:bg-blue-400/30"
                        >
                            <i class="pi pi-shopping-cart icon-color-blue" />
                        </div>
                    </div>
                    <span class="text-green-500 font-medium">24 new </span>
                    <span class="text-surface-500 dark:text-surface-300"
                        >since last visit</span
                    >
                </div>
            </div>

            <div class="col-span-12 md:col-span-6 lg:col-span-3">
                <div class="info-card">
                    <div class="flex justify-between mb-4">
                        <div>
                            <span class="info-label">Revenue</span>
                            <div class="info-value">$2,100</div>
                        </div>
                        <div
                            class="icon-wrapper bg-orange-100 dark:bg-orange-400/30"
                        >
                            <i class="pi pi-map-marker icon-color-orange" />
                        </div>
                    </div>
                    <span class="text-green-500 font-medium">%52+ </span>
                    <span class="text-surface-500 dark:text-surface-300"
                        >since last week</span
                    >
                </div>
            </div>

            <div class="col-span-12 md:col-span-6 lg:col-span-3">
                <div class="info-card">
                    <div class="flex justify-between mb-4">
                        <div>
                            <span class="info-label">Customers</span>
                            <div class="info-value">28,441</div>
                        </div>
                        <div
                            class="icon-wrapper bg-cyan-100 dark:bg-cyan-400/30"
                        >
                            <i class="pi pi-inbox icon-color-cyan" />
                        </div>
                    </div>
                    <span class="text-green-500 font-medium">520 </span>
                    <span class="text-surface-500 dark:text-surface-300"
                        >newly registered</span
                    >
                </div>
            </div>

            <div class="col-span-12 md:col-span-6 lg:col-span-3">
                <div class="info-card">
                    <div class="flex justify-between mb-4">
                        <div>
                            <span class="info-label">Comments</span>
                            <div class="info-value">152 Unread</div>
                        </div>
                        <div
                            class="icon-wrapper bg-purple-100 dark:bg-purple-400/30"
                        >
                            <i class="pi pi-comment icon-color-purple" />
                        </div>
                    </div>
                    <span class="text-green-500 font-medium">85 </span>
                    <span class="text-surface-500 dark:text-surface-300"
                        >responded</span
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useMainStore } from '../stores/useStore';

const mainStore = useMainStore();
</script>

<style scoped></style>
