<template>
    <div class="main-content">
        <div class="features-container">
            <div class="title">
                <span class="title-primary">One Product,</span>
                <span class="title-secondary"> Many Solutions</span>
            </div>
            <div class="subtitle">
                Ac turpis egestas maecenas pharetra convallis posuere morbi leo
                urna.
            </div>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="icon-container">
                        <i class="pi pi-desktop feature-icon" />
                    </div>
                    <div class="feature-title">Built for Developers</div>
                    <p class="feature-description">
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                </div>

                <div class="feature-card">
                    <div class="icon-container">
                        <i class="pi pi-lock feature-icon" />
                    </div>
                    <div class="feature-title">End-to-End Encryption</div>
                    <p class="feature-description">
                        Risus nec feugiat in fermentum posuere urna nec. Posuere
                        sollicitudin aliquam ultrices sagittis.
                    </p>
                </div>

                <div class="feature-card">
                    <div class="icon-container">
                        <i class="pi pi-check-circle feature-icon" />
                    </div>
                    <div class="feature-title">Easy to Use</div>
                    <p class="feature-description">
                        Ornare suspendisse sed nisi lacus sed viverra tellus.
                        Neque volutpat ac tincidunt vitae semper.
                    </p>
                </div>

                <div class="feature-card">
                    <div class="icon-container">
                        <i class="pi pi-globe feature-icon" />
                    </div>
                    <div class="feature-title">Fast & Global Support</div>
                    <p class="feature-description">
                        Fermentum et sollicitudin ac orci phasellus egestas
                        tellus rutrum tellus.
                    </p>
                </div>

                <div class="feature-card">
                    <div class="icon-container">
                        <i class="pi pi-github feature-icon" />
                    </div>
                    <div class="feature-title">Open Source</div>
                    <p class="feature-description">
                        Nec tincidunt praesent semper feugiat. Sed adipiscing
                        diam donec adipiscing tristique risus nec feugiat.
                    </p>
                </div>

                <div class="feature-card">
                    <div class="icon-container">
                        <i class="pi pi-shield feature-icon" />
                    </div>
                    <div class="feature-title">Trusted Security</div>
                    <p class="feature-description">
                        Mattis rhoncus urna neque viverra justo nec ultrices. Id
                        cursus metus aliquam eleifend.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup></script>

<style scoped>
.features-container {
    background-color: #eff3f8;
    color: var(--surface-900);
    padding: 8px 24px;
    text-align: center;
}

.title {
    font-weight: bold;
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.title-primary {
    color: var(--surface-900);
}

.title-secondary {
    color: #14377d;
}

.subtitle {
    color: var(--surface-700);
    font-size: 1.25rem;
    margin-bottom: 3rem;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;
}

@media (min-width: 768px) {
    .features-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1280px) {
    .features-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

.feature-card {
    padding: 16px;
    background-color: var(--surface-0);
    border-radius: 12px;
    text-align: center;
    box-shadow:
        0px 2px 6px rgba(0, 0, 0, 0.12),
        0px 4px 10px rgba(0, 0, 0, 0.03);
}

.icon-container {
    width: 64px;
    height: 64px;
    margin: 0 auto 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: var(--surface-100);
    box-shadow:
        0px 2px 6px rgba(0, 0, 0, 0.12),
        0px 4px 10px rgba(0, 0, 0, 0.03);
}

.feature-icon {
    font-size: 2rem;
    color: #14377d;
}

.feature-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--surface-900);
    margin-bottom: 0.5rem;
}

.feature-description {
    color: var(--surface-700);
    max-width: 250px;
    margin: 0 auto;
    font-size: 1rem;
    line-height: 1.5;
}
</style>
