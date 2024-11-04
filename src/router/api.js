/* import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.client.develop.horus.guardme.dev',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    console.log('Making request to:', config.url);
    console.log('Authorization header:', config.headers.Authorization);
    return config;
});

api.defaults.headers.common['Authorization'] = `Bearer 19072001`;

export default api;*/
