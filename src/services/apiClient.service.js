import axios from "axios";

// Base URL: http://localhost:300/api/v1
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

// Interceptor: Har request ke sath token automatic jayega
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;