import axios from 'axios'

export const API = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1000
  });

// Add a request interceptor to set content type headers
axios.interceptors.request.use(function (config) {
    config.headers['Content-Type'] = "application/json";

  return config;
});