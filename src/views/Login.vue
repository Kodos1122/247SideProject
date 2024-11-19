<template>
    <div class="login-page">
        <div class="login-container">
            <img
                src="../assets/images/new_logo.png"
                alt="GuardMe Logo"
                class="logo"
            />
            <h1 class="title">Log In</h1>
            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <div class="input-wrapper">
                        <i class="pi pi-envelope icon"></i>
                        <input
                            v-model="email"
                            type="email"
                            placeholder="Email Address"
                            required
                            class="input-field"
                        />
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-wrapper">
                        <i class="pi pi-lock icon"></i>
                        <input
                            v-model="password"
                            type="password"
                            placeholder="Password"
                            required
                            class="input-field"
                        />
                    </div>
                </div>
                <div class="form-options">
                    <div class="remember-me">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            class="styled-checkbox"
                        />
                        <span class="checkbox-label">Remember Me</span>
                    </div>
                    <a href="#" class="forgot-password">Forgot password?</a>
                </div>
                <button type="submit" class="submit-button">Continue</button>
            </form>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { apiLogin } from '../stores/localStorageData';

const email = ref('');
const password = ref('');
const errorMessage = ref('');

async function handleLogin() {
    try {
        const response = await apiLogin(email.value, password.value);

        const token = response.access_token || response.token;
        if (!token) {
            throw new Error('Authentication failed: No token provided.');
        }

        localStorage.setItem('authToken', token);
        window.location.href = '/dashboard';
    } catch (error) {
        errorMessage.value = error.message;
    }
}
</script>

<style scoped></style>
