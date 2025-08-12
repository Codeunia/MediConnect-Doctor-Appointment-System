// client/src/api/axios.js
import axios from 'axios';

// REMOVE the baseURL. Requests will be proxied automatically.
const API = axios.create(); 

// Attach JWT to every request if present
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;