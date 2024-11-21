<template>
    <div class="main-content">
        <nav class="flex items-center justify-between bg-[#EFF3F8]">
            <div class="text-[27px] font-medium bg-[#EFF3F8]">
                <span>{{ mainTab }}</span>
            </div>
        </nav>
        <div class="pricing-section-wrapper">
            <div class="text-center mb-1">
                <h2 class="pricing-title">Pricing Plans</h2>
                <p class="pricing-subtitle">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Velit numquam eligendi quos.
                </p>
            </div>

            <div class="pricing-cards-wrapper">
                <div class="pricing-card">
                    <h3 class="pricing-card-title">Basic</h3>
                    <p class="pricing-card-description">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Velit numquam eligendi quos.
                    </p>
                    <hr class="pricing-card-divider" />
                    <div class="pricing-card-price">
                        <span class="price-amount">$9</span>
                        <span class="price-duration">per month</span>
                    </div>
                    <hr class="pricing-card-divider" />
                    <ul class="pricing-features-list">
                        <li class="feature-item">Arcu vitae elementum</li>
                        <li class="feature-item">Dui faucibus in ornare</li>
                        <li class="feature-item">Morbi tincidunt augue</li>
                        <li class="feature-item">Duis ultricies lacus sed</li>
                        <li class="feature-item">Imperdiet proin</li>
                        <li class="feature-item">Nisi scelerisque</li>
                    </ul>
                    <Button label="Buy Now" class="pricing-card-button" />
                </div>
                <div class="pricing-card">
                    <h3 class="pricing-card-title">Premium</h3>
                    <p class="pricing-card-description">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Velit numquam eligendi quos.
                    </p>
                    <hr class="pricing-card-divider" />
                    <div class="pricing-card-price">
                        <span class="price-amount">$29</span>
                        <span class="price-duration">per month</span>
                    </div>
                    <hr class="pricing-card-divider" />
                    <ul class="pricing-features-list">
                        <li class="feature-item">Arcu vitae elementum</li>
                        <li class="feature-item">Dui faucibus in ornare</li>
                        <li class="feature-item">Morbi tincidunt augue</li>
                        <li class="feature-item">Duis ultricies lacus sed</li>
                        <li class="feature-item">Imperdiet proin</li>
                        <li class="feature-item">Nisi scelerisque</li>
                    </ul>
                    <Button label="Buy Now" class="pricing-card-button" />
                </div>
                <div class="pricing-card">
                    <h3 class="pricing-card-title">Enterprise</h3>
                    <p class="pricing-card-description">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Velit numquam eligendi quos.
                    </p>
                    <hr class="pricing-card-divider" />
                    <div class="pricing-card-price">
                        <span class="price-amount">$49</span>
                        <span class="price-duration">per month</span>
                    </div>
                    <hr class="pricing-card-divider" />
                    <ul class="pricing-features-list">
                        <li class="feature-item">Arcu vitae elementum</li>
                        <li class="feature-item">Dui faucibus in ornare</li>
                        <li class="feature-item">Morbi tincidunt augue</li>
                        <li class="feature-item">Duis ultricies lacus sed</li>
                        <li class="feature-item">Imperdiet proin</li>
                        <li class="feature-item">Nisi scelerisque</li>
                    </ul>
                    <Button label="Buy Now" class="pricing-card-button" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import { computed } from 'vue';
import { useMainStore } from '../../../../stores/useStore';

const mainStore = useMainStore();
const mainTab = computed(() => mainStore.mainTab);
</script>

<style scoped>
.pricing-section-wrapper {
    background-color: #eff3f8;
}
.text-center {
    text-align: center;
}
.pricing-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: #020407;
    margin-bottom: 12px;
}
.pricing-subtitle {
    font-size: 1.25rem;
    color: #6c757d;
    margin-bottom: 32px;
    line-height: 1.6;
}
.pricing-cards-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
    background: #eff3f8;
}
.pricing-card {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 24px;
    width: 100%;
    max-width: 350px;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
    transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
}
.pricing-card:hover {
    transform: translateY(-8px);
    box-shadow: 0px 14px 28px rgba(0, 0, 0, 0.15);
}
.pricing-card-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #14377d;
    margin-bottom: 8px;
}
.pricing-card-description {
    color: #6c757d;
    margin-bottom: 16px;
    font-size: 0.9rem;
    line-height: 1.5;
}
.pricing-card-divider {
    border: none;
    height: 1px;
    background-color: #e9ecef;
    margin: 16px 0;
}
.pricing-card-price {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
}
.price-amount {
    font-size: 2rem;
    font-weight: bold;
    color: #14377d;
}
.price-duration {
    color: #6c757d;
    font-size: 0.9rem;
}
.pricing-features-list {
    list-style: none;
    padding: 0;
    margin: 16px 0;
}
.feature-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    color: #495057;
}
.feature-item::before {
    content: '\\2713';
    color: #28a745;
    font-weight: bold;
}
.pricing-card-button {
    width: 100%;
    padding: 12px;
    font-size: 1rem;
    font-weight: bold;
    background-color: #14377d;
    color: #ffffff;
    border-radius: 6px;
    transition:
        background-color 0.3s ease,
        box-shadow 0.3s ease;
}
.pricing-card-button:hover {
    background-color: #2467ba;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
