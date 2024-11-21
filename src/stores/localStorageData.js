import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const loginEndpoint = `${apiBaseUrl}/api/cognito/login`;
const refreshEndpoint = `${apiBaseUrl}/api/cognito/refresh`;

let accessToken = '';
let refreshToken = '';

// Initialize Axios instance
const api = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
});

// Handle API errors
function handleApiError(error, action) {
    if (error.response && error.response.data) {
        console.error(`Validation Error ${action}:`, error.response.data);
    } else {
        console.error(`Error ${action}:`, error);
    }
}

// Login Authentication
export async function apiLogin(email, password) {
    try {
        const response = await axios.post(
            loginEndpoint,
            { email, password },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        accessToken = response.data.access_token;
        refreshToken = response.data.refresh_token;

        if (!accessToken || !refreshToken) {
            throw new Error('Authentication failed: Tokens not provided.');
        }

        localStorage.setItem('authToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('isLoggedIn', 'true');

        console.log('Login successful. Tokens stored:', {
            accessToken,
            refreshToken
        });
        return response.data;
    } catch (error) {
        handleApiError(error, 'login');
        throw new Error(error.response?.data?.message || 'Login failed');
    }
}

// Logout
export function apiLogout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('isLoggedIn');
    accessToken = '';
    refreshToken = '';
    console.log('Logout successful. Tokens cleared.');
}

// Check if authenticated
export function isAuthenticated() {
    const token = localStorage.getItem('authToken');
    return !!token;
}

// Refresh the access token
async function refreshAccessToken() {
    try {
        const response = await axios.get(refreshEndpoint, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
                'Content-Type': 'application/json'
            }
        });

        const newToken = response.data.access_token || response.data.token;
        if (!newToken) {
            throw new Error('No token received during refresh.');
        }

        localStorage.setItem('authToken', newToken);
        accessToken = newToken;

        console.log('Access token refreshed successfully.');
        return newToken;
    } catch (error) {
        console.error(
            'Validation Error refreshing token:',
            error.response?.data || error
        );
        apiLogout();
        throw new Error('Failed to refresh access token. Please login again.');
    }
}

// Axios request interceptor to attach access token
api.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
            const storedToken = localStorage.getItem('authToken');
            if (storedToken) {
                accessToken = storedToken;
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Axios response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (
            error.response &&
            error.response.status === 401 &&
            error.config &&
            !error.config._retry
        ) {
            // Token expired or unauthorized
            error.config._retry = true; // Prevent infinite retry loop
            try {
                const newToken = await refreshAccessToken();
                error.config.headers.Authorization = `Bearer ${newToken}`;
                return api.request(error.config); // Retry the original request with new token
            } catch (refreshError) {
                console.error('Failed to refresh access token:', refreshError);
                apiLogout();
                window.location.href = '/login.html'; // Redirect to login
            }
        }
        return Promise.reject(error);
    }
);

// Utility function to format dates
function formatDateToUTC(date) {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Fetch Code Sets
export async function getCodeSets() {
    try {
        const response = await api.get('/api/v1/service-code-sets');
        return response.data.data.map((item) => ({
            id: item.id,
            name: item.name.en,
            description: item.description.en,
            effectiveDate: formatDateToUTC(item.effective_date),
            lastUpdated: formatDateToUTC(item.updated_at),
            status: item.status,
            isLocked: item.is_locked
        }));
    } catch (error) {
        handleApiError(error, 'fetching Code Sets');
        throw error;
    }
}

// Add Code Set
export async function addCodeSet(newItem) {
    try {
        const response = await api.post('/api/v1/service-code-sets', newItem);
        console.log('Code Set added successfully:', response.data);
        return response.data;
    } catch (error) {
        handleApiError(error, 'adding Code Set');
        throw error;
    }
}

// Update Code Set
export async function updateCodeSet(updatedItem) {
    if (!updatedItem.id) {
        throw new Error('Code Set ID is missing or undefined.');
    }
    try {
        const response = await api.put(
            `/api/v1/service-code-sets/${updatedItem.id}`,
            updatedItem
        );
        console.log('Code Set updated successfully:', response.data);
        return response.data;
    } catch (error) {
        handleApiError(error, 'updating Code Set');
        throw error;
    }
}

// Delete Code Set
export async function deleteCodeSet(id) {
    try {
        await api.delete(`/api/v1/service-code-sets/${id}`);
        console.log(`Code Set with ID ${id} deleted successfully.`);
    } catch (error) {
        handleApiError(error, 'deleting Code Set');
        throw error;
    }
}

// Fetch Code Groups
export async function getCodeGroups() {
    try {
        const response = await api.get('/api/v1/service-code-groups');
        return response.data.data.map((item) => ({
            id: item.id,
            name: item.name.en,
            description: item.description.en,
            effectiveDate: formatDateToUTC(item.effective_date),
            lastUpdated: formatDateToUTC(item.updated_at),
            status: item.status,
            isLocked: item.is_locked,
            service_code_set: item.service_code_set
        }));
    } catch (error) {
        handleApiError(error, 'fetching Code Groups');
        throw error;
    }
}

// Add Code Group
export async function addCodeGroup(newItem) {
    try {
        const response = await api.post('/api/v1/service-code-groups', newItem);
        console.log('Code Group added successfully:', response.data);
        return response.data;
    } catch (error) {
        handleApiError(error, 'adding Code Group');
        throw error;
    }
}

// Update Code Group
export async function updateCodeGroup(updatedItem) {
    if (!updatedItem.id) {
        throw new Error('Code Group ID is missing or undefined.');
    }
    try {
        const response = await api.put(
            `/api/v1/service-code-groups/${updatedItem.id}`,
            updatedItem
        );
        console.log('Code Group updated successfully:', response.data);
        return response.data;
    } catch (error) {
        handleApiError(error, 'updating Code Group');
        throw error;
    }
}

// Delete Code Group
export async function deleteCodeGroup(id) {
    try {
        await api.delete(`/api/v1/service-code-groups/${id}`);
        console.log(`Code Group with ID ${id} deleted successfully.`);
    } catch (error) {
        handleApiError(error, 'deleting Code Group');
        throw error;
    }
}

// Fetch Code Sets for Code Groups
export async function fetchCodeSetsForCodeGroups() {
    try {
        const response = await api.get('/api/v1/service-code-sets');
        return response.data.data.map((item) => ({
            id: item.id,
            name: item.name.en,
            description: item.description.en
        }));
    } catch (error) {
        handleApiError(error, 'fetching Code Sets for Code Groups');
        throw error;
    }
}

export { api };
