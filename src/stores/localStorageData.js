import axios from 'axios';

const token = 'Token_Here';

const api = axios.create({
    baseURL: 'https://api.client.develop.horus.guardme.dev',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`
    }
});

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
        console.error('Error fetching Code Sets:', error);
        throw error;
    }
}

export async function addCodeSet(newItem) {
    try {
        console.log('Adding Code Set:', newItem);
        const response = await api.post('/api/v1/service-code-sets', newItem);
        console.log('Code Set added successfully:', response.data);
        return response.data;
    } catch (error) {
        handleApiError(error, 'adding Code Set');
    }
}

export async function updateCodeSet(updatedItem) {
    if (!updatedItem.id) {
        throw new Error('Code Set ID is missing or undefined.');
    }
    try {
        const response = await api.put(
            `/api/v1/service-code-sets/${updatedItem.id}`,
            updatedItem
        );
        return response.data;
    } catch (error) {
        handleApiError(error, 'updating Code Set');
    }
}

export async function deleteCodeSet(id) {
    try {
        await api.delete(`/api/v1/service-code-sets/${id}`);
    } catch (error) {
        handleApiError(error, 'deleting Code Set');
    }
}

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

export async function addCodeGroup(newItem) {
    try {
        console.log('Adding Code Group:', newItem);
        const payload = {
            ...newItem,
            service_code_set_id: newItem.service_code_set.id
        };
        const response = await api.post('/api/v1/service-code-groups', payload);
        console.log('Code Group added successfully:', response.data);
        return response.data;
    } catch (error) {
        handleApiError(error, 'adding Code Group');
        throw error;
    }
}

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
            service_code_set_id: updatedItem.service_code_set.id
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

export async function deleteCodeGroup(id) {
    try {
        await api.delete(`/api/v1/service-code-groups/${id}`);
        console.log(`Code Group with ID ${id} deleted successfully.`);
    } catch (error) {
        handleApiError(error, 'deleting Code Group');
        throw error;
    }
}

function formatDateToUTC(date) {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getUTCFullYear();
    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function handleApiError(error, action) {
    if (error.response && error.response.data) {
        console.error(`Validation Error ${action}:`, error.response.data);
    } else {
        console.error(`Error ${action}:`, error);
    }
}
