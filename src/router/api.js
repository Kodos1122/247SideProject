/* src/api/axiosInstance.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.client.develop.horus.guardme.dev',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Log all requests to verify the headers
api.interceptors.request.use((config) => {
    console.log('Making request to:', config.url);
    console.log('Authorization header:', config.headers.Authorization);
    return config;
});

// Attach the Authorization header
api.defaults.headers.common['Authorization'] = `Bearer 19072001`;

export default api;*/
