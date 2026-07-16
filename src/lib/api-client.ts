import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL } from '../config/api';

/**
 * Creates an Axios instance with default configurations.
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_API_KEY || '',
  },
  timeout: 10000, // 10 seconds
});

/**
 * Request Interceptor
 * - Adds authorization token to requests if available.
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Example: Fetch token from localStorage or state management
    const token = localStorage.getItem('auth_token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * - Standardizes error handling across the application.
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  (error: AxiosError) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401) {
        // Handle unauthorized access (e.g., redirect to login, clear tokens)
        console.warn('Unauthorized access - potentially redirecting to login');
      } else if (error.response.status >= 500) {
        console.error('Server error occurred', error.response.data);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from server', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request', error.message);
    }
    
    return Promise.reject(error);
  }
);
