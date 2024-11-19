<template>
    <div class="login-page">
        <Toast />
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
                    <div class="input-wrapper password-wrapper">
                        <i class="pi pi-lock icon"></i>
                        <input
                            v-model="password"
                            :type="showPassword ? 'text' : 'password'"
                            placeholder="Password"
                            required
                            class="input-field"
                        />
                        <i
                            :class="
                                showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'
                            "
                            class="toggle-password-icon"
                            @click="togglePasswordVisibility"
                        ></i>
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
                <button
                    type="submit"
                    class="submit-button"
                    :disabled="isLoading"
                >
                    <span class="spinner-container">
                        <ProgressSpinner
                            v-if="isLoading"
                            style="width: 20px; height: 20px; margin-right: 8px"
                            strokeWidth="5"
                            animationDuration=".5s"
                        />
                    </span>
                    Continue
                </button>
            </form>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import ProgressSpinner from 'primevue/progressspinner';
import { apiLogin } from '../stores/localStorageData';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const showPassword = ref(false);
const toast = useToast();
const isLoading = ref(false);

function togglePasswordVisibility() {
    showPassword.value = !showPassword.value;
}

onMounted(() => {
    const justLoggedOut = localStorage.getItem('justLoggedOut');
    if (justLoggedOut) {
        toast.add({
            severity: 'info',
            summary: 'Logged Out',
            detail: 'Logout successful.',
            life: 4000
        });
        localStorage.removeItem('justLoggedOut');
    }
});

async function handleLogin() {
    try {
        isLoading.value = true;
        const response = await apiLogin(email.value, password.value);

        const token = response.access_token || response.token;
        if (!token) {
            throw new Error('Authentication failed: No token provided.');
        }

        localStorage.setItem('authToken', token);
        localStorage.setItem('justLoggedIn', 'true');

        window.location.href = '/dashboard';
    } catch (error) {
        errorMessage.value = error.message;
    } finally {
        isLoading.value = false;
    }
}
</script>

<style scoped></style>
