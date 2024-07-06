//@ts-check
import axios from 'axios';
import { getToken } from './helper';

const axiosInstance = axios.create({
    baseURL: '/',
    withCredentials: true // Include cookies in all requests
});

axiosInstance.interceptors.request.use(
    config => {
        // Retrieve the token from the cookie
        const token = getToken();
        
        // If the token exists, add it to the headers
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        // Handle the error
        return Promise.reject(error);
    }
);

export default axiosInstance;
