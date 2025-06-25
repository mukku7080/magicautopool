import axios from 'axios';

// Create axios instance with base configuration
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.magicautopool.com/api',
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
    (config) => {
        // Get token from localStorage or context
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Log request in development
        // if (import.meta.env.DEV) {
        //     console.log('🚀 API Request:', {
        //         method: config.method?.toUpperCase(),
        //         url: config.url,
        //         data: config.data,
        //     });
        // }

        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor to handle common responses
axiosInstance.interceptors.response.use(
    (response) => {
        // Log response in development
        // if (import.meta.env.DEV) {
        //     console.log('✅ API Response:', {
        //         status: response.status,
        //         url: response.config.url,
        //         data: response.data,
        //     });
        // }

        return response;
    },
    (error) => {
        // Handle common error responses
        if (error.response) {
            const { status, data } = error.response;

            switch (status) {
                case 401:
                    // Unauthorized - clear token and redirect to login
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('user');
                    window.location.href = '/login';
                    break;

                case 403:
                    // Forbidden
                    console.error('❌ Access Forbidden:', data.message || 'You do not have permission to access this resource');
                    break;

                case 404:
                    // Not Found
                    console.error('❌ Resource Not Found:', data.message || 'The requested resource was not found');
                    break;

                case 422:
                    // Validation Error
                    console.error('❌ Validation Error:', data.errors || data.message);
                    break;

                case 500:
                    // Server Error
                    console.error('❌ Server Error:', data.message || 'Internal server error occurred');
                    break;

                default:
                    console.error('❌ API Error:', data.message || 'An unexpected error occurred');
            }
        } else if (error.request) {
            // Network error
            console.error('❌ Network Error:', 'Unable to connect to the server. Please check your internet connection.');
        } else {
            // Other error
            console.error('❌ Error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;