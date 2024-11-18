import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL; // Load base URL
const loginEndpoint = `${apiBaseUrl}/api/cognito/login`;

let token = ''; // Store the token globally

// Function to fetch token dynamically
async function fetchToken() {
    try {
        const response = await axios.post(
            loginEndpoint,
            {
                email: import.meta.env.VITE_API_EMAIL, // Access email
                password: import.meta.env.VITE_API_PASSWORD // Access password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('Token fetched successfully');
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching token:', error);
        throw error;
    }
}

// Initialize Axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
});

// Add a request interceptor to inject token dynamically
api.interceptors.request.use(
    async (config) => {
        if (!token) {
            token = await fetchToken(); // Fetch token if not already set
        }
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// Function to handle API errors
function handleApiError(error, action) {
    if (error.response && error.response.data) {
        console.error(`Validation Error ${action}:`, error.response.data);
    } else {
        console.error(`Error ${action}:`, error);
    }
}

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
        const response = await api.get('/api/v1/service-code-sets?');
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

export async function addCodeSet(newItem) {
    try {
        const response = await api.post('/api/v1/service-code-sets', newItem);
        console.log('Code Set added successfully:', response.data);
        return response.data; // Only log once when successful
    } catch (error) {
        handleApiError(error, 'adding Code Set');
        throw error;
    }
}

// Update a Code Set
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

// Delete a Code Set
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
        const response = await api.get('/api/v1/service-code-groups?');
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

// Add a new Code Group
export async function addCodeGroup(newItem) {
    try {
        console.log('Adding Code Group:', newItem);
        const payload = {
            name: newItem.name,
            description: newItem.description,
            effective_date: newItem.effective_date,
            status: newItem.status,
            service_code_set_id: newItem.service_code_set_id // Correct field name
        };
        const response = await api.post('/api/v1/service-code-groups', payload);
        console.log('Code Group added successfully:', response.data);
        return response.data;
    } catch (error) {
        handleApiError(error, 'adding Code Group');
        throw error;
    }
}

// Update a Code Group
export async function updateCodeGroup(updatedItem) {
    if (!updatedItem.id) {
        throw new Error('Code Group ID is missing or undefined.');
    }
    try {
        const payload = {
            name: updatedItem.name,
            description: updatedItem.description,
            effective_date: updatedItem.effective_date,
            status: updatedItem.status,
            service_code_set_id: updatedItem.service_code_set_id
        };
        const response = await api.put(
            `/api/v1/service-code-groups/${updatedItem.id}`,
            payload
        );
        console.log('Code Group updated successfully:', response.data);
        return response.data;
    } catch (error) {
        handleApiError(error, 'updating Code Group');
        throw error;
    }
}

// Delete a Code Group
export async function deleteCodeGroup(id) {
    try {
        await api.delete(`/api/v1/service-code-groups/${id}`);
        console.log(`Code Group with ID ${id} deleted successfully.`);
    } catch (error) {
        handleApiError(error, 'deleting Code Group');
        throw error;
    }
}

// Fetch Code Sets specifically for Code Groups
export async function fetchCodeSetsForCodeGroups() {
    try {
        const response = await api.get('/api/v1/service-code-sets?'); // Use the same endpoint
        return response.data.data.map((item) => ({
            id: item.id,
            name: item.name.en, // Include only necessary fields for Code Group use
            description: item.description.en
        }));
    } catch (error) {
        handleApiError(error, 'fetching Code Sets for Code Groups');
        throw error;
    }
}
