import axios from 'axios';

// Base Axios instance
const API = axios.create({
  baseURL: 'http://team1-api.primetrustx.com/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach JWT token if present in LocalStorage
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;